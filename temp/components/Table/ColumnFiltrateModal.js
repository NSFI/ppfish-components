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
import { polyfill } from 'react-lifecycles-compat';
import Modal from '../Modal';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import ToolTip from '../Tooltip';
import ConfigConsumer from "../Config/Consumer";
var CheckboxGroup = Checkbox.Group;
var getColumnKey = function (column) {
    if ('colSpan' in column) {
        return column.filtrateTitle || column.title;
    }
    else {
        return column.key || column.dataIndex || column.filtrateTitle || column.title;
    }
};
var flatten = function (arr) {
    return arr.reduce(function (prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(next) : next);
    }, []);
};
var getCheckedOptions = function (columns, hideColumns) {
    return (columns
        // 去除表头合并不显示的列
        .filter(function (column) { return column.colSpan !== 0; })
        // 去除初始化就被隐藏的列
        .filter(function (column) { return hideColumns.findIndex(function (key) { return key === getColumnKey(column); }) === -1; })
        // 只留uniqueId
        .map(function (column) { return getColumnKey(column); }));
};
var getColSpanOption = function (columns) {
    var colSpanOption = [];
    columns.forEach(function (column, index) {
        if ('colSpan' in column && column.colSpan !== 0) {
            colSpanOption.push({
                key: column.filtrateTitle || column.title,
                value: columns
                    .slice(index, index + column.colSpan)
                    .map(function (column) { return column.key || column.dataIndex; })
            });
        }
    });
    return colSpanOption;
};
var ColumnFiltrateModal = /** @class */ (function (_super) {
    __extends(ColumnFiltrateModal, _super);
    function ColumnFiltrateModal(props) {
        var _this = _super.call(this, props) || this;
        _this.showModal = function () {
            _this.setState({
                visible: true
            });
        };
        _this.handleOk = function () {
            _this.setState({
                visible: false,
                checkedOptionConfirm: _this.state.checkedOption,
                okButtonDisabled: true
            }, function () {
                // 被隐藏的列表key
                _this.props.onChange(flatten(_this.getOptions()
                    .filter(function (column) { return _this.state.checkedOptionConfirm.indexOf(column.value) === -1; })
                    .map(function (column) {
                    var indexOfColSpan = _this.state.colSpanOption.findIndex(function (option) { return option.key === column.value; });
                    if (indexOfColSpan !== -1) {
                        return _this.state.colSpanOption[indexOfColSpan].value;
                    }
                    else {
                        return column.value;
                    }
                })));
            });
        };
        _this.handleCancel = function () {
            _this.setState({
                visible: false,
                checkedOption: _this.state.checkedOptionConfirm,
                okButtonDisabled: true
            });
        };
        _this.onChange = function (checkedOption) {
            var checkedOptionConfirm = _this.state.checkedOptionConfirm;
            _this.setState({
                checkedOption: checkedOption,
                okButtonDisabled: JSON.stringify(checkedOption && checkedOption.sort()) ==
                    JSON.stringify(checkedOptionConfirm && checkedOptionConfirm.sort())
            });
        };
        _this.getOptions = function () {
            var _a = _this.props, columns = _a.columns, defaultColumns = _a.defaultColumns;
            return (columns
                // 去除表头合并的不显示的
                .filter(function (column) { return column.colSpan !== 0; })
                // 获取他们的label、value、disabled
                .map(function (column) {
                var uniqKey = getColumnKey(column);
                //fixed /分组不能控制显示隐藏
                var disabled = !!column.fixed || !!column.children || !!column.filtrateDefault;
                var title = column.filtrateTitle || column.title;
                return {
                    label: React.createElement(ToolTip, { title: title }, title),
                    value: uniqKey,
                    disabled: disabled
                };
            })
                // 去除默认展示数据项
                .filter(function (column) { return defaultColumns.findIndex(function (key) { return key === column.value; }) === -1; }));
        };
        //默认一直显示的选项
        _this.getDefaultOption = function () {
            var _a = _this.props, columns = _a.columns, _b = _a.defaultColumns, defaultColumns = _b === void 0 ? [] : _b;
            return columns
                .filter(function (column) { return defaultColumns.findIndex(function (key) { return key === getColumnKey(column); }) !== -1; })
                .map(function (column) { return ({
                label: (React.createElement(ToolTip, { title: column.filtrateTitle || column.title }, column.filtrateTitle || column.title)),
                value: getColumnKey(column),
                disabled: true
            }); });
        };
        var _a = _this.props, columns = _a.columns, hideColumns = _a.hideColumns;
        var option = getCheckedOptions(columns, hideColumns);
        _this.state = {
            visible: false,
            checkedOption: option,
            checkedOptionConfirm: option,
            okButtonDisabled: true,
            prevProps: props,
            colSpanOption: getColSpanOption(columns)
        };
        return _this;
    }
    ColumnFiltrateModal.getDerivedStateFromProps = function (nextProps, prevState) {
        var _a = prevState.prevProps, prevProps = _a === void 0 ? {} : _a;
        var newState = { prevProps: nextProps };
        //监听column个数变化，重新初始化checkedOption
        if ('columns' in nextProps && nextProps.columns.length !== prevProps.columns.length) {
            var columns = nextProps.columns, hideColumns = nextProps.hideColumns;
            var option = getCheckedOptions(columns, hideColumns);
            newState.checkedOption = option;
            newState.checkedOptionConfirm = option;
            newState.colSpanOption = getColSpanOption(columns);
        }
        return newState;
    };
    ColumnFiltrateModal.prototype.render = function () {
        var _this = this;
        var prefixCls = this.props.prefixCls;
        var _a = this.state, visible = _a.visible, checkedOption = _a.checkedOption, okButtonDisabled = _a.okButtonDisabled;
        var options = this.getOptions();
        var defaultOption = this.getDefaultOption();
        return (React.createElement(ConfigConsumer, { componentName: "Table" }, function (Locale) {
            return (React.createElement("div", null,
                React.createElement(Icon, { className: prefixCls + "-filtrate-icon", type: "Settingx", onClick: _this.showModal }),
                React.createElement(Modal, { title: Locale.modalTitle, wrapClassName: prefixCls + "-filtrate-modal", visible: visible, width: 680, okButtonDisabled: okButtonDisabled, onOk: _this.handleOk, onCancel: _this.handleCancel, okText: Locale.okText, cancelText: Locale.cancelText },
                    React.createElement("div", { className: prefixCls + "-filtrate-modal-enable-list" },
                        React.createElement(CheckboxGroup, { value: checkedOption, options: options, onChange: _this.onChange })),
                    defaultOption && !!defaultOption.length && (React.createElement("div", { className: prefixCls + "-filtrate-modal-disabled-list" },
                        React.createElement("p", { className: "title" }, Locale.defaultOptionTitle),
                        React.createElement(CheckboxGroup, { options: defaultOption, defaultValue: defaultOption.map(function (option) { return option.value; }) }))))));
        }));
    };
    ColumnFiltrateModal.defaultProps = {
        defaultColumns: [],
        hideColumns: []
    };
    return ColumnFiltrateModal;
}(React.Component));
polyfill(ColumnFiltrateModal);
export default ColumnFiltrateModal;
