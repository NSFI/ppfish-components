#!/bin/bash

# set ORIGIN to current git origin
ORIGIN=$(git remote -v | awk '$1=="origin" && $3=="(push)" {print $2}');
# get current version
VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g');

# target folder: /dist/site, make it clean and step into
rm -fr dist
mkdir dist
cd dist

# init an empty git repo, checkout branch gh-pages
git clone -b gh-pages --depth 1 $ORIGIN site

# remove all existed files in the repo, run the site build script
cd site
rm -rf *
npm run build:site

# commit and push to gh-pages
git add . -A
git commit -m "$VERSION publish!"
git push origin gh-pages
