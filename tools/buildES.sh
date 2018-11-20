#!/bin/bash
rm -rf es
mkdir es
cd tools/compileTs/
node copyTS.js
tsc --strict
node compileTS.js
