#!/bin/bash

rm -fr es6
mkdir es6
rm -fr es5
mkdir es5

cd tools/compileTs/

# 将 typescript 编译为 es6
npm run es:copySrc es6
tsc --strict
npm run es:clean es6

# 将 es6 编译为 es5
npm run es:copySrc es5
cp ./.babelrc ../../es5/
babel ../../es5/ --out-dir ../../es5/ --presets=es2015,react,stage-1
rm -rf ../../es5/.babelrc
npm run es:clean es5
