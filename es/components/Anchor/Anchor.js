import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Affix from '../Affix';
import { getScroll, addEventListener } from '../../utils';
import raf from 'raf';
function getDefaultContainer() {
    return window;
}
function getOffsetTop(element, container) {
    if (!element) {
        return 0;
    }
    if (!element.getClientRects().length) {
        return 0;
    }
    const rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
        if (container === window) {
            container = element.ownerDocument.documentElement;
            return rect.top - container.clientTop;
        }
        return rect.top - container.getBoundingClientRect().top;
    }
    return rect.top;
}
function easeInOutCubic(t, b, c, d) {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return cc / 2 * t * t * t + b;
    }
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
}
const sharpMatcherRegx = /#([^#]+)$/;
function scrollTo(href, offsetTop = 0, getContainer, callback = () => {
}) {
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
        }
        else {
            container.scrollTop = nextScrollTop;
        }
        if (time < 450) {
            raf(frameFunc);
        }
        else {
            callback();
        }
    };
    raf(frameFunc);
}
export default class Anchor extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            activeLink: null,
        };
        this.links = [];
        this.handleScroll = () => {
            if (this.animating) {
                return;
            }
            const { offsetTop, bounds } = this.props;
            this.setState({
                activeLink: this.getCurrentAnchor(offsetTop, bounds),
            });
        };
        this.handleScrollTo = (link) => {
            const { offsetTop, getContainer } = this.props;
            this.animating = true;
            this.setState({ activeLink: link });
            scrollTo(link, offsetTop, getContainer, () => {
                this.animating = false;
            });
        };
        this.updateInk = () => {
            if (typeof document === 'undefined') {
                return;
            }
            const { prefixCls } = this.props;
            const anchorNode = ReactDOM.findDOMNode(this);
            const linkNode = anchorNode.getElementsByClassName(`${prefixCls}-link-title-active`)[0];
            if (linkNode) {
                this.inkNode.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
            }
        };
        this.saveInkNode = (node) => {
            this.inkNode = node;
        };
    }
    getChildContext() {
        const fishdAnchor = {
            registerLink: (link) => {
                if (!this.links.includes(link)) {
                    this.links.push(link);
                }
            },
            unregisterLink: (link) => {
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
        const { getContainer } = this.props;
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
    getCurrentAnchor(offsetTop = 0, bounds = 5) {
        let activeLink = '';
        if (typeof document === 'undefined') {
            return activeLink;
        }
        const linkSections = [];
        const { getContainer } = this.props;
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
            const maxSection = linkSections.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
            return maxSection.link;
        }
        return '';
    }
    render() {
        const { prefixCls, className = '', style, offsetTop, affix, showInkInFixed, children, getContainer, } = this.props;
        const { activeLink } = this.state;
        const inkClass = classNames(`${prefixCls}-ink-ball`, {
            visible: activeLink,
        });
        const wrapperClass = classNames(className, `${prefixCls}-wrapper`);
        const anchorClass = classNames(prefixCls, {
            'fixed': !affix && !showInkInFixed,
        });
        const wrapperStyle = Object.assign({ maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh' }, style);
        const anchorContent = (React.createElement("div", { className: wrapperClass, style: wrapperStyle },
            React.createElement("div", { className: anchorClass },
                React.createElement("div", { className: `${prefixCls}-ink` },
                    React.createElement("span", { className: inkClass, ref: this.saveInkNode })),
                children)));
        return !affix ? anchorContent : (React.createElement(Affix, { offsetTop: offsetTop, target: getContainer }, anchorContent));
    }
}
Anchor.defaultProps = {
    prefixCls: 'fishd-anchor',
    affix: true,
    showInkInFixed: false,
    getContainer: getDefaultContainer,
};
Anchor.childContextTypes = {
    fishdAnchor: PropTypes.object,
};
