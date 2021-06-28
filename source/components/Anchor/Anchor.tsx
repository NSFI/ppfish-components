import * as React from 'react';
import classNames from 'classnames';
import { addEventListener, getScroll } from '../../utils';
import Affix from '../Affix';
import AnchorLink from './AnchorLink';
import AnchorContext from './context';
import raf from 'raf';

export type AnchorContainer = HTMLElement | Window;

function getDefaultContainer() {
  return window;
}

function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument!.documentElement!;
      return rect.top - container.clientTop;
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top;
  }

  return rect.top;
}

function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}

const sharpMatcherRegx = /#([^#]+)$/;

function scrollTo(
  href: string,
  offsetTop = 0,
  getContainer: () => AnchorContainer,
  callback = () => {},
) {
  const container = getContainer();
  const scrollTop = getScroll(container, true);
  const sharpLinkMatch = sharpMatcherRegx.exec(href);
  if (!sharpLinkMatch) {
    return;
  }
  const targetElement = document.getElementById(sharpLinkMatch[1]);
  if (!targetElement) {
    return;
  }
  const eleOffsetTop = getOffsetTop(targetElement, container);
  const targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
  const startTime = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);
    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      (container as HTMLElement).scrollTop = nextScrollTop;
    }
    if (time < 450) {
      raf(frameFunc);
    } else {
      callback();
    }
  };
  raf(frameFunc);
}

type Section = {
  link: string;
  top: number;
};

export interface AnchorProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  offsetTop?: number;
  bounds?: number;
  affix?: boolean;
  showInkInFixed?: boolean;
  inkPosition?: 'left' | 'right';
  getContainer?: () => AnchorContainer;
  /** Return customize highlight anchor */
  getCurrentAnchor?: () => string;
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string },
  ) => void;
  /** Scroll to target offset value, if none, it's offsetTop prop value or 0. */
  targetOffset?: number;
  /** Listening event when scrolling change active link */
  onChange?: (currentActiveLink: string) => void;
}

export interface FishdAnchor {
  registerLink: (link: string) => void;
  unregisterLink: (link: string) => void;
  activeLink: string | null;
  scrollTo: (link: string) => void;
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string },
  ) => void;
}

export interface AnchorState {
  activeLink: null | string;
}

interface CompoundAnchor extends React.FC<AnchorProps> {
  Link?: typeof AnchorLink;
}

const Anchor: CompoundAnchor = props => {
  const { getContainer } = props;

  const [activeLink, setActiveLink] = React.useState<AnchorState['activeLink']>();
  const wrapperRef = React.useRef<HTMLElement>();
  const inkNode = React.useRef<HTMLElement>();
  // scroll scope's container
  const scrollContainer = React.useRef<AnchorContainer>();
  const links = React.useRef<string[]>([]);
  const scrollEvent = React.useRef<any>();
  const animating = React.useRef<boolean>(false);

  // Context
  const registerLink = (link: string) => {
    if (!links.current.includes(link)) {
      links.current.push(link);
    }
  };

  const unregisterLink = (link: string) => {
    const index = links.current.indexOf(link);
    if (index !== -1) {
      links.current.splice(index, 1);
    }
  };

  const handleScroll = () => {
    if (animating.current) {
      return;
    }
    const { offsetTop, bounds, targetOffset } = props;
    const currentActiveLink = getCurrentAnchor(
      targetOffset !== undefined ? targetOffset : offsetTop || 0,
      bounds,
    );
    setCurrentActiveLink(currentActiveLink);
  };

  React.useEffect(() => {
    scrollContainer.current = getContainer();
    scrollEvent.current = addEventListener(scrollContainer.current, 'scroll', handleScroll);
    handleScroll();

    return () => {
      if (scrollEvent.current) {
        scrollEvent.current.remove();
      }
    };
  }, []);

  React.useEffect(() => {
    if (scrollEvent.current) {
      const currentContainer = getContainer();
      if (scrollContainer.current !== currentContainer) {
        scrollContainer.current = currentContainer;
        scrollEvent.current.remove();
        scrollEvent.current = addEventListener(scrollContainer.current, 'scroll', handleScroll);
        handleScroll();
      }
    }
    updateInk();
  });

  const getCurrentAnchor = (offsetTop = 0, bounds = 5): string => {
    const linkSections: Array<Section> = [];
    const container = getContainer();
    links.current.forEach(link => {
      const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = getOffsetTop(target, container);
        if (top < offsetTop + bounds) {
          linkSections.push({
            link,
            top,
          });
        }
      }
    });

    if (linkSections.length) {
      const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
      return maxSection.link;
    }
    return '';
  };

  const handleScrollTo = (link: string) => {
    const { offsetTop, targetOffset } = props;

    setCurrentActiveLink(link);
    const container = getContainer();
    const scrollTop = getScroll(container, true);
    const sharpLinkMatch = sharpMatcherRegx.exec(link);
    if (!sharpLinkMatch) {
      return;
    }
    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
      return;
    }

    const eleOffsetTop = getOffsetTop(targetElement, container);
    let y = scrollTop + eleOffsetTop;
    y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
    animating.current = true;

    scrollTo(link, offsetTop, getContainer, () => {
      animating.current = false;
    });
  };

  const saveInkNode = (node: HTMLSpanElement) => {
    inkNode.current = node;
  };

  const setCurrentActiveLink = (link: string) => {
    const { onChange, getCurrentAnchor } = props;
    if (activeLink === link) {
      return;
    }

    setActiveLink(typeof getCurrentAnchor === 'function' ? getCurrentAnchor() : link);
    onChange?.(link);
  };

  const updateInk = () => {
    const { prefixCls } = props;
    const anchorNode = wrapperRef.current;
    const linkNode = anchorNode?.getElementsByClassName(`${prefixCls}-link-title-active`)[0];

    if (linkNode) {
      inkNode.current.style.top = `${(linkNode as any).offsetTop +
        linkNode.clientHeight / 2 -
        4.5}px`;
    }
  };

  const {
    prefixCls,
    className = '',
    style,
    offsetTop,
    affix,
    showInkInFixed,
    children,
    inkPosition,
  } = props;

  // To support old version react.
  // Have to add prefixCls on the instance.
  // https://github.com/facebook/react/issues/12397
  const inkClass = classNames(`${prefixCls}-ink-ball`, {
    visible: activeLink,
  });

  const wrapperClass = classNames(className, `${prefixCls}-wrapper`);

  const anchorClass = classNames(prefixCls, {
    fixed: !affix && !showInkInFixed,
  });

  const wrapperStyle = {
    maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
    ...style,
  };

  const inkNodeClass = classNames({
    [`${prefixCls}-ink`]: true,
    [`${prefixCls}-ink-left`]: inkPosition === 'left',
    [`${prefixCls}-ink-right`]: inkPosition === 'right',
  });

  const anchorContent = (
    <div
      ref={e => {
        wrapperRef.current = e;
      }}
      className={wrapperClass}
      style={wrapperStyle}
    >
      <div className={anchorClass}>
        <div className={inkNodeClass}>
          <span className={inkClass} ref={saveInkNode} />
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <AnchorContext.Provider
      value={{
        registerLink,
        unregisterLink,
        activeLink,
        scrollTo: handleScrollTo,
        onClick: props.onClick,
      }}
    >
      {!affix ? (
        anchorContent
      ) : (
        <Affix offsetTop={offsetTop} target={getContainer}>
          {anchorContent}
        </Affix>
      )}
    </AnchorContext.Provider>
  );
};

Anchor.defaultProps = {
  prefixCls: 'fishd-anchor',
  inkPosition: 'left',
  affix: true,
  showInkInFixed: false,
  getContainer: getDefaultContainer,
};

export default Anchor;
