import * as React from 'react';
import Animate from 'rc-animate';
import Icon from '../Icon';
import classNames from 'classnames';

function noop() {}

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

const Alert: React.FC<AlertProps> = props => {
  const { onClose,afterClose } = props;
  const ref = React.useRef<React.ReactNode>();
  const [closing, setClosing] = React.useState<boolean>(true);
  const [closed, setClosed] = React.useState<boolean>(false);

  const handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    let dom = ref.current as HTMLElement;
    dom.style.height = `${dom.offsetHeight}px`;
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = `${dom.offsetHeight}px`;

    setClosing(false);
    (onClose || noop)(e);
  };
  const animationEnd = () => {
    setClosed(true);
    setClosing(true);
    (afterClose || noop)();
  };

  let {
    closable,
    description,
    type,
    prefixCls = 'fishd-alert',
    message,
    closeText,
    showIcon,
    banner,
    className = '',
    style,
    iconType
  } = props;

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
    if (description) {
      iconType += '-o';
    }
  }

  let alertCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-close`]: !closing,
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !showIcon,
      [`${prefixCls}-banner`]: !!banner
    },
    className
  );

  // closeable when closeText is assigned
  if (closeText) {
    closable = true;
  }

  const closeIcon = closable ? (
    <a onClick={handleClose} className={`${prefixCls}-close-icon`}>
      {closeText || <Icon type="close-modal-line" />}
    </a>
  ) : null;

  const dataOrAriaProps = getDataOrAriaProps(props);

  return closed ? null : (
    <Animate
      component=""
      showProp="data-show"
      transitionName={`${prefixCls}-slide-up`}
      onEnd={animationEnd}
    >
      <div ref={ref} data-show={closing} className={alertCls} style={style} {...dataOrAriaProps}>
        {showIcon ? <Icon className={`${prefixCls}-icon`} type={iconType} /> : null}
        <span className={`${prefixCls}-message`}>{message}</span>
        <span className={`${prefixCls}-description`}>{description}</span>
        {closeIcon}
      </div>
    </Animate>
  );
};

export default Alert;
