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
export default class TextArea extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            textareaStyles: {},
        };
        this.resizeTextarea = () => {
            const { autosize } = this.props;
            if (!autosize || !this.textAreaRef) {
                return;
            }
            const minRows = autosize ? autosize.minRows : null;
            const maxRows = autosize ? autosize.maxRows : null;
            const textareaStyles = calculateNodeHeight(this.textAreaRef, false, minRows, maxRows);
            this.setState({ textareaStyles });
        };
        this.handleTextareaChange = (e) => {
            if (!('value' in this.props)) {
                this.resizeTextarea();
            }
            const { onChange } = this.props;
            if (onChange) {
                onChange(e);
            }
        };
        this.handleKeyDown = (e) => {
            const { onPressEnter, onKeyDown } = this.props;
            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        };
        this.saveTextAreaRef = (textArea) => {
            this.textAreaRef = textArea;
        };
    }
    componentDidMount() {
        this.resizeTextarea();
    }
    componentWillReceiveProps(nextProps) {
        // Re-render with the new content then recalculate the height as required.
        if (this.props.value !== nextProps.value) {
            if (this.nextFrameActionId) {
                clearNextFrameAction(this.nextFrameActionId);
            }
            this.nextFrameActionId = onNextFrame(this.resizeTextarea);
        }
    }
    focus() {
        this.textAreaRef.focus();
    }
    blur() {
        this.textAreaRef.blur();
    }
    getTextAreaClassName() {
        const { prefixCls, className, disabled } = this.props;
        return classNames(prefixCls, className, {
            [`${prefixCls}-disabled`]: disabled,
        });
    }
    render() {
        const props = this.props;
        const otherProps = omit(props, [
            'prefixCls',
            'onPressEnter',
            'autosize',
        ]);
        const style = Object.assign({}, props.style, this.state.textareaStyles);
        // Fix https://github.com/ant-design/ant-design/issues/6776
        // Make sure it could be reset when using form.getFieldDecorator
        if ('value' in otherProps) {
            otherProps.value = otherProps.value || '';
        }
        return (React.createElement("textarea", Object.assign({}, otherProps, { className: this.getTextAreaClassName(), style: style, onKeyDown: this.handleKeyDown, onChange: this.handleTextareaChange, ref: this.saveTextAreaRef })));
    }
}
TextArea.defaultProps = {
    prefixCls: 'fishd-input',
};
