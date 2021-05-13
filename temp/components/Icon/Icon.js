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
import classNames from 'classnames';
import omit from 'omit.js';
var Icon = function (props) {
    var _a;
    var type = props.type, _b = props.className, className = _b === void 0 ? '' : _b, spinning = props.spinning;
    var classString = classNames((_a = {
            fishdicon: true,
            'fishdicon-spin': spinning || type === 'loading'
        },
        _a["fishdicon-" + type] = true,
        _a), className);
    return React.createElement("i", __assign({}, omit(props, ['type', 'spinning']), { className: classString }));
};
export default Icon;
