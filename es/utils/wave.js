import * as React from 'react';
import { findDOMNode } from 'react-dom';
import TransitionEvents from 'css-animation/lib/Event';
export default class Wave extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = (node) => {
            if (node.className.indexOf('-leave') >= 0) {
                return;
            }
            this.removeExtraStyleNode();
            const { insertExtraNode } = this.props;
            const extraNode = document.createElement('div');
            extraNode.className = 'fishd-click-animating-node';
            const attributeName = insertExtraNode ? 'fishd-click-animating' : 'fishd-click-animating-without-extra-node';
            node.removeAttribute(attributeName);
            node.setAttribute(attributeName, 'true');
            // Get wave color from target
            const waveColor = getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
                getComputedStyle(node).getPropertyValue('border-color') ||
                getComputedStyle(node).getPropertyValue('background-color');
            // Not white or transparnt or grey
            if (waveColor &&
                waveColor !== '#ffffff' &&
                waveColor !== 'rgb(255, 255, 255)' &&
                this.isNotGrey(waveColor) &&
                !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && // any transparent rgba color
                waveColor !== 'transparent') {
                extraNode.style.borderColor = waveColor;
                this.styleForPesudo = document.createElement('style');
                this.styleForPesudo.innerHTML =
                    `[fishd-click-animating-without-extra-node]:after { border-color: ${waveColor}; }`;
                document.body.appendChild(this.styleForPesudo);
            }
            if (insertExtraNode) {
                node.appendChild(extraNode);
            }
            const transitionEnd = () => {
                node.removeAttribute(attributeName);
                this.removeExtraStyleNode();
                if (insertExtraNode) {
                    node.removeChild(extraNode);
                }
                TransitionEvents.removeEndEventListener(node, transitionEnd);
            };
            TransitionEvents.addEndEventListener(node, transitionEnd);
        };
        this.bindAnimationEvent = (node) => {
            if (node.getAttribute('disabled') ||
                node.className.indexOf('disabled') >= 0) {
                return;
            }
            const onClick = (e) => {
                // Fix radio button click twice
                if (e.target.tagName === 'INPUT') {
                    return;
                }
                setTimeout(() => this.onClick(node), 0);
            };
            node.addEventListener('click', onClick, true);
            return {
                cancel: () => {
                    node.removeEventListener('click', onClick, true);
                },
            };
        };
    }
    isNotGrey(color) {
        const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
        if (match && match[1] && match[2] && match[3]) {
            return !(match[1] === match[2] && match[2] === match[3]);
        }
        return true;
    }
    removeExtraStyleNode() {
        if (this.styleForPesudo && document.body.contains(this.styleForPesudo)) {
            document.body.removeChild(this.styleForPesudo);
            this.styleForPesudo = null;
        }
    }
    componentDidMount() {
        this.instance = this.bindAnimationEvent(findDOMNode(this));
    }
    componentWillUnmount() {
        if (this.instance) {
            this.instance.cancel();
        }
    }
    render() {
        return this.props.children;
    }
}
