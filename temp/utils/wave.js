var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import TransitionEvents from 'css-animation/lib/Event';
var Wave = /** @class */ (function (_super) {
    __extends(Wave, _super);
    function Wave() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function (node) {
            if (node.className.indexOf('-leave') >= 0) {
                return;
            }
            _this.removeExtraStyleNode();
            var insertExtraNode = _this.props.insertExtraNode;
            var extraNode = document.createElement('div');
            extraNode.className = 'fishd-click-animating-node';
            var attributeName = insertExtraNode
                ? 'fishd-click-animating'
                : 'fishd-click-animating-without-extra-node';
            node.removeAttribute(attributeName);
            node.setAttribute(attributeName, 'true');
            // Get wave color from target
            var waveColor = getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
                getComputedStyle(node).getPropertyValue('border-color') ||
                getComputedStyle(node).getPropertyValue('background-color');
            // Not white or transparnt or grey
            if (waveColor &&
                waveColor !== '#ffffff' &&
                waveColor !== 'rgb(255, 255, 255)' &&
                _this.isNotGrey(waveColor) &&
                !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && // any transparent rgba color
                waveColor !== 'transparent') {
                extraNode.style.borderColor = waveColor;
                _this.styleForPesudo = document.createElement('style');
                _this.styleForPesudo.innerHTML = "[fishd-click-animating-without-extra-node]:after { border-color: " + waveColor + "; }";
                document.body.appendChild(_this.styleForPesudo);
            }
            if (insertExtraNode) {
                node.appendChild(extraNode);
            }
            var transitionEnd = function () {
                node.removeAttribute(attributeName);
                _this.removeExtraStyleNode();
                if (insertExtraNode) {
                    node.removeChild(extraNode);
                }
                TransitionEvents.removeEndEventListener(node, transitionEnd);
            };
            TransitionEvents.addEndEventListener(node, transitionEnd);
        };
        _this.bindAnimationEvent = function (node) {
            if (node.getAttribute('disabled') ||
                node.className.indexOf('disabled') >= 0) {
                return;
            }
            var onClick = function (e) {
                // Fix radio button click twice
                if (e.target.tagName === 'INPUT') {
                    return;
                }
                setTimeout(function () { return _this.onClick(node); }, 0);
            };
            node.addEventListener('click', onClick, true);
            return {
                cancel: function () {
                    node.removeEventListener('click', onClick, true);
                },
            };
        };
        return _this;
    }
    Wave.prototype.componentDidMount = function () {
        this.instance = this.bindAnimationEvent(findDOMNode(this));
    };
    Wave.prototype.componentWillUnmount = function () {
        if (this.instance) {
            this.instance.cancel();
        }
    };
    Wave.prototype.isNotGrey = function (color) {
        var match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [.\d]*)?\)/);
        if (match && match[1] && match[2] && match[3]) {
            return !(match[1] === match[2] && match[2] === match[3]);
        }
        return true;
    };
    Wave.prototype.removeExtraStyleNode = function () {
        if (this.styleForPesudo && document.body.contains(this.styleForPesudo)) {
            document.body.removeChild(this.styleForPesudo);
            this.styleForPesudo = null;
        }
    };
    Wave.prototype.render = function () {
        return this.props.children;
    };
    return Wave;
}(React.Component));
export default Wave;
