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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import Icon from '../Icon';
import { contains, getScrollBarSize, KeyCode } from '../../utils/index';
import LazyRenderBox from './LazyRenderBox';
var uuid = 0;
var openCount = 0;
/* eslint react/no-is-mounted:0 */
function getScroll(w, top) {
    var ret = w["page" + (top ? 'Y' : 'X') + "Offset"];
    var method = "scroll" + (top ? 'Top' : 'Left');
    if (typeof ret !== 'number') {
        var d = w.document;
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
            ret = d.body[method];
        }
    }
    return ret;
}
function setTransformOrigin(node, value) {
    var style = node.style;
    ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
        style[prefix + "TransformOrigin"] = value;
    });
    style["transformOrigin"] = value;
}
function offset(el) {
    var rect = el.getBoundingClientRect();
    var pos = {
        left: rect.left,
        top: rect.top
    };
    var doc = el.ownerDocument;
    var w = doc.defaultView || doc.parentWindow;
    pos.left += getScroll(w);
    pos.top += getScroll(w, true);
    return pos;
}
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog(props) {
        var _this = _super.call(this, props) || this;
        _this.getBodyMaxHeight = function () {
            var dialog = ReactDOM.findDOMNode(_this.dialog);
            var offsetTop = Math.max(0, parseInt(getComputedStyle(dialog).top));
            var difference = 2 * offsetTop;
            if (_this.header)
                difference += _this.header.offsetHeight;
            if (_this.footer)
                difference += _this.footer.offsetHeight;
            return difference;
        };
        _this.onAnimateLeave = function () {
            var afterClose = _this.props.afterClose;
            // need demo?
            // https://github.com/react-component/dialog/pull/28
            if (_this.wrap) {
                _this.wrap.style.display = 'none';
            }
            _this.inTransition = false;
            _this.removeScrollingEffect();
            if (afterClose) {
                afterClose();
            }
        };
        _this.onMaskClick = function (e) {
            // android trigger click on open (fastclick??)
            if (Date.now() - _this.openTime < 300) {
                return;
            }
            if (e.target === e.currentTarget) {
                _this.close(e);
            }
        };
        _this.onKeyDown = function (e) {
            var props = _this.props;
            if (props.esc && e.keyCode === KeyCode.ESC) {
                _this.close(e);
            }
            // keep focus inside dialog
            if (props.visible) {
                if (e.keyCode === KeyCode.TAB) {
                    var activeElement = document.activeElement;
                    var dialogRoot = _this.wrap;
                    if (e.shiftKey) {
                        if (activeElement === dialogRoot) {
                            _this.sentinel.focus();
                        }
                    }
                    else if (activeElement === _this.sentinel) {
                        dialogRoot.focus();
                    }
                }
            }
        };
        _this.getDialogElement = function () {
            var props = _this.props;
            var closable = props.closable;
            var prefixCls = props.prefixCls;
            var dest = {};
            if (props.width !== undefined) {
                dest.width = props.width;
            }
            if (props.height !== undefined) {
                dest.height = props.height;
            }
            var footer;
            if (props.footer) {
                footer = (React.createElement("div", { className: prefixCls + "-footer", ref: _this.saveRef('footer') }, props.footer));
            }
            var header;
            if (props.title) {
                header = (React.createElement("div", { className: prefixCls + "-header", ref: _this.saveRef('header') },
                    React.createElement("div", { className: prefixCls + "-title", id: _this.titleId }, props.title)));
            }
            var closer;
            if (closable) {
                closer = (React.createElement("button", { onClick: _this.close, "aria-label": "Close", className: prefixCls + "-close" },
                    React.createElement(Icon, { type: "close-modal-line" })));
            }
            var style = __assign(__assign({}, props.style), dest);
            var transitionName = props.transitionName;
            var dialog = (React.createElement("div", { className: classNames(prefixCls + "-dialog", {
                    draggable: props.draggable
                }) },
                React.createElement("div", { className: prefixCls + "-content" },
                    closer,
                    header,
                    React.createElement("div", __assign({ className: prefixCls + "-body", style: props.bodyStyle, ref: _this.saveRef('body') }, props.bodyProps), props.children),
                    footer),
                React.createElement("div", { tabIndex: 0, ref: _this.saveRef('sentinel'), style: { width: 0, height: 0, overflow: 'hidden' } }, "sentinel")));
            var dialogElement = (React.createElement(LazyRenderBox, { key: "dialog-element", role: "document", ref: _this.saveRef('dialog'), style: style, className: prefixCls + " " + (props.className || ''), visible: props.visible }, props.draggable ? React.createElement(Draggable, null, dialog) : dialog));
            return (React.createElement(Animate, { key: "dialog", showProp: "visible", onLeave: _this.onAnimateLeave, transitionName: transitionName, component: "", visible: props.visible, transitionAppear: true }, props.visible || !props.destroyOnClose ? dialogElement : null));
        };
        _this.getZIndexStyle = function () {
            var style = {};
            var props = _this.props;
            if (props.zIndex !== undefined) {
                style.zIndex = props.zIndex;
            }
            return style;
        };
        _this.getWrapStyle = function () {
            return __assign(__assign({}, _this.getZIndexStyle()), _this.props.wrapStyle);
        };
        _this.getMaskStyle = function () {
            return __assign(__assign({}, _this.getZIndexStyle()), _this.props.maskStyle);
        };
        _this.getMaskElement = function () {
            var props = _this.props;
            var maskElement;
            if (props.mask) {
                var maskTransition = props.maskTransitionName;
                maskElement = (React.createElement(LazyRenderBox, __assign({ style: _this.getMaskStyle(), key: "mask", className: props.prefixCls + "-mask", hiddenClassName: props.prefixCls + "-mask-hidden", visible: props.visible }, props.maskProps)));
                if (maskTransition) {
                    maskElement = (React.createElement(Animate, { key: "mask", showProp: "visible", transitionAppear: true, component: "", transitionName: maskTransition }, maskElement));
                }
            }
            return maskElement;
        };
        _this.setScrollbar = function () {
            if (_this.bodyIsOverflowing && _this.scrollbarWidth !== undefined) {
                document.body.style.paddingRight = _this.scrollbarWidth + "px";
            }
        };
        _this.addScrollingEffect = function () {
            openCount++;
            if (openCount !== 1) {
                return;
            }
            _this.checkScrollbar();
            _this.setScrollbar();
            document.body.style.overflow = 'hidden';
            // this.adjustDialog();
        };
        _this.removeScrollingEffect = function () {
            openCount--;
            if (openCount !== 0) {
                return;
            }
            document.body.style.overflow = '';
            _this.resetScrollbar();
            // this.resetAdjustments();
        };
        _this.close = function (e) {
            var onClose = _this.props.onClose;
            if (onClose) {
                onClose(e);
            }
        };
        _this.checkScrollbar = function () {
            var fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) {
                // workaround for missing window.innerWidth in IE8
                var documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
            }
            _this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
            if (_this.bodyIsOverflowing) {
                _this.scrollbarWidth = getScrollBarSize();
            }
        };
        _this.resetScrollbar = function () {
            document.body.style.paddingRight = '';
        };
        _this.adjustDialog = function () {
            if (_this.wrap && _this.scrollbarWidth !== undefined) {
                var modalIsOverflowing = _this.wrap.scrollHeight > document.documentElement.clientHeight;
                _this.wrap.style.paddingLeft = (!_this.bodyIsOverflowing && modalIsOverflowing ? _this.scrollbarWidth : '') + "px";
                _this.wrap.style.paddingRight = (_this.bodyIsOverflowing && !modalIsOverflowing ? _this.scrollbarWidth : '') + "px";
            }
        };
        _this.resetAdjustments = function () {
            if (_this.wrap) {
                _this.wrap.style.paddingLeft = _this.wrap.style.paddingLeft = '';
            }
        };
        _this.saveRef = function (name) { return function (node) {
            _this[name] = node;
        }; };
        if ('keyboard' in props) {
            throw new Error("API 'keyboard' is deprecated. Use 'esc' instead.");
        }
        _this.inTransition = false;
        _this.titleId = "rcDialogTitle" + uuid++;
        return _this;
    }
    Dialog.prototype.componentDidMount = function () {
        this.componentDidUpdate({});
        if (this.body) {
            this.body.style.maxHeight = "calc(100vh - " + this.getBodyMaxHeight() + "px)";
        }
    };
    Dialog.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var mousePosition = this.props.mousePosition;
        if (props.visible) {
            // first show
            if (!prevProps.visible) {
                this.openTime = Date.now();
                this.addScrollingEffect();
                this.tryFocus();
                var dialogNode = ReactDOM.findDOMNode(this.dialog);
                if (mousePosition) {
                    var elOffset = offset(dialogNode);
                    setTransformOrigin(dialogNode, mousePosition.x - elOffset.left + "px " + (mousePosition.y - elOffset.top) + "px");
                }
                else {
                    setTransformOrigin(dialogNode, '');
                }
            }
        }
        else if (prevProps.visible) {
            this.inTransition = true;
            if (props.mask && this.lastOutSideFocusNode) {
                try {
                    this.lastOutSideFocusNode.focus();
                }
                catch (e) {
                    this.lastOutSideFocusNode = null;
                }
                this.lastOutSideFocusNode = null;
            }
        }
    };
    Dialog.prototype.componentWillUnmount = function () {
        if (this.props.visible || this.inTransition) {
            this.removeScrollingEffect();
        }
    };
    Dialog.prototype.tryFocus = function () {
        if (!contains(this.wrap, document.activeElement)) {
            this.lastOutSideFocusNode = document.activeElement;
            this.wrap.focus();
        }
    };
    Dialog.prototype.render = function () {
        var props = this.props;
        var prefixCls = props.prefixCls, maskClosable = props.maskClosable;
        var style = this.getWrapStyle();
        // clear hide display
        // and only set display after async anim, not here for hide
        if (props.visible) {
            style.display = null;
        }
        return (React.createElement("div", null,
            this.getMaskElement(),
            React.createElement("div", __assign({ tabIndex: -1, onKeyDown: this.onKeyDown, className: prefixCls + "-wrap " + (props.wrapClassName || ''), ref: this.saveRef('wrap'), onClick: maskClosable ? this.onMaskClick : undefined, role: "dialog", "aria-labelledby": props.title ? this.titleId : null, style: style }, props.wrapProps), this.getDialogElement())));
    };
    Dialog.defaultProps = {
        className: '',
        mask: true,
        visible: false,
        esc: true,
        closable: true,
        maskClosable: true,
        destroyOnClose: false,
        draggable: false,
        prefixCls: 'rc-dialog'
    };
    return Dialog;
}(React.Component));
export default Dialog;
