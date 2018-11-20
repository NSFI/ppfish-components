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
import RcCascader from './src';
import arrayTreeFilter from 'array-tree-filter';
import classNames from 'classnames';
import omit from 'omit.js';
import { KeyCode } from '../../utils';
import Input from '../Input';
import Icon from '../Icon';
import './style/index.less';
function highlightKeyword(str, keyword, prefixCls) {
    return str.split(keyword)
        .map((node, index) => index === 0 ? node : [
        React.createElement("span", { className: `${prefixCls}-menu-item-keyword`, key: "seperator" }, keyword),
        node,
    ]);
}
function defaultFilterOption(inputValue, path, names) {
    return path.some(option => option[names.label].indexOf(inputValue) > -1);
}
function defaultRenderFilteredOption(inputValue, path, prefixCls, names) {
    return path.map((option, index) => {
        const label = option[names.label];
        const node = label.indexOf(inputValue) > -1 ?
            highlightKeyword(label, inputValue, prefixCls) : label;
        return index === 0 ? node : [' / ', node];
    });
}
function defaultSortFilteredOption(a, b, inputValue, names) {
    function callback(elem) {
        return elem[names.label].indexOf(inputValue) > -1;
    }
    return a.findIndex(callback) - b.findIndex(callback);
}
function getFilledFieldNames(fieldNames = {}) {
    const names = {
        children: fieldNames.children || 'children',
        label: fieldNames.label || 'label',
        value: fieldNames.value || 'value',
    };
    return names;
}
const defaultDisplayRender = (label) => label.join(' / ');
export default class Cascader extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = (value, selectedOptions) => {
            this.setState({ inputValue: '' });
            if (selectedOptions[0].__IS_FILTERED_OPTION) {
                const unwrappedValue = value[0];
                const unwrappedSelectedOptions = selectedOptions[0].path;
                this.setValue(unwrappedValue, unwrappedSelectedOptions);
                return;
            }
            this.setValue(value, selectedOptions);
        };
        this.handlePopupVisibleChange = (popupVisible) => {
            if (!('popupVisible' in this.props)) {
                this.setState({
                    popupVisible,
                    inputFocused: popupVisible,
                    inputValue: popupVisible ? this.state.inputValue : '',
                });
            }
            const onVisibleChange = this.props.onVisibleChange;
            if (onVisibleChange) {
                onVisibleChange(popupVisible);
            }
        };
        this.handleInputBlur = () => {
            this.setState({
                inputFocused: false,
            });
        };
        this.handleInputClick = (e) => {
            const { inputFocused, popupVisible } = this.state;
            // Prevent `Trigger` behaviour.
            if (inputFocused || popupVisible) {
                e.stopPropagation();
                if (e.nativeEvent.stopImmediatePropagation) {
                    e.nativeEvent.stopImmediatePropagation();
                }
            }
        };
        this.handleKeyDown = (e) => {
            if (e.keyCode === KeyCode.BACKSPACE) {
                e.stopPropagation();
            }
        };
        this.handleInputChange = (e) => {
            const inputValue = e.target.value;
            this.setState({ inputValue });
        };
        this.setValue = (value, selectedOptions = []) => {
            if (!('value' in this.props)) {
                this.setState({ value });
            }
            const onChange = this.props.onChange;
            if (onChange) {
                onChange(value, selectedOptions);
            }
        };
        this.clearSelection = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!this.state.inputValue) {
                this.setValue([]);
                this.handlePopupVisibleChange(false);
            }
            else {
                this.setState({ inputValue: '' });
            }
        };
        this.saveInput = (node) => {
            this.input = node;
        };
        this.state = {
            value: props.value || props.defaultValue || [],
            inputValue: '',
            inputFocused: false,
            popupVisible: props.popupVisible,
            flattenOptions: props.showSearch ? this.flattenTree(props.options, props.changeOnSelect, props.fieldNames) : undefined,
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({ value: nextProps.value || [] });
        }
        if ('popupVisible' in nextProps) {
            this.setState({ popupVisible: nextProps.popupVisible });
        }
        if (nextProps.showSearch && this.props.options !== nextProps.options) {
            this.setState({
                flattenOptions: this.flattenTree(nextProps.options, nextProps.changeOnSelect, nextProps.fieldNames),
            });
        }
    }
    getLabel() {
        const { options, displayRender = defaultDisplayRender, fieldNames } = this.props;
        const names = getFilledFieldNames(fieldNames);
        const value = this.state.value;
        const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
        const selectedOptions = arrayTreeFilter(options, (o, level) => o[names.value] === unwrappedValue[level]);
        const label = selectedOptions.map(o => o[names.label]);
        return displayRender(label, selectedOptions);
    }
    flattenTree(options, changeOnSelect, fieldNames, ancestor = []) {
        const names = getFilledFieldNames(fieldNames);
        let flattenOptions = [];
        let childrenName = names.children;
        options.forEach((option) => {
            const path = ancestor.concat(option);
            if (changeOnSelect || !option[childrenName] || !option[childrenName].length) {
                flattenOptions.push(path);
            }
            if (option[childrenName]) {
                flattenOptions = flattenOptions.concat(this.flattenTree(option[childrenName], changeOnSelect, fieldNames, path));
            }
        });
        return flattenOptions;
    }
    generateFilteredOptions(prefixCls) {
        const { showSearch, notFoundContent, fieldNames } = this.props;
        const names = getFilledFieldNames(fieldNames);
        const { filter = defaultFilterOption, render = defaultRenderFilteredOption, sort = defaultSortFilteredOption, } = showSearch;
        const { flattenOptions = [], inputValue } = this.state;
        const filtered = flattenOptions.filter((path) => filter(this.state.inputValue, path, names))
            .sort((a, b) => sort(a, b, inputValue, names));
        if (filtered.length > 0) {
            return filtered.map((path) => {
                return {
                    __IS_FILTERED_OPTION: true,
                    path,
                    [names.label]: render(inputValue, path, prefixCls, names),
                    [names.value]: path.map((o) => o[names.value]),
                    disabled: path.some((o) => !!o.disabled),
                };
            });
        }
        return [{ [names.label]: notFoundContent, [names.value]: 'FISHD_CASCADER_NOT_FOUND', disabled: true }];
    }
    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    render() {
        const { props, state } = this;
        const { prefixCls, inputPrefixCls, children, placeholder, size, disabled, className, style, allowClear, showSearch = false } = props, otherProps = __rest(props, ["prefixCls", "inputPrefixCls", "children", "placeholder", "size", "disabled", "className", "style", "allowClear", "showSearch"]);
        const { value, inputFocused } = state;
        const sizeCls = classNames({
            [`${inputPrefixCls}-lg`]: size === 'large',
            [`${inputPrefixCls}-sm`]: size === 'small',
        });
        const clearIcon = (allowClear && !disabled && value.length > 0) || state.inputValue ? (React.createElement(Icon, { type: "close-circle-fill", className: `${prefixCls}-picker-clear`, onClick: this.clearSelection })) : null;
        const arrowCls = classNames({
            [`${prefixCls}-picker-arrow`]: true,
            [`${prefixCls}-picker-arrow-expand`]: state.popupVisible,
        });
        const pickerCls = classNames(className, `${prefixCls}-picker`, {
            [`${prefixCls}-picker-with-value`]: state.inputValue,
            [`${prefixCls}-picker-disabled`]: disabled,
            [`${prefixCls}-picker-${size}`]: !!size,
            [`${prefixCls}-picker-show-search`]: !!showSearch,
            [`${prefixCls}-picker-focused`]: inputFocused,
        });
        // Fix bug of https://github.com/facebook/react/pull/5004
        // and https://fb.me/react-unknown-prop
        const inputProps = omit(otherProps, [
            'onChange',
            'options',
            'popupPlacement',
            'transitionName',
            'displayRender',
            'onVisibleChange',
            'changeOnSelect',
            'expandTrigger',
            'popupVisible',
            'getPopupContainer',
            'loadData',
            'popupClassName',
            'filterOption',
            'renderFilteredOption',
            'sortFilteredOption',
            'notFoundContent',
            'fieldNames',
        ]);
        let options = props.options;
        if (state.inputValue) {
            options = this.generateFilteredOptions(prefixCls);
        }
        // Dropdown menu should keep previous status until it is fully closed.
        if (!state.popupVisible) {
            options = this.cachedOptions;
        }
        else {
            this.cachedOptions = options;
        }
        const dropdownMenuColumnStyle = {};
        const isNotFound = (options || []).length === 1 && options[0].value === 'FISHD_CASCADER_NOT_FOUND';
        if (isNotFound) {
            dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
        }
        // The default value of `matchInputWidth` is `true`
        const resultListMatchInputWidth = showSearch.matchInputWidth === false ? false : true;
        if (resultListMatchInputWidth && state.inputValue && this.input) {
            dropdownMenuColumnStyle.width = this.input.input.offsetWidth;
        }
        const label = this.getLabel();
        const input = children || (React.createElement("span", { style: style, className: pickerCls },
            React.createElement("span", { className: `${prefixCls}-picker-label`, title: typeof label === 'string' ? label : '' }, label),
            React.createElement(Input, Object.assign({}, inputProps, { ref: this.saveInput, prefixCls: inputPrefixCls, placeholder: value && value.length > 0 ? undefined : placeholder, className: `${prefixCls}-input ${sizeCls}`, value: state.inputValue, disabled: disabled, readOnly: !showSearch, autoComplete: "off", onClick: showSearch ? this.handleInputClick : undefined, onBlur: showSearch ? this.handleInputBlur : undefined, onKeyDown: this.handleKeyDown, onChange: showSearch ? this.handleInputChange : undefined })),
            clearIcon,
            React.createElement(Icon, { type: "down-fill", className: arrowCls })));
        return (React.createElement(RcCascader, Object.assign({}, props, { options: options, value: value, popupVisible: state.popupVisible, onPopupVisibleChange: this.handlePopupVisibleChange, onChange: this.handleChange, dropdownMenuColumnStyle: dropdownMenuColumnStyle }), input));
    }
}
Cascader.defaultProps = {
    prefixCls: 'fishd-cascader',
    inputPrefixCls: 'fishd-input',
    placeholder: '请选择',
    transitionName: 'slide-up',
    popupPlacement: 'bottomLeft',
    options: [],
    disabled: false,
    allowClear: true,
    notFoundContent: '无匹配结果',
};
