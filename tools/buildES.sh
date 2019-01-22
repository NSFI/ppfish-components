#!/bin/bash

rm -rf temp
mkdir temp
rm -rf es
mkdir es
rm -rf lib
mkdir lib

# typescript 编译为 es6
cd tools/compileTs/
node copy.js temp
tsc --strict
node clean.js temp

node copy.js es
node copy.js lib
cd ../../

setBabelModules() {
  sysOS=`uname -s`

  if [ $sysOS == "Darwin" ];then
    if [[ "$1" == "false" ]]; then
      sed -i "" "s/\"modules\": \"commonjs\"/\"modules\": false/" .babelrc
    else
      sed -i "" "s/\"modules\": false/\"modules\": \"commonjs\"/" .babelrc
    fi
  else
    if [[ "$1" == "false" ]]; then
      sed -i "s/\"modules\": \"commonjs\"/\"modules\": false/" .babelrc
    else
      sed -i "s/\"modules\": false/\"modules\": \"commonjs\"/" .babelrc
    fi
  fi
}

# CommonJS
babel ./temp/ --out-dir ./lib/

# ES6
setBabelModules false
babel ./temp/ --out-dir ./es/

# 清理、还原
rm -rf temp
setBabelModules commonjs
