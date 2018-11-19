/* eslint-disable global-require */
require('./polyfills/MutationObserver.js')(global);
require('./polyfills/getSelection.js')(global);

if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };
  global.window.scrollTo = () => {};
}

// The built-in requestAnimationFrame and cancelAnimationFrame not working with jest.runFakeTimes()
// https://github.com/facebook/jest/issues/5147
global.requestAnimationFrame = function (cb) {
  return setTimeout(cb, 0);
};
global.cancelAnimationFrame = function (cb) {
  return clearTimeout(cb, 0);
};

const Enzyme = require('enzyme');
let Adapter = require('enzyme-adapter-react-16');
// enzyme-adapter-react-16@1.1.0不支持React.ForwardRef，详情：https://github.com/airbnb/enzyme/issues/1604
// 在ReactSixteenAdapter.js中部分修改了enzyme-adapter-react-16的源码支持ForwardRef
// 如果后续enzyme-adapter-react-16更新了，可以干掉ReactSixteenAdapter.js
// let Adapter = require('./polyfills/ReactSixteenAdapter');
Enzyme.configure({ adapter: new Adapter() });
