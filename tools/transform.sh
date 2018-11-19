#!/bin/bash

rm -fr es6

mkdir es6

rm -fr es5

mkdir es5

cd tools/transFormEsTools/

npm run es6:copyFileToEs6

tsc --strict

npm run es6:cleanFolder

npm run es5:copyFileToEs5

cp ./.babelrc ../../es5/

babel ../../es5/ --out-dir ../../es5/ --presets=es2015,react,stage-1

rm -rf ../../es5/.babelrc

npm run es5:cleanFolder