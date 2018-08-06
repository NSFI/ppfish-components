import format from './format';
import defaultLang from './lang/zh-CN';

let _lang = defaultLang;

function use(lang) {
  _lang = lang;
}

function t(path, options) {
  const array = path.split('.');
  let current = _lang;

  for (let i = 0, j = array.length; i < j; i++) {
    let property = array[i];
    let value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
}

export default {
  use,
  t
};
