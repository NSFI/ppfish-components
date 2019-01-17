/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const esType = process.argv[process.argv.length-1].trim();
let pathSep = '/';
if (process.platform === "win32") {
  pathSep = '\\';
}

function del(p) {
  let arr = fs.readdirSync(p);
  for (let i in arr) {
    let fullPath = path.join(p, arr[i]);
    //读取文件信息，以便于判断是否是一个文件或目录
    let stats = fs.statSync(fullPath);
    let ext = path.extname(fullPath);
    let isInvaildFile = (esType === 'lib' && ext === '.jsx') ||
                        (esType === 'temp' && (ext === '.tsx' || ext === '.ts'));

    if (stats.isFile()) {
      if (isInvaildFile) {
        fs.unlinkSync(fullPath);
      }
    } else {
      del(fullPath);
    }
  }
}
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let stats = fs.statSync(filedir);
        let isFile = stats.isFile();//是文件
        let isDir = stats.isDirectory();//是文件夹
        let ext = path.extname(filedir);
        if (isFile) {
          if ((esType === 'lib' && ext === '.js') || (esType === 'temp' && (ext === '.js' || ext === '.jsx'))) {
            fs.readFile(filedir, 'utf-8', function (err, data) {
              if (err) {
                console.log(err);
              }
              let newData = data.replace(esType === 'lib' ? /.jsx/g : /.tsx/g, '.js');
              fs.writeFile(filedir, newData, 'utf-8', function (err) {
                if (err) {
                  console.log(err);
                }
              });
            });
          }
        }
        if (isDir) {
          let dirArr = filedir.split(pathSep);
          if (dirArr[dirArr.length - 1] === '__tests__') {
            delTest(filedir);
          } else {
            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
          }
        }
      });
    }
  });
}
function delTest(dirPath) {
  let files = fs.readdirSync(dirPath);
  files.forEach(function (file) {
    let curPath = path.join(dirPath, file);
    if (fs.statSync(curPath).isDirectory()) {
      delTest(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(dirPath);
}
del(path.resolve(__dirname, '..', '..', esType));
fileDisplay(path.resolve(__dirname, '..', '..', esType));
