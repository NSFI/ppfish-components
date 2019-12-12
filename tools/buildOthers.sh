#!/bin/bash
source_dir="source"
temp_dir="temp"
node_dir="node"
lib_dir="lib"
es_dir="es"

# 编译less为css，并且替换index.js中的less路径为css路径
compileLess() {
  sysOS=`uname -s`

  for file in `ls $1`       #注意此处这是两个反引号，表示运行系统命令
  do
      if [ -d $1"/"$file ]  #注意此处之间一定要加上空格，否则会报错
      then
          compileLess $1"/"$file
      else
          if [ "$file" = "index.less" ]  # 约定index.less作为入口文件
          then
              # echo $1"/"$file   #在此处处理文件即可
              newfile=`echo $1"/"$file | sed 's/.less/.css/g'`
              lessc $1"/"$file $newfile
          fi
          if [ "$file" = "index.js" ]  # 约定index.less作为入口文件
          then
              # echo $1"/"$file   #在此处处理文件即可
            if [ $sysOS == "Darwin" ];then
              sed -i "" "s/.*index\.less.*/\/\/ remove by compileLess/" $1"/"$file
            else
              sed -i "s/.*index\.less.*/\/\/ remove by compileLess/" $1"/"$file
            fi
          fi

      fi
  done
}

# 修改babelrc文件
setBabelModules() {
  sysOS=`uname -s`

  if [ $sysOS == "Darwin" ];then
    if [[ "$1" == "false" ]]; then
      sed -i "" "s/\"modules\": \"commonjs\"/\"modules\": false/" .babelrc
    else
      sed -i "" "s/\"modules\": false/\"modules\": \"commonjs\"/" .babelrc
    fi
  else
    if [[ "$1" == "false" ]]; then
      sed -i "s/\"modules\": \"commonjs\"/\"modules\": false/" .babelrc
    else
      sed -i "s/\"modules\": false/\"modules\": \"commonjs\"/" .babelrc
    fi
  fi
}

# 初始化打包文件夹
rm -rf $temp_dir
mkdir $temp_dir
rm -rf $node_dir
mkdir $node_dir
rm -rf $lib_dir
mkdir $lib_dir
rm -rf $es_dir
mkdir $es_dir

# typescript 编译为 es6
cd tools/compileTs/
node copy.js $source_dir $temp_dir
tsc --strict
node clean.js $temp_dir

node copy.js $temp_dir $lib_dir
node copy.js $temp_dir $es_dir
cd ../../

# CommonJS
babel "./$temp_dir/" --out-dir "./$lib_dir/"
node tools/compileTs/copy.js $lib_dir $node_dir
# less 编译为 css
compileLess $node_dir

# ES6
setBabelModules false
babel "./$temp_dir/" --out-dir "./$es_dir/"

# 清理、还原
rm -rf $temp_dir
setBabelModules commonjs
