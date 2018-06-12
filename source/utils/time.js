/* eslint-disable no-console */
import differenceInSeconds from 'date-fns/difference_in_seconds';
import format from 'date-fns/format';
import classNames from 'classnames';

const noop = () => {
};
/**
 * 时间戳字符串转换
 * @method getTimeBarStr
 * @param {number} timestamp - 时间戳
 * @returns {string} - 特定规则的时间显示
 */
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
 * @method getTimeStamp
 * @param {number} timestamp 时间戳
 * @param {number} showSecond 秒
 * @returns {string} - 特定规则的时间显示
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

/**
 * 将时间转换为时间段
 * @method formatTimestamp
 * @param {number|string|object} param - 当传入参数为数字N，代表从过去N天到 endDate 23：59：59 的时间段,当传入参数为日期范围字符2017/10/04 ~ 2017/11/10，代表 开始时间 ~ 结束时间
 * @returns {array| * } - [开始时间，结束时间]
 */
export const formatTimestamp = (param) => {
  let startTime = 0;
  let endTime = 0;
  if (Object.prototype.toString.call(param) === "[object Object]") {
    if ("value" in param && "endDate" in param) {
      const N = param.value;
      const endDate = param.endDate;
      // 今天的23:59:59
      const today = new Date().setHours(23, 59, 59, 999);
      // 昨天的23:59:59
      const yesterday = new Date().setHours(0, 0, 0, 0) - 1;
      // 前天的23:59:59
      const beforeYesterday = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0) - 1;
      if (endDate === '前天') {
        startTime = new Date(new Date().setDate(new Date().getDate() - N - 1)).setHours(0, 0, 0, 0);
        endTime = beforeYesterday;
      } else if (endDate === '今天') {
        startTime = new Date(new Date().setDate(new Date().getDate() - N + 1)).setHours(0, 0, 0, 0);
        endTime = today;
      } else if (endDate === '昨天') {
        startTime = new Date(new Date().setDate(new Date().getDate() - N)).setHours(0, 0, 0, 0);
        endTime = yesterday;
      }
    }
  } else if (Object.prototype.toString.call(param) === "[object String]") {
    let arr = param.split('~');
    if (arr && arr.length === 2) {
      startTime = new Date(arr[0]).setHours(0, 0, 0, 0);
      endTime = new Date(arr[1]).setHours(23, 59, 59, 999);
    }
  }
  return [startTime, endTime];
};

/**
 * 由时间戳转为显示的日期
 * @method getTimeFromTimestamp
 * @param {number} startTime 开始时间
 * @param {number} endTime 终止时间
 * @returns {string | *} - 日期
 */
export const getTimeFromTimestamp = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return null;
  } else {
    return new Date(parseInt(startTime)).toLocaleDateString() + ' ~ ' + new Date(parseInt(endTime)).toLocaleDateString();
  }
};
