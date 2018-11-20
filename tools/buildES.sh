#!/bin/bash

rm -rf es
mkdir es
rm -rf lib
mkdir lib

# 将 typescript 编译为 es6
cd tools/compileTs/
node copy.js es
tsc --strict
node clean.js es

# 将 es6 编译为 CommonJS 代码
node copy.js lib
cd ../../
babel ./es/ --out-dir ./lib/
