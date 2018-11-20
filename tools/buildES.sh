#!/bin/bash
rm -rf es
mkdir es
cd tools/es6Tools/
node copyTS.js
tsc --strict
node compileTS.js
