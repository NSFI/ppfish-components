import * as React from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import omit from 'omit.js';
import { getScroll, addEventListener } from '../../utils';
import raf from 'raf';

const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  } else {
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
  }
};

function noop() {}

function getDefaultTarget() {
  return window;
}

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<any>;
  target?: () => HTMLElement | Window;
  prefixCls?: string;
  className?: string;
  duration?: number;
  style?: React.CSSProperties;
}

const BackTop: React.FC<BackTopProps> = props => {
  const scrollEvent = React.useRef<any>();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const getTarget = props.target || getDefaultTarget;
    scrollEvent.current = addEventListener(getTarget(), 'scroll', handleScroll);
    handleScroll();

    return () => {
      scrollEvent.current && scrollEvent.current.remove();
    };
  });

  const getCurrentScrollTop = () => {
    const getTarget = props.target || getDefaultTarget;
    const targetNode = getTarget();
    if (targetNode === window) {
      return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    }
    return (targetNode as HTMLElement).scrollTop;
  };

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const {duration} = props;
    const scrollTop = getCurrentScrollTop();
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      setScrollTop(easeInOutCubic(time, scrollTop, 0, duration));
      if (time < duration) {
        raf(frameFunc);
      }
    };
    raf(frameFunc);
    (props.onClick || noop)(e);
  };

  const setScrollTop = (value: number) => {
    const getTarget = props.target || getDefaultTarget;
    const targetNode = getTarget();
    if (targetNode === window) {
      document.body.scrollTop = value;
      document.documentElement.scrollTop = value;
    } else {
      (targetNode as HTMLElement).scrollTop = value;
    }
  };

  const handleScroll = () => {
    const { visibilityHeight, target = getDefaultTarget } = props;
    const scrollTop = getScroll(target(), true);
    setVisible(scrollTop > (visibilityHeight as number));
  };

  const { prefixCls = 'fishd-back-top', className = '', children } = props;
  const classString = classNames(prefixCls, className);

  const defaultElement = (
    <div className={`${prefixCls}-content`}>
      <div className={`${prefixCls}-icon`} />
    </div>
  );

  // fix https://fb.me/react-unknown-prop
  const divProps = omit(props, [
    'prefixCls',
    'className',
    'children',
    'visibilityHeight',
    'target',
  ]);

  const backTopBtn = visible ? (
    <div {...divProps} className={classString} onClick={scrollToTop}>
      {children || defaultElement}
    </div>
  ) : null;

  return (
    <Animate component="" transitionName="fade">
      {backTopBtn}
    </Animate>
  );
};

BackTop.defaultProps = {
  visibilityHeight: 400,
  duration: 450,
};

export default BackTop;
