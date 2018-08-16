import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../Icon';
import classNames from 'classnames';

import './style/index.less';

function noop() { }

function getDataOrAriaProps(props: any) {
  return Object.keys(props).reduce((prev: any, key: string) => {
    if (
      (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') &&
      key.substr(0, 7) !== 'data-__'
    ) {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}


export interface AlertProps {
  /**
   * Type of Alert styles, options:`success`, `info`, `warning`, `error`
   */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** Whether Alert can be closed */
  closable?: boolean;
  /** Close text to show */
  closeText?: React.ReactNode;
  /** Content of Alert */
  message: React.ReactNode;
  /** Additional content of Alert */
  description?: React.ReactNode;
  /** Callback when close Alert */
  onClose?: React.MouseEventHandler<HTMLAnchorElement>;
  /** Trigger when animation ending of Alert */
  afterClose?: () => void;
  /** Whether to show icon */
  showIcon?: boolean;
  iconType?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  banner?: boolean;
}

export default class Alert extends React.Component<AlertProps, any> {
  constructor(props: AlertProps) {
    super(props);
    this.state = {
      closing: true,
      closed: false,
    };
  }
  handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    let dom = ReactDOM.findDOMNode(this) as HTMLElement;
    dom.style.height = `${dom.offsetHeight}px`;
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = `${dom.offsetHeight}px`;

    this.setState({
      closing: false,
    });
    (this.props.onClose || noop)(e);
  }
  animationEnd = () => {
    this.setState({
      closed: true,
      closing: true,
    });
    (this.props.afterClose || noop)();
  }
  render() {
    let {
      closable, description, type, prefixCls = 'fishd-alert', message, closeText, showIcon, banner,
      className = '', style, iconType,
    } = this.props;

    // banner模式默认有 Icon
    showIcon = banner && showIcon === undefined ? true : showIcon;
    // banner模式默认为警告
    type = banner && type === undefined ? 'warning' : type || 'info';

    if (!iconType) {
      switch (type) {
        case 'success':
          iconType = 'hints-success';
          break;
        case 'info':
          iconType = 'hints-notification';
          break;
        case 'error':
          iconType = 'hints-error';
          break;
        case 'warning':
          iconType = 'hints-warning';
          break;
        // 展示空icon
        default:
          iconType = 'default';
      }

      // use outline icon in alert with description
      if (!!description) {
        iconType += '-o';
      }
    }

    let alertCls = classNames(prefixCls, {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-close`]: !this.state.closing,
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !showIcon,
      [`${prefixCls}-banner`]: !!banner,
    }, className);

    // closeable when closeText is assigned
    if (closeText) {
      closable = true;
    }

    const closeIcon = closable ? (
      <a onClick={this.handleClose} className={`${prefixCls}-close-icon`}>
        {closeText || <Icon type="close-modal-line" />}
      </a>
    ) : null;

    const dataOrAriaProps = getDataOrAriaProps(this.props);

    return this.state.closed ? null : (
      <Animate
        component=""
        showProp="data-show"
        transitionName={`${prefixCls}-slide-up`}
        onEnd={this.animationEnd}
      >
        <div data-show={this.state.closing} className={alertCls} style={style} {...dataOrAriaProps}>
          {showIcon ? <Icon className={`${prefixCls}-icon`} type={iconType} /> : null}
          <span className={`${prefixCls}-message`}>{message}</span>
          <span className={`${prefixCls}-description`}>{description}</span>
          {closeIcon}
        </div>
      </Animate>
    );
  }
}
