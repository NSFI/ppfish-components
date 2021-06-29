import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '../Icon';
import { composeRef } from 'rc-util/lib/ref';
import classNames from 'classnames';

export interface AvatarProps {
  /** Shape of avatar, options:`circle`, `square` */
  shape?: 'circle' | 'square';
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size?: 'large' | 'small' | 'default' | number;
  /** Src of image avatar */
  src?: string;
  /** Type of the Icon to be used in avatar */
  icon?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  children?: any;
  alt?: string;
  /* callback when img load error */
  /* return false to prevent Avatar show default fallback behavior, then you can do fallback by your self*/
  onError?: () => boolean;
}

export interface AvatarState {
  scale: number;
  isImgExist: boolean;
}

const InternalAvatar: React.ForwardRefRenderFunction<unknown, AvatarProps> = (props, ref) => {
  const [scale, setScale] = React.useState(1);
  const [mounted, setMounted] = React.useState(false);
  const [isImgExist, setIsImgExist] = React.useState(!!props.src);
  const avatarNodeRef = React.useRef<HTMLElement>();
  const avatarChildrenRef = React.useRef<HTMLElement>();

  // fill ref to avatarNode and prop.ref
  const avatarNodeMergeRef = composeRef(ref, avatarNodeRef);

  React.useEffect(() => {
    setScaleParam();
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setScaleParam();
  }, [props.children, isImgExist]);

  React.useEffect(() => {
    if (scale === 1) {
      setScaleParam();
    }
  }, [scale]);

  const setScaleParam = () => {
    const childrenNode = avatarChildrenRef.current;
    if (childrenNode) {
      const childrenWidth = childrenNode.offsetWidth;
      const avatarNode = avatarNodeRef.current;
      const avatarWidth = avatarNode.getBoundingClientRect().width;
      // add 4px gap for each side to get better performance
      if (avatarWidth - 8 < childrenWidth) {
        setScale((avatarWidth - 8) / childrenWidth);
      } else {
        setScale(1);
      }
    }
  };

  const handleImgLoadError = () => {
    const { onError } = props;
    const errorFlag = onError ? onError() : undefined;
    if (errorFlag !== false) {
      setIsImgExist(false);
    }
  };

  const { prefixCls, shape, size, src, icon, className, alt, ...others } = props;

  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small',
  });

  const classString = classNames(prefixCls, className, sizeCls, {
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-image`]: src && isImgExist,
    [`${prefixCls}-icon`]: icon,
  });

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
          fontSize: icon ? size / 2 : 18,
        }
      : {};

  let children = props.children;
  if (src && isImgExist) {
    children = <img src={src} onError={handleImgLoadError} alt={alt} />;
  } else if (icon) {
    children = <Icon type={icon} />;
  } else {
    if (mounted || scale !== 1) {
      const transformString = `scale(${scale}) translateX(-50%)`;
      const childrenStyle: React.CSSProperties = {
        msTransform: transformString,
        WebkitTransform: transformString,
        transform: transformString,
      };
      const sizeChildrenStyle: React.CSSProperties =
        typeof size === 'number'
          ? {
              lineHeight: `${size}px`,
            }
          : {};
      children = (
        <span
          className={`${prefixCls}-string`}
          ref={span => (avatarChildrenRef.current = span)}
          style={{ ...sizeChildrenStyle, ...childrenStyle }}
        >
          {children}
        </span>
      );
    } else {
      children = (
        <span
          style={{ opacity: 0 }}
          className={`${prefixCls}-string`}
          ref={span => (avatarChildrenRef.current = span)}
        >
          {children}
        </span>
      );
    }
  }
  return (
    <span
      {...others}
      style={{ ...sizeStyle, ...others.style }}
      className={classString}
      ref={avatarNodeMergeRef as any}
    >
      {children}
    </span>
  );
};

const Avatar = React.forwardRef(InternalAvatar);

Avatar.displayName = 'Avatar';

Avatar.defaultProps = {
  prefixCls: 'fishd-avatar',
  shape: 'circle',
  size: 'default',
};

export default Avatar;
