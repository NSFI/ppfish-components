"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Option =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Option, _React$Component);

  function Option(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onOptionClick", function (e, option) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onOptionClick = _this$props.onOptionClick;

      if (!disabled) {
        onOptionClick && onOptionClick(e, option);
      }
    });

    return _this;
  }

  var _proto = Option.prototype;

  _proto.render = function render() {
    var _classNames,
        _classNames2,
        _classNames3,
        _classNames4,
        _classNames5,
        _this2 = this;

    var _this$props2 = this.props,
        title = _this$props2.title,
        children = _this$props2.children,
        activeKey = _this$props2.activeKey,
        showOptionCheckedIcon = _this$props2.showOptionCheckedIcon,
        value = _this$props2.value,
        disabled = _this$props2.disabled,
        checked = _this$props2.checked,
        prefixCls = _this$props2.prefixCls;
    var label = children && children.length === 1 ? children[0] : children;
    var optionCls = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls + "-item"] = true, _classNames), (_classNames2 = {}, _classNames2["checked"] = !!checked, _classNames2), (_classNames3 = {}, _classNames3["checked-icon"] = !!checked && showOptionCheckedIcon, _classNames3), (_classNames4 = {}, _classNames4["active"] = 'activeKey' in this.props && activeKey === value, _classNames4), (_classNames5 = {}, _classNames5[prefixCls + "-item-disabled"] = !!disabled, _classNames5));
    return _react.default.createElement("li", {
      title: title,
      className: optionCls,
      onClick: function onClick(e) {
        return _this2.onOptionClick(e, {
          label: label,
          title: title,
          key: value
        });
      }
    }, children);
  };

  return Option;
}(_react.default.Component);

exports.default = Option;

_defineProperty(Option, "isSelectOption", true);

_defineProperty(Option, "propTypes", {
  activeKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  checked: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  children: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  onOptionClick: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  showOptionCheckedIcon: _propTypes.default.bool,
  title: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.node])
});

_defineProperty(Option, "defaultProps", {
  prefixCls: 'fishd-select-dropdown-option',
  showOptionCheckedIcon: true
});