"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _Modal = _interopRequireDefault(require("./Modal"));

var _confirm = _interopRequireDefault(require("./confirm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

_Modal.default.info = function (props) {
  var config = __assign({
    type: 'info',
    iconType: 'hints-notification',
    okCancel: false
  }, props);

  return (0, _confirm.default)(config);
};

_Modal.default.success = function (props) {
  var config = __assign({
    type: 'success',
    iconType: 'hints-success',
    okCancel: false
  }, props);

  return (0, _confirm.default)(config);
};

_Modal.default.error = function (props) {
  var config = __assign({
    type: 'error',
    iconType: 'hints-error',
    okCancel: false
  }, props);

  return (0, _confirm.default)(config);
};

_Modal.default.warning = _Modal.default.warn = function (props) {
  var config = __assign({
    type: 'warning',
    iconType: 'hints-warning',
    okCancel: false
  }, props);

  return (0, _confirm.default)(config);
};

_Modal.default.confirm = function (props) {
  var config = __assign({
    type: 'confirm',
    okCancel: true
  }, props);

  return (0, _confirm.default)(config);
};

var _default = _Modal.default;
exports.default = _default;