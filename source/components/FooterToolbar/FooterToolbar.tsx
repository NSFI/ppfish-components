import * as React from 'react';
import classNames from 'classnames';
import { addEventListener } from '../../utils';

interface FooterToolbarProps {
  children: React.ReactNode;
  prefixCls?: string;
  className?: string;
  target?: () => HTMLElement | Window | null;
  style?: React.CSSProperties;
}

const FooterToolbar: React.FC<FooterToolbarProps> = props => {
  const { children, className, prefixCls, style, target } = props;
  const [offset, setOffset] = React.useState(0);

  const wrapperRef = React.useRef(null);

  const setToolbarPosition = () => {
    const wrapper = wrapperRef.current;
    const { height } = getComputedStyle(wrapper);
    const wrapperHeight = Number.parseInt(height);

    let targetElement: null | Window | HTMLElement = document.documentElement;
    if (target && typeof target === 'function' && target() !== window) {
      targetElement = target();
    }
    const offsetObj = {
      containerHeight: (targetElement as HTMLElement).clientHeight,
      containerScrollTop: (targetElement as HTMLElement).scrollTop,
    };

    const offset = offsetObj.containerHeight + offsetObj.containerScrollTop - wrapperHeight;
    const maxOffset = (targetElement as HTMLElement).scrollHeight - wrapperHeight;
    const nextOffset = offset > maxOffset ? maxOffset : offset;
    setOffset(nextOffset);
  };

  React.useEffect(() => {
    setToolbarPosition();
    const target = props.target?.() || window;
    const scrollListener = addEventListener(target, 'scroll', () => {
      setToolbarPosition();
    });

    const resizeListener = addEventListener(window, 'resize', () => {
      setToolbarPosition();
    });

    return () => {
      scrollListener?.remove?.();

      resizeListener?.remove?.();
    };
  }, []);

  const toolbarStyle: React.CSSProperties = {
    ...style,
    position: 'absolute',
    top: offset,
  };
  return (
    <div
      className={classNames({ [className]: true, [prefixCls]: true })}
      style={toolbarStyle}
      ref={wrapperRef}
    >
      <div className={`${prefixCls}-inner`}>{children}</div>
    </div>
  );
};

FooterToolbar.defaultProps = {
  children: null,
  className: '',
  prefixCls: 'fishd-footer-toolbar',
};

export default FooterToolbar;
