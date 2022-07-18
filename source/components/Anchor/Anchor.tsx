import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Affix from '../Affix';
import AnchorLink from './AnchorLink';
import { getScroll, addEventListener } from '../../utils';
import raf from 'raf';

function getDefaultContainer() {
  return window;
}

function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument!.documentElement;
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

export type AnchorContainer = HTMLElement | Window;

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
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string },
  ) => void;
}

export interface AnchorState {
  activeLink: null | string;
}

export interface AnchorDefaultProps extends AnchorProps {
  prefixCls: string;
  affix: boolean;
  showInkInFixed: boolean;
  getContainer: () => AnchorContainer;
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

export default class Anchor extends React.Component<AnchorProps, AnchorState> {
  static Link: typeof AnchorLink;

  static defaultProps = {
    prefixCls: 'fishd-anchor',
    inkPosition: 'left',
    affix: true,
    showInkInFixed: false,
    getContainer: getDefaultContainer,
  };

  static childContextTypes = {
    fishdAnchor: PropTypes.object,
  };

  state = {
    activeLink: null,
  };

  private inkNode: HTMLSpanElement = null;
  private links: string[] = [];
  private scrollEvent: any = null;
  private animating: boolean = false;

  getChildContext() {
    const fishdAnchor: FishdAnchor = {
      registerLink: (link: string) => {
        if (!this.links.includes(link)) {
          this.links.push(link);
        }
      },
      unregisterLink: (link: string) => {
        const index = this.links.indexOf(link);
        if (index !== -1) {
          this.links.splice(index, 1);
        }
      },
      activeLink: this.state.activeLink,
      scrollTo: this.handleScrollTo,
      onClick: this.props.onClick,
    };
    return { fishdAnchor };
  }

  componentDidMount() {
    const { getContainer } = this.props as AnchorDefaultProps;
    this.scrollEvent = addEventListener(getContainer(), 'scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  componentDidUpdate() {
    this.updateInk();
  }

  handleScroll = () => {
    if (this.animating) {
      return;
    }
    const { offsetTop, bounds } = this.props;
    this.setState({
      activeLink: this.getCurrentAnchor(offsetTop, bounds),
    });
  };

  handleScrollTo = (link: string) => {
    const { offsetTop, getContainer } = this.props as AnchorDefaultProps;
    this.animating = true;
    this.setState({ activeLink: link });
    scrollTo(link, offsetTop, getContainer, () => {
      this.animating = false;
    });
  };

  getCurrentAnchor(offsetTop = 0, bounds = 5): string {
    const activeLink = '';
    if (typeof document === 'undefined') {
      return activeLink;
    }

    const linkSections: Array<Section> = [];
    const { getContainer } = this.props as AnchorDefaultProps;
    const container = getContainer();
    this.links.forEach(link => {
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
  }

  updateInk = () => {
    if (typeof document === 'undefined') {
      return;
    }
    const { prefixCls } = this.props;
    const anchorNode = ReactDOM.findDOMNode(this) as Element;
    const activeLinkNode = anchorNode.getElementsByClassName(`${prefixCls}-link-active`)[0];
    if (activeLinkNode) {
      this.inkNode.style.top = `${(activeLinkNode as any).offsetTop}px`;
      this.inkNode.style.height = `${(activeLinkNode as any).offsetHeight}px`;
    }
  };

  saveInkNode = (node: HTMLSpanElement) => {
    this.inkNode = node;
  };

  render() {
    const {
      prefixCls,
      className = '',
      style,
      offsetTop,
      affix,
      showInkInFixed,
      children,
      getContainer,
      inkPosition,
    } = this.props;
    const { activeLink } = this.state;

    const inkClass = classNames(`${prefixCls}-ink-ball`, {
      visible: activeLink,
      left: inkPosition === 'left',
      right: inkPosition === 'right',
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
      <div className={wrapperClass} style={wrapperStyle}>
        <div className={anchorClass}>
          <div className={inkNodeClass}>
            <span className={inkClass} ref={this.saveInkNode} />
          </div>
          {children}
        </div>
      </div>
    );

    return !affix ? (
      anchorContent
    ) : (
      <Affix offsetTop={offsetTop} target={getContainer}>
        {anchorContent}
      </Affix>
    );
  }
}
