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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Slider from '../Slider';
import Icon from '../Icon';
import Popover from '../Popover';
import ConfigConsumer from '../Config/Consumer';
var AudioPlayer = /** @class */ (function (_super) {
    __extends(AudioPlayer, _super);
    function AudioPlayer(props) {
        var _this = _super.call(this, props) || this;
        _this.audioInstance = null;
        _this.controlAudio = function (type, value) {
            var audio = _this.audioInstance;
            var numberValue = Number(value);
            switch (type) {
                case 'allTime':
                    _this.setState({
                        allTime: audio.duration,
                        // 音频总时长为0时禁用组件
                        disabled: parseInt(String(audio.duration)) === 0
                    });
                    _this.props.onCanPlay();
                    break;
                case 'play':
                    if (_this.state.disabled) {
                        return;
                    }
                    audio.play();
                    _this.setState({
                        isPlay: true
                    });
                    break;
                case 'pause':
                    if (_this.state.disabled) {
                        return;
                    }
                    audio.pause();
                    _this.setState({
                        isPlay: false
                    });
                    break;
                case 'changeCurrentTime':
                    _this.setState({
                        currentTime: value
                    });
                    audio.currentTime = value;
                    if (value == audio.duration) {
                        _this.setState({
                            isPlay: false
                        });
                    }
                    break;
                case 'getCurrentTime':
                    _this.setState({
                        currentTime: audio.currentTime
                    });
                    if (audio.currentTime == audio.duration) {
                        _this.setState({
                            isPlay: false
                        });
                    }
                    break;
                case 'changeVolume':
                    audio.volume = value / 100;
                    _this.setState({
                        currentVolume: value,
                        isMuted: !value
                    });
                    break;
                case 'changeRate':
                    if (Number.isNaN(numberValue)) {
                        throw new Error("rateOptions props error:\n          rateOptions.value or item of rateOptions.range can not convert to number");
                    }
                    audio.playbackRate = numberValue;
                    _this.setState({
                        rate: value,
                        rateOpen: false
                    });
                    break;
            }
        };
        _this.millisecondToDate = function (time, format) {
            if (format === void 0) { format = true; }
            var second = Math.floor(time % 60);
            var minute = Math.floor(time / 60);
            if (!format) {
                return minute * 60 + second;
            }
            var hour;
            if (minute > 60) {
                hour = minute / 60;
                minute = minute % 60;
                return Math.floor(hour) + ":" + Math.floor(minute) + ":" + Math.floor(second);
            }
            return minute + ":" + (second >= 10 ? second : "0" + second);
        };
        _this.getVolumePopupContent = function () {
            var currentVolume = _this.state.currentVolume;
            return (React.createElement("div", { className: "change-audio-volume-box" },
                React.createElement("div", { className: "change-audio-volume-value" },
                    currentVolume,
                    "%"),
                React.createElement("div", { className: "change-audio-volume-slider" },
                    React.createElement(Slider, { vertical: true, min: 0, max: 100, step: 1, handle: React.createElement("div", { className: "change-audio-volume-customer-handle" },
                            React.createElement(Icon, { type: "sound-drag" })), tipFormatter: null, defaultValue: currentVolume, onChange: function (value) { return _this.controlAudio('changeVolume', value); } }))));
        };
        // 调节音量面板状态变化
        _this.onVolumeVisibleChange = function (state) {
            _this.setState({
                volumeOpen: state
            });
        };
        // 调节播放速度板状态变化
        _this.onRateVisibleChange = function (state) {
            _this.setState({
                rateOpen: state
            });
        };
        _this.state = {
            isPlay: _this.props.autoPlay,
            isMuted: _this.props.muted,
            currentVolume: parseInt(String(_this.props.volume * 100)),
            volumeOpen: false,
            rateOpen: false,
            allTime: 0,
            currentTime: 0,
            disabled: !_this.props.src,
            rate: _this.props.rateOptions.value || 1 // 播放速度
        };
        _this.audioInstance = null;
        return _this;
    }
    AudioPlayer.prototype.componentDidMount = function () {
        this.controlAudio('changeRate', this.state.rate);
        if (this.props.autoPlay) {
            this.audioInstance.play();
        }
    };
    AudioPlayer.prototype.render = function () {
        var _this = this;
        var _a = this.state, isPlay = _a.isPlay, isMuted = _a.isMuted, allTime = _a.allTime, currentTime = _a.currentTime, currentVolume = _a.currentVolume, volumeOpen = _a.volumeOpen, rateOpen = _a.rateOpen, disabled = _a.disabled, rate = _a.rate;
        var _b = this.props, prefixCls = _b.prefixCls, title = _b.title, src = _b.src, autoPlay = _b.autoPlay, className = _b.className, size = _b.size, loop = _b.loop, preload = _b.preload, controlVolume = _b.controlVolume, controlProgress = _b.controlProgress, displayTime = _b.displayTime, download = _b.download, rateOptions = _b.rateOptions, onCanPlay = _b.onCanPlay, onLoadedMetadata = _b.onLoadedMetadata, onCanPlayThrough = _b.onCanPlayThrough, onAbort = _b.onAbort, onEnded = _b.onEnded, onError = _b.onError, onPause = _b.onPause, onPlay = _b.onPlay, onSeeked = _b.onSeeked, otherProps = __rest(_b, ["prefixCls", "title", "src", "autoPlay", "className", "size", "loop", "preload", "controlVolume", "controlProgress", "displayTime", "download", "rateOptions", "onCanPlay", "onLoadedMetadata", "onCanPlayThrough", "onAbort", "onEnded", "onError", "onPause", "onPlay", "onSeeked"]);
        var _c = rateOptions.value, rateValue = _c === void 0 ? 0 : _c, _d = rateOptions.suffix, rateSuffix = _d === void 0 ? 'x' : _d, _e = rateOptions.decimal, rateDecimal = _e === void 0 ? 1 : _e, _f = rateOptions.range, rateRange = _f === void 0 ? [] : _f;
        var getRateText = function (rate) { return "" + Number(rate).toFixed(rateDecimal) + rateSuffix; };
        var sizeCls = size === 'small' ? 'sm' : '';
        var pausePlayIcon = !isPlay ? 'play' : 'stop';
        var volumeIcon = function () {
            if (isMuted || currentVolume === 0) {
                return 'sound-mute';
            }
            else if (currentVolume > 0 && currentVolume <= 50) {
                return 'sound-medium';
            }
            else {
                return 'sound-loud';
            }
        };
        return (React.createElement(ConfigConsumer, { componentName: "AudioPlayer" }, function (Locale) {
            var _a, _b;
            return React.createElement("div", { className: classNames(prefixCls, className, (_a = {},
                    _a[prefixCls + "-" + sizeCls] = sizeCls,
                    _a)) },
                React.createElement("div", { className: classNames(prefixCls + "-wrap", (_b = {},
                        _b[prefixCls + "-" + sizeCls + "-wrap"] = sizeCls,
                        _b)), title: title },
                    React.createElement("div", { className: "audio-box" },
                        React.createElement("audio", __assign({ ref: function (instance) { return (_this.audioInstance = instance); }, src: src, preload: preload, loop: loop, volume: currentVolume / 100, onCanPlay: function () { return _this.controlAudio('allTime'); }, onTimeUpdate: function (e) { return _this.controlAudio('getCurrentTime'); }, onLoadedMetadata: onLoadedMetadata, onCanPlayThrough: onCanPlayThrough, onAbort: onAbort, onEnded: onEnded, onError: onError, onPause: onPause, onPlay: onPlay, onSeeked: onSeeked }, otherProps), Locale.notSupport)),
                    React.createElement("div", { className: "box pause-play-box pause-play-box-" + (disabled ? 'disabled' : 'enable'), onClick: function () { return _this.controlAudio(isPlay ? 'pause' : 'play'); } },
                        React.createElement(Icon, { className: "handle-audio-icon pause-play", type: pausePlayIcon })),
                    controlProgress ? (React.createElement("div", { className: "box step-box" },
                        React.createElement(Slider, { step: 1, min: 0, max: Number(_this.millisecondToDate(allTime, false)), value: currentTime, disabled: disabled, tipMode: "all", tipFormatter: function (value) { return _this.millisecondToDate(value); }, onChange: function (value) { return _this.controlAudio('changeCurrentTime', value); } }))) : null,
                    displayTime ? (React.createElement("div", { className: "box time-box" },
                        React.createElement("span", { className: "current" }, _this.millisecondToDate(currentTime) +
                            ' / ' +
                            _this.millisecondToDate(allTime)))) : null,
                    controlVolume ? (React.createElement(Popover, { overlayClassName: "change-audio-volume", trigger: "click", placement: "top", content: _this.getVolumePopupContent(), visible: volumeOpen, onVisibleChange: _this.onVolumeVisibleChange, getPopupContainer: function (node) { return node.parentElement; } },
                        React.createElement("div", { className: "box volume-box" },
                            React.createElement(Icon, { className: "handle-audio-icon control-volume", type: volumeIcon() })))) : null,
                    rateRange.length ? (React.createElement(Popover, { overlayClassName: "change-audio-rate", trigger: "click", placement: "top", visible: rateOpen, onVisibleChange: _this.onRateVisibleChange, getPopupContainer: function (node) { return node.parentElement; }, content: rateRange.map(function (rateItem) { return (React.createElement("p", { className: "change-audio-rate-item", key: "rate-" + rateItem, onClick: function () {
                                _this.controlAudio('changeRate', rateItem);
                            } }, getRateText(rateItem))); }) }, React.createElement("p", { className: "box rate-box" }, getRateText(rate)))) : rateValue ? (React.createElement("p", { className: "box rate-box" }, getRateText(rateValue))) : null,
                    download ? (React.createElement("div", { className: "box download-box" },
                        React.createElement("a", { download: true, target: "_blank", rel: "noopener noreferrer", href: src },
                            React.createElement(Icon, { className: "handle-audio-icon download", type: "sound-download" })))) : null));
        }));
    };
    AudioPlayer.propTypes = {
        prefixCls: PropTypes.string.isRequired,
        className: PropTypes.string,
        size: PropTypes.oneOf(['default', 'small']),
        title: PropTypes.string,
        src: PropTypes.string,
        loop: PropTypes.bool,
        preload: PropTypes.string,
        autoPlay: PropTypes.bool,
        muted: PropTypes.bool,
        volume: PropTypes.number,
        controlVolume: PropTypes.bool,
        controlProgress: PropTypes.bool,
        displayTime: PropTypes.bool,
        rateOptions: PropTypes.object,
        download: PropTypes.bool,
        onLoadedMetadata: PropTypes.func,
        onCanPlay: PropTypes.func,
        onCanPlayThrough: PropTypes.func,
        onAbort: PropTypes.func,
        onEnded: PropTypes.func,
        onError: PropTypes.func,
        onPause: PropTypes.func,
        onPlay: PropTypes.func,
        onSeeked: PropTypes.func
    };
    AudioPlayer.defaultProps = {
        prefixCls: 'fishd-audio-player',
        className: '',
        size: 'default',
        title: '',
        src: '',
        loop: false,
        preload: 'metadata',
        autoPlay: false,
        muted: false,
        volume: 1.0,
        controlVolume: true,
        controlProgress: true,
        displayTime: true,
        rateOptions: { value: 0 },
        download: false,
        onLoadedMetadata: function () { },
        onCanPlay: function () { },
        onCanPlayThrough: function () { },
        onAbort: function () { },
        onEnded: function () { },
        onError: function () { },
        onPause: function () { },
        onPlay: function () { },
        onSeeked: function () { } // 当用户已移动/跳跃到音频中的新位置时的回调
    };
    return AudioPlayer;
}(React.Component));
export default AudioPlayer;
