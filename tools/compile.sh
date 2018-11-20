#!/bin/bash

rm -rf es6
mkdir es6
rm -rf es5
mkdir es5

# 将 typescript 编译为 es6
cd tools/compileTs/
node copySrc.js es6
tsc --strict
node clean.js es6
cd ../../

# 将 es6 编译为 es5
babel ./es6/ --out-dir ./es5/
