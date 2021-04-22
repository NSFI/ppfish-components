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
import * as PropTypes from 'prop-types';
import RcDrawer from './src';
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer(props) {
        return _super.call(this, props) || this;
    }
    Drawer.prototype.render = function () {
        var _a = this.props, className = _a.className, wrapperClassName = _a.wrapperClassName, width = _a.width, height = _a.height, visible = _a.visible, placement = _a.placement, getContainer = _a.getContainer, style = _a.style, mask = _a.mask, maskStyle = _a.maskStyle, handler = _a.handler, level = _a.level, ease = _a.ease, duration = _a.duration, closed = _a.closed, onMaskClick = _a.onMaskClick, onChange = _a.onChange, onHandleClick = _a.onHandleClick, onCloseClick = _a.onCloseClick;
        return (React.createElement(RcDrawer, { className: className, wrapperClassName: wrapperClassName, width: width, height: height, open: visible, closed: closed, placement: placement, getContainer: getContainer, showMask: mask, level: level, ease: ease, duration: duration, maskStyle: maskStyle, style: style, handler: handler, onMaskClick: onMaskClick, onHandleClick: onHandleClick, onChange: onChange, onCloseClick: onCloseClick }, this.props.children));
    };
    Drawer.propTypes = {
        // prefixCls: PropTypes.string,
        className: PropTypes.string,
        wrapperClassName: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        visible: PropTypes.bool,
        closed: PropTypes.bool,
        placement: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
        getContainer: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.func,
            PropTypes.bool
        ]),
        style: PropTypes.object,
        mask: PropTypes.bool,
        maskStyle: PropTypes.object,
        children: PropTypes.node,
        handler: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
        level: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        ease: PropTypes.string,
        duration: PropTypes.string,
        onChange: PropTypes.func,
        onMaskClick: PropTypes.func,
        onHandleClick: PropTypes.func,
        onCloseClick: PropTypes.func
    };
    Drawer.defaultProps = {
        // prefixCls: "fishd-drawer",
        placement: 'right',
        onChange: function () { },
        onMaskClick: function () { },
        onHandleClick: function () { }
    };
    return Drawer;
}(React.Component));
export default Drawer;
