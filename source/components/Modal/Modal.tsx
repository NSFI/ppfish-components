import * as React from "react";
import Dialog from "./DialogWrap";
import * as PropTypes from "prop-types";
import { addEventListener } from "../../utils/index";
import Button from "../Button";
import { ButtonType, NativeButtonProps } from "../Button/Button";

import "./style/index.less";

let mousePosition: { x: number; y: number } | null;
let mousePositionEventBinded: boolean;

export interface ModalProps {
  /** 对话框是否可见*/
  visible?: boolean;
  /** 确定按钮 loading*/
  confirmLoading?: boolean;
  /** 标题*/
  title?: React.ReactNode | string;
  /** 是否显示右上角的关闭按钮*/
  closable?: boolean;
  /** 点击确定回调*/
  onOk?: (e: React.MouseEvent<any>) => void;
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
  onCancel?: (e: React.MouseEvent<any>) => void;
  afterClose?: () => void;
  /** 宽度*/
  width?: string | number;
  /** 底部内容*/
  footer?: React.ReactNode;
  /** 确认按钮文字*/
  okText?: string;
  /** 确认按钮类型*/
  okType?: ButtonType;
  /** 取消按钮文字*/
  cancelText?: string;
  /** 点击蒙层是否允许关闭*/
  maskClosable?: boolean;
  okButtonProps?: NativeButtonProps;
  cancelButtonProps?: NativeButtonProps;
  okButtonDisabled?: boolean,
  cancelButtonDisabled?: boolean,
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  getContainer?: () => HTMLElement;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  esc?: boolean;
  wrapProps?: any;
}

export interface ModalFuncProps {
  prefixCls?: string;
  className?: string;
  visible?: boolean;
  title?: React.ReactNode;
  content?: React.ReactNode;
  onOk?: (...args: any[]) => any | PromiseLike<any>;
  onCancel?: (...args: any[]) => any | PromiseLike<any>;
  width?: string | number;
  iconClassName?: string;
  okText?: string;
  okType?: ButtonType;
  cancelText?: string;
  iconType?: string;
  maskClosable?: boolean;
  zIndex?: number;
  okCancel?: boolean;
  style?: React.CSSProperties;
  type?: string;
  esc?: boolean;
}

export type ModalFunc = (
  props: ModalFuncProps
) => {
  destroy: () => void;
};

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

export default class Modal extends React.Component<ModalProps, {}> {
  static info: ModalFunc;
  static success: ModalFunc;
  static error: ModalFunc;
  static warn: ModalFunc;
  static warning: ModalFunc;
  static confirm: ModalFunc;

  static defaultProps = {
    prefixCls: "fishd-modal",
    width: 560,
    transitionName: "fishd-modal-zoom",
    maskTransitionName: "",
    confirmLoading: false,
    visible: false,
    okType: "primary" as ButtonType,
    okButtonDisabled: false,
    cancelButtonDisabled: false,
    draggable: false,
    maskClosable: false,
    esc: false,
    okText: "确定",
    cancelText: "取消",
    justOkText: "知道了"
  };

  static propTypes = {
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

  handleCancel = (e: React.MouseEvent<any>) => {
    const onCancel = this.props.onCancel;
    if (onCancel) {
      onCancel(e);
    }
  };

  handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const onOk = this.props.onOk;
    if (onOk) {
      onOk(e);
    }
  };

  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    addEventListener(document.documentElement, "click", (e: MouseEvent) => {
      mousePosition = {
        x: e.pageX,
        y: e.pageY
      };
      // 100ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => (mousePosition = null), 100);
    });
    mousePositionEventBinded = true;
  }

  render() {
    const {
      footer,
      visible,
      okText,
      okType,
      cancelText,
      confirmLoading,
      cancelButtonDisabled,
      okButtonDisabled,
      cancelButtonProps,
      okButtonProps
    } = this.props;
    const defaultFooter = (
      <div>
        <Button
          onClick={this.handleCancel}
          disabled={cancelButtonDisabled}
          {...cancelButtonProps}
        >
          {cancelText}
        </Button>
        <Button
          type={okType}
          loading={confirmLoading}
          onClick={this.handleOk}
          disabled={okButtonDisabled}
          {...okButtonProps}
        >
          {okText}
        </Button>
      </div>
    );
    return (
      <Dialog
        {...this.props}
        footer={footer === undefined ? defaultFooter : footer}
        visible={visible}
        mousePosition={mousePosition}
        onClose={this.handleCancel}
      />
    );
  }
}
