"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _color2 = _interopRequireDefault(require("./helpers/color"));

var _validationColor = _interopRequireDefault(require("./utils/validationColor"));

var _Board = _interopRequireDefault(require("./Board"));

var _Preview = _interopRequireDefault(require("./Preview"));

var _Ribbon = _interopRequireDefault(require("./Ribbon"));

var _Alpha = _interopRequireDefault(require("./Alpha"));

var _Params = _interopRequireDefault(require("./Params"));

var _History = _interopRequireDefault(require("./History"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

var Panel =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Panel, _React$Component);

  Panel.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var newState = {};

    if ('color' in nextProps) {
      newState.color = new _color2.default(nextProps.color);
    }

    if ('alpha' in nextProps && nextProps.alpha !== undefined) {
      newState.alpha = nextProps.alpha;
    }

    return newState;
  };

  function Panel(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onSystemColorPickerOpen", function (e) {
      // only work with broswer which support color input
      if (e.target.type === 'color') {
        _this.systemColorPickerOpen = true;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      if (_this._blurTimer) {
        clearTimeout(_this._blurTimer);
        _this._blurTimer = null;
      } else {
        _this.props.onFocus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      if (_this._blurTimer) {
        clearTimeout(_this._blurTimer);
      }

      _this._blurTimer = setTimeout(function () {
        // if is system color picker open, then stop run blur
        if (_this.systemColorPickerOpen) {
          _this.systemColorPickerOpen = false;
          return;
        }

        _this.props.onBlur();
      }, 100);
    });

    _defineProperty(_assertThisInitialized(_this), "handleAlphaChange", function (alpha) {
      var color = _this.state.color;
      color.alpha = alpha;

      _this.setState({
        alpha: alpha,
        color: color
      });

      _this.props.onChange({
        color: color.toHexString(),
        alpha: alpha
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (color) {
      var alpha = _this.state.alpha;
      color.alpha = alpha;

      _this.setState({
        color: color
      });

      _this.props.onChange({
        color: color.toHexString(),
        alpha: color.alpha
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleHistoryClick", function (obj) {
      _this.setState({
        color: new _color2.default(obj.color),
        alpha: obj.alpha
      });

      _this.props.onChange({
        color: obj.color,
        alpha: obj.alpha
      });
    });

    var _alpha = typeof props.alpha === 'undefined' ? props.defaultAlpha : Math.min(props.alpha, props.defaultAlpha);

    var _color = new _color2.default(props.color || props.defaultColor);

    _this.state = {
      color: _color,
      alpha: _alpha
    };
    return _this;
  }

  var _proto = Panel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.onMount(this.ref);
  };

  _proto.render = function render() {
    var _classNames,
        _this2 = this;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        enableAlpha = _this$props.enableAlpha,
        enableHistory = _this$props.enableHistory,
        colorHistory = _this$props.colorHistory;
    var _this$state = this.state,
        color = _this$state.color,
        alpha = _this$state.alpha;
    var wrapClasses = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls + "-wrap"] = true, _classNames[prefixCls + "-wrap-has-alpha"] = enableAlpha, _classNames));
    return _react.default.createElement("div", {
      ref: function ref(_ref) {
        return _this2.ref = _ref;
      },
      className: [prefixCls, this.props.className].join(' '),
      style: this.props.style,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      tabIndex: "0"
    }, _react.default.createElement("div", {
      className: prefixCls + "-inner"
    }, _react.default.createElement(_Board.default, {
      rootPrefixCls: prefixCls,
      color: color,
      onChange: this.handleChange
    }), _react.default.createElement("div", {
      className: wrapClasses
    }, _react.default.createElement("div", {
      className: prefixCls + "-wrap-ribbon"
    }, _react.default.createElement(_Ribbon.default, {
      rootPrefixCls: prefixCls,
      color: color,
      onChange: this.handleChange
    })), enableAlpha && _react.default.createElement("div", {
      className: prefixCls + "-wrap-alpha"
    }, _react.default.createElement(_Alpha.default, {
      rootPrefixCls: prefixCls,
      alpha: alpha,
      color: color,
      onChange: this.handleAlphaChange
    })), _react.default.createElement("div", {
      className: prefixCls + "-wrap-preview"
    }, _react.default.createElement(_Preview.default, {
      rootPrefixCls: prefixCls,
      alpha: alpha,
      onChange: this.handleChange,
      onInputClick: this.onSystemColorPickerOpen,
      color: color
    }))), _react.default.createElement("div", {
      className: prefixCls + "-wrap",
      style: {
        height: 40,
        marginTop: 6
      }
    }, _react.default.createElement(_Params.default, {
      rootPrefixCls: prefixCls,
      color: color,
      alpha: alpha,
      onAlphaChange: this.handleAlphaChange,
      onChange: this.handleChange,
      mode: this.props.mode,
      enableAlpha: this.props.enableAlpha,
      enableHistory: this.props.enableHistory
    })), enableHistory && _react.default.createElement("div", {
      className: prefixCls + "-wrap-history"
    }, _react.default.createElement(_History.default, {
      prefixCls: prefixCls,
      colorHistory: colorHistory,
      onHistoryClick: this.handleHistoryClick,
      maxHistory: this.props.maxHistory
    }))));
  };

  return Panel;
}(_react.default.Component);

_defineProperty(Panel, "propTypes", {
  alpha: _propTypes.default.number,
  className: _propTypes.default.string,
  color: _validationColor.default,
  // Hex string
  colorHistory: _propTypes.default.array,
  defaultAlpha: _propTypes.default.number,
  defaultColor: _validationColor.default,
  // Hex string
  enableAlpha: _propTypes.default.bool,
  enableHistory: _propTypes.default.bool,
  maxHistory: _propTypes.default.number,
  mode: _propTypes.default.oneOf(['RGB', 'HSL', 'HSB']),
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onMount: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  style: _propTypes.default.object
});

_defineProperty(Panel, "defaultProps", {
  className: '',
  colorHistory: [],
  defaultAlpha: 100,
  defaultColor: '#e93334',
  enableAlpha: false,
  enableHistory: true,
  maxHistory: 8,
  mode: 'RGB',
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  onMount: noop,
  prefixCls: 'fishd-color-picker-panel',
  style: {}
});

(0, _reactLifecyclesCompat.polyfill)(Panel);
var _default = Panel;
exports.default = _default;