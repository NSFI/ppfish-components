var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import Color from './helpers/color';
import percentage from './helpers/percentage';
var modesMap = ['RGB', 'HSB'];
var Params = /** @class */ (function (_super) {
    __extends(Params, _super);
    function Params(props) {
        var _this = _super.call(this, props) || this;
        _this.getChannelInRange = function (value, index) {
            var channelMap = {
                RGB: [
                    [0, 255],
                    [0, 255],
                    [0, 255]
                ],
                HSB: [
                    [0, 359],
                    [0, 100],
                    [0, 100]
                ]
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
        };
        _this.getPrefixCls = function () {
            return _this.props.rootPrefixCls + "-params";
        };
        _this.handleHexBlur = function () {
            var hex = _this.state.hex;
            var color = null;
            if (Color.isValidHex(hex)) {
                color = new Color(hex);
            }
            if (color !== null) {
                _this.setState({
                    color: color,
                    hex: hex
                });
                _this.props.onChange(color, false);
            }
        };
        _this.handleHexPress = function (event) {
            var hex = _this.state.hex;
            if (event.nativeEvent.which === 13) {
                var color = null;
                if (Color.isValidHex(hex)) {
                    color = new Color(hex);
                }
                if (color !== null) {
                    _this.setState({
                        color: color,
                        hex: hex
                    });
                    _this.props.onChange(color, false);
                }
            }
        };
        _this.handleHexChange = function (event) {
            var hex = event.target.value;
            _this.setState({
                hex: hex
            });
        };
        _this.handleModeChange = function () {
            var mode = _this.state.mode;
            var modeIndex = (modesMap.indexOf(mode) + 1) % modesMap.length;
            mode = modesMap[modeIndex];
            _this.setState({
                mode: mode
            });
        };
        _this.handleAlphaHandler = function (event) {
            var alpha = parseInt(event.target.value, 10);
            if (isNaN(alpha)) {
                alpha = 0;
            }
            alpha = Math.max(0, alpha);
            alpha = Math.min(alpha, 100);
            _this.props.onAlphaChange(alpha);
        };
        _this.updateColorByChanel = function (channel, value) {
            var color = _this.props.color;
            var mode = _this.state.mode;
            if (mode === 'HSB') {
                if (channel === 'H') {
                    color.hue = parseInt(value, 10);
                }
                else if (channel === 'S') {
                    color.saturation = parseInt(value, 10) / 100;
                }
                else if (channel === 'B') {
                    color.brightness = parseInt(value, 10) / 100;
                }
            }
            else {
                if (channel === 'R') {
                    color.red = parseInt(value, 10);
                }
                else if (channel === 'G') {
                    color.green = parseInt(value, 10);
                }
                else if (channel === 'B') {
                    color.blue = parseInt(value, 10);
                }
            }
            return color;
        };
        _this.handleColorChannelChange = function (index, event) {
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
        };
        // 管理 input 的状态
        _this.state = {
            mode: props.mode,
            hex: props.color.hex,
            color: props.color // instanceof tinycolor
        };
        return _this;
    }
    Params.getDerivedStateFromProps = function (nextProps, prevState) {
        var newState = {};
        if ('color' in nextProps) {
            newState.color = nextProps.color;
            newState.hex = nextProps.color.hex;
        }
        return newState;
    };
    Params.prototype.render = function () {
        var _a;
        var prefixCls = this.getPrefixCls();
        var _b = this.props, enableAlpha = _b.enableAlpha, enableHistory = _b.enableHistory;
        var _c = this.state, mode = _c.mode, color = _c.color;
        var colorChannel = color[mode];
        if (mode === 'HSB') {
            colorChannel[0] = parseInt(colorChannel[0], 10);
            colorChannel[1] = percentage(colorChannel[1]);
            colorChannel[2] = percentage(colorChannel[2]);
        }
        var paramsClasses = classNames((_a = {},
            _a[prefixCls] = true,
            _a[prefixCls + "-has-history"] = enableHistory,
            _a[prefixCls + "-has-alpha"] = enableAlpha,
            _a));
        return (React.createElement("div", { className: paramsClasses },
            React.createElement("div", { className: prefixCls + "-input" },
                React.createElement("input", { className: prefixCls + "-hex", type: "text", maxLength: 6, onKeyPress: this.handleHexPress, onBlur: this.handleHexBlur, onChange: this.handleHexChange, value: this.state.hex.toLowerCase() }),
                React.createElement("input", { type: "number", ref: "channel_0", value: colorChannel[0], onChange: this.handleColorChannelChange.bind(null, 0) }),
                React.createElement("input", { type: "number", ref: "channel_1", value: colorChannel[1], onChange: this.handleColorChannelChange.bind(null, 1) }),
                React.createElement("input", { type: "number", ref: "channel_2", value: colorChannel[2], onChange: this.handleColorChannelChange.bind(null, 2) }),
                enableAlpha && (React.createElement("input", { type: "number", value: Math.round(this.props.alpha), onChange: this.handleAlphaHandler }))),
            React.createElement("div", { className: prefixCls + "-lable" },
                React.createElement("label", { className: prefixCls + "-lable-hex" }, "Hex"),
                React.createElement("label", { className: prefixCls + "-lable-number", onClick: this.handleModeChange }, mode[0]),
                React.createElement("label", { className: prefixCls + "-lable-number", onClick: this.handleModeChange }, mode[1]),
                React.createElement("label", { className: prefixCls + "-lable-number", onClick: this.handleModeChange }, mode[2]),
                enableAlpha && React.createElement("label", { className: prefixCls + "-lable-alpha" }, "A"))));
    };
    Params.propTypes = {
        alpha: PropTypes.number,
        color: PropTypes.object.isRequired,
        enableAlpha: PropTypes.bool,
        enableHistory: PropTypes.bool,
        mode: PropTypes.oneOf(modesMap),
        onAlphaChange: PropTypes.func,
        onChange: PropTypes.func,
        rootPrefixCls: PropTypes.string
    };
    Params.defaultProps = {
        mode: modesMap[0],
        enableAlpha: true
    };
    return Params;
}(React.Component));
polyfill(Params);
export default Params;
