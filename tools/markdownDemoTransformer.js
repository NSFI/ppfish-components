const path = require('path');
const fs = require('fs');

const babel = require('babel-core');
const babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc')).toString());
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const generate = require('babel-generator').default;
const crypto = require('crypto');


const w3c = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br',
  'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn',
  'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins',
  'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object',
  'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script',
  'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td',
  'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',
];


function transformCode(codes) {
  // let codes = [
  //   `class Demo extends React.Component{
  //     render(){
  //       return <div>test</div>
  //     }
  //   }`
  // ]

  let components = [];//用于存错Button, Slider, Col这样的组件类名
  let subComponents = [];//用于缓存 const Col = Grid.Col;中的 Col，避免CheckComponetVisitor再去
  // let codes = [];
  let classNames = [];  //Demo Demo2 Demo3 Demo4
  let classNameIndex = 2;


  let MyVisitor = {
    JSXOpeningElement: (path) => {
      let node = path.node;
      let tagName;
      if (node.name.type === "JSXMemberExpression") {
        //这个是 Radio.Grop这种特殊情况
        tagName = node.name.object.name;
      } else if (node.name.type === "JSXIdentifier") {
        //这种是一般的标签
        tagName = path.node.name.name;
      }
      if (tagName && !w3c.includes(tagName)) {
        if (!components.includes(tagName) && !subComponents.includes(tagName)) {

          /*
          已经筛选出JSX Element使用的组件了
          接下来就要解决 const Col = Grid.Col的这种情况。
          情况1：
          <Button >xxxx</Button>
          这种情况在作用域中不会找到 Button的binding；
          直接把Button推入components数组

          情况2:
          const Col = Grid.Col;
          <Col ></Col>
          会在作用域里找到Col的binding引用；那么依赖注入的组件就应该是Grid 而不是 Col.
          会把Grid推入components数组，把Col推入subComponents数组

          情况3：
            const PureComponent = (props)=><div>{props.children}</div>;
            或
            const PureComponent = function(props){return <div>{props.children}</div>};
            这种情况，只把PureCompoent加入subCompoents数组里
          */

          if (path.scope.hasBinding(tagName)) {
            //第二种情况 需要回溯到父组件

            //根据path得到绑定
            const tagNameBinding = path.scope.getBinding(tagName);

            let topTagName,
              noNeedInject = false//子类元素,情况3,无需依赖注入
              ;

            //首先对声明进行检测
            if (tagNameBinding.path.type === "VariableDeclarator") {
              const declarator = tagNameBinding.path.node;
              const initType = declarator.init.type;

              if (initType === "Identifier") { // const $ = jQuery;取别名;
                topTagName = declarator.init.name;
              } else if (initType === "MemberExpression") {// const Col = Grid.Col;
                topTagName = declarator.init.object.name;
              } else if (
                initType === "ArrowFunctionExpression" ||
                initType === "FunctionExpression"
              ) {
                noNeedInject = true;
              }
            }else if (tagNameBinding.path.type ==="FunctionDeclaration"){
              //function NewElement(props){}
              noNeedInject = true;
            }


            if (!topTagName && !noNeedInject) {
              //没有tagName，说明先初始化为undefined，然后才对其赋值。
              //对赋值进行检测
              tagNameBinding.constantViolations.map(nodePath => {
                if (nodePath.type === "AssignmentExpression" && nodePath.node.operator === "=") {
                  let assignRight = nodePath.node.right;
                  if (assignRight.type === 'MemberExpression') {
                    topTagName = assignRight.object.name;
                  }
                }
              });
            }

            subComponents.push(tagName);//把原来的标签加入子组件
            if (!noNeedInject) {
              if (!components.includes(topTagName)) {
                components.push(topTagName);
              }
            }

          } else {
            //第一种情况
            components.push(tagName);//把自定义的组件加入components，以便按需引入
          }
        }
      }
    },
    ClassDeclaration: (path) => {
      let id = path.node.id;

      if (classNames.includes(id.name)) {
        //为类名增加序号，避免duplicate declare
        id.name += classNameIndex++;
        classNames.push(id.name);
      } else {
        classNames.push(id.name);
      }
    }
  };

  //map=>用babylon把代码转成AST
  //map=>用MyVisitor修改类名，把用到的组件记录下来，以便按需引入.traverse以后，用generate把AST生成代码
  let codeBodys = codes.map(code => babylon.parse(code, {
    sourceType: "module", // default: "script"
    plugins: [
      "jsx",
      'objectRestSpread',
      'decorators',
      'classProperties',
      'exportExtensions',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
    ] // default: []
  })).map(ast => (traverse(ast, MyVisitor), generate(ast).code));


  //拼成一份模块的代码，用babel转成nodejs能够运行的代码。
  let transformed = babel.transform(`
  import React from 'react';
  import ReactDOM from 'react-dom';
  import PropTypes from 'prop-types';
  ${components.length
      ? `import {${components.join(',')}} from 'ppfish';`
      : ''}


  ${codeBodys.join('\n')}

  export default function TestDemoContainer(props){
    return (
      <div>
        ${classNames.map(classname => '<' + classname + ' />').join('\n')}
      </div>
    )
  }
  `, babelrc);

  return transformed.code;
}

module.exports = {
  canInstrument: true,
  getCacheKey(
    fileData,
    filename,
    configString,
    options,
  ) {
    const { instrument, rootDir } = options;

    return crypto
      .createHash('md5')
      .update(fileData)
      .update('\0', 'utf8')
      .update(JSON.stringify(options))
      .update('\0', 'utf8')
      .update(fileData)
      .update('\0', 'utf8')
      .update(path.relative(rootDir, filename))
      .update('\0', 'utf8')
      .update(configString)
      .update('\0', 'utf8')
      .update(instrument ? 'instrument' : '')
      .digest('hex');
  },
  process(src, filename, config, options) {

    //截取出demo的那段js代码
    let sourceCodes = [];
    src.replace(/:::\s?demo\s?([^]+?):::/g, (match, p1, offset) => {

      let document = p1.match(/(?:[^]*)\n?(?:```(?:.*)\n?([^]+)```)/);
      let source = document[1];

      sourceCodes.push(source);
    });

    //把demo源代码加上class Demo extends React.Component
    sourceCodes = sourceCodes.map((sourceCode) => {
      if (/class.*extends React.Component/.test(sourceCode)) {
        return sourceCode;
      } else {
        //单个class写关键部分内容
        return `
              class Demo extends React.Component {
                ${sourceCode}
              };
          `;
      }
    });



    let $code = transformCode(sourceCodes);



    $code = `${$code}\nglobal.__PREPROCESSED__ = true;`;
    if (options.instrument) {
      $code = `${$code}\nglobal.__INSTRUMENTED__ = true;`;
    }
    return $code;
    // return 'module.exports = ' + JSON.stringify(src);
  },
};
