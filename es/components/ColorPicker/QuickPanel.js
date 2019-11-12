"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _utils = require("../../utils");

var _validationColor = _interopRequireDefault(require("./utils/validationColor"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _placements = _interopRequireDefault(require("./placements"));

var _color = _interopRequireDefault(require("./helpers/color"));

var _index = _interopRequireDefault(require("../Icon/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

var QuickPanel =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(QuickPanel, _React$Component);

  QuickPanel.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var newState = {};

    if ('color' in nextProps) {
      newState.color = nextProps.color;
    }

    if ('alpha' in nextProps && nextProps.alpha !== undefined) {
      newState.alpha = nextProps.alpha;
    }

    return newState;
  };

  function QuickPanel(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

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

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (color, alpha, fireChange) {
      if (fireChange === void 0) {
        fireChange = true;
      }

      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          onVisibleChange = _this$props.onVisibleChange,
          __useInComponent = _this$props.__useInComponent;
      if (disabled) return;

      _this.setState({
        color: color
      });

      onChange({
        color: color,
        alpha: alpha
      }); // colorPicker弹层中使用，点击时触发visibleChange

      if (__useInComponent && fireChange) {
        onVisibleChange(false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (colors) {
      _this.setState(Object.assign({}, colors));
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChangeFromTrigger", function (visible) {
      _this.setVisible(visible); //自定义选择颜色弹层关闭时才颜色改变确认


      if (!visible) {
        _this.props.onChange(_this.state);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPanelMount", function (panelDOMRef) {
      if (_this.state.visible) {
        setTimeout(function () {
          panelDOMRef.focus();
        }, 0);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      var keyCode = e.keyCode;

      if (keyCode === _utils.KeyCode.ESC && _this.props.esc || keyCode === _utils.KeyCode.ENTER) {
        _this.setVisible(false, function () {
          _this.props.onChange(_this.state);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSpnKeyDown", function (e) {
      var keyCode = e.keyCode;
      var colorMap = _this.props.colorMap;
      var _this$state = _this.state,
          color = _this$state.color,
          visible = _this$state.visible;
      var activeIndex = colorMap.indexOf(color);
      if (activeIndex === -1 || visible) return; // LEFT/RIGHT触发选择

      if (keyCode === _utils.KeyCode.LEFT) {
        _this.handleChange(colorMap[activeIndex - 1 === -1 ? colorMap.length - 1 : activeIndex - 1], 100, false);
      }

      if (keyCode === _utils.KeyCode.RIGHT) {
        _this.handleChange(colorMap[activeIndex + 1 === colorMap.length ? 0 : activeIndex + 1], 100, false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setVisible", function (visible, callback) {
      if (_this.state.visible !== visible) {
        _this.setState({
          visible: visible
        }, function () {
          if (typeof callback === 'function') callback();
          var _this$props2 = _this.props,
              onVisibleChange = _this$props2.onVisibleChange,
              enableHistory = _this$props2.enableHistory,
              maxHistory = _this$props2.maxHistory;
          onVisibleChange(_this.state.visible); //关闭时记录历史记录

          if (!_this.state.visible && enableHistory) {
            var _this$state2 = _this.state,
                color = _this$state2.color,
                alpha = _this$state2.alpha,
                colorHistory = _this$state2.colorHistory;
            if (colorHistory.length && color === colorHistory[0].color && alpha === colorHistory[0].alpha) return;

            _this.setState({
              colorHistory: colorHistory.length >= maxHistory ? [{
                color: color,
                alpha: alpha
              }].concat(colorHistory.slice(0, -1)) : [{
                color: color,
                alpha: alpha
              }].concat(colorHistory)
            });
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getPickerElement", function () {
      var _this$props3 = _this.props,
          mode = _this$props3.mode,
          className = _this$props3.className,
          enableAlpha = _this$props3.enableAlpha,
          enableHistory = _this$props3.enableHistory,
          maxHistory = _this$props3.maxHistory;
      return _react.default.createElement(_Panel.default, {
        onMount: _this.onPanelMount,
        defaultColor: _this.state.color,
        alpha: _this.state.alpha,
        enableAlpha: enableAlpha,
        prefixCls: "fishd-color-picker-panel",
        onChange: _this.onChange,
        onBlur: _this.onBlur,
        mode: mode,
        className: className,
        colorHistory: _this.state.colorHistory,
        enableHistory: enableHistory,
        maxHistory: maxHistory
      });
    });

    var _alpha = typeof props.alpha === 'undefined' ? props.defaultAlpha : Math.min(props.alpha, props.defaultAlpha);

    _this.state = {
      color: props.color || props.defaultColor,
      alpha: _alpha,
      visible: false,
      colorHistory: props.colorHistory
    };
    return _this;
  }

  var _proto = QuickPanel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.onMount(this.ref);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        prefixCls = _this$props4.prefixCls,
        colorMap = _this$props4.colorMap,
        userSelectColor = _this$props4.userSelectColor,
        getPopupContainer = _this$props4.getPopupContainer,
        disabled = _this$props4.disabled,
        __useInComponent = _this$props4.__useInComponent,
        popupStyle = _this$props4.popupStyle;
    var _RGB = new _color.default(this.state.color).RGB,
        r = _RGB[0],
        g = _RGB[1],
        b = _RGB[2];
    var RGBA = [r, g, b];
    var customChecked = !colorMap.includes(this.state.color);
    RGBA.push(this.state.alpha / 100);
    return _react.default.createElement("div", {
      ref: function ref(_ref) {
        return _this2.ref = _ref;
      },
      className: [prefixCls, this.props.className].join(' '),
      style: this.props.style,
      onFocus: this.onFocus,
      onKeyDown: this.handleSpnKeyDown,
      onBlur: this.onBlur,
      tabIndex: "0"
    }, _react.default.createElement("div", {
      className: prefixCls + "-inner"
    }, colorMap.map(function (color, i) {
      var _classNames;

      var spnClasses = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls + "-color-spn"] = true, _classNames[prefixCls + "-color-spn-active"] = _this2.state.color === color, _classNames));
      return _react.default.createElement("span", {
        key: i,
        className: spnClasses,
        style: {
          background: color
        },
        onClick: function onClick() {
          return _this2.handleChange(color, 100);
        }
      });
    }), userSelectColor && !__useInComponent && _react.default.createElement(_rcTrigger.default, {
      popup: _react.default.createElement("div", {
        className: prefixCls + "-content",
        onKeyDown: this.handleKeyDown
      }, _react.default.createElement("div", {
        className: prefixCls + "-arrow"
      }), _react.default.createElement("div", {
        className: prefixCls + "-inner"
      }, this.getPickerElement())),
      builtinPlacements: _placements.default,
      popupPlacement: 'topCenter',
      action: disabled ? [] : ['click'],
      destroyPopupOnHide: true,
      popupStyle: popupStyle,
      getPopupContainer: getPopupContainer,
      popupVisible: this.state.visible,
      onPopupVisibleChange: this.onVisibleChangeFromTrigger,
      prefixCls: "fishd-color-picker-panel"
    }, _react.default.createElement("span", {
      className: prefixCls + "-custom-btn"
    }, _react.default.createElement("span", {
      className: prefixCls + "-custom-btn-text",
      style: customChecked ? {
        backgroundColor: "rgba(" + RGBA.join(',') + ")",
        color: '#fff',
        textShadow: '0 0.5px 0.5px rgba(0,0,0,50%)'
      } : {}
    }, customChecked && _react.default.createElement(_index.default, {
      type: "check-line-bold"
    }), "\u81EA\u5B9A\u4E49")))));
  };

  return QuickPanel;
}(_react.default.Component);

_defineProperty(QuickPanel, "propTypes", {
  __useInComponent: _propTypes.default.bool,
  alpha: _propTypes.default.number,
  className: _propTypes.default.string,
  color: _validationColor.default,
  // Hex string
  colorHistory: _propTypes.default.array,
  colorMap: _propTypes.default.array,
  defaultAlpha: _propTypes.default.number,
  defaultColor: _validationColor.default,
  // Hex string
  disabled: _propTypes.default.bool,
  enableAlpha: _propTypes.default.bool,
  enableHistory: _propTypes.default.bool,
  getPopupContainer: _propTypes.default.func,
  maxHistory: _propTypes.default.number,
  mode: _propTypes.default.oneOf(['RGB', 'HSL', 'HSB']),
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onMount: _propTypes.default.func,
  onVisibleChange: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  userSelectColor: _propTypes.default.bool,
  style: _propTypes.default.object,
  popupStyle: _propTypes.default.object,
  esc: _propTypes.default.bool
});

_defineProperty(QuickPanel, "defaultProps", {
  __useInComponent: false,
  className: '',
  colorHistory: [],
  colorMap: ['#33bbff', '#337eff', '#8a73ff', '#bb67e6', '#f290b6', '#f24957', '#cc613d', '#faa702', '#ffe500', '#aacc00', '#26bf40', '#3dd9af', '#333333', '#666666', '#999999', '#cccccc'],
  defaultAlpha: 100,
  defaultColor: '#33bbff',
  enableAlpha: false,
  enableHistory: true,
  maxHistory: 8,
  mode: 'RGB',
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  onMount: noop,
  onVisibleChange: noop,
  prefixCls: 'fishd-color-picker-quick-panel',
  userSelectColor: true,
  style: {},
  popupStyle: {},
  esc: true
});

(0, _reactLifecyclesCompat.polyfill)(QuickPanel);
var _default = QuickPanel;
exports.default = _default;