/* eslint-disable no-console */
import differenceInSeconds from 'date-fns/difference_in_seconds';
import format from 'date-fns/format';
import classNames from 'classnames';

const noop = () => {
};
export const getTimeBarStr = (timestamp) => {
  let diffTime = differenceInSeconds(timestamp, new Date());
  // 超过一年
  if (diffTime > 365 * 24 * 60 * 60) {
    return format(timestamp, 'YYYY-MM-DD HH:mm:ss');
    // 超过一天
  } else if (diffTime > 24 * 60 * 60) {
    return format(timestamp, 'MM-DD HH:mm:ss');
    // 超过一分钟
  } else if (diffTime > 60) {
    return format(timestamp, 'HH:mm:ss');
  } else {
    return '刚刚';
  }
};

/**
 * 时间戳转换
 * @param timestamp 时间戳
 * @param showSecond 秒
 * @returns {string}
 */
export const getTimeStamp = (timestamp, showSecond = false) => {
  //当日
  const today = new Date().setHours(0, 0, 0, 0);
  const diffTime = timestamp - today;

  //当年
  const toYear = new Date(`${new Date().getFullYear()}-01-01`).setHours(0, 0, 0, 0);
  const diffDate = timestamp - toYear;

  const oneDay = 24 * 60 * 60 * 1000;

  // 今天
  if (timestamp >= today && Math.abs(diffTime) <= oneDay) {
    return `今天 ${format(timestamp, `HH:mm${showSecond ? ':ss' : ''}`)}`;
    // 昨天
  } else if (timestamp < today && Math.abs(diffTime) <= oneDay) {
    return `昨天 ${format(timestamp, `HH:mm${showSecond ? ':ss' : ''}`)}`;
    // 今年
  } else if (timestamp >= toYear && Math.abs(diffDate) <= oneDay * 365) {
    return format(timestamp, `MM-DD HH:mm${showSecond ? ':ss' : ''}`);
    // 其余
  } else {
    return format(timestamp, `YYYY-MM-DD HH:mm${showSecond ? ':ss' : ''}`);
  }
};

// 获取动态classNames
export const getDynamicCls = (clsArr, addCls, condition) => {
  let clsObj = {};
  if (typeof clsArr == 'string') {
    clsArr = [clsArr];
  }
  clsArr.forEach((item) => {
    clsObj[item] = true;
  });
  if (addCls && condition()) {
    clsObj[addCls] = true;
  }
  return classNames(clsObj);
};

/***
 * 将时间转换为时间段，返回[开始时间，结束时间]的时间戳列表
 * 当传入参数为数字N，代表从过去N天到现在的时间段
 * 当传入参数为日期范围字符2017/10/04 ~ 2017/11/10，代表 开始时间 ~ 结束时间
 * 时间戳单位 秒（s）
 ***/
export const formatTimestamp = (N) => {
  let starttime = 0;
  let endtime = 0;
  //当传入参数为数字N
  if (Number.isInteger(N)) {
    //开始时间为N天前的00：00：00
    starttime = Date.parse(new Date(new Date(new Date().setDate(new Date().getDate()-N)).setHours(0,0,0,0)));
    //结束时间为昨天的23:59:59
    endtime = Date.parse(new Date(new Date().setHours(0,0,0,0))) - 1;
  } else if (Object.prototype.toString.call(N) === "[object String]") {
    let arr = N.split('~');
    if (arr && arr.length === 2) {
      starttime = Date.parse(new Date(arr[0]));
      endtime = Date.parse(new Date(arr[1])) + 86400000 - 1;
    }
  }
  return [starttime, endtime];
};

//由时间戳转为显示的日期
export const getTimeFromTimestamp = (startTime, endTime) => {
  if(!startTime || !endTime){
    return null;
  }else{
    return new Date(parseInt(startTime)).toLocaleDateString() + ' ~ ' + new Date(parseInt(endTime)).toLocaleDateString();
  }
};
