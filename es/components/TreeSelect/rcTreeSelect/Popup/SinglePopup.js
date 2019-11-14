function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import BasePopup from '../Base/BasePopup';
import SearchInput from '../SearchInput';
import { createRef } from '../util';

var SinglePopup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SinglePopup, _React$Component);

  function SinglePopup() {
    var _this;

    _classCallCheck(this, SinglePopup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SinglePopup).call(this));

    _defineProperty(_assertThisInitialized(_this), "onPlaceholderClick", function () {
      _this.inputRef.current.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "renderPlaceholder", function () {
      var _this$props = _this.props,
          searchPlaceholder = _this$props.searchPlaceholder,
          searchValue = _this$props.searchValue,
          prefixCls = _this$props.prefixCls;

      if (!searchPlaceholder) {
        return null;
      }

      return React.createElement("span", {
        style: {
          display: searchValue ? 'none' : 'block'
        },
        onClick: _this.onPlaceholderClick,
        className: "".concat(prefixCls, "-search__field__placeholder")
      }, searchPlaceholder);
    });

    _defineProperty(_assertThisInitialized(_this), "renderSearch", function () {
      var _this$props2 = _this.props,
          showSearch = _this$props2.showSearch,
          dropdownPrefixCls = _this$props2.dropdownPrefixCls;

      if (!showSearch) {
        return null;
      }

      return React.createElement("span", {
        className: "".concat(dropdownPrefixCls, "-search")
      }, React.createElement(SearchInput, _extends({}, _this.props, {
        ref: _this.inputRef,
        renderPlaceholder: _this.renderPlaceholder
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "renderResetItem", function () {
      var _this$props3 = _this.props,
          dropdownPrefixCls = _this$props3.dropdownPrefixCls,
          treeNodeResetTitle = _this$props3.treeNodeResetTitle,
          resetSelect = _this$props3.resetSelect;
      return React.createElement("span", {
        className: "".concat(dropdownPrefixCls, "-reset"),
        onClick: resetSelect
      }, treeNodeResetTitle);
    });

    _this.inputRef = createRef();
    return _this;
  }

  _createClass(SinglePopup, [{
    key: "render",
    value: function render() {
      var required = this.props.required;
      return React.createElement(BasePopup, _extends({}, this.props, {
        renderSearch: this.renderSearch,
        renderResetItem: required ? null : this.renderResetItem
      }));
    }
  }]);

  return SinglePopup;
}(React.Component);

_defineProperty(SinglePopup, "propTypes", _objectSpread({}, BasePopup.propTypes, {
  searchValue: PropTypes.string,
  showSearch: PropTypes.bool,
  dropdownPrefixCls: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  treeNodeResetTitle: PropTypes.string,
  resetSelect: PropTypes.func
}));

export default SinglePopup;