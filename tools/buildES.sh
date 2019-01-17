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

# es6 编译为 CommonJS
babel ./temp/ --out-dir ./lib/

# es6 语法编译为 es5
sed -i '' 's/\["@babel\/preset-env", { "modules": "auto" }\],/["@babel\/preset-env", { "modules": false }],/' .babelrc
babel ./temp/ --out-dir ./es/

# 清理、还原
rm -rf temp
sed -i '' 's/\["@babel\/preset-env", { "modules": false }\],/["@babel\/preset-env", { "modules": "auto" }],/' .babelrc
