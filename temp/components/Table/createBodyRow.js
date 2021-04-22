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
import omit from 'omit.js';
export default function createTableRow(Component) {
    if (Component === void 0) { Component = 'tr'; }
    var BodyRow = /** @class */ (function (_super) {
        __extends(BodyRow, _super);
        function BodyRow(props) {
            var _this = _super.call(this, props) || this;
            _this.store = props.store;
            var selectedRowKeys = _this.store.getState().selectedRowKeys;
            _this.state = {
                selected: selectedRowKeys.indexOf(props.rowKey) >= 0
            };
            return _this;
        }
        BodyRow.prototype.componentDidMount = function () {
            this.subscribe();
        };
        BodyRow.prototype.componentWillUnmount = function () {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
        };
        BodyRow.prototype.subscribe = function () {
            var _this = this;
            var _a = this.props, store = _a.store, rowKey = _a.rowKey;
            this.unsubscribe = store.subscribe(function () {
                var selectedRowKeys = _this.store.getState().selectedRowKeys;
                var selected = selectedRowKeys.indexOf(rowKey) >= 0;
                if (selected !== _this.state.selected) {
                    _this.setState({ selected: selected });
                }
            });
        };
        BodyRow.prototype.render = function () {
            var _a;
            var rowProps = omit(this.props, ['prefixCls', 'rowKey', 'store']);
            var className = classNames(this.props.className, (_a = {},
                _a[this.props.prefixCls + "-row-selected"] = this.state.selected,
                _a));
            return (React.createElement(Component, __assign({}, rowProps, { className: className }), this.props.children));
        };
        return BodyRow;
    }(React.Component));
    return BodyRow;
}
