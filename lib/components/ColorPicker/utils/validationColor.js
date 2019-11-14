"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validationColor;

function validationColor(props, propName, componentName) {
  if (props[propName] && !/^#[0-9a-fA-F]{3,6}$/.test(props[propName])) {
    return new Error("".concat(componentName, ".props.").concat(propName, " Validation failed!"));
  }
}