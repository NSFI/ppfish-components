"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("../Input/index.js"));

var _index2 = _interopRequireDefault(require("../Icon/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectSearch =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SelectSearch, _React$Component);

  function SelectSearch(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = SelectSearch.prototype;

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        allowClear = _this$props.allowClear,
        emitEmpty = _this$props.emitEmpty,
        prefixCls = _this$props.prefixCls,
        searchInputProps = _this$props.searchInputProps,
        searchPlaceholder = _this$props.searchPlaceholder,
        searchValue = _this$props.searchValue,
        updateSearchValue = _this$props.updateSearchValue;

    var suffix = searchValue && allowClear && _react.default.createElement(_index2.default, {
      type: "close-circle-fill",
      className: prefixCls + "-clear",
      onClick: emitEmpty
    });

    return _react.default.createElement("div", {
      className: prefixCls
    }, _react.default.createElement(_index.default, _extends({
      placeholder: searchPlaceholder,
      ref: function ref(searchInput) {
        return _this.searchInput = searchInput;
      },
      value: searchValue,
      onChange: updateSearchValue,
      suffix: suffix
    }, searchInputProps)));
  };

  return SelectSearch;
}(_react.default.Component);

exports.default = SelectSearch;

_defineProperty(SelectSearch, "propTypes", {
  allowClear: _propTypes.default.bool,
  emitEmpty: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  searchInputProps: _propTypes.default.object,
  searchPlaceholder: _propTypes.default.string,
  searchValue: _propTypes.default.string,
  updateSearchValue: _propTypes.default.func
});