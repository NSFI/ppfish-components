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
import Button from '../Button';
var Operation = /** @class */ (function (_super) {
    __extends(Operation, _super);
    function Operation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Operation.prototype.render = function () {
        var _a = this.props, mode = _a.mode, arrowText = _a.arrowText, moveToLeft = _a.moveToLeft, moveToRight = _a.moveToRight, _b = _a.leftArrowText, leftArrowText = _b === void 0 ? '' : _b, _c = _a.rightArrowText, rightArrowText = _c === void 0 ? '' : _c, leftActive = _a.leftActive, rightActive = _a.rightActive, className = _a.className, style = _a.style;
        if (mode === 'single') {
            return (React.createElement("div", { className: className, style: style }, arrowText));
        }
        else {
            return (React.createElement("div", { className: className, style: style },
                React.createElement(Button, { type: "primary", size: "small", disabled: !rightActive, onClick: moveToRight, icon: "right" }, rightArrowText),
                React.createElement(Button, { type: "primary", size: "small", disabled: !leftActive, onClick: moveToLeft, icon: "left" }, leftArrowText)));
        }
    };
    return Operation;
}(React.Component));
export default Operation;
