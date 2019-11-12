"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _PureRenderMixin = _interopRequireDefault(require("./PureRenderMixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Checkbox =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Checkbox, _React$Component);

  Checkbox.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    if ('checked' in nextProps) {
      return {
        checked: nextProps.checked
      };
    }

    return null;
  };

  function Checkbox(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      if (props.disabled) {
        return;
      }

      if (!('checked' in props)) {
        _this.setState({
          checked: e.target.checked
        });
      }

      props.onChange({
        target: Object.assign({}, props, {
          checked: e.target.checked
        }),
        stopPropagation: function stopPropagation() {
          e.stopPropagation();
        },
        preventDefault: function preventDefault() {
          e.preventDefault();
        },
        nativeEvent: e.nativeEvent
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveInput", function (node) {
      _this.input = node;
    });

    var checked = 'checked' in _props ? _props.checked : _props.defaultChecked;
    _this.state = {
      checked: checked
    };
    return _this;
  }

  var _proto = Checkbox.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _PureRenderMixin.default.shouldComponentUpdate.apply(this, args);
  };

  _proto.focus = function focus() {
    this.input.focus();
  };

  _proto.blur = function blur() {
    this.input.blur();
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        className = _this$props.className,
        style = _this$props.style,
        name = _this$props.name,
        id = _this$props.id,
        type = _this$props.type,
        disabled = _this$props.disabled,
        readOnly = _this$props.readOnly,
        tabIndex = _this$props.tabIndex,
        onClick = _this$props.onClick,
        onFocus = _this$props.onFocus,
        onBlur = _this$props.onBlur,
        autoFocus = _this$props.autoFocus,
        value = _this$props.value,
        otherprops = _objectWithoutPropertiesLoose(_this$props, ["prefixCls", "className", "style", "name", "id", "type", "disabled", "readOnly", "tabIndex", "onClick", "onFocus", "onBlur", "autoFocus", "value"]);

    var globalProps = Object.keys(otherprops).reduce(function (prev, key) {
      if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
        prev[key] = otherprops[key];
      }

      return prev;
    }, {});
    var checked = this.state.checked;
    var classString = (0, _classnames.default)(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-checked"] = checked, _classNames[prefixCls + "-disabled"] = disabled, _classNames));
    return _react.default.createElement("span", {
      className: classString,
      style: style
    }, _react.default.createElement("input", _extends({
      name: name,
      id: id,
      type: type,
      readOnly: readOnly,
      disabled: disabled,
      tabIndex: tabIndex,
      className: prefixCls + "-input",
      checked: !!checked,
      onClick: onClick,
      onFocus: onFocus,
      onBlur: onBlur,
      onChange: this.handleChange,
      autoFocus: autoFocus,
      ref: this.saveInput,
      value: value
    }, globalProps)), _react.default.createElement("span", {
      className: prefixCls + "-inner"
    }));
  };

  return Checkbox;
}(_react.default.Component);

_defineProperty(Checkbox, "propTypes", {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  name: _propTypes.default.string,
  id: _propTypes.default.string,
  type: _propTypes.default.string,
  defaultChecked: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.bool]),
  checked: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.bool]),
  disabled: _propTypes.default.bool,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onClick: _propTypes.default.func,
  tabIndex: _propTypes.default.string,
  readOnly: _propTypes.default.bool,
  autoFocus: _propTypes.default.bool,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array, _propTypes.default.number, _propTypes.default.bool])
});

_defineProperty(Checkbox, "defaultProps", {
  prefixCls: 'rc-checkbox',
  className: '',
  style: {},
  type: 'checkbox',
  defaultChecked: false,
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {}
});

(0, _reactLifecyclesCompat.polyfill)(Checkbox);
var _default = Checkbox;
exports.default = _default;