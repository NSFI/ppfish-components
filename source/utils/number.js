/**
 * 千位分隔符
 * @param str
 * @param format
 * @returns {string}
 */
export const thousandSplit = (str, format = ',') => {
  if (typeof str !== 'number') return str;
  return ('' + str).replace(/(?!^)(?=([0-9]{3})+$)/g, `${format}`);
};

/**
 * 数字转化为km单位的字符串
 * @param num
 * @returns {string}
 */
export const radiusFormat = (num) => {
  if (typeof num !== 'number') return num;
  const k = 1000;
  if (Math.abs(num) < k) {
    return `${num}m`;
  }else{
    return Math.floor(num/1000*100)/100+'km';
  }
};

/**
 * 阿拉伯数字转换为简写汉字
 * @param Num
 * @returns {string}
 * @constructor
 */
export const Arabia_To_SimplifiedChinese = (Num) => {
  for (let i = Num.length - 1; i >= 0; i--) {
    Num = Num.replace(",", ""); //替换Num中的“,”
    Num = Num.replace(" ", ""); //替换Num中的空格
  }
  if (isNaN(Num)) { //验证输入的字符是否为数字
    //alert("请检查小写金额是否正确");
    return;
  }
  //字符处理完毕后开始转换，采用前后两部分分别转换
  let part = String(Num).split(".");
  let newchar = "";
  //小数点前进行转化
  for (let i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      //alert("位数过大，无法计算");
      return "";
    }//若数量超过拾亿单位，提示
    let tmpnewchar = "";
    let perchar = part[0].charAt(i);
    switch (perchar) {
      case "0":  tmpnewchar = "零" + tmpnewchar;break;
      case "1": tmpnewchar = "一" + tmpnewchar; break;
      case "2": tmpnewchar = "二" + tmpnewchar; break;
      case "3": tmpnewchar = "三" + tmpnewchar; break;
      case "4": tmpnewchar = "四" + tmpnewchar; break;
      case "5": tmpnewchar = "五" + tmpnewchar; break;
      case "6": tmpnewchar = "六" + tmpnewchar; break;
      case "7": tmpnewchar = "七" + tmpnewchar; break;
      case "8": tmpnewchar = "八" + tmpnewchar; break;
      case "9": tmpnewchar = "九" + tmpnewchar; break;
    }
    switch (part[0].length - i - 1) {
      case 0: break;
      case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
      case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
      case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
      case 4: tmpnewchar = tmpnewchar + "万"; break;
      case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
      case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
      case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
      case 8: tmpnewchar = tmpnewchar + "亿"; break;
      case 9: tmpnewchar = tmpnewchar + "十"; break;
    }
    newchar = tmpnewchar + newchar;
  }
  //替换所有无用汉字，直到没有此类无用的数字为止
  while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零零", "零");
  }
  //替换以“一十”开头的，为“十”
  if (newchar.indexOf("一十") == 0) {
    newchar = newchar.substr(1);
  }
  //替换以“零”结尾的，为“”
  if (newchar.lastIndexOf("零") == newchar.length - 1) {
    newchar = newchar.substr(0, newchar.length - 1);
  }
  return newchar;
};

/**
 * 将字节数转化为不同单位的容量
 * @param bytes
 * @returns {string}
 */
export const bytesToSize = (bytes) => {
  if (bytes === 0) return '0 B';
  let k = 1024,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = (bytes / Math.pow(k, i));
  if (Number.isNaN(size)) {
    return '未知';
  } else {
    return `${size.toPrecision(3)} ${sizes[i]}`;
  }
};
