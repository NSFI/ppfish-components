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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import RcCascader from './src';
import arrayTreeFilter from 'array-tree-filter';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import omit from 'omit.js';
import warning from 'warning';
import { KeyCode } from '../../utils';
import Input from '../Input';
import Icon from '../Icon';
import ConfigConsumer from '../Config/Consumer';
// We limit the filtered item count by default
var defaultLimit = 50;
//搜索项高亮-String类型支持
function highlightKeyword(str, keyword, prefixCls) {
    return str.split(keyword).map(function (node, index) {
        return index === 0
            ? node
            : [
                React.createElement("span", { className: prefixCls + "-menu-item-keyword", key: "seperator" }, keyword),
                node
            ];
    });
}
//默认filterOption
function defaultFilterOption(inputValue, path, names) {
    return path.some(function (option) { return option[names.label].indexOf(inputValue) > -1; });
}
//默认的搜索后的option渲染方法
function defaultRenderFilteredOption(inputValue, path, prefixCls, names) {
    return path.map(function (option, index) {
        var label = option[names.label];
        var node = label.indexOf(inputValue) > -1
            ? highlightKeyword(label, inputValue, prefixCls)
            : label;
        return index === 0 ? node : [' / ', node];
    });
}
//默认搜索后的option排序方案
function defaultSortFilteredOption(a, b, inputValue, names) {
    function callback(elem) {
        return elem[names.label].indexOf(inputValue) > -1;
    }
    return a.findIndex(callback) - b.findIndex(callback);
}
//自定义option参数的名字
function getFilledFieldNames(props) {
    var fieldNames = props.fieldNames || {};
    var names = {
        children: fieldNames.children || 'children',
        label: fieldNames.label || 'label',
        value: fieldNames.value || 'value'
    };
    return names;
}
function flattenTree(options, props, ancestor) {
    if (ancestor === void 0) { ancestor = []; }
    var names = getFilledFieldNames(props);
    var flattenOptions = [];
    var childrenName = names.children;
    options.forEach(function (option) {
        var path = ancestor.concat(option);
        if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
            flattenOptions.push(path);
        }
        if (option[childrenName]) {
            flattenOptions = flattenOptions.concat(flattenTree(option[childrenName], props, path));
        }
    });
    return flattenOptions;
}
var defaultDisplayRender = function (label) { return label.join(' / '); };
var Cascader = /** @class */ (function (_super) {
    __extends(Cascader, _super);
    function Cascader(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (value, selectedOptions) {
            _this.setState({ inputValue: '' });
            if (selectedOptions[0].__IS_FILTERED_OPTION) {
                var unwrappedValue = value[0];
                var unwrappedSelectedOptions = selectedOptions[0].path;
                _this.setValue(unwrappedValue, unwrappedSelectedOptions);
                return;
            }
            _this.setValue(value, selectedOptions);
        };
        _this.handlePopupVisibleChange = function (popupVisible) {
            if (!('popupVisible' in _this.props)) {
                _this.setState({
                    popupVisible: popupVisible,
                    inputFocused: popupVisible,
                    inputValue: popupVisible ? _this.state.inputValue : ''
                });
            }
            var onVisibleChange = _this.props.onVisibleChange;
            if (onVisibleChange) {
                onVisibleChange(popupVisible);
            }
        };
        _this.handleInputBlur = function () {
            _this.setState({
                inputFocused: false
            });
        };
        _this.handleInputClick = function (e) {
            var _a = _this.state, inputFocused = _a.inputFocused, popupVisible = _a.popupVisible;
            // Prevent `Trigger` behaviour.
            if (inputFocused || popupVisible) {
                e.stopPropagation();
                if (e.nativeEvent.stopImmediatePropagation) {
                    e.nativeEvent.stopImmediatePropagation();
                }
            }
        };
        _this.handleKeyDown = function (e) {
            if (e.keyCode === KeyCode.BACKSPACE) {
                e.stopPropagation();
            }
        };
        _this.handleInputChange = function (e) {
            var inputValue = e.target.value;
            _this.setState({ inputValue: inputValue });
        };
        _this.setValue = function (value, selectedOptions) {
            if (selectedOptions === void 0) { selectedOptions = []; }
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(value, selectedOptions);
            }
        };
        _this.clearSelection = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!_this.state.inputValue) {
                _this.setValue([]);
                _this.handlePopupVisibleChange(false);
            }
            else {
                _this.setState({ inputValue: '' });
            }
        };
        _this.saveInput = function (node) {
            _this.input = node;
        };
        _this.state = {
            value: props.value || props.defaultValue || [],
            inputValue: '',
            inputFocused: false,
            popupVisible: props.popupVisible,
            flattenOptions: props.showSearch ? flattenTree(props.options, props) : undefined,
            prevProps: props
        };
        return _this;
    }
    Cascader.getDerivedStateFromProps = function (nextProps, _a) {
        var prevProps = _a.prevProps;
        var newState = {
            prevProps: nextProps
        };
        if ('value' in nextProps) {
            newState.value = nextProps.value || [];
        }
        if ('popupVisible' in nextProps) {
            newState.popupVisible = nextProps.popupVisible;
        }
        if (nextProps.showSearch && prevProps.options !== nextProps.options) {
            newState.flattenOptions = flattenTree(nextProps.options, nextProps);
        }
        return newState;
    };
    Cascader.prototype.getLabel = function () {
        var _a = this.props, options = _a.options, _b = _a.displayRender, displayRender = _b === void 0 ? defaultDisplayRender : _b;
        var names = getFilledFieldNames(this.props);
        var value = this.state.value;
        var unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
        var selectedOptions = arrayTreeFilter(options, function (o, level) { return o[names.value] === unwrappedValue[level]; });
        var label = selectedOptions.map(function (o) { return o[names.label]; });
        return displayRender(label, selectedOptions);
    };
    Cascader.prototype.generateFilteredOptions = function (prefixCls, Locale) {
        var _a;
        var _this = this;
        var _b = this.props, showSearch = _b.showSearch, _c = _b.notFoundContent, notFoundContent = _c === void 0 ? Locale.notFoundContent : _c;
        var names = getFilledFieldNames(this.props);
        var _d = showSearch, _e = _d.filter, filter = _e === void 0 ? defaultFilterOption : _e, _f = _d.render, render = _f === void 0 ? defaultRenderFilteredOption : _f, _g = _d.sort, sort = _g === void 0 ? defaultSortFilteredOption : _g, _h = _d.limit, limit = _h === void 0 ? defaultLimit : _h;
        var _j = this.state, _k = _j.flattenOptions, flattenOptions = _k === void 0 ? [] : _k, inputValue = _j.inputValue;
        // Limit the filter if needed
        var filtered;
        if (limit > 0) {
            filtered = [];
            var matchCount_1 = 0;
            // Perf optimization to filter items only below the limit
            flattenOptions.some(function (path) {
                var match = filter(_this.state.inputValue, path, names);
                if (match) {
                    filtered.push(path);
                    matchCount_1 += 1;
                }
                return matchCount_1 >= limit;
            });
        }
        else {
            warning(typeof limit !== 'number', "'limit' of showSearch in Cascader should be positive number or false.");
            filtered = flattenOptions.filter(function (path) { return filter(_this.state.inputValue, path, names); });
        }
        filtered.sort(function (a, b) { return sort(a, b, inputValue, names); });
        if (filtered.length > 0) {
            return filtered.map(function (path) {
                var _a;
                return _a = {
                        __IS_FILTERED_OPTION: true,
                        path: path
                    },
                    _a[names.label] = render(inputValue, path, prefixCls, names),
                    _a[names.value] = path.map(function (o) { return o[names.value]; }),
                    _a.disabled = path.some(function (o) { return !!o.disabled; }),
                    _a;
            });
        }
        return [
            (_a = {},
                _a[names.label] = notFoundContent,
                _a[names.value] = 'FISHD_CASCADER_NOT_FOUND',
                _a.disabled = true,
                _a)
        ];
    };
    Cascader.prototype.focus = function () {
        this.input.focus();
    };
    Cascader.prototype.blur = function () {
        this.input.blur();
    };
    Cascader.prototype.render = function () {
        var _a, _b, _c;
        var _this = this;
        var _d = this, props = _d.props, state = _d.state;
        var prefixCls = props.prefixCls, inputPrefixCls = props.inputPrefixCls, children = props.children, placeholder = props.placeholder, notFoundContent = props.notFoundContent, size = props.size, disabled = props.disabled, className = props.className, style = props.style, allowClear = props.allowClear, _e = props.showSearch, showSearch = _e === void 0 ? false : _e, otherProps = __rest(props, ["prefixCls", "inputPrefixCls", "children", "placeholder", "notFoundContent", "size", "disabled", "className", "style", "allowClear", "showSearch"]);
        var value = state.value, inputFocused = state.inputFocused;
        var sizeCls = classNames((_a = {},
            _a[inputPrefixCls + "-lg"] = size === 'large',
            _a[inputPrefixCls + "-sm"] = size === 'small',
            _a));
        var clearIcon = (allowClear && !disabled && value.length > 0) || state.inputValue ? (React.createElement(Icon, { type: "close-circle-fill", className: prefixCls + "-picker-clear", onClick: this.clearSelection })) : null;
        var arrowCls = classNames((_b = {},
            _b[prefixCls + "-picker-arrow"] = true,
            _b[prefixCls + "-picker-arrow-expand"] = state.popupVisible,
            _b));
        var pickerCls = classNames(className, prefixCls + "-picker", (_c = {},
            _c[prefixCls + "-picker-with-value"] = state.inputValue,
            _c[prefixCls + "-picker-disabled"] = disabled,
            _c[prefixCls + "-picker-" + size] = !!size,
            _c[prefixCls + "-picker-show-search"] = !!showSearch,
            _c[prefixCls + "-picker-focused"] = inputFocused,
            _c));
        // Fix bug of https://github.com/facebook/react/pull/5004
        // and https://fb.me/react-unknown-prop
        var inputProps = omit(otherProps, [
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
            'esc'
        ]);
        var getOptionsAndOthers = function (Locale) {
            var _a = _this.props, _b = _a.notFoundContent, notFoundContent = _b === void 0 ? Locale.notFoundContent : _b, _c = _a.placeholder, placeholder = _c === void 0 ? Locale.placeholder : _c;
            var options = props.options;
            if (state.inputValue) {
                options = _this.generateFilteredOptions(prefixCls, Locale);
            }
            // Dropdown menu should keep previous status until it is fully closed.
            if (!state.popupVisible) {
                options = _this.cachedOptions;
            }
            else {
                _this.cachedOptions = options;
            }
            var dropdownMenuColumnStyle = {};
            var isNotFound = (options || []).length === 1 && options[0].value === 'FISHD_CASCADER_NOT_FOUND';
            if (isNotFound) {
                dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
            }
            // The default value of `matchInputWidth` is `true`
            var resultListMatchInputWidth = showSearch.matchInputWidth === false ? false : true;
            if (resultListMatchInputWidth && state.inputValue && _this.input) {
                dropdownMenuColumnStyle.width = _this.input.input.offsetWidth;
            }
            return {
                options: options,
                dropdownMenuColumnStyle: dropdownMenuColumnStyle,
                notFoundContent: notFoundContent,
                placeholder: placeholder
            };
        };
        var label = this.getLabel();
        var getInput = function (Locale) {
            var _a = _this.props.placeholder, placeholder = _a === void 0 ? Locale.placeholder : _a;
            return children || (React.createElement("span", { style: style, className: pickerCls },
                React.createElement("span", { className: prefixCls + "-picker-label", title: typeof label === 'string' ? label : '' }, label),
                React.createElement(Input, __assign({}, inputProps, { ref: _this.saveInput, prefixCls: inputPrefixCls, placeholder: value && value.length > 0 ? undefined : placeholder, className: prefixCls + "-input " + sizeCls, value: state.inputValue, disabled: disabled, readOnly: !showSearch, autoComplete: "off", onClick: showSearch ? _this.handleInputClick : undefined, onBlur: showSearch ? _this.handleInputBlur : undefined, onKeyDown: _this.handleKeyDown, onChange: showSearch ? _this.handleInputChange : undefined })),
                clearIcon,
                React.createElement(Icon, { type: "down-fill", className: arrowCls })));
        };
        return (React.createElement(ConfigConsumer, { componentName: "Cascader" }, function (Locale) {
            return (React.createElement(RcCascader, __assign({}, props, getOptionsAndOthers(Locale), { value: value, popupVisible: state.popupVisible, onPopupVisibleChange: _this.handlePopupVisibleChange, onChange: _this.handleChange }), getInput(Locale)));
        }));
    };
    Cascader.defaultProps = {
        prefixCls: 'fishd-cascader',
        inputPrefixCls: 'fishd-input',
        transitionName: 'slide-up',
        popupPlacement: 'bottomLeft',
        options: [],
        disabled: false,
        allowClear: true
    };
    return Cascader;
}(React.Component));
polyfill(Cascader);
export default Cascader;
