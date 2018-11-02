/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, '../../es6');
const PER = '0777';
const copy = function (src, dst) {
	//判断文件需要时间，则必须同步
	if (fs.existsSync(src)) {
		fs.readdir(src, function (err, files) {
			if (err) { console.log(err); return; }
			files.forEach(function (filename) {
				//url+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
				let url = path.join(src, filename),
					dest = path.join(dst, filename);
				fs.stat(path.join(src, filename), function (err, stats) {
					if (err) throw err;
					//是文件
					if (stats.isFile()) {
						//创建读取流
						let readable = fs.createReadStream(url);
						//创建写入流
						let writable = fs.createWriteStream(dest, { encoding: "utf8" });
						// 通过管道来传输流
						readable.pipe(writable);
						//如果是目录
					} else if (stats.isDirectory()) {
						exists(url, dest, copy);
					}
				});
			});
		});
	} else {
		console.log("给定的目录不存在，读取不到文件");
		return;
	}
};

function exists(url, dest, callback) {
	fs.exists(dest, function (exists) {
		if (exists) {
			callback && callback(url, dest);
		} else {
			//第二个参数目录权限 ，默认0777(读写权限)
			fs.mkdir(dest, PER, function (err) {
				if (err) throw err;
				callback && callback(url, dest);
			});
		}
	});
}
exports.copy = copy;
copy("./source", filePath);