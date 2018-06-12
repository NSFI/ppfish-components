#!/bin/bash
gitbook init
gitbook build

for i in "$*"
do
  if [ "$i" == "push" ]
  then
    echo "Start publish to gh-pages, please wait...";
    gh-pages -d _book
  fi
done
