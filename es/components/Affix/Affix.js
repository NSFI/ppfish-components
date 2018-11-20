var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { addEventListener } from '../../utils';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import omit from 'omit.js';
import { throttleByAnimationFrameDecorator } from '../../utils/throttleByAnimationFrame';
import './style/index.less';
function getTargetRect(target) {
    return target !== window ?
        target.getBoundingClientRect() :
        { top: 0, left: 0, bottom: 0 };
}
function getScroll(target, top) {
    if (typeof window === 'undefined') {
        return 0;
    }
    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    const isWindow = target === window;
    let ret = isWindow ? target[prop] : target[method];
    // ie6,7,8 standard mode
    if (isWindow && typeof ret !== 'number') {
        ret = window.document.documentElement[method];
    }
    return ret;
}
function getOffset(element, target) {
    const elemRect = element.getBoundingClientRect();
    const targetRect = getTargetRect(target);
    const scrollTop = getScroll(target, true);
    const scrollLeft = getScroll(target, false);
    const docElem = window.document.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;
    return {
        top: elemRect.top - targetRect.top +
            scrollTop - clientTop,
        left: elemRect.left - targetRect.left +
            scrollLeft - clientLeft,
        width: elemRect.width,
        height: elemRect.height,
    };
}
function noop() { }
function getDefaultTarget() {
    return typeof window !== 'undefined' ? window : null;
}
export default class Affix extends React.Component {
    constructor() {
        super(...arguments);
        this.events = [
            'resize',
            'scroll',
            'touchstart',
            'touchmove',
            'touchend',
            'pageshow',
            'load',
        ];
        this.eventHandlers = {};
        this.state = {
            affixStyle: undefined,
            placeholderStyle: undefined,
        };
        this.saveFixedNode = (node) => {
            this.fixedNode = node;
        };
        this.savePlaceholderNode = (node) => {
            this.placeholderNode = node;
        };
    }
    setAffixStyle(e, affixStyle) {
        const { onChange = noop, target = getDefaultTarget } = this.props;
        const originalAffixStyle = this.state.affixStyle;
        const isWindow = target() === window;
        if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
            return;
        }
        if (shallowequal(affixStyle, originalAffixStyle)) {
            return;
        }
        this.setState({ affixStyle: affixStyle }, () => {
            const affixed = !!this.state.affixStyle;
            if ((affixStyle && !originalAffixStyle) ||
                (!affixStyle && originalAffixStyle)) {
                onChange(affixed);
            }
        });
    }
    setPlaceholderStyle(placeholderStyle) {
        const originalPlaceholderStyle = this.state.placeholderStyle;
        if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
            return;
        }
        this.setState({ placeholderStyle: placeholderStyle });
    }
    syncPlaceholderStyle(e) {
        const { affixStyle } = this.state;
        if (!affixStyle) {
            return;
        }
        this.placeholderNode.style.cssText = '';
        this.setAffixStyle(e, Object.assign({}, affixStyle, { width: this.placeholderNode.offsetWidth }));
        this.setPlaceholderStyle({
            width: this.placeholderNode.offsetWidth,
        });
    }
    updatePosition(e) {
        let { offsetTop, offsetBottom, offset, target = getDefaultTarget } = this.props;
        const targetNode = target();
        // Backwards support
        // Fix: if offsetTop === 0, it will get undefined,
        //   if offsetBottom is type of number, offsetMode will be { top: false, ... }
        offsetTop = typeof offsetTop === 'undefined' ? offset : offsetTop;
        const scrollTop = getScroll(targetNode, true);
        const affixNode = ReactDOM.findDOMNode(this);
        const elemOffset = getOffset(affixNode, targetNode);
        const elemSize = {
            width: this.fixedNode.offsetWidth,
            height: this.fixedNode.offsetHeight,
        };
        const offsetMode = {
            top: false,
            bottom: false,
        };
        // Default to `offsetTop=0`.
        if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
            offsetMode.top = true;
            offsetTop = 0;
        }
        else {
            offsetMode.top = typeof offsetTop === 'number';
            offsetMode.bottom = typeof offsetBottom === 'number';
        }
        const targetRect = getTargetRect(targetNode);
        const targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;
        if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
            // Fixed Top
            const width = elemOffset.width;
            const top = targetRect.top + offsetTop;
            this.setAffixStyle(e, {
                position: 'fixed',
                top,
                left: targetRect.left + elemOffset.left,
                width,
            });
            this.setPlaceholderStyle({
                width,
                height: elemSize.height,
            });
        }
        else if (scrollTop < elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight &&
            offsetMode.bottom) {
            // Fixed Bottom
            const targetBottomOffet = targetNode === window ? 0 : (window.innerHeight - targetRect.bottom);
            const width = elemOffset.width;
            this.setAffixStyle(e, {
                position: 'fixed',
                bottom: targetBottomOffet + offsetBottom,
                left: targetRect.left + elemOffset.left,
                width,
            });
            this.setPlaceholderStyle({
                width,
                height: elemOffset.height,
            });
        }
        else {
            const { affixStyle } = this.state;
            if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
                this.setAffixStyle(e, Object.assign({}, affixStyle, { width: affixNode.offsetWidth }));
            }
            else {
                this.setAffixStyle(e, null);
            }
            this.setPlaceholderStyle(null);
        }
        if (e.type === 'resize') {
            this.syncPlaceholderStyle(e);
        }
    }
    componentDidMount() {
        const target = this.props.target || getDefaultTarget;
        // Wait for parent component ref has its value
        this.timeout = setTimeout(() => {
            this.setTargetEventListeners(target);
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.target !== nextProps.target) {
            this.clearEventListeners();
            this.setTargetEventListeners(nextProps.target);
            // Mock Event object.
            this.updatePosition({});
        }
        if (this.props.offsetTop !== nextProps.offsetTop ||
            this.props.offsetBottom !== nextProps.offsetBottom) {
            this.updatePosition({});
        }
    }
    componentWillUnmount() {
        this.clearEventListeners();
        clearTimeout(this.timeout);
        this.updatePosition.cancel();
    }
    setTargetEventListeners(getTarget) {
        const target = getTarget();
        if (!target) {
            return;
        }
        this.clearEventListeners();
        this.events.forEach(eventName => {
            this.eventHandlers[eventName] = addEventListener(target, eventName, this.updatePosition);
        });
    }
    clearEventListeners() {
        this.events.forEach(eventName => {
            const handler = this.eventHandlers[eventName];
            if (handler && handler.remove) {
                handler.remove();
            }
        });
    }
    render() {
        const className = classNames({
            [this.props.prefixCls || 'fishd-affix']: this.state.affixStyle,
        });
        const props = omit(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);
        const placeholderStyle = Object.assign({}, this.state.placeholderStyle, this.props.style);
        return (React.createElement("div", Object.assign({}, props, { style: placeholderStyle, ref: this.savePlaceholderNode }),
            React.createElement("div", { className: className, ref: this.saveFixedNode, style: this.state.affixStyle }, this.props.children)));
    }
}
Affix.propTypes = {
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    target: PropTypes.func,
};
__decorate([
    throttleByAnimationFrameDecorator()
], Affix.prototype, "updatePosition", null);
