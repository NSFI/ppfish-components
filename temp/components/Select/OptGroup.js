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
var OptGroup = /** @class */ (function (_super) {
    __extends(OptGroup, _super);
    function OptGroup(props) {
        return _super.call(this, props) || this;
    }
    OptGroup.prototype.render = function () {
        var _a = this.props, children = _a.children, label = _a.label, prefixCls = _a.prefixCls, _isShow = _a._isShow;
        return (_isShow && (React.createElement("div", { className: classNames("" + prefixCls) },
            React.createElement("p", { className: prefixCls + "-label" }, label),
            children)));
    };
    OptGroup.isSelectOptGroup = true;
    OptGroup.propTypes = {
        _isShow: PropTypes.bool,
        children: PropTypes.node.isRequired,
        label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
        prefixCls: PropTypes.string
    };
    OptGroup.defaultProps = {
        _isShow: true,
        prefixCls: 'fishd-select-dropdown-option-group'
    };
    return OptGroup;
}(React.Component));
export default OptGroup;
