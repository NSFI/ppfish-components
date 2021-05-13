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
import React from 'react';
import PropTypes from 'prop-types';
import Color from './helpers/color';
var Preview = /** @class */ (function (_super) {
    __extends(Preview, _super);
    function Preview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (e) {
            var value = e.target.value;
            var color = new Color(value);
            _this.props.onChange(color);
            e.stopPropagation();
        };
        _this.getPrefixCls = function () {
            return _this.props.rootPrefixCls + "-preview";
        };
        return _this;
    }
    Preview.prototype.render = function () {
        var prefixCls = this.getPrefixCls();
        var hex = this.props.color.toHexString();
        return (React.createElement("div", { className: prefixCls },
            React.createElement("span", { style: {
                    backgroundColor: hex,
                    opacity: this.props.alpha / 100
                } }),
            React.createElement("input", { type: "color", value: hex, onChange: this.onChange, onClick: this.props.onInputClick })));
    };
    Preview.propTypes = {
        alpha: PropTypes.number,
        color: PropTypes.object,
        onChange: PropTypes.func,
        onInputClick: PropTypes.func,
        rootPrefixCls: PropTypes.string
    };
    return Preview;
}(React.Component));
export default Preview;
