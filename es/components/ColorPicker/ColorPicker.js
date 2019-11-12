"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _utils = require("../../utils");

var _Panel = _interopRequireDefault(require("./Panel"));

var _placements = _interopRequireDefault(require("./placements"));

var _color = _interopRequireDefault(require("./helpers/color"));

var _QuickPanel = _interopRequireDefault(require("./QuickPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function refFn(field, component) {
  this[field] = component;
}

function prevent(e) {
  e.preventDefault();
}

function noop() {}

var ColorPicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ColorPicker, _React$Component);

  ColorPicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var newState = {};

    if ('color' in nextProps) {
      newState.color = nextProps.color;
    }

    if ('alpha' in nextProps && nextProps.alpha !== undefined && nextProps.alpha !== null) {
      newState.alpha = nextProps.alpha;
    }

    return newState;
  };

  function ColorPicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (colors) {
      _this.setState(Object.assign({}, colors), function () {
        _this.props.onChange(_this.state);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      _this.setVisible(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChangeFromTrigger", function (visible) {
      _this.setVisible(visible);
    });

    _defineProperty(_assertThisInitialized(_this), "onPanelMount", function (panelDOMRef) {
      if (_this.state.visible) {
        setTimeout(function () {
          panelDOMRef.focus();
        }, 0);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setVisible", function (visible, callback) {
      if (_this.state.visible !== visible) {
        _this.setState({
          visible: visible
        }, function () {
          if (typeof callback === 'function') callback();
          var _this$props = _this.props,
              onVisibleChange = _this$props.onVisibleChange,
              enableHistory = _this$props.enableHistory,
              maxHistory = _this$props.maxHistory;
          onVisibleChange(_this.state.visible); //关闭时记录历史记录

          if (!_this.state.visible && enableHistory) {
            var _this$state = _this.state,
                color = _this$state.color,
                alpha = _this$state.alpha,
                colorHistory = _this$state.colorHistory;
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

    _defineProperty(_assertThisInitialized(_this), "getRootDOMNode", function () {
      return (0, _reactDom.findDOMNode)(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "getTriggerDOMNode", function () {
      return (0, _reactDom.findDOMNode)(_this.triggerInstance);
    });

    _defineProperty(_assertThisInitialized(_this), "getPickerElement", function () {
      if (_this.props.quickMode) {
        return _react.default.createElement(_QuickPanel.default, {
          __useInComponent: true,
          onMount: _this.onPanelMount,
          defaultColor: _this.state.color,
          color: _this.state.color,
          onChange: _this.onChange,
          onVisibleChange: _this.setVisible,
          onBlur: _this.onBlur,
          colorMap: _this.props.colorMap,
          className: _this.props.className,
          userSelectColor: false,
          esc: _this.props.esc
        });
      }

      return _react.default.createElement(_Panel.default, {
        onMount: _this.onPanelMount,
        defaultColor: _this.state.color,
        alpha: _this.state.alpha,
        enableAlpha: _this.props.enableAlpha,
        prefixCls: _this.props.prefixCls + "-panel",
        onChange: _this.onChange,
        onBlur: _this.onBlur,
        mode: _this.props.mode,
        className: _this.props.className,
        colorHistory: _this.state.colorHistory,
        enableHistory: _this.props.enableHistory,
        maxHistory: _this.props.maxHistory
      });
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      if (!_this.state.visible) {
        (0, _reactDom.findDOMNode)(_assertThisInitialized(_this)).focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      var keyCode = e.keyCode;

      if (keyCode === _utils.KeyCode.ESC && _this.props.esc || keyCode === _utils.KeyCode.ENTER) {
        _this.setVisible(false);
      }
    });

    var _alpha = typeof props.alpha === 'undefined' ? props.defaultAlpha : Math.min(props.alpha, props.defaultAlpha);

    _this.state = {
      color: props.color || props.defaultColor,
      alpha: _alpha,
      visible: false,
      colorHistory: []
    };
    _this.saveTriggerRef = refFn.bind(_assertThisInitialized(_this), 'triggerInstance');
    return _this;
  }

  var _proto = ColorPicker.prototype;

  _proto.render = function render() {
    var _classNames;

    var props = this.props;
    var state = this.state;
    var classes = [props.prefixCls + "-wrap", props.className];

    if (state.visible) {
      classes.push(props.prefixCls + "-open");
    }

    var children = props.children;
    var _RGB = new _color.default(this.state.color).RGB,
        r = _RGB[0],
        g = _RGB[1],
        b = _RGB[2];
    var RGBA = [r, g, b];
    RGBA.push(this.state.alpha / 100);

    if (children) {
      children = _react.default.cloneElement(children, {
        ref: this.saveTriggerRef,
        unselectable: 'unselectable',
        style: Object.assign({}, props.style, {
          backgroundColor: "rgba(" + RGBA.join(',') + ")"
        }),
        onMouseDown: prevent
      });
    }

    var prefixCls = props.prefixCls,
        popupStyle = props.popupStyle,
        getPopupContainer = props.getPopupContainer,
        align = props.align,
        animation = props.animation,
        disabled = props.disabled,
        transitionName = props.transitionName,
        quickMode = props.quickMode;
    var arrowCls = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls + "-arrow"] = true, _classNames['quick'] = quickMode, _classNames));
    return _react.default.createElement("div", {
      className: classes.join(' ')
    }, _react.default.createElement(_rcTrigger.default, {
      popup: _react.default.createElement("div", {
        className: prefixCls + "-content",
        onKeyDown: this.handleKeyDown
      }, _react.default.createElement("div", {
        className: arrowCls
      }), _react.default.createElement("div", {
        className: prefixCls + "-inner"
      }, this.getPickerElement())),
      popupAlign: align,
      builtinPlacements: _placements.default,
      popupPlacement: 'topCenter',
      action: disabled ? [] : ['click'],
      destroyPopupOnHide: true,
      getPopupContainer: getPopupContainer,
      popupStyle: popupStyle,
      popupAnimation: animation,
      popupTransitionName: transitionName,
      popupVisible: state.visible,
      onPopupVisibleChange: this.onVisibleChangeFromTrigger,
      prefixCls: prefixCls
    }, children));
  };

  return ColorPicker;
}(_react.default.Component);

_defineProperty(ColorPicker, "propTypes", {
  alpha: _propTypes.default.number,
  children: _propTypes.default.node.isRequired,
  className: _propTypes.default.string,
  color: _propTypes.default.string,
  colorMap: _propTypes.default.array,
  defaultAlpha: _propTypes.default.number,
  defaultColor: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  enableAlpha: _propTypes.default.bool,
  enableHistory: _propTypes.default.bool,
  maxHistory: _propTypes.default.number,
  mode: _propTypes.default.oneOf(['RGB', 'HSL', 'HSB']),
  onChange: _propTypes.default.func,
  onVisibleChange: _propTypes.default.func,
  prefixCls: _propTypes.default.string.isRequired,
  quickMode: _propTypes.default.bool,
  style: _propTypes.default.object,
  popupStyle: _propTypes.default.object,
  esc: _propTypes.default.bool
});

_defineProperty(ColorPicker, "defaultProps", {
  children: _react.default.createElement("span", {
    className: "fishd-color-picker-trigger"
  }),
  className: '',
  colorMap: ['#33bbff', '#337eff', '#8a73ff', '#bb67e6', '#f290b6', '#f24957', '#cc613d', '#faa702', '#ffe500', '#aacc00', '#26bf40', '#3dd9af'],
  defaultAlpha: 100,
  defaultColor: '#33bbff',
  disabled: false,
  enableAlpha: false,
  enableHistory: true,
  maxHistory: 8,
  onChange: noop,
  onVisibleChange: noop,
  prefixCls: 'fishd-color-picker',
  quickMode: false,
  style: {},
  popupStyle: {},
  esc: true
});

(0, _reactLifecyclesCompat.polyfill)(ColorPicker);
var _default = ColorPicker;
exports.default = _default;