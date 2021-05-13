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
import PropTypes from 'prop-types';
import RcSelect, { Option, OptGroup } from './src/index.js';
import classNames from 'classnames';
import warning from 'warning';
import ConfigConsumer from '../Config/Consumer';
var SelectPropTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    notFoundContent: PropTypes.any,
    showSearch: PropTypes.bool,
    optionLabelProp: PropTypes.string,
    transitionName: PropTypes.string,
    choiceTransitionName: PropTypes.string,
    id: PropTypes.string
};
// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select(props) {
        var _this = _super.call(this, props) || this;
        _this.saveSelect = function (node) {
            _this.rcSelect = node;
        };
        _this.renderSelect = function (locale) {
            var _a;
            var _b = _this.props, prefixCls = _b.prefixCls, _c = _b.className, className = _c === void 0 ? '' : _c, size = _b.size, mode = _b.mode, restProps = __rest(_b, ["prefixCls", "className", "size", "mode"]);
            var cls = classNames((_a = {},
                _a[prefixCls + "-lg"] = size === 'large',
                _a[prefixCls + "-sm"] = size === 'small',
                _a), className);
            var optionLabelProp = _this.props.optionLabelProp;
            if (_this.isCombobox()) {
                // children 带 dom 结构时，无法填入输入框
                optionLabelProp = optionLabelProp || 'value';
            }
            var modeConfig = {
                multiple: mode === 'multiple',
                tags: mode === 'tags',
                combobox: _this.isCombobox()
            };
            return (React.createElement(RcSelect, __assign({}, restProps, modeConfig, { prefixCls: prefixCls, className: cls, optionLabelProp: optionLabelProp || 'children', notFoundContent: _this.getNotFoundContent(locale), ref: _this.saveSelect })));
        };
        warning(props.mode !== 'combobox', 'The combobox mode of Select is deprecated, ' +
            'it will be removed in next major version, ' +
            'please use AutoComplete instead');
        return _this;
    }
    Select.prototype.focus = function () {
        this.rcSelect.focus();
    };
    Select.prototype.blur = function () {
        this.rcSelect.blur();
    };
    Select.prototype.getNotFoundContent = function (locale) {
        var notFoundContent = this.props.notFoundContent;
        if (this.isCombobox()) {
            // AutoComplete don't have notFoundContent defaultly
            return notFoundContent === undefined ? null : notFoundContent;
        }
        return notFoundContent === undefined ? locale.notFoundContent : notFoundContent;
    };
    Select.prototype.isCombobox = function () {
        var mode = this.props.mode;
        return mode === 'combobox' || mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;
    };
    Select.prototype.render = function () {
        var _this = this;
        return (React.createElement(ConfigConsumer, { componentName: "AutoComplete" }, function (Locale) {
            return _this.renderSelect({
                notFoundContent: Locale.notFoundContent
            });
        }));
    };
    Select.Option = Option;
    Select.OptGroup = OptGroup;
    Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
    Select.defaultProps = {
        prefixCls: 'fishd-autocomplete-select',
        showSearch: false,
        transitionName: 'slide-up',
        choiceTransitionName: 'zoom'
    };
    Select.propTypes = SelectPropTypes;
    return Select;
}(React.Component));
export default Select;
