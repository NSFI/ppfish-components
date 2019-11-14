function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/index.js';
import Icon from '../Icon/index.js';

var SelectSearch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectSearch, _React$Component);

  function SelectSearch(props) {
    _classCallCheck(this, SelectSearch);

    return _possibleConstructorReturn(this, _getPrototypeOf(SelectSearch).call(this, props));
  }

  _createClass(SelectSearch, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          allowClear = _this$props.allowClear,
          emitEmpty = _this$props.emitEmpty,
          prefixCls = _this$props.prefixCls,
          searchInputProps = _this$props.searchInputProps,
          searchPlaceholder = _this$props.searchPlaceholder,
          searchValue = _this$props.searchValue,
          updateSearchValue = _this$props.updateSearchValue;
      var suffix = searchValue && allowClear && React.createElement(Icon, {
        type: "close-circle-fill",
        className: "".concat(prefixCls, "-clear"),
        onClick: emitEmpty
      });
      return React.createElement("div", {
        className: prefixCls
      }, React.createElement(Input, _extends({
        placeholder: searchPlaceholder,
        ref: function ref(searchInput) {
          return _this.searchInput = searchInput;
        },
        value: searchValue,
        onChange: updateSearchValue,
        suffix: suffix
      }, searchInputProps)));
    }
  }]);

  return SelectSearch;
}(React.Component);

_defineProperty(SelectSearch, "propTypes", {
  allowClear: PropTypes.bool,
  emitEmpty: PropTypes.func,
  prefixCls: PropTypes.string,
  searchInputProps: PropTypes.object,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  updateSearchValue: PropTypes.func
});

export { SelectSearch as default };