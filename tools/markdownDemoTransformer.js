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

  let components = [];// Button, Slider, Col

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
        if (!components.includes(tagName)) {
          components.push(tagName);//把自定义的组件加入components，以便按需引入
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
  import {${components.join(',')}} from 'ppfish';

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
