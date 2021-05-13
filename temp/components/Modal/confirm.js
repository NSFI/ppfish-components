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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _this = this;
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../Icon/index';
import Dialog from './Modal';
import ActionButton from './ActionButton';
import { getRuntimeLocale } from '../Config/Locale/Provider';
var IS_REACT_16 = !!ReactDOM.createPortal;
var ConfirmDialog = function (props) {
    var runtimeLocale = getRuntimeLocale('Modal');
    var onCancel = props.onCancel, onOk = props.onOk, close = props.close, zIndex = props.zIndex, afterClose = props.afterClose, visible = props.visible, esc = props.esc;
    var iconType = props.iconType || 'hints-descriptions';
    var okType = props.okType || 'primary';
    var prefixCls = props.prefixCls || 'fishd-confirm';
    // 默认为 true，保持向下兼容
    var okCancel = 'okCancel' in props ? props.okCancel : true;
    var width = props.width || 416;
    var style = props.style || {};
    // 默认为 false，保持旧版默认行为
    var maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
    var okText = props.okText || runtimeLocale.okText;
    var cancelText = props.cancelText || runtimeLocale.cancelText;
    var classString = classNames(prefixCls, prefixCls + "-" + props.type, props.className);
    var cancelButton = okCancel && (React.createElement(ActionButton, { actionFn: onCancel, closeModal: close }, cancelText));
    return (React.createElement(Dialog, { className: classString, onCancel: close.bind(_this, { triggerCancel: true }), visible: visible, title: "", transitionName: "fishd-modal-zoom", footer: "", maskTransitionName: "", maskClosable: maskClosable, style: style, width: width, zIndex: zIndex, afterClose: afterClose, esc: esc },
        React.createElement("div", { className: prefixCls + "-body-wrapper" },
            React.createElement("div", { className: prefixCls + "-body" },
                React.createElement(Icon, { type: iconType }),
                React.createElement("span", { className: prefixCls + "-title" }, props.title),
                React.createElement("div", { className: prefixCls + "-content" }, props.content)),
            React.createElement("div", { className: prefixCls + "-btns" },
                cancelButton,
                React.createElement(ActionButton, { type: okType, actionFn: onOk, closeModal: close, autoFocus: true }, okText || runtimeLocale.okText)))));
};
export default function confirm(config) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (IS_REACT_16) {
            render(__assign(__assign({}, config), { close: close, visible: false, afterClose: destroy.bind.apply(destroy, __spreadArrays([this], args)) }));
        }
        else {
            destroy.apply(void 0, args);
        }
    }
    function destroy() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        var triggerCancel = args && args.length && args.some(function (param) { return param && param.triggerCancel; });
        if (config.onCancel && triggerCancel) {
            config.onCancel.apply(config, args);
        }
    }
    function render(props) {
        ReactDOM.render(React.createElement(ConfirmDialog, __assign({}, props)), div);
    }
    render(__assign(__assign({}, config), { visible: true, close: close }));
    return {
        destroy: close
    };
}
