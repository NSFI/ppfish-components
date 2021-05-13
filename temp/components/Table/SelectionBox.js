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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
var SelectionBox = /** @class */ (function (_super) {
    __extends(SelectionBox, _super);
    function SelectionBox(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            checked: _this.getCheckState(props)
        };
        return _this;
    }
    SelectionBox.prototype.componentDidMount = function () {
        this.subscribe();
    };
    SelectionBox.prototype.componentWillUnmount = function () {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    };
    SelectionBox.prototype.subscribe = function () {
        var _this = this;
        var store = this.props.store;
        this.unsubscribe = store.subscribe(function () {
            var checked = _this.getCheckState(_this.props);
            _this.setState({ checked: checked });
        });
    };
    SelectionBox.prototype.getCheckState = function (props) {
        var store = props.store, defaultSelection = props.defaultSelection, rowIndex = props.rowIndex;
        var checked = false;
        if (store.getState().selectionDirty) {
            checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
        }
        else {
            checked =
                store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 ||
                    defaultSelection.indexOf(rowIndex) >= 0;
        }
        return checked;
    };
    SelectionBox.prototype.render = function () {
        var _a = this.props, type = _a.type, rowIndex = _a.rowIndex, rest = __rest(_a, ["type", "rowIndex"]);
        var checked = this.state.checked;
        if (type === 'radio') {
            return React.createElement(Radio, __assign({ checked: checked, value: rowIndex }, rest));
        }
        else {
            return React.createElement(Checkbox, __assign({ checked: checked }, rest));
        }
    };
    return SelectionBox;
}(React.Component));
export default SelectionBox;
