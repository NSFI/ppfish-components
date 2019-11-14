"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var formShape = _propTypes["default"].shape({
  getFieldsValue: _propTypes["default"].func,
  getFieldValue: _propTypes["default"].func,
  getFieldInstance: _propTypes["default"].func,
  setFieldsValue: _propTypes["default"].func,
  setFields: _propTypes["default"].func,
  setFieldsInitialValue: _propTypes["default"].func,
  getFieldDecorator: _propTypes["default"].func,
  getFieldProps: _propTypes["default"].func,
  getFieldsError: _propTypes["default"].func,
  getFieldError: _propTypes["default"].func,
  isFieldValidating: _propTypes["default"].func,
  isFieldsValidating: _propTypes["default"].func,
  isFieldsTouched: _propTypes["default"].func,
  isFieldTouched: _propTypes["default"].func,
  isSubmitting: _propTypes["default"].func,
  submit: _propTypes["default"].func,
  validateFields: _propTypes["default"].func,
  resetFields: _propTypes["default"].func
});

var _default = formShape;
exports["default"] = _default;