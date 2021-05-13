import * as React from 'react';
import classNames from 'classnames';
var Group = function (props) {
    var _a;
    var _b = props.prefixCls, prefixCls = _b === void 0 ? 'fishd-input-group' : _b, _c = props.className, className = _c === void 0 ? '' : _c;
    var cls = classNames(prefixCls, (_a = {},
        _a[prefixCls + "-lg"] = props.size === 'large',
        _a[prefixCls + "-sm"] = props.size === 'small',
        _a[prefixCls + "-compact"] = props.compact,
        _a), className);
    return (React.createElement("span", { className: cls, style: props.style }, props.children));
};
export default Group;
