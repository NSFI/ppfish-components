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
import * as React from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import Modal from '../Modal';
import Icon from '../Icon';
var VideoModal = /** @class */ (function (_super) {
    __extends(VideoModal, _super);
    function VideoModal(props) {
        var _this = _super.call(this, props) || this;
        _this.handleOnClose = function () {
            _this.props.onCancel();
        };
        return _this;
    }
    VideoModal.prototype.render = function () {
        var _a = this.props, prefixCls = _a.prefixCls, children = _a.children, closable = _a.closable, _b = _a.wrapClassName, wrapClassName = _b === void 0 ? '' : _b, maskStyle = _a.maskStyle;
        var MODAL_WRAP = prefixCls + "-modal-wrap";
        var otherProps = omit(this.props, [
            'prefixCls',
            'wrapClassName',
            'title',
            'footer',
            'maskStyle',
            'closable'
        ]);
        var modalProps = __assign(__assign({}, otherProps), { wrapClassName: wrapClassName + " " + MODAL_WRAP, className: 'fishd-modal', maskStyle: maskStyle ? maskStyle : { backgroundColor: 'rgba(0,0,0,0.2)' }, 
            // 不显示Modal自带的关闭按钮
            closable: false, title: null, footer: null });
        var content = (React.createElement("div", { className: prefixCls + "-content" },
            children,
            React.createElement("div", { className: prefixCls + "-header" }, closable ? (React.createElement(Icon, { type: "picture-close", className: "icon-close", onClick: this.handleOnClose })) : null)));
        return (React.createElement(Modal, __assign({}, modalProps),
            React.createElement("div", { className: prefixCls + "-inner" }, content)));
    };
    VideoModal.propTypes = {
        prefixCls: PropTypes.string,
        children: PropTypes.node,
        wrapClassName: PropTypes.string,
        maskStyle: PropTypes.object,
        visible: PropTypes.bool.isRequired,
        draggable: PropTypes.bool,
        mask: PropTypes.bool,
        closable: PropTypes.bool,
        onCancel: PropTypes.func,
        afterClose: PropTypes.func,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };
    VideoModal.defaultProps = {
        prefixCls: 'fishd-video-modal',
        visible: false,
        draggable: false,
        closable: true,
        mask: false,
        width: 640
    };
    return VideoModal;
}(React.Component));
export default VideoModal;
