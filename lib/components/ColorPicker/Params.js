"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _color = _interopRequireDefault(require("./helpers/color"));

var _percentage = _interopRequireDefault(require("./helpers/percentage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var modesMap = ['RGB', 'HSB'];

var Params =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Params, _React$Component);

  Params.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var newState = {};

    if ('color' in nextProps) {
      newState.color = nextProps.color;
      newState.hex = nextProps.color.hex;
    }

    return newState;
  };

  function Params(props) {
    var _this;

    _this = _React$Component.call(this, props) || this; // 管理 input 的状态

    _defineProperty(_assertThisInitialized(_this), "getChannelInRange", function (value, index) {
      var channelMap = {
        RGB: [[0, 255], [0, 255], [0, 255]],
        HSB: [[0, 359], [0, 100], [0, 100]]
      };
      var mode = _this.state.mode;
      var range = channelMap[mode][index];
      var result = parseInt(value, 10);

      if (isNaN(result)) {
        result = 0;
      }

      result = Math.max(range[0], result);
      result = Math.min(result, range[1]);
      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "getPrefixCls", function () {
      return _this.props.rootPrefixCls + "-params";
    });

    _defineProperty(_assertThisInitialized(_this), "handleHexBlur", function () {
      var hex = _this.state.hex;
      var color = null;

      if (_color.default.isValidHex(hex)) {
        color = new _color.default(hex);
      }

      if (color !== null) {
        _this.setState({
          color: color,
          hex: hex
        });

        _this.props.onChange(color, false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleHexPress", function (event) {
      var hex = _this.state.hex;

      if (event.nativeEvent.which === 13) {
        var color = null;

        if (_color.default.isValidHex(hex)) {
          color = new _color.default(hex);
        }

        if (color !== null) {
          _this.setState({
            color: color,
            hex: hex
          });

          _this.props.onChange(color, false);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleHexChange", function (event) {
      var hex = event.target.value;

      _this.setState({
        hex: hex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleModeChange", function () {
      var mode = _this.state.mode;
      var modeIndex = (modesMap.indexOf(mode) + 1) % modesMap.length;
      mode = modesMap[modeIndex];

      _this.setState({
        mode: mode
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleAlphaHandler", function (event) {
      var alpha = parseInt(event.target.value, 10);

      if (isNaN(alpha)) {
        alpha = 0;
      }

      alpha = Math.max(0, alpha);
      alpha = Math.min(alpha, 100);

      _this.props.onAlphaChange(alpha);
    });

    _defineProperty(_assertThisInitialized(_this), "updateColorByChanel", function (channel, value) {
      var color = _this.props.color;
      var mode = _this.state.mode;

      if (mode === 'HSB') {
        if (channel === 'H') {
          color.hue = parseInt(value, 10);
        } else if (channel === 'S') {
          color.saturation = parseInt(value, 10) / 100;
        } else if (channel === 'B') {
          color.brightness = parseInt(value, 10) / 100;
        }
      } else {
        if (channel === 'R') {
          color.red = parseInt(value, 10);
        } else if (channel === 'G') {
          color.green = parseInt(value, 10);
        } else if (channel === 'B') {
          color.blue = parseInt(value, 10);
        }
      }

      return color;
    });

    _defineProperty(_assertThisInitialized(_this), "handleColorChannelChange", function (index, event) {
      var value = _this.getChannelInRange(event.target.value, index);

      var mode = _this.state.mode;
      var channel = mode[index];

      var color = _this.updateColorByChanel(channel, value);

      _this.setState({
        hex: color.hex,
        color: color
      }, function () {
        _this.props.onChange(color, false);
      });
    });

    _this.state = {
      mode: props.mode,
      hex: props.color.hex,
      color: props.color // instanceof tinycolor

    };
    return _this;
  }

  var _proto = Params.prototype;

  _proto.render = function render() {
    var _classNames;

    var prefixCls = this.getPrefixCls();
    var _this$props = this.props,
        enableAlpha = _this$props.enableAlpha,
        enableHistory = _this$props.enableHistory;
    var _this$state = this.state,
        mode = _this$state.mode,
        color = _this$state.color;
    var colorChannel = color[mode];

    if (mode === 'HSB') {
      colorChannel[0] = parseInt(colorChannel[0], 10);
      colorChannel[1] = (0, _percentage.default)(colorChannel[1]);
      colorChannel[2] = (0, _percentage.default)(colorChannel[2]);
    }

    var paramsClasses = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls] = true, _classNames[prefixCls + "-has-history"] = enableHistory, _classNames[prefixCls + "-has-alpha"] = enableAlpha, _classNames));
    return _react.default.createElement("div", {
      className: paramsClasses
    }, _react.default.createElement("div", {
      className: prefixCls + "-input"
    }, _react.default.createElement("input", {
      className: prefixCls + "-hex",
      type: "text",
      maxLength: "6",
      onKeyPress: this.handleHexPress,
      onBlur: this.handleHexBlur,
      onChange: this.handleHexChange,
      value: this.state.hex.toLowerCase()
    }), _react.default.createElement("input", {
      type: "number",
      ref: "channel_0",
      value: colorChannel[0],
      onChange: this.handleColorChannelChange.bind(null, 0)
    }), _react.default.createElement("input", {
      type: "number",
      ref: "channel_1",
      value: colorChannel[1],
      onChange: this.handleColorChannelChange.bind(null, 1)
    }), _react.default.createElement("input", {
      type: "number",
      ref: "channel_2",
      value: colorChannel[2],
      onChange: this.handleColorChannelChange.bind(null, 2)
    }), enableAlpha && _react.default.createElement("input", {
      type: "number",
      value: Math.round(this.props.alpha),
      onChange: this.handleAlphaHandler
    })), _react.default.createElement("div", {
      className: prefixCls + "-lable"
    }, _react.default.createElement("label", {
      className: prefixCls + "-lable-hex"
    }, "Hex"), _react.default.createElement("label", {
      className: prefixCls + "-lable-number",
      onClick: this.handleModeChange
    }, mode[0]), _react.default.createElement("label", {
      className: prefixCls + "-lable-number",
      onClick: this.handleModeChange
    }, mode[1]), _react.default.createElement("label", {
      className: prefixCls + "-lable-number",
      onClick: this.handleModeChange
    }, mode[2]), enableAlpha && _react.default.createElement("label", {
      className: prefixCls + "-lable-alpha"
    }, "A")));
  };

  return Params;
}(_react.default.Component);

_defineProperty(Params, "propTypes", {
  alpha: _propTypes.default.number,
  color: _propTypes.default.object.isRequired,
  enableAlpha: _propTypes.default.bool,
  enableHistory: _propTypes.default.bool,
  mode: _propTypes.default.oneOf(modesMap),
  onAlphaChange: _propTypes.default.func,
  onChange: _propTypes.default.func,
  rootPrefixCls: _propTypes.default.string
});

_defineProperty(Params, "defaultProps", {
  mode: modesMap[0],
  enableAlpha: true
});

(0, _reactLifecyclesCompat.polyfill)(Params);
var _default = Params;
exports.default = _default;