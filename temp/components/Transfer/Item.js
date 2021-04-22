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
import classNames from 'classnames';
import PureRenderMixin from '../Checkbox/src/PureRenderMixin';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
import Lazyload from 'react-lazy-load';
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.prototype.shouldComponentUpdate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    };
    Item.prototype.render = function () {
        var _a;
        var _b = this.props, mode = _b.mode, direction = _b.direction, renderedText = _b.renderedText, renderedEl = _b.renderedEl, item = _b.item, lazy = _b.lazy, checked = _b.checked, prefixCls = _b.prefixCls, onClick = _b.onClick, onClose = _b.onClose;
        var className = classNames((_a = {},
            _a[prefixCls + "-content-item"] = true,
            _a[prefixCls + "-content-item-disabled"] = item.disabled,
            _a));
        var listItem = (React.createElement("li", { className: className, title: renderedText },
            React.createElement("span", { className: prefixCls + "-content-item-text", onClick: item.disabled ? undefined : function () { return onClick(item, direction); } },
                mode === 'multiple' ? React.createElement(Checkbox, { checked: checked, disabled: item.disabled }) : null,
                React.createElement("span", null, renderedEl)),
            mode === 'single' && direction === 'right' ? (React.createElement("span", { className: prefixCls + "-content-item-close", onClick: item.disabled ? undefined : function () { return onClose(item); } },
                React.createElement(Icon, { type: "close-modal-line" }))) : null));
        var children = null;
        if (lazy) {
            var lazyProps = __assign({ height: 32, offset: 500, throttle: 0, debounce: false }, lazy);
            children = React.createElement(Lazyload, __assign({}, lazyProps), listItem);
        }
        else {
            children = listItem;
        }
        return children;
    };
    return Item;
}(React.Component));
export default Item;
