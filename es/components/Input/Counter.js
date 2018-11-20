import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import TextArea from './TextArea';
function countValue(value) {
    return value.length;
}
export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.saveTextarea = (node) => {
            this.textarea = node;
        };
        this.handleClick = () => {
            this.focus();
        };
        this.handleTextareaChange = (e) => {
            const { onChange } = this.props;
            const textareaValue = this.textarea && this.textarea.textAreaRef.value;
            this.setState({
                value: textareaValue,
            });
            if (onChange) {
                onChange(e);
            }
        };
        this.getCount = () => {
            const { count } = this.props;
            const value = this.state.value;
            if (!value) {
                return 0;
            }
            // 自定义计数方法
            if (count) {
                return count(String(value));
            }
            return countValue(String(value));
        };
        let value = '';
        if ('value' in props) {
            value = props.value;
        }
        else if ('defaultValue' in props) {
            value = props.defaultValue;
        }
        this.state = {
            value,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
            });
        }
    }
    focus() {
        this.textarea.focus();
    }
    blur() {
        this.textarea.blur();
    }
    getTextAreaClassName() {
        const { inputPrefixCls, className, disabled } = this.props;
        return classNames(inputPrefixCls, className, {
            [`${inputPrefixCls}-disabled`]: disabled,
        });
    }
    render() {
        const { className, prefixCls, limit } = this.props;
        const inputClassName = classNames(className, {
            [`${prefixCls}`]: true,
        });
        const otherProps = omit(this.props, [
            'inputPrefixCls',
            'prefixCls',
            'limit',
            'count',
            'value',
            'onChange'
        ]);
        const total = this.getCount();
        return (React.createElement("div", { className: inputClassName, onClick: this.handleClick },
            React.createElement(TextArea, Object.assign({}, otherProps, { className: this.getTextAreaClassName(), maxLength: limit, onChange: this.handleTextareaChange, value: this.state.value, ref: this.saveTextarea })),
            React.createElement("div", { className: `${prefixCls}-footer` },
                React.createElement("span", { className: `${prefixCls}-indicator` },
                    total,
                    "/",
                    limit))));
    }
}
Counter.defaultProps = {
    inputPrefixCls: 'fishd-input',
    prefixCls: 'fishd-input-counter',
};
