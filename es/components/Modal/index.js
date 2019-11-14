var __assign = this && this.__assign || function () {
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

import Modal from './Modal';
import confirm from './confirm';

Modal.info = function (props) {
  var config = __assign({
    type: 'info',
    iconType: 'hints-notification',
    okCancel: false
  }, props);

  return confirm(config);
};

Modal.success = function (props) {
  var config = __assign({
    type: 'success',
    iconType: 'hints-success',
    okCancel: false
  }, props);

  return confirm(config);
};

Modal.error = function (props) {
  var config = __assign({
    type: 'error',
    iconType: 'hints-error',
    okCancel: false
  }, props);

  return confirm(config);
};

Modal.warning = Modal.warn = function (props) {
  var config = __assign({
    type: 'warning',
    iconType: 'hints-warning',
    okCancel: false
  }, props);

  return confirm(config);
};

Modal.confirm = function (props) {
  var config = __assign({
    type: 'confirm',
    okCancel: true
  }, props);

  return confirm(config);
};

export default Modal;