import * as React from 'react';
import warning from 'warning';
import classNames from 'classnames';
import Icon from '../Icon/index';
import Group from './ButtonGroup';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isString(str: any) {
  return typeof str === 'string';
}

function isUnborderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link';
}

// Insert one space between two chinese characters automatically.
function insertSpace(child: React.ReactChild, needInserted: boolean) {
  // Check the child if is undefined or null.
  if (child == null) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  // strictNullChecks oops.
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return React.cloneElement(child, {}, child.props.children.split('').join(SPACE));
  }
  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      child = child.split('').join(SPACE);
    }
    return <span>{child}</span>;
  }
  return child;
}

export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger' | 'link' | 'text';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: string;
  shape?: ButtonShape;
  size?: ButtonSize;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

type Loading = number | boolean;

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const { type, shape, size, className, children, icon, prefixCls, ghost, loading, ...rest } =
    props;

  const [stateLoading, setLoading] = React.useState<Loading>(!!loading);
  const [clicked, setClicked] = React.useState(false);
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false);

  const timeout = React.useRef<number>();
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();

  const delayTimeoutRef = React.useRef<number>();

  warning(
    !(ghost && isUnborderedButtonType(type)),
    "Button: `link` or `text` button can't be a `ghost` button.",
  );

  // =============== Update Loading ===============
  let loadingOrDelay: Loading;
  if (typeof loading === 'object' && loading.delay) {
    loadingOrDelay = loading.delay || true;
  } else {
    loadingOrDelay = !!loading;
  }

  const fixTwoCNChar = () => {
    if (!buttonRef?.current) {
      return;
    }
    const buttonText = buttonRef.current.textContent;
    if (isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  };

  React.useEffect(() => {
    clearTimeout(delayTimeoutRef.current);
    if (typeof loadingOrDelay === 'number') {
      delayTimeoutRef.current = window.setTimeout(() => {
        setLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setLoading(loadingOrDelay);
    }
  }, [loadingOrDelay]);

  React.useEffect(fixTwoCNChar, [buttonRef]);

  React.useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    if (!isUnborderedButtonType(type)) {
      // Add click effect
      setClicked(true);
      clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => setClicked(false), 500);
    }

    const onClick = props.onClick;
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  const isNeedInserted = () => {
    const { icon, children } = props;
    return React.Children.count(children) === 1 && !icon && !isUnborderedButtonType(type);
  };

  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    default:
      break;
  }

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-icon-only`]: !children && icon,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-clicked`]: clicked,
    [`${prefixCls}-background-ghost`]: ghost && !isUnborderedButtonType(type),
    [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar,
  });

  const iconType = loading ? 'load-line' : icon;
  const iconNode = iconType ? <Icon type={iconType} spinning={!!stateLoading} /> : null;
  const kids =
    children || children === 0
      ? React.Children.map(children, child =>
          insertSpace(child as React.ReactChild, isNeedInserted()),
        )
      : null;

  if ('href' in rest) {
    return (
      <a {...rest} className={classes} onClick={handleClick} ref={buttonRef}>
        {iconNode}
        {kids}
      </a>
    );
  } else {
    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    const { htmlType, ...otherProps } = rest;

    return (
      <button
        {...otherProps}
        type={htmlType || 'button'}
        className={classes}
        onClick={handleClick}
        ref={buttonRef}
      >
        {iconNode}
        {kids}
      </button>
    );
  }
};

const ButtonRef = React.forwardRef<unknown, ButtonProps>(InternalButton);

type ButtonRefInterface = typeof ButtonRef;

interface ButtonInterface extends ButtonRefInterface {
  Group: typeof Group;
  __FISHD_BUTTON: boolean;
}

const Button = ButtonRef as ButtonInterface;

Button.displayName = 'Button';

Button.defaultProps = {
  prefixCls: 'fishd-btn',
  loading: false,
  ghost: false,
};

Button.Group = Group;
Button.__FISHD_BUTTON = true;

export default Button;
