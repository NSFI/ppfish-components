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
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Icon from '../Icon';
var SelectSearch = /** @class */ (function (_super) {
    __extends(SelectSearch, _super);
    function SelectSearch(props) {
        return _super.call(this, props) || this;
    }
    SelectSearch.prototype.render = function () {
        var _this = this;
        var _a = this.props, allowClear = _a.allowClear, emitEmpty = _a.emitEmpty, prefixCls = _a.prefixCls, searchInputProps = _a.searchInputProps, searchPlaceholder = _a.searchPlaceholder, searchValue = _a.searchValue, updateSearchValue = _a.updateSearchValue;
        var suffix = searchValue && allowClear && (React.createElement(Icon, { type: "close-circle-fill", className: prefixCls + "-clear", onClick: emitEmpty }));
        return (React.createElement("div", { className: prefixCls },
            React.createElement(Input, __assign({ placeholder: searchPlaceholder, ref: function (searchInput) { return (_this.searchInput = searchInput); }, value: searchValue, onChange: updateSearchValue, suffix: suffix }, searchInputProps))));
    };
    SelectSearch.propTypes = {
        allowClear: PropTypes.bool,
        emitEmpty: PropTypes.func,
        prefixCls: PropTypes.string,
        searchInputProps: PropTypes.object,
        searchPlaceholder: PropTypes.string,
        searchValue: PropTypes.string,
        updateSearchValue: PropTypes.func
    };
    return SelectSearch;
}(React.Component));
export default SelectSearch;
