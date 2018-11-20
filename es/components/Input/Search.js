var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import classNames from 'classnames';
import Input from './Input';
import Icon from '../Icon';
import Button from '../Button';
export default class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.onSearch = (e) => {
            const { onSearch } = this.props;
            if (onSearch) {
                onSearch(this.input.input.value, e);
            }
            this.input.focus();
        };
        this.saveInput = (node) => {
            this.input = node;
        };
    }
    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    getButtonOrIcon() {
        const { enterButton, prefixCls, size, disabled } = this.props;
        const enterButtonAsElement = enterButton;
        let node;
        if (!enterButton) {
            node = React.createElement(Icon, { className: `${prefixCls}-icon`, type: "search-line", key: "searchIcon" });
        }
        else if (enterButtonAsElement.type === Button || enterButtonAsElement.type === 'button') {
            node = React.cloneElement(enterButtonAsElement, enterButtonAsElement.type === Button ? {
                className: `${prefixCls}-button`,
                size,
            } : {});
        }
        else {
            node = (React.createElement(Button, { className: `${prefixCls}-button`, type: "primary", size: size, disabled: disabled, key: "enterButton" }, enterButton === true ? React.createElement(Icon, { type: "search-line" }) : enterButton));
        }
        return React.cloneElement(node, {
            onClick: this.onSearch,
        });
    }
    render() {
        const _a = this.props, { className, prefixCls, inputPrefixCls, size, suffix, enterButton } = _a, others = __rest(_a, ["className", "prefixCls", "inputPrefixCls", "size", "suffix", "enterButton"]);
        delete others.onSearch;
        const buttonOrIcon = this.getButtonOrIcon();
        const searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
        const inputClassName = classNames(prefixCls, className, {
            [`${prefixCls}-enter-button`]: !!enterButton,
            [`${prefixCls}-${size}`]: !!size,
        });
        return (React.createElement(Input, Object.assign({ onPressEnter: this.onSearch }, others, { size: size, className: inputClassName, prefixCls: inputPrefixCls, suffix: searchSuffix, ref: this.saveInput })));
    }
}
Search.defaultProps = {
    inputPrefixCls: 'fishd-input',
    prefixCls: 'fishd-input-search',
    enterButton: false,
};
