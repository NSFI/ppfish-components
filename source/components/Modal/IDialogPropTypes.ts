import * as React from 'react';

interface IDialogPropTypes {
  /** 对话框是否可见*/
  visible?: boolean;
  /** 标题*/
  title?: React.ReactNode | string;
  className?: string;
  esc?: boolean;
  style?: React.CSSProperties;
  mask?: boolean;
  children?: any;
  afterClose?: () => any;
  onClose?: (e: React.SyntheticEvent<HTMLDivElement>) => any;
  closable?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  draggable?: boolean;
  mousePosition?: {
    x: number;
    y: number;
  };
  footer?: React.ReactNode;
  transitionName?: string;
  maskTransitionName?: string;
  wrapStyle?: {};
  bodyStyle?: {};
  maskStyle?: {};
  prefixCls?: string;
  wrapClassName?: string;
  width?: string | number;
  height?: number;
  zIndex?: number;
  bodyProps?: any;
  maskProps?: any;
  wrapProps?: any;
  getContainer?: () => HTMLElement;
}

export default IDialogPropTypes;
