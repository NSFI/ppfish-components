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
import Tooltip from '../Tooltip';
import warning from '../../utils/warning';
var Popover = /** @class */ (function (_super) {
    __extends(Popover, _super);
    function Popover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.saveTooltip = function (node) {
            _this.tooltip = node;
        };
        return _this;
    }
    Popover.prototype.getPopupDomNode = function () {
        return this.tooltip.getPopupDomNode();
    };
    Popover.prototype.getOverlay = function () {
        var _a = this.props, title = _a.title, prefixCls = _a.prefixCls, content = _a.content;
        warning(!('overlay' in this.props), 'Popover[overlay] is removed, please use Popover[content] instead, ' +
            'see: https://u.ant.design/popover-content');
        return (React.createElement("div", null,
            title && React.createElement("div", { className: prefixCls + "-title" }, title),
            React.createElement("div", { className: prefixCls + "-inner-content" }, content)));
    };
    Popover.prototype.render = function () {
        var props = __assign({}, this.props);
        delete props.title;
        return React.createElement(Tooltip, __assign({}, props, { ref: this.saveTooltip, overlay: this.getOverlay() }));
    };
    Popover.defaultProps = {
        prefixCls: 'fishd-popover',
        placement: 'top',
        transitionName: 'zoom-big',
        trigger: 'hover',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1,
        overlayStyle: {}
    };
    return Popover;
}(React.Component));
export default Popover;
