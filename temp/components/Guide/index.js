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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Driver from './src';
import { ESC_KEY_CODE, LEFT_KEY_CODE, RIGHT_KEY_CODE } from './src/common/constants';
import Modal from '../Modal';
import Button from '../Button';
import './style/index.less';
import ConfigConsumer from '../Config/Consumer';
var Guide = /** @class */ (function (_super) {
    __extends(Guide, _super);
    function Guide(props) {
        var _this = _super.call(this, props) || this;
        _this.totalCount = 0;
        _this.driver = null;
        _this.init = function () {
            var _a = _this.props, steps = _a.steps, mode = _a.mode;
            if (!(steps && steps.length) || mode == 'fixed')
                return;
            setTimeout(function () {
                if (steps.length == 1) {
                    _this.driver.highlight(steps[0]);
                }
                else {
                    _this.driver.defineSteps(_this.props.steps);
                    _this.driver.start();
                }
            }, 300);
        };
        _this.handleClose = function () {
            _this.setState({
                visible: false
            }, function () {
                _this.setState({
                    currentIndex: 0
                });
            });
            _this.props.onClose && _this.props.onClose();
        };
        _this.handleNext = function () {
            var currentIndex = _this.state.currentIndex, nextIndex = 0;
            if (currentIndex >= _this.totalCount - 1) {
                nextIndex = _this.totalCount - 1;
                _this.handleClose();
            }
            else {
                nextIndex = currentIndex + 1;
            }
            _this.setState({
                currentIndex: nextIndex
            });
        };
        _this.handlePrev = function () {
            var currentIndex = _this.state.currentIndex, nextIndex = 0;
            if (currentIndex <= 0) {
                nextIndex = 0;
            }
            else {
                nextIndex = currentIndex - 1;
            }
            _this.setState({
                currentIndex: nextIndex
            });
        };
        _this.renderTitle = function (curStep) {
            if (!curStep.title)
                return null;
            if (curStep.subtitle) {
                return (React.createElement(React.Fragment, null,
                    curStep.title,
                    React.createElement("div", { className: _this.props.prefixCls + "-fixed-subtitle" }, curStep.subtitle)));
            }
            else {
                return curStep.title;
            }
        };
        _this.state = {
            visible: props.visible,
            currentIndex: 0
        };
        _this.totalCount = props.steps.length;
        if (props.mode != 'fixed') {
            var opt = {
                counter: props.counter,
                allowClose: props.allowClose,
                keyboardControl: props.keyboardControl,
                onReset: function () {
                    _this.handleClose();
                }
            };
            if (!props.mask) {
                opt['opacity'] = 0;
            }
            _this.driver = new Driver(opt);
        }
        else {
            if (props.keyboardControl) {
                window.addEventListener('keyup', _this.onKeyUp.bind(_this), false);
            }
        }
        return _this;
    }
    Guide.prototype.componentDidMount = function () {
        var visible = this.state.visible;
        if (!visible)
            return;
        this.init();
    };
    // eslint-disable-next-line react/no-deprecated
    Guide.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        var visible = this.state.visible;
        if (!visible && nextProps.visible) {
            this.setState({
                visible: true
            }, function () {
                _this.init();
            });
        }
    };
    Guide.prototype.onKeyUp = function (event) {
        if (!this.props.keyboardControl || this.props.mode != 'fixed')
            return;
        if (event.keyCode === ESC_KEY_CODE) {
            this.handleClose();
            return;
        }
        if (event.keyCode === RIGHT_KEY_CODE) {
            this.handleNext();
        }
        else if (event.keyCode === LEFT_KEY_CODE) {
            this.handlePrev();
        }
    };
    Guide.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, prefixCls = _b.prefixCls, allowClose = _b.allowClose, mode = _b.mode, mask = _b.mask, className = _b.className, style = _b.style, steps = _b.steps, _c = this.state, visible = _c.visible, currentIndex = _c.currentIndex, rootCls = classNames(prefixCls + "-fixed", (_a = {},
            _a[className] = className,
            _a)), isFirstStep = currentIndex <= 0, isLastStep = currentIndex >= this.totalCount - 1;
        if (mode != 'fixed') {
            return null;
        }
        return (React.createElement(ConfigConsumer, { componentName: "Guide" }, function (Locale) {
            var _a = Locale.prevBtnText, prevBtnText = _a === void 0 ? '上一步' : _a, _b = Locale.nextBtnText, nextBtnText = _b === void 0 ? '下一步' : _b, _c = Locale.doneBtnText, doneBtnText = _c === void 0 ? '知道了' : _c, _d = Locale.skipBtnText, skipBtnText = _d === void 0 ? '跳过' : _d;
            return (React.createElement(Modal, { className: rootCls, style: __assign({}, style), mask: mask, maskClosable: allowClose, title: _this.renderTitle(steps[currentIndex]), visible: visible, width: 800, footer: React.createElement(React.Fragment, null,
                    React.createElement("div", { key: "skip", className: "skip", onClick: _this.handleClose }, skipBtnText),
                    isFirstStep ? null : (React.createElement(Button, { key: "prev", onClick: _this.handlePrev }, prevBtnText)),
                    React.createElement(Button, { key: "next", type: "primary", onClick: _this.handleNext },
                        isLastStep ? doneBtnText : nextBtnText, " (" + (currentIndex + 1) + "/" + steps.length + ")")), onCancel: _this.handleClose }, steps[currentIndex].content));
        }));
    };
    Guide.propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        mode: PropTypes.string,
        steps: PropTypes.array.isRequired,
        visible: PropTypes.bool,
        counter: PropTypes.bool,
        mask: PropTypes.bool,
        allowClose: PropTypes.bool,
        keyboardControl: PropTypes.bool,
        onClose: PropTypes.func
    };
    Guide.defaultProps = {
        prefixCls: 'fishd-guide',
        mode: 'normal',
        allowClose: false,
        keyboardControl: false,
        visible: false,
        counter: true,
        mask: true,
        steps: []
    };
    return Guide;
}(Component));
export default Guide;
