"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFormField = isFormField;
exports["default"] = createFormField;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = function Field(fields) {
  _classCallCheck(this, Field);

  Object.assign(this, fields);
};

function isFormField(obj) {
  return obj instanceof Field;
}

function createFormField(field) {
  if (isFormField(field)) {
    return field;
  }

  return new Field(field);
}