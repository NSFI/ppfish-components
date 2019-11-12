"use strict";

exports.__esModule = true;
exports.require_condition = require_condition;

var _errors = require("./errors");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ErrorConditionFailed =
/*#__PURE__*/
function (_ExtendableError) {
  _inheritsLoose(ErrorConditionFailed, _ExtendableError);

  function ErrorConditionFailed() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ExtendableError.call(this, args) || this;
  }

  return ErrorConditionFailed;
}(_errors.ExtendableError);

function require_condition(condition, msg) {
  if (msg === void 0) {
    msg = 'pre-condition failed';
  }

  if (!condition) {
    throw new ErrorConditionFailed(msg);
  }
}