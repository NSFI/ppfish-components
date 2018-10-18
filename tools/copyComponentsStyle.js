const fs = require("fs");
const pfs = fs.promises;
const ts = require("typescript");
const path = require('path');
const mkdirp = require('mkdirp');

/**
 * 源文件是tsc或者jsx格式，在代码中使用import引入less样式文件。
 * 经过下面的代码处理后，要达到的效果是：根据tsc或者jsx格式的源文件生成新的less文件 这个less文件的依赖项和源文件相同，从而只使用less格式来处理样式
 *
 * ps: less文件兼容css文件 所以代码也要兼容css文件
 *
 * 读取components/index.js
 * 解析文件，采用深度优先算法分析import的内容
 * 如果import的文件是tsc或jsx，进行深度优先分析后，使用less语法输出为less文件,将文件后缀由 *.jsx 改为 *.ref.less。
 * 如果import的是less文件，进行深度优先分析，将依赖的文件复制到新的dist文件夹对应位置，将这个less文件复制到新的位置。
 * 如果import的是css文件，直接复制到新位置
 * 将当前文件的中import的内容改为less语法，输出为新的less文件,后缀为ref.less。
 * 创建ppfish.less文件，用于加载./components/index.ref.less文件
 *
 *
 * */


/**
 *  init variables
 *  */



// let fileName = './dist/index.js';
let entryFile = 'source/components/index.js';

const MEMO = new Map();
const DEEP_PATH = [];
DEEP_PATH.push(__dirname);


const ORIGIN_PATH_PREFIX = path.resolve(__dirname, '../', './source'); //从source文件夹复制到dist文件夹，source文件夹下的目录结构将会复制到dist下
const DIST_PATH_PREFIX = path.resolve(__dirname, '../', './dist');


module.exports = function (cb) {
  try {
    digFile(path.resolve(entryFile));
    fs.writeFileSync(path.resolve(__dirname,'../dist/ppfish.less'),'@import "./components/index.ref.less";');
  } catch (e) {
    console.error(e); //eslint-disable-line
    process.exit(1);
  }

};
// //调试测试
// try {
//   digFile(path.resolve(entryFile));
//   console.log('Done');
// } catch (e) {
//   console.error(e);
//   process.exit(1);
// }


function digFile(filename) {


  /**
   *  1.Resolve FileName 用模块的方式确认文件的路径和格式
   *  */

  let ext = path.extname(filename);
  if ('' === ext) {
    //没有文件后缀，可能是文件夹/tsc?/jsx?格式
    let status = fs.lstatSync(filename);
    if (status.isDirectory()) {
      filename = filename + path.sep + 'index';
    }

    let EXTS = ['.tsx', '.ts', '.jsx', '.js'];
    for (let i = 0; i < EXTS.length;) {
      try {
        let fpath = fs.lstatSync(filename + EXTS[i]);
        if (fpath.isFile()) {
          ext = EXTS[i];
          filename = filename + EXTS[i];
          break;
        }
      } catch (e) {
        i++;
      }
    }
  }



  /**
   *  2.根据文件格式 使用不同的方式去加载
   *
   * */

  switch (ext) {
    case '.tsx':
    case '.ts':
    case '.jsx':
    case '.js': {

      return tsFileWalker(filename);

    }
    case '.less': {
      return lessFileWalker(filename);
    }
    default: return false;
  }

}



function tsFileWalker(filename) {

  if (MEMO.has(filename)) {
    return MEMO.get(filename);
  }
  MEMO.set(filename, false);


  let node = ts.createSourceFile(
    filename,
    fs.readFileSync(filename).toString(),
    ts.ScriptTarget.ES2015,
      /*setParentNodes */ true
  );

  let dirname = path.dirname(filename);
  let emit = false;//是否对这个文件生成*.ref.less文件
  let emitDepends = [];

  // &----初始化depends
  const depends = [];


  // &----填充depends
  tsNodeWalker(node);

  // &----使用depends
  depends.forEach((depModule, i) => {
    if (/\.less$/.test(depModule)) {
      //是依赖的less文件
      lessFileWalker(path.resolve(dirname, depModule));
      emit = true;
      emitDepends.push(depModule);
    } else if (/\.css$/.test(depModule)) {
      //依赖的是css文件直接复制
      copyFileToDist(path.resolve(dirname, depModule));
      emit = true;
      emitDepends.push(depModule);
    } else if (/\.(tsx?|jsx?)$/.test(depModule)) {
      //
      let _emit = tsFileWalker(path.resolve(dirname, depModule));
      if (_emit === true) {
        depModule = depends[i] = depModule.replace(/\.(tsx?|jsx?)$/, '.ref.less');
        emit = true;
        emitDepends.push(depModule);
      }
    } else if ('' === path.extname(depModule)) {
      //没有文件后缀，可能是文件夹/tsc?/jsx?格式
      try {
        let status = fs.lstatSync(path.resolve(dirname, depModule));
        if (status.isDirectory()) {
          depModule = depModule + '/' + 'index';
        }
      } catch (e) {
        //
        // console.log('ddd')
      }
      let ext;
      let EXTS = ['.tsx', '.ts', '.jsx', '.js'];
      for (let i = 0; i < EXTS.length;) {
        try {
          let fpath = fs.lstatSync(path.resolve(dirname, depModule) + EXTS[i]);
          if (fpath.isFile()) {
            ext = EXTS[i];
            depModule = depModule + EXTS[i];
            break;
          }
        } catch (e) {
          i++;
        }
      }

      switch (ext) {
        case '.tsx':
        case '.ts':
        case '.jsx':
        case '.js': {
          let _emit = tsFileWalker(path.resolve(dirname, depModule));
          if (_emit === true) {

            depModule = depends[i] = depModule.replace(/\.(tsx?|jsx?)$/, '.ref.less');
            emit = true;
            emitDepends.push(depModule);
          }
          break;
        }
        case '.less': {
          console.log('ooops');//eslint-disable-line
        }
      }
    }
  });

  // if (emitDepends.some(a => a.search(/\.(jsx?|tsx?)$/) > -1)) {
  //   debugger;
  // }

  // &----清理depends
  depends.length = 0;

  //判断是否生成ref格式的依赖文件。
  if (emit) {

    let refLessFileContent = emitDepends.map(dep => `@import "${dep}";`).join('\n');

    writeFileToDist(filename.replace(/\.(tsx?|jsx?)$/, '.ref.less'), refLessFileContent);
  }

  MEMO.set(filename, emit);
  //返回该节点是否有依赖的样式，true表示已经生成了对应的样式*.ref.less,false表示不生成
  return emit;
  //return

  function tsNodeWalker(node) {
    switch (node.kind) {
      case ts.SyntaxKind.ExportDeclaration:
      case ts.SyntaxKind.ImportDeclaration:
      case ts.SyntaxKind.ImportEqualsDeclaration: {

        if (node.moduleSpecifier) {

          let moduler = node.moduleSpecifier.text;

          if (/\.\.?\//.test(moduler)) {
            depends.push(moduler);
            // console.log(moduler);
          }
        }
      }
    }


    ts.forEachChild(node, tsNodeWalker);
  }
}

function lessFileWalker(filename) {

  if (MEMO.has(filename)) {
    return MEMO.get(filename);
  }
  MEMO.set(filename, true);

  let dirname = path.dirname(filename);

  let content;
  try {
    content = fs.readFileSync(filename);
  } catch (e) {
    // debugger;
  }
  let depends = [];
  //使用正则表达式匹配less文件的依赖
  let import_reg = /(\/\/\s*)?(\/\*\s*)?@import (\([^"]+\))?\s*['"]([^;]*)['"];/gi;
  let match = import_reg.exec(content);

  while (match) {

    if (!match[1] && !match[2]) {//排除注释掉的行
      let moduler = match[4];
      depends.push(moduler);
    }


    match = import_reg.exec(content);
  }

  //处理depends
  depends.forEach(dependency => {
    if (/\.css$/.test(dependency)) {
      copyFileToDist(path.resolve(dirname, dependency));
    } else {
      let ext = path.extname(dependency);
      if (!ext) {
        lessFileWalker(path.resolve(dirname, dependency) + '.less');
      } else {
        lessFileWalker(path.resolve(dirname, dependency));
      }
    }
  });
  MEMO.set(filename, true);
  copyFileToDist(filename);
  return true;
}

function copyFileToDist(filename) {
  let distFilename = filename.replace(ORIGIN_PATH_PREFIX, DIST_PATH_PREFIX);
  let dirname = path.dirname(distFilename);
  if (!fs.existsSync(dirname)) {
    mkdirp.sync(dirname);
  }

  fs.createReadStream(filename).pipe(fs.createWriteStream(distFilename));
}

function writeFileToDist(filename, content) {
  filename = filename.replace(ORIGIN_PATH_PREFIX, DIST_PATH_PREFIX);
  let dirname = path.dirname(filename);
  if (!fs.existsSync(dirname)) {
    mkdirp.sync(dirname);
  }
  fs.writeFileSync(filename, content);
}
