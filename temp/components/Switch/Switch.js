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
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import RcSwitch from './src/Switch';
import omit from 'omit.js';
import Wave from '../../utils/wave';
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.saveSwitch = function (node) {
            _this.rcSwitch = node;
        };
        return _this;
    }
    Switch.prototype.focus = function () {
        this.rcSwitch.focus();
    };
    Switch.prototype.blur = function () {
        this.rcSwitch.blur();
    };
    Switch.prototype.render = function () {
        var _a;
        var _b = this.props, prefixCls = _b.prefixCls, size = _b.size, loading = _b.loading, _c = _b.className, className = _c === void 0 ? '' : _c;
        var classes = classNames(className, (_a = {},
            _a[prefixCls + "-small"] = size === 'small',
            _a[prefixCls + "-large"] = size === 'large',
            _a[prefixCls + "-loading"] = loading,
            _a));
        return (React.createElement(Wave, { insertExtraNode: true },
            React.createElement(RcSwitch, __assign({}, omit(this.props, ['loading']), { className: classes, ref: this.saveSwitch }))));
    };
    Switch.defaultProps = {
        prefixCls: 'fishd-switch'
    };
    Switch.propTypes = {
        prefixCls: PropTypes.string,
        // HACK: https://github.com/ant-design/ant-design/issues/5368
        // size=default and size=large are the same
        size: PropTypes.oneOf(['small', 'default', 'large']),
        className: PropTypes.string
    };
    return Switch;
}(React.Component));
export default Switch;
