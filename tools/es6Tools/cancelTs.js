
const fs = require('fs');
// var pfs = fs.promises;
const path = require('path');
/* eslint-disable no-console */
function del(p) {
  let arr = fs.readdirSync(p);
  for (let i in arr) {
    //读取文件信息，以便于判断是否是一个文件或目录
    let stats = fs.statSync(p + '/' + arr[i]);
    let ext = path.extname(p + '/' + arr[i]);

    if (stats.isFile()) {
      if (ext === '.tsx' || ext === '.ts') {
        //判断为真，是文件.tsx则执行删除文件
        fs.unlinkSync(p + '/' + arr[i]);
      }
    } else {
      //判断为假就是文件夹，就调用自己，递归的入口
      del(p + '/' + arr[i]);
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
          if (ext === '.js' || ext === '.jsx') {
            fs.readFile(filedir, 'utf-8', function (err, data) {
              if (err) {
                console.log(err);
              }
              let newData = data.replace(/.tsx/g, '.js');
              fs.writeFile(filedir, newData, 'utf-8', function (err) {
                if (err) {
                  console.log(err);
                }
              });
            });
          }
        }
        if (isDir) {
          let dirArr = filedir.split('/');
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
function delTest(path) {
  let files = fs.readdirSync(path);
  files.forEach(function (file) {
    let curPath = path + "/" + file;
    if (fs.statSync(curPath).isDirectory()) { // recurse
      delTest(curPath);
    } else { // delete file
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(path);
}
del(path.resolve(__dirname, '../../es6'));
fileDisplay(path.resolve(__dirname, '../../es6'));