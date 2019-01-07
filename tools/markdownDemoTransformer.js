const path = require('path');
const fs = require('fs');
const babel = require('@babel/core');
const babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '.babelrc')).toString());
const babelParser = require("@babel/parser");
const t = require("@babel/types");
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
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
const DEFAULT_INJECT = ['React', 'ReactDOM', 'PropTypes', 'Resizable'];
const DEMO_EXPORTS_REG = /^demo/i; //检测demo代码片段中导出作为Demo测试类的类名或者变量名称

function transformCode(codes, filename) {
  // let codes = [
  //   `class Demo extends React.Component{
  //     render(){
  //       return <div>test</div>
  //     }
  //   }`
  // ]
  let components = [];//用于存Button, Slider, Col这样的组件类名
  let subComponents = [];//用于缓存 const Col = Grid.Col;中的 Col，避免CheckComponentVisitor再去
  let classNames = [];  //Demo Demo2 Demo3 Demo4
  let classNameIndex = 2;

  // MyVisitor 主要做两件事，1:找到用了哪些组件，2:修改重名demo名加上序号
  let MyVisitor = {
    Identifier: (path) => {
      const scope = path.scope;

      if (path.node.name == 'ReactDOM') {
        // 删除单行代码：`ReactDOM.render(<Demo {...context.props} />, mountNode);`
        path.parentPath.parentPath.remove();
      } else if (scope.parent === undefined) {
        // 保证这个变量是在最外层
        Object.keys(scope.bindings)
        .filter(name => DEMO_EXPORTS_REG.test(name))
        .reduce((classNames, demoname) => {
          /* 这是第几个demo,收集的导出类名是不是已经够了
            主要是一个demo里面的全局变量有很多，所以这里的reduce可能会跑几次，为了排除掉已经添加过的demo类，
            可以判断全局scope的uid是否相同。这里是判断demo的个数和已经收集了的类名的个数。
          */
          if (classNames.length == MyVisitor.__demoIndex) {
            if (classNames.includes(demoname)) {
              //说明重名了，需要使用
              let id = scope.getBinding(demoname).identifier;
              id.name += classNameIndex++;
              classNames.push(id.name);
            } else {
              classNames.push(demoname);
            }
          }
        }, classNames);
      }
    },
    JSXOpeningElement: (path) => {
      let node = path.node;
      let tagName;

      if (node.name.type === "JSXMemberExpression") {
        //这个是 Radio.Grop这种特殊情况
        tagName = node.name.object.name;
      } else if (node.name.type === "JSXIdentifier") {
        //这种是一般的标签
        tagName = node.name.name;

        // 将 SVG ICON 组件 mock 为 div 节点
        if (tagName.startsWith('Icon') && tagName != 'Icon') {
          tagName = node.name.name = 'div';
        }
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
            let topTagName, noNeedInject = false; //子类元素,情况3,无需依赖注入
            const recursionToTopClass = (tagName) => {
              let tagNameBinding = path.scope.getBinding(tagName);
              //首先对声明进行检测
              if (tagNameBinding.path.type === "VariableDeclarator") {
                const declarator = tagNameBinding.path.node;
                const initType = declarator.init.type;

                if (initType === "Identifier") { // const $ = jQuery;取别名;
                  topTagName = declarator.init.name;
                } else if (initType === "MemberExpression") {// const Col = Grid.Col;
                  topTagName = declarator.init.object.name;
                } else if (initType === "CallExpression") { // EditableContext = React.createContext()
                  let callee = declarator.init.callee;
                  while (callee.type !== 'MemberExpression') { callee = callee.callee; }
                  // const CollectionCreateForm = Form.create()(class extends React.Component {})
                  topTagName = callee.object.name;
                } else if (
                  initType === "ArrowFunctionExpression" ||
                  initType === "FunctionExpression"
                ) {
                  noNeedInject = true;
                }
              } else if (tagNameBinding.path.type === "FunctionDeclaration") {
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
              if (topTagName && path.scope.hasBinding(topTagName)) {
                return recursionToTopClass(topTagName);
              }
            };

            recursionToTopClass(tagName);//递归查找最顶级的类名

            subComponents.push(tagName);//把原来的标签加入子组件
            if (!noNeedInject) {
              if (topTagName && !components.includes(topTagName)) {
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
    VariableDeclarator: (path) => {
      // 转换 Form 组件 Demo 中的 Demo 变量定义
      if (path.node.id.name == 'Demo') {
        path.parentPath.replaceWith(
          t.returnStatement(t.callExpression(path.node.init.callee, path.node.init.arguments))
        );
      }
    },
    ClassDeclaration: (path) => {
      let id = path.node.id;
      if (DEMO_EXPORTS_REG.test(id.name)) {
        if (classNames.length == MyVisitor.__demoIndex) {
          if (classNames.includes(id.name)) {
            //为类名增加序号，避免duplicate declare
            id.name += classNameIndex++;
            classNames.push(id.name);
          } else {
            classNames.push(id.name);
          }
        }
      }
    }
  };

  //map=>用babel parser把代码转成AST
  //map=>用MyVisitor修改类名，把用到的组件记录下来，以便按需引入traverse以后，用generate把AST生成代码
  let codeBodys = codes.map(code => babelParser.parse(code, {
    sourceType: "module", // default: "script"
    plugins: [
      "jsx",
      'asyncGenerators',
      'classProperties',
      'dynamicImport',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'functionBind',
      'functionSent',
      'objectRestSpread',
    ] // default: []
  })).map((ast, index) => {
    MyVisitor.__demoIndex = index;
    traverse(ast, MyVisitor);
    return generate(ast).code;
  });

  // 排除默认导入的模块
  components = components.filter(ele => !DEFAULT_INJECT.includes(ele));

  // 一个 demo 导出一个 Demo 开头的名字
  classNames = classNames.filter(classname => DEMO_EXPORTS_REG.test(classname));

  if (classNames.length < classNameIndex) {
    let newClsNames = [];
    for (let i=1; i<classNameIndex; i++) {
      if (i == 1) {
        newClsNames.push('Demo');
      } else {
        newClsNames.push('Demo' + i);
      }
    }
    classNames = newClsNames;
  }

  //拼成一份模块的代码，用babel转成nodejs能够运行的代码。
  let composedCode = `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import PropTypes from 'prop-types';
    // Table 组件的“可伸缩列” Demo 使用
    ${components.includes('Table') ? `import { Resizable } from 'react-resizable'` : ''};
    ${components.length ? `import {${components.join(',')}} from '../../../source/components/index.js';` : ''}

    ${classNames.map((classname, index) => `let ${classname} = (() => {
      ${codeBodys[index]}
      return ${classname};
    })();`).join('\n')}

    export default function TestDemoContainer(props) {
      return (
        <div>
          ${classNames.map(classname => `{ ${classname} ? <${classname} {...props}/> : null }`).join('\n')}
        </div>
      );
    };
  `;

  let transformed = babel.transform(composedCode, babelrc);

  return transformed.code;
}

module.exports = {
  canInstrument: true,
  getCacheKey(fileData, filename, configString, options) {
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
    //截取出demo中的js代码
    let sourceCodes = [];
    src.replace(/:::\s?(demo|display)\s?([^]+?):::/g, (match, demoType, demoContent, offset) => {
      demoContent.replace(/(`{3})([^`]|[^`][\s\S]*?[^`])\1(?!`)/ig, (codeContent) => {
        let [all, type, code] = codeContent.match(/```(.*)\n?([^]+)```/);
        type = type.trim();
        if (type == 'js' || type == 'jsx') {
          sourceCodes.push(code);
        }
      });
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
          }
        `;
      }
    });

    let $code = transformCode(sourceCodes, filename);
    $code = `${$code}\nglobal.__PREPROCESSED__ = true;`;
    if (options.instrument) {
      $code = `${$code}\nglobal.__INSTRUMENTED__ = true;`;
    }

    return $code;
    // return 'module.exports = ' + JSON.stringify(src);
  },
};
