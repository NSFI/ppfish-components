import fs from 'fs';

export const parseDir = (dir, collector) => {
  fs.readdirSync(dir).forEach(function (file) {
    collector.push(file);
  });
};

export const getReplParams = (key) => {
  let argvStr = process.argv.slice(-1);
  const regx = new RegExp(`--${key}=([\\w\\-]+)`, 'i');
  if ( argvStr && argvStr[0] ) {
    argvStr = argvStr[0];
  }
  if ( regx.test(argvStr) ) {
    return RegExp.$1.split(',');
  } else {
    return null;
  }
};
