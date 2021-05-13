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
import omit from 'omit.js';
import classNames from 'classnames';
import calculateNodeHeight from './calculateNodeHeight';
function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}
function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    }
    else {
        window.clearTimeout(nextFrameId);
    }
}
var TextArea = /** @class */ (function (_super) {
    __extends(TextArea, _super);
    function TextArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            textareaStyles: {}
        };
        _this.resizeTextarea = function () {
            var autosize = _this.props.autosize;
            if (!autosize || !_this.textAreaRef) {
                return;
            }
            var minRows = autosize ? autosize.minRows : null;
            var maxRows = autosize ? autosize.maxRows : null;
            var textareaStyles = calculateNodeHeight(_this.textAreaRef, false, minRows, maxRows);
            _this.setState({ textareaStyles: textareaStyles });
        };
        _this.handleTextareaChange = function (e) {
            if (!('value' in _this.props)) {
                _this.resizeTextarea();
            }
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(e);
            }
        };
        _this.handleKeyDown = function (e) {
            var _a = _this.props, onPressEnter = _a.onPressEnter, onKeyDown = _a.onKeyDown;
            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        };
        _this.saveTextAreaRef = function (textArea) {
            _this.textAreaRef = textArea;
        };
        return _this;
    }
    TextArea.prototype.componentDidMount = function () {
        this.resizeTextarea();
    };
    TextArea.prototype.componentDidUpdate = function (prevProps) {
        // Re-render with the new content then recalculate the height as required.
        if (this.props.value !== prevProps.value) {
            if (this.nextFrameActionId) {
                clearNextFrameAction(this.nextFrameActionId);
            }
            this.nextFrameActionId = onNextFrame(this.resizeTextarea);
        }
    };
    TextArea.prototype.focus = function () {
        this.textAreaRef.focus();
    };
    TextArea.prototype.blur = function () {
        this.textAreaRef.blur();
    };
    TextArea.prototype.getTextAreaClassName = function () {
        var _a;
        var _b = this.props, prefixCls = _b.prefixCls, className = _b.className, disabled = _b.disabled;
        return classNames(prefixCls, className, (_a = {},
            _a[prefixCls + "-disabled"] = disabled,
            _a));
    };
    TextArea.prototype.render = function () {
        var props = this.props;
        var otherProps = omit(props, ['prefixCls', 'onPressEnter', 'autosize']);
        var style = __assign(__assign({}, props.style), this.state.textareaStyles);
        // Fix https://github.com/ant-design/ant-design/issues/6776
        // Make sure it could be reset when using form.getFieldDecorator
        if ('value' in otherProps) {
            otherProps.value = otherProps.value || '';
        }
        return (React.createElement("textarea", __assign({}, otherProps, { className: this.getTextAreaClassName(), style: style, onKeyDown: this.handleKeyDown, onChange: this.handleTextareaChange, ref: this.saveTextAreaRef })));
    };
    TextArea.defaultProps = {
        prefixCls: 'fishd-input'
    };
    return TextArea;
}(React.Component));
export default TextArea;
