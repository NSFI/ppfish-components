"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Handle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Handle, _React$Component);

  function Handle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      clickFocused: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function () {
      if (document.activeElement === _this.handle) {
        _this.setClickFocus(true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function () {
      _this.setClickFocus(false);
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function () {
      _this.setClickFocus(false);
    });

    return _this;
  }

  var _proto = Handle.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // mouseup won't trigger if mouse moved out of handle,
    // so we listen on document here.
    this.onMouseUpListener = (0, _utils.addEventListener)(document, 'mouseup', this.handleMouseUp);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.onMouseUpListener) {
      this.onMouseUpListener.remove();
    }
  };

  _proto.setClickFocus = function setClickFocus(focused) {
    this.setState({
      clickFocused: focused
    });
  };

  _proto.clickFocus = function clickFocus() {
    this.setClickFocus(true);
    this.focus();
  };

  _proto.focus = function focus() {
    this.handle.focus();
  };

  _proto.blur = function blur() {
    this.handle.blur();
  };

  _proto.render = function render() {
    var _classNames,
        _this2 = this;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        vertical = _this$props.vertical,
        offset = _this$props.offset,
        style = _this$props.style,
        disabled = _this$props.disabled,
        min = _this$props.min,
        max = _this$props.max,
        value = _this$props.value,
        tabIndex = _this$props.tabIndex,
        handle = _this$props.handle,
        restProps = _objectWithoutPropertiesLoose(_this$props, ["prefixCls", "vertical", "offset", "style", "disabled", "min", "max", "value", "tabIndex", "handle"]);

    var elClassName = (0, _classnames.default)((_classNames = {}, _classNames[this.props.className] = true, _classNames[prefixCls + "-handle-custom"] = !!this.props.handle, _classNames[prefixCls + "-handle-click-focused"] = this.state.clickFocused, _classNames));
    var postionStyle = vertical ? {
      bottom: offset + "%"
    } : {
      left: offset + "%"
    };
    var elStyle = Object.assign({}, style, {}, postionStyle);
    var ariaProps = {};

    if (value !== undefined) {
      ariaProps = Object.assign({}, ariaProps, {
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': value,
        'aria-disabled': !!disabled
      });
    }

    return _react.default.createElement("div", _extends({
      ref: function ref(node) {
        return _this2.handle = node;
      },
      role: "slider",
      tabIndex: disabled ? null : tabIndex || 0
    }, ariaProps, restProps, {
      className: elClassName,
      style: elStyle,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeyDown
    }), !!handle && handle);
  };

  return Handle;
}(_react.default.Component);

exports.default = Handle;
Handle.propTypes = {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  vertical: _propTypes.default.bool,
  offset: _propTypes.default.number,
  style: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  value: _propTypes.default.number,
  tabIndex: _propTypes.default.number,
  handle: _propTypes.default.node
};