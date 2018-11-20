#!/bin/bash

rm -rf es6
mkdir es6
rm -rf es5
mkdir es5

# 将 typescript 编译为 es6
cd tools/compileTs/
node copy.js es6
tsc --strict
node clean.js es6

# 将 es6 编译为 es5
node copy.js es5
cd ../../
babel ./es6/ --out-dir ./es5/
