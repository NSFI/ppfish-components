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
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
var Option = /** @class */ (function (_super) {
    __extends(Option, _super);
    function Option(props) {
        var _this = _super.call(this, props) || this;
        _this.onOptionClick = function (e, option) {
            var _a = _this.props, disabled = _a.disabled, onOptionClick = _a.onOptionClick;
            if (!disabled) {
                onOptionClick && onOptionClick(e, option);
            }
        };
        return _this;
    }
    Option.prototype.render = function () {
        var _a, _b, _c, _d, _e;
        var _this = this;
        var _f = this.props, title = _f.title, children = _f.children, activeKey = _f.activeKey, showOptionCheckedIcon = _f.showOptionCheckedIcon, value = _f.value, disabled = _f.disabled, checked = _f.checked, prefixCls = _f.prefixCls;
        var label = children && children.length === 1 ? children[0] : children;
        var optionCls = classNames((_a = {}, _a[prefixCls + "-item"] = true, _a), (_b = {}, _b["checked"] = !!checked, _b), (_c = {}, _c["checked-icon"] = !!checked && showOptionCheckedIcon, _c), (_d = {}, _d["active"] = 'activeKey' in this.props && activeKey === value, _d), (_e = {}, _e[prefixCls + "-item-disabled"] = !!disabled, _e));
        return (React.createElement("li", { title: title, className: optionCls, onClick: function (e) { return _this.onOptionClick(e, { label: label, title: title, key: value }); } }, children));
    };
    Option.isSelectOption = true;
    Option.propTypes = {
        activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        children: PropTypes.node,
        disabled: PropTypes.bool,
        onOptionClick: PropTypes.func,
        prefixCls: PropTypes.string,
        showOptionCheckedIcon: PropTypes.bool,
        title: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node])
    };
    Option.defaultProps = {
        prefixCls: 'fishd-select-dropdown-option',
        showOptionCheckedIcon: true
    };
    return Option;
}(React.Component));
export default Option;
