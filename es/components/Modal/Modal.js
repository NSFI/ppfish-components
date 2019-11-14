var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

import * as React from "react";
import Dialog from "./DialogWrap";
import * as PropTypes from "prop-types";
import { addEventListener } from "../../utils/index";
import Button from "../Button";
import "./style/index.less";
var mousePosition;
var mousePositionEventBinded;

var Modal =
/** @class */
function (_super) {
  __extends(Modal, _super);

  function Modal() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.handleCancel = function (e) {
      var onCancel = _this.props.onCancel;

      if (onCancel) {
        onCancel(e);
      }
    };

    _this.handleOk = function (e) {
      var onOk = _this.props.onOk;

      if (onOk) {
        onOk(e);
      }
    };

    return _this;
  }

  Modal.prototype.componentDidMount = function () {
    if (mousePositionEventBinded) {
      return;
    } // 只有点击事件支持从鼠标位置动画展开


    addEventListener(document.documentElement, "click", function (e) {
      mousePosition = {
        x: e.pageX,
        y: e.pageY
      }; // 100ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开

      setTimeout(function () {
        return mousePosition = null;
      }, 100);
    });
    mousePositionEventBinded = true;
  };

  Modal.prototype.render = function () {
    var _a = this.props,
        footer = _a.footer,
        visible = _a.visible,
        okText = _a.okText,
        okType = _a.okType,
        cancelText = _a.cancelText,
        confirmLoading = _a.confirmLoading,
        cancelButtonDisabled = _a.cancelButtonDisabled,
        okButtonDisabled = _a.okButtonDisabled,
        cancelButtonProps = _a.cancelButtonProps,
        okButtonProps = _a.okButtonProps;
    var defaultFooter = React.createElement("div", null, React.createElement(Button, __assign({
      onClick: this.handleCancel,
      disabled: cancelButtonDisabled
    }, cancelButtonProps), cancelText), React.createElement(Button, __assign({
      type: okType,
      loading: confirmLoading,
      onClick: this.handleOk,
      disabled: okButtonDisabled
    }, okButtonProps), okText));
    return React.createElement(Dialog, __assign({}, this.props, {
      footer: footer === undefined ? defaultFooter : footer,
      visible: visible,
      mousePosition: mousePosition,
      onClose: this.handleCancel
    }));
  };

  Modal.defaultProps = {
    prefixCls: "fishd-modal",
    width: 560,
    transitionName: "fishd-modal-zoom",
    maskTransitionName: "",
    confirmLoading: false,
    visible: false,
    okType: "primary",
    okButtonDisabled: false,
    cancelButtonDisabled: false,
    draggable: false,
    maskClosable: false,
    esc: false,
    okText: "确定",
    cancelText: "取消",
    justOkText: "知道了"
  };
  Modal.propTypes = {
    prefixCls: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.node,
    cancelText: PropTypes.node,
    draggable: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    confirmLoading: PropTypes.bool,
    visible: PropTypes.bool,
    align: PropTypes.object,
    footer: PropTypes.node,
    title: PropTypes.node,
    closable: PropTypes.bool
  };
  return Modal;
}(React.Component);

export default Modal;