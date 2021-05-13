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
var LazyRenderBox = /** @class */ (function (_super) {
    __extends(LazyRenderBox, _super);
    function LazyRenderBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyRenderBox.prototype.shouldComponentUpdate = function (nextProps) {
        return !!nextProps.hiddenClassName || !!nextProps.visible;
    };
    LazyRenderBox.prototype.render = function () {
        var className = this.props.className;
        if (!!this.props.hiddenClassName && !this.props.visible) {
            className += " " + this.props.hiddenClassName;
        }
        var props = __assign({}, this.props);
        delete props.hiddenClassName;
        delete props.visible;
        props.className = className;
        return React.createElement("div", __assign({}, props));
    };
    return LazyRenderBox;
}(React.Component));
export default LazyRenderBox;
