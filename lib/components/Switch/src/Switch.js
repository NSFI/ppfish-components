"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

var Switch =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Switch, _Component);

  Switch.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    var newState = {};
    var checked = nextProps.checked;

    if ('checked' in nextProps) {
      newState.checked = !!checked;
    }

    return newState;
  };

  function Switch(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "toggle", function () {
      var onClick = _this.props.onClick;
      var checked = !_this.state.checked;

      _this.setChecked(checked);

      onClick(checked);
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      if (e.keyCode === 37) {
        // Left
        _this.setChecked(false);
      } else if (e.keyCode === 39) {
        // Right
        _this.setChecked(true);
      } else if (e.keyCode === 32 || e.keyCode === 13) {
        // Space, Enter
        _this.toggle();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function (e) {
      if (_this.node) {
        _this.node.blur();
      }

      if (_this.props.onMouseUp) {
        _this.props.onMouseUp(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveNode", function (node) {
      _this.node = node;
    });

    var _checked = false;

    if ('checked' in props) {
      _checked = !!props.checked;
    } else {
      _checked = !!props.defaultChecked;
    }

    _this.state = {
      checked: _checked
    };
    return _this;
  }

  var _proto = Switch.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        autoFocus = _this$props.autoFocus,
        disabled = _this$props.disabled;

    if (autoFocus && !disabled) {
      this.focus();
    }
  };

  _proto.setChecked = function setChecked(checked) {
    if (this.props.disabled) {
      return;
    }

    if (!('checked' in this.props)) {
      this.setState({
        checked: checked
      });
    }

    this.props.onChange(checked);
  };

  _proto.focus = function focus() {
    this.node.focus();
  };

  _proto.blur = function blur() {
    this.node.blur();
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        className = _this$props2.className,
        prefixCls = _this$props2.prefixCls,
        disabled = _this$props2.disabled,
        loadingIcon = _this$props2.loadingIcon,
        checkedChildren = _this$props2.checkedChildren,
        tabIndex = _this$props2.tabIndex,
        unCheckedChildren = _this$props2.unCheckedChildren,
        restProps = _objectWithoutPropertiesLoose(_this$props2, ["className", "prefixCls", "disabled", "loadingIcon", "checkedChildren", "tabIndex", "unCheckedChildren"]);

    var checked = this.state.checked;
    var switchTabIndex = disabled ? -1 : tabIndex || 0;
    var switchClassName = (0, _classnames.default)((_classNames = {}, _classNames[className] = !!className, _classNames[prefixCls] = true, _classNames[prefixCls + "-checked"] = checked, _classNames[prefixCls + "-disabled"] = disabled, _classNames));
    return _react.default.createElement("span", _extends({}, restProps, {
      className: switchClassName,
      tabIndex: switchTabIndex,
      ref: this.saveNode,
      onKeyDown: this.handleKeyDown,
      onClick: this.toggle,
      onMouseUp: this.handleMouseUp
    }), loadingIcon, _react.default.createElement("span", {
      className: prefixCls + "-inner"
    }, checked ? checkedChildren : unCheckedChildren));
  };

  return Switch;
}(_react.Component);

Switch.propTypes = {
  className: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  checkedChildren: _propTypes.default.any,
  unCheckedChildren: _propTypes.default.any,
  onChange: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onClick: _propTypes.default.func,
  tabIndex: _propTypes.default.number,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  autoFocus: _propTypes.default.bool,
  loadingIcon: _propTypes.default.node
};
Switch.defaultProps = {
  prefixCls: 'rc-switch',
  checkedChildren: null,
  unCheckedChildren: null,
  className: '',
  defaultChecked: false,
  onChange: noop,
  onClick: noop
};
(0, _reactLifecyclesCompat.polyfill)(Switch);
var _default = Switch;
exports.default = _default;