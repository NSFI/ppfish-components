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
import { Option, OptGroup } from './src/index.js';
import Select from './Select';
import classNames from 'classnames';
import Input from '../Input';
import InputElement from './InputElement';
import './style/index.less';
function isSelectOptionOrSelectOptGroup(child) {
    return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}
var AutoComplete = /** @class */ (function (_super) {
    __extends(AutoComplete, _super);
    function AutoComplete() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getInputElement = function () {
            var children = _this.props.children;
            var element = children && React.isValidElement(children) && children.type !== Option ? (React.Children.only(_this.props.children)) : (React.createElement(Input, null));
            var elementProps = __assign({}, element.props);
            // https://github.com/ant-design/ant-design/pull/7742
            delete elementProps.children;
            return React.createElement(InputElement, __assign({}, elementProps), element);
        };
        _this.saveSelect = function (node) {
            _this.select = node;
        };
        return _this;
    }
    AutoComplete.prototype.focus = function () {
        this.select.focus();
    };
    AutoComplete.prototype.blur = function () {
        this.select.blur();
    };
    AutoComplete.prototype.render = function () {
        var _a;
        var _b = this.props, size = _b.size, _c = _b.className, className = _c === void 0 ? '' : _c, notFoundContent = _b.notFoundContent, prefixCls = _b.prefixCls, optionLabelProp = _b.optionLabelProp, dataSource = _b.dataSource, children = _b.children, highlightSelected = _b.highlightSelected;
        var cls = classNames((_a = {},
            _a[prefixCls + "-lg"] = size === 'large',
            _a[prefixCls + "-sm"] = size === 'small',
            _a[className] = !!className,
            _a[prefixCls + "-show-search"] = true,
            _a[prefixCls + "-auto-complete"] = true,
            _a));
        var options;
        var childArray = React.Children.toArray(children);
        if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
            options = children;
        }
        else {
            options = dataSource
                ? dataSource.map(function (item) {
                    if (React.isValidElement(item)) {
                        return item;
                    }
                    switch (typeof item) {
                        case 'string':
                            return React.createElement(Option, { key: item }, item);
                        case 'object':
                            return (React.createElement(Option, { key: item.value }, item.text));
                        default:
                            throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
                    }
                })
                : [];
        }
        return (React.createElement(Select, __assign({}, this.props, { className: cls, dropdownClassName: highlightSelected ? null : prefixCls + "-nohighlight", mode: Select.SECRET_COMBOBOX_MODE_DO_NOT_USE, optionLabelProp: optionLabelProp, getInputElement: this.getInputElement, notFoundContent: notFoundContent, ref: this.saveSelect }), options));
    };
    AutoComplete.Option = Option;
    AutoComplete.OptGroup = OptGroup;
    AutoComplete.defaultProps = {
        prefixCls: 'fishd-autocomplete-select',
        transitionName: 'slide-up',
        optionLabelProp: 'children',
        choiceTransitionName: 'zoom',
        showSearch: false,
        filterOption: false,
        highlightSelected: true
    };
    return AutoComplete;
}(React.Component));
export default AutoComplete;
