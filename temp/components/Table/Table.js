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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import isEqual from 'lodash/isEqual';
import { polyfill } from 'react-lifecycles-compat';
import RcTable from './src';
import Pagination from '../Pagination';
import Icon from '../Icon';
import Spin from '../Spin';
import FilterDropdown from './filterDropdown';
import createStore from './createStore';
import SelectionBox from './SelectionBox';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import ColumnFiltrateModal from './ColumnFiltrateModal';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import createBodyRow from './createBodyRow';
import { flatArray, treeMap, flatFilter, normalizeColumns } from './util';
import ConfigConsumer from '../Config/Consumer';
function noop() { }
function stopPropagation(e) {
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
    }
}
function getRowSelection(props) {
    return props.rowSelection || {};
}
var defaultPagination = {
    onChange: noop,
    onShowSizeChange: noop
};
function getComponents(state, components, prevComponents) {
    if (components === void 0) { components = {}; }
    var bodyRow = components && components.body && components.body.row;
    var preBodyRow = prevComponents && prevComponents.body && prevComponents.body.row;
    var newState = {};
    if (!state.row || bodyRow !== preBodyRow) {
        newState.row = createBodyRow(bodyRow);
    }
    newState.components = __assign(__assign({}, components), { body: __assign(__assign({}, components.body), { row: newState.row || state.row }) });
    return newState;
}
function getHideColumns(props) {
    var hideColumns = [];
    // 初始化隐藏列
    if (props.columnFiltrate && props.columnFiltrate.hideColumns) {
        hideColumns.push.apply(hideColumns, props.columnFiltrate.hideColumns);
    }
    return hideColumns;
}
function isFiltersChanged(newFilters, prevFilters) {
    var filtersChanged = false;
    if (Object.keys(newFilters).length !== Object.keys(prevFilters).length) {
        filtersChanged = true;
    }
    else {
        Object.keys(newFilters).forEach(function (columnKey) {
            if (newFilters[columnKey] !== prevFilters[columnKey]) {
                filtersChanged = true;
            }
        });
    }
    return filtersChanged;
}
function getSortOrderColumns(columns) {
    return flatFilter(columns || [], function (column) { return 'sortOrder' in column; });
}
function getFilteredValueColumns(columns) {
    return flatFilter(columns || [], function (column) { return typeof column.filteredValue !== 'undefined'; });
}
function getFiltersFromColumns(columns) {
    var filters = {};
    getFilteredValueColumns(columns).forEach(function (col) {
        var colKey = getColumnKey(col);
        filters[colKey] = col.filteredValue;
    });
    return filters;
}
function getSortStateFromColumns(columns) {
    // return first column which sortOrder is not falsy
    var sortedColumn = getSortOrderColumns(columns).filter(function (col) { return col.sortOrder; })[0];
    if (sortedColumn) {
        return {
            sortColumn: sortedColumn,
            sortOrder: sortedColumn.sortOrder
        };
    }
    return {
        sortColumn: null,
        sortOrder: null
    };
}
function getColumnKey(column, index) {
    return column.key || column.dataIndex || index;
}
/**
 * Avoid creating new object, so that parent component's shouldComponentUpdate
 * can works appropriately。
 */
var emptyObject = {};
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        var _this = _super.call(this, props) || this;
        _this.getCheckboxPropsByItem = function (item, index) {
            var rowSelection = getRowSelection(_this.props);
            if (!rowSelection.getCheckboxProps) {
                return {};
            }
            return rowSelection.getCheckboxProps(item);
        };
        _this.onRow = function (record, index) {
            var _a = _this.props, onRow = _a.onRow, prefixCls = _a.prefixCls;
            var custom = onRow ? onRow(record, index) : {};
            return __assign(__assign({}, custom), { prefixCls: prefixCls, store: _this.store, rowKey: _this.getRecordKey(record, index) });
        };
        _this.handleFilter = function (column, nextFilters) {
            var _a;
            var props = _this.props;
            var pagination = __assign({}, _this.state.pagination);
            var filters = __assign(__assign({}, _this.state.filters), (_a = {}, _a[_this.getColumnKey(column)] = nextFilters, _a));
            // Remove filters not in current columns
            var currentColumnKeys = [];
            treeMap(_this.state.columns, function (c) {
                if (!c.children) {
                    currentColumnKeys.push(_this.getColumnKey(c));
                }
            });
            Object.keys(filters).forEach(function (columnKey) {
                if (currentColumnKeys.indexOf(columnKey) < 0) {
                    delete filters[columnKey];
                }
            });
            if (props.pagination) {
                // Reset current prop
                pagination.current = 1;
                pagination.onChange(pagination.current);
            }
            var newState = {
                pagination: pagination,
                filters: {}
            };
            var filtersToSetState = __assign({}, filters);
            // Remove filters which is controlled
            getFilteredValueColumns(_this.state.columns).forEach(function (col) {
                var columnKey = _this.getColumnKey(col);
                if (columnKey) {
                    delete filtersToSetState[columnKey];
                }
            });
            if (Object.keys(filtersToSetState).length > 0) {
                newState.filters = filtersToSetState;
            }
            // Controlled current prop will not respond user interaction
            if (typeof props.pagination === 'object' && 'current' in props.pagination) {
                newState.pagination = __assign(__assign({}, pagination), { current: _this.state.pagination.current });
            }
            _this.setState(newState, function () {
                _this.store.setState({
                    selectionDirty: false
                });
                var onChange = _this.props.onChange;
                if (onChange) {
                    onChange.apply(null, _this.prepareParamsArguments(__assign(__assign({}, _this.state), { selectionDirty: false, filters: filters,
                        pagination: pagination })));
                }
            });
        };
        _this.handleSelect = function (record, rowIndex, e) {
            var checked = e.target.checked;
            var nativeEvent = e.nativeEvent;
            var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();
            var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);
            var key = _this.getRecordKey(record, rowIndex);
            var pivot = _this.state.pivot;
            var rows = _this.getFlatCurrentPageData();
            var realIndex = rowIndex;
            if (_this.props.expandedRowRender) {
                realIndex = rows.findIndex(function (row) { return _this.getRecordKey(row, rowIndex) === key; });
            }
            if (nativeEvent.shiftKey && pivot !== undefined && realIndex !== pivot) {
                var changeRowKeys = [];
                var direction = Math.sign(pivot - realIndex);
                var dist = Math.abs(pivot - realIndex);
                var step = 0;
                var _loop_1 = function () {
                    var i = realIndex + step * direction;
                    step += 1;
                    var row = rows[i];
                    var rowKey = _this.getRecordKey(row, i);
                    var checkboxProps = _this.getCheckboxPropsByItem(row, i);
                    if (!checkboxProps.disabled) {
                        if (selectedRowKeys.includes(rowKey)) {
                            if (!checked) {
                                selectedRowKeys = selectedRowKeys.filter(function (j) { return rowKey !== j; });
                                changeRowKeys.push(rowKey);
                            }
                        }
                        else if (checked) {
                            selectedRowKeys.push(rowKey);
                            changeRowKeys.push(rowKey);
                        }
                    }
                };
                while (step <= dist) {
                    _loop_1();
                }
                _this.setState({ pivot: realIndex });
                _this.store.setState({
                    selectionDirty: true
                });
                _this.setSelectedRowKeys(selectedRowKeys, {
                    selectWay: 'onSelectMultiple',
                    record: record,
                    checked: checked,
                    changeRowKeys: changeRowKeys,
                    nativeEvent: nativeEvent
                });
            }
            else {
                if (checked) {
                    selectedRowKeys.push(_this.getRecordKey(record, realIndex));
                }
                else {
                    selectedRowKeys = selectedRowKeys.filter(function (i) { return key !== i; });
                }
                _this.setState({ pivot: realIndex });
                _this.store.setState({
                    selectionDirty: true
                });
                _this.setSelectedRowKeys(selectedRowKeys, {
                    selectWay: 'onSelect',
                    record: record,
                    checked: checked,
                    changeRowKeys: void 0,
                    nativeEvent: nativeEvent
                });
            }
        };
        _this.handleRadioSelect = function (record, rowIndex, e) {
            var checked = e.target.checked;
            var nativeEvent = e.nativeEvent;
            var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();
            var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);
            var key = _this.getRecordKey(record, rowIndex);
            selectedRowKeys = [key];
            _this.store.setState({
                selectionDirty: true
            });
            _this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: 'onSelect',
                record: record,
                checked: checked,
                changeRowKeys: void 0,
                nativeEvent: nativeEvent
            });
        };
        _this.handleSelectRow = function (selectionKey, index, onSelectFunc) {
            var data = _this.getFlatCurrentPageData();
            var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();
            var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);
            var changeableRowKeys = data
                .filter(function (item, i) { return !_this.getCheckboxPropsByItem(item, i).disabled; })
                .map(function (item, i) { return _this.getRecordKey(item, i); });
            var changeRowKeys = [];
            var selectWay = 'onSelectAll';
            var checked;
            // handle default selection
            switch (selectionKey) {
                case 'all':
                    changeableRowKeys.forEach(function (key) {
                        if (selectedRowKeys.indexOf(key) < 0) {
                            selectedRowKeys.push(key);
                            changeRowKeys.push(key);
                        }
                    });
                    selectWay = 'onSelectAll';
                    checked = true;
                    break;
                case 'removeAll':
                    changeableRowKeys.forEach(function (key) {
                        if (selectedRowKeys.indexOf(key) >= 0) {
                            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                            changeRowKeys.push(key);
                        }
                    });
                    selectWay = 'onSelectAll';
                    checked = false;
                    break;
                case 'invert':
                    changeableRowKeys.forEach(function (key) {
                        if (selectedRowKeys.indexOf(key) < 0) {
                            selectedRowKeys.push(key);
                        }
                        else {
                            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                        }
                        changeRowKeys.push(key);
                        selectWay = 'onSelectInvert';
                    });
                    break;
                default:
                    break;
            }
            _this.store.setState({
                selectionDirty: true
            });
            // when select custom selection, callback selections[n].onSelect
            var rowSelection = _this.props.rowSelection;
            var customSelectionStartIndex = 2;
            if (rowSelection && rowSelection.hideDefaultSelections) {
                customSelectionStartIndex = 0;
            }
            if (index >= customSelectionStartIndex && typeof onSelectFunc === 'function') {
                return onSelectFunc(changeableRowKeys);
            }
            _this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: selectWay,
                checked: checked,
                changeRowKeys: changeRowKeys
            });
        };
        _this.handlePageChange = function (current) {
            var otherArguments = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                otherArguments[_i - 1] = arguments[_i];
            }
            var props = _this.props;
            var pagination = __assign({}, _this.state.pagination);
            if (current) {
                pagination.current = current;
            }
            else {
                pagination.current = pagination.current || 1;
            }
            pagination.onChange.apply(pagination, __spreadArrays([pagination.current], otherArguments));
            var newState = {
                pagination: pagination
            };
            // Controlled current prop will not respond user interaction
            if (props.pagination &&
                typeof props.pagination === 'object' &&
                'current' in props.pagination) {
                newState.pagination = __assign(__assign({}, pagination), { current: _this.state.pagination.current });
            }
            _this.setState(newState);
            _this.store.setState({
                selectionDirty: false
            });
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange.apply(null, _this.prepareParamsArguments(__assign(__assign({}, _this.state), { selectionDirty: false, pagination: pagination })));
            }
        };
        _this.renderSelectionBox = function (type) {
            return function (_, record, index) {
                var rowIndex = _this.getRecordKey(record, index); // 从 1 开始
                var props = _this.getCheckboxPropsByItem(record, index);
                var handleChange = function (e) {
                    type === 'radio'
                        ? _this.handleRadioSelect(record, rowIndex, e)
                        : _this.handleSelect(record, rowIndex, e);
                };
                return (React.createElement("span", { onClick: stopPropagation },
                    React.createElement(SelectionBox, __assign({ type: type, store: _this.store, rowIndex: rowIndex, onChange: handleChange, defaultSelection: _this.getDefaultSelection() }, props))));
            };
        };
        _this.getRecordKey = function (record, index) {
            var rowKey = _this.props.rowKey;
            var recordKey = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
            warning(recordKey !== undefined, 'Each record in dataSource of table should have a unique `key` prop, ' +
                'or set `rowKey` of Table to an unique primary key, ' +
                'see https://u.ant.design/table-row-key');
            return recordKey === undefined ? index : recordKey;
        };
        _this.getPopupContainer = function () {
            return ReactDOM.findDOMNode(_this);
        };
        _this.handleColumnsFiltrateChange = function (hideColumns) {
            var columnFiltrate = _this.props.columnFiltrate;
            if (columnFiltrate && columnFiltrate.hideColumnsChange) {
                columnFiltrate.hideColumnsChange(hideColumns);
            }
            _this.setState({
                hideColumns: hideColumns
            });
        };
        _this.handleShowSizeChange = function (current, pageSize) {
            var pagination = _this.state.pagination;
            pagination.onShowSizeChange(current, pageSize);
            var nextPagination = __assign(__assign({}, pagination), { pageSize: pageSize,
                current: current });
            _this.setState({ pagination: nextPagination });
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange.apply(null, _this.prepareParamsArguments(__assign(__assign({}, _this.state), { pagination: nextPagination })));
            }
        };
        _this.renderTable = function (loading, Locale) {
            var _a;
            var filterTitle = Locale.filterTitle, filterConfirm = Locale.filterConfirm, filterReset = Locale.filterReset, emptyText = Locale.emptyText, selectAll = Locale.selectAll, selectInvert = Locale.selectInvert;
            var localeDefault = {
                filterTitle: filterTitle,
                filterConfirm: filterConfirm,
                filterReset: filterReset,
                emptyText: emptyText,
                selectAll: selectAll,
                selectInvert: selectInvert
            };
            var locale = __assign(__assign({}, localeDefault), _this.props.locale);
            var _b = _this.props, style = _b.style, className = _b.className, prefixCls = _b.prefixCls, showHeader = _b.showHeader, activeRowByClick = _b.activeRowByClick, restProps = __rest(_b, ["style", "className", "prefixCls", "showHeader", "activeRowByClick"]);
            var data = _this.getCurrentPageData();
            var expandIconAsCell = _this.props.expandedRowRender && _this.props.expandIconAsCell !== false;
            var classString = classNames((_a = {},
                _a[prefixCls + "-" + _this.props.size] = true,
                _a[prefixCls + "-bordered"] = _this.props.bordered,
                _a[prefixCls + "-empty"] = !data.length,
                _a[prefixCls + "-without-column-header"] = !showHeader,
                _a));
            var columns = _this.renderRowSelection(locale);
            columns = _this.renderColumnsFiltrate(columns);
            columns = _this.renderColumnsDropdown(columns, locale);
            columns = columns.filter(function (column) {
                return _this.state.hideColumns.indexOf((column.key && column.key.toString()) || column.dataIndex) === -1;
            });
            columns = columns.map(function (column, i) {
                var newColumn = __assign({}, column);
                newColumn.key = _this.getColumnKey(newColumn, i);
                return newColumn;
            });
            var expandIconColumnIndex = columns[0] && columns[0].key === 'selection-column' ? 1 : 0;
            if ('expandIconColumnIndex' in restProps) {
                expandIconColumnIndex = restProps.expandIconColumnIndex;
            }
            return (React.createElement(RcTable, __assign({ key: "table" }, restProps, { onRow: _this.onRow, components: _this.state.components, prefixCls: prefixCls, data: data, columns: columns, showHeader: showHeader, activeRowByClick: activeRowByClick, className: classString, expandIconColumnIndex: expandIconColumnIndex, expandIconAsCell: expandIconAsCell, emptyText: !loading.spinning && locale.emptyText })));
        };
        warning(!('columnsPageRange' in props || 'columnsPageSize' in props), '`columnsPageRange` and `columnsPageSize` are removed, please use ' +
            'fixed columns instead, see: https://u.ant.design/fixed-columns.');
        var columns = props.columns || normalizeColumns(props.children);
        var hideColumns = getHideColumns(props);
        _this.state = __assign(__assign(__assign(__assign({}, _this.getDefaultSortOrder(columns)), { 
            // 减少状态
            filters: getFiltersFromColumns(columns), pagination: _this.getDefaultPagination(props), pivot: undefined, columns: columns,
            hideColumns: hideColumns }), getComponents({}, props.components)), { prevProps: props });
        _this.store = createStore({
            selectedRowKeys: getRowSelection(props).selectedRowKeys || [],
            selectionDirty: false
        });
        return _this;
    }
    Table.getDerivedStateFromProps = function (nextProps, prevState) {
        var _a = prevState.prevProps, prevProps = _a === void 0 ? {} : _a;
        var newState = { prevProps: nextProps };
        var columns = nextProps.columns || normalizeColumns(nextProps.children);
        newState.columns = columns;
        if ('pagination' in nextProps || 'pagination' in prevProps) {
            var newPagination = __assign(__assign(__assign({}, defaultPagination), prevState.pagination), nextProps.pagination);
            newPagination.current = newPagination.current || 1;
            newPagination.pageSize = newPagination.pageSize || 10;
            newState.pagination = nextProps.pagination !== false ? newPagination : emptyObject;
        }
        if (getSortOrderColumns(columns).length > 0) {
            var sortState = getSortStateFromColumns(columns);
            if (sortState.sortColumn !== prevState.sortColumn ||
                sortState.sortOrder !== prevState.sortOrder) {
                newState = __assign(__assign({}, newState), sortState);
            }
        }
        var filteredValueColumns = getFilteredValueColumns(columns);
        if (filteredValueColumns.length > 0) {
            var filtersFromColumns_1 = getFiltersFromColumns(columns);
            var newFilters_1 = __assign({}, prevState.filters);
            Object.keys(filtersFromColumns_1).forEach(function (key) {
                newFilters_1[key] = filtersFromColumns_1[key];
            });
            if (isFiltersChanged(newFilters_1, prevState.filters)) {
                newState.filters = newFilters_1;
            }
        }
        return __assign(__assign({}, newState), getComponents(prevState, nextProps.components, prevProps.components));
    };
    Table.prototype.getDefaultSelection = function () {
        var _this = this;
        var rowSelection = getRowSelection(this.props);
        if (!rowSelection.getCheckboxProps) {
            return [];
        }
        return this.getFlatData()
            .filter(function (item, rowIndex) { return _this.getCheckboxPropsByItem(item, rowIndex).defaultChecked; })
            .map(function (record, rowIndex) { return _this.getRecordKey(record, rowIndex); });
    };
    Table.prototype.getDefaultPagination = function (props) {
        var pagination = props.pagination || {};
        return this.hasPagination(props)
            ? __assign(__assign(__assign({}, defaultPagination), pagination), { current: pagination.defaultCurrent || pagination.current || 1, pageSize: pagination.defaultPageSize || pagination.pageSize || 10 }) : {};
    };
    Table.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.rowSelection &&
            'selectedRowKeys' in this.props.rowSelection &&
            (!prevProps.rowSelection ||
                !prevProps.rowSelection.selectedRowKeys ||
                !isEqual(this.props.rowSelection.selectedRowKeys, prevProps.rowSelection.selectedRowKeys))) {
            this.store.setState({
                selectedRowKeys: this.props.rowSelection.selectedRowKeys || []
            });
        }
        if ('dataSource' in this.props && !isEqual(this.props.dataSource, prevProps.dataSource)) {
            this.store.setState({
                selectionDirty: false
            });
        }
    };
    Table.prototype.setSelectedRowKeys = function (selectedRowKeys, selectionInfo) {
        var _this = this;
        var selectWay = selectionInfo.selectWay, record = selectionInfo.record, checked = selectionInfo.checked, changeRowKeys = selectionInfo.changeRowKeys, nativeEvent = selectionInfo.nativeEvent;
        var rowSelection = getRowSelection(this.props);
        if (rowSelection && !('selectedRowKeys' in rowSelection)) {
            this.store.setState({ selectedRowKeys: selectedRowKeys });
        }
        var data = this.getFlatData();
        if (!rowSelection.onChange && !rowSelection[selectWay]) {
            return;
        }
        var selectedRows = data.filter(function (row, i) { return selectedRowKeys.indexOf(_this.getRecordKey(row, i)) >= 0; });
        if (rowSelection.onChange) {
            rowSelection.onChange(selectedRowKeys, selectedRows);
        }
        if (selectWay === 'onSelect' && rowSelection.onSelect) {
            rowSelection.onSelect(record, checked, selectedRows, nativeEvent);
        }
        else if (selectWay === 'onSelectMultiple' && rowSelection.onSelectMultiple) {
            var changeRows = data.filter(function (row, i) { return changeRowKeys.indexOf(_this.getRecordKey(row, i)) >= 0; });
            rowSelection.onSelectMultiple(checked, selectedRows, changeRows);
        }
        else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
            var changeRows = data.filter(function (row, i) { return changeRowKeys.indexOf(_this.getRecordKey(row, i)) >= 0; });
            rowSelection.onSelectAll(checked, selectedRows, changeRows);
        }
        else if (selectWay === 'onSelectInvert' && rowSelection.onSelectInvert) {
            rowSelection.onSelectInvert(selectedRowKeys);
        }
    };
    Table.prototype.hasPagination = function (props) {
        return (props || this.props).pagination !== false;
    };
    Table.prototype.getDefaultSortOrder = function (columns) {
        var definedSortState = getSortStateFromColumns(columns);
        var defaultSortedColumn = flatFilter(columns || [], function (column) { return column.defaultSortOrder != null; })[0];
        if (defaultSortedColumn && !definedSortState.sortColumn) {
            return {
                sortColumn: defaultSortedColumn,
                sortOrder: defaultSortedColumn.defaultSortOrder
            };
        }
        return definedSortState;
    };
    Table.prototype.getSorterFn = function () {
        var _a = this.state, sortOrder = _a.sortOrder, sortColumn = _a.sortColumn;
        if (!sortOrder || !sortColumn || typeof sortColumn.sorter !== 'function') {
            return;
        }
        return function (a, b) {
            var result = sortColumn.sorter(a, b, sortOrder);
            if (result !== 0) {
                return sortOrder === 'descend' ? -result : result;
            }
            return 0;
        };
    };
    Table.prototype.toggleSortOrder = function (order, column) {
        var _a = this.state, sortColumn = _a.sortColumn, sortOrder = _a.sortOrder;
        // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
        var isSortColumn = this.isSortColumn(column);
        if (!isSortColumn) {
            // 当前列未排序
            sortOrder = order;
            sortColumn = column;
        }
        else {
            // 当前列已排序
            if (sortOrder === order) {
                // 切换为未排序状态
                sortOrder = undefined;
                sortColumn = null;
            }
            else {
                // 切换为排序状态
                sortOrder = order;
            }
        }
        var newState = {
            sortOrder: sortOrder,
            sortColumn: sortColumn
        };
        // Controlled
        if (getSortOrderColumns(this.state.columns).length === 0) {
            this.setState(newState);
        }
        var onChange = this.props.onChange;
        if (onChange) {
            onChange.apply(null, this.prepareParamsArguments(__assign(__assign({}, this.state), newState)));
        }
    };
    Table.prototype.toggleTwoStateSortOrder = function (order, column) {
        var _a = this.state, sortColumn = _a.sortColumn, sortOrder = _a.sortOrder;
        // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
        var isSortColumn = this.isSortColumn(column);
        if (!isSortColumn) {
            // 当前列未排序
            sortOrder = order;
            sortColumn = column;
        }
        else {
            // 当前列已排序
            if (order === 'ascend') {
                sortOrder = 'descend';
            }
            else if (order === 'descend') {
                sortOrder = 'ascend';
            }
        }
        var newState = {
            sortOrder: sortOrder,
            sortColumn: sortColumn
        };
        // Controlled
        if (getSortOrderColumns(this.state.columns).length === 0) {
            this.setState(newState);
        }
        var onChange = this.props.onChange;
        if (onChange) {
            onChange.apply(null, this.prepareParamsArguments(__assign(__assign({}, this.state), newState)));
        }
    };
    Table.prototype.renderRowSelection = function (locale) {
        var _a;
        var _this = this;
        var _b = this.props, prefixCls = _b.prefixCls, rowSelection = _b.rowSelection;
        var columns = this.state.columns.concat();
        if (rowSelection) {
            var data = this.getFlatCurrentPageData().filter(function (item, index) {
                if (rowSelection.getCheckboxProps) {
                    return !_this.getCheckboxPropsByItem(item, index).disabled;
                }
                return true;
            });
            var selectionColumnClass = classNames(prefixCls + "-selection-column", (_a = {},
                _a[prefixCls + "-selection-column-custom"] = rowSelection.selections,
                _a));
            var selectionColumn = {
                key: 'selection-column',
                render: this.renderSelectionBox(rowSelection.type),
                className: selectionColumnClass,
                fixed: rowSelection.fixed,
                width: rowSelection.columnWidth,
                title: rowSelection.columnTitle
            };
            var _c = rowSelection.showSelectAll, showSelectAll = _c === void 0 ? true : _c;
            if (rowSelection.type !== 'radio' && showSelectAll) {
                var checkboxAllDisabled = data.every(function (item, index) { return _this.getCheckboxPropsByItem(item, index).disabled; });
                selectionColumn.title = (React.createElement(SelectionCheckboxAll, { store: this.store, locale: locale, data: data, getCheckboxPropsByItem: this.getCheckboxPropsByItem, getRecordKey: this.getRecordKey, disabled: checkboxAllDisabled, prefixCls: prefixCls, onSelect: this.handleSelectRow, selections: rowSelection.selections, hideDefaultSelections: rowSelection.hideDefaultSelections, getPopupContainer: this.getPopupContainer }));
            }
            if ('fixed' in rowSelection) {
                selectionColumn.fixed = rowSelection.fixed;
            }
            else if (columns.some(function (column) { return column.fixed === 'left' || column.fixed === true; })) {
                selectionColumn.fixed = 'left';
            }
            if (columns[0] && columns[0].key === 'selection-column') {
                columns[0] = selectionColumn;
            }
            else {
                columns.unshift(selectionColumn);
            }
        }
        return columns;
    };
    Table.prototype.renderColumnsFiltrate = function (columnsProps) {
        var _a = this.props, prefixCls = _a.prefixCls, columnFiltrate = _a.columnFiltrate;
        var columns = columnsProps.concat();
        if (columnFiltrate) {
            var filtrateColumn = {
                key: 'filtrate-column',
                className: classNames(prefixCls + "-filtrate-column"),
                width: 50,
                title: (React.createElement(ColumnFiltrateModal, { prefixCls: prefixCls, columns: this.state.columns, hideColumns: this.state.hideColumns, defaultColumns: columnFiltrate.defaultColumns, onChange: this.handleColumnsFiltrateChange }))
            };
            if (typeof columnFiltrate === 'object' && 'fixed' in columnFiltrate) {
                filtrateColumn.fixed = columnFiltrate.fixed;
            }
            else if (columns.some(function (column) { return column.fixed === 'right' || column.fixed === true; })) {
                filtrateColumn.fixed = 'right';
            }
            if (columns[columns.length - 1] && columns[columns.length - 1].key === 'filtrate-column') {
                columns[columns.length - 1] = filtrateColumn;
            }
            else {
                columns.push(filtrateColumn);
            }
        }
        return columns;
    };
    Table.prototype.getColumnKey = function (column, index) {
        return column.key || column.dataIndex || index;
    };
    Table.prototype.getMaxCurrent = function (total) {
        var _a = this.state.pagination, current = _a.current, pageSize = _a.pageSize;
        if ((current - 1) * pageSize >= total) {
            return Math.floor((total - 1) / pageSize) + 1;
        }
        return current;
    };
    Table.prototype.isSortColumn = function (column) {
        var sortColumn = this.state.sortColumn;
        if (!column || !sortColumn) {
            return false;
        }
        return this.getColumnKey(sortColumn) === this.getColumnKey(column);
    };
    Table.prototype.renderColumnsDropdown = function (columns, locale) {
        var _this = this;
        var _a = this.props, prefixCls = _a.prefixCls, dropdownPrefixCls = _a.dropdownPrefixCls;
        var sortOrder = this.state.sortOrder;
        return treeMap(columns, function (originColumn, i) {
            var _a;
            var column = __assign({}, originColumn);
            var key = _this.getColumnKey(column, i);
            var filterDropdown;
            var sortButton;
            if ((column.filters && column.filters.length > 0) || column.filterDropdown) {
                var colFilters = _this.state.filters[key] || [];
                filterDropdown = (React.createElement(FilterDropdown, { locale: locale, column: column, selectedKeys: colFilters, confirmFilter: _this.handleFilter, prefixCls: prefixCls + "-filter", dropdownPrefixCls: dropdownPrefixCls || 'fishd-dropdown', getPopupContainer: _this.getPopupContainer }));
            }
            if (column.sorter) {
                var isSortColumn = _this.isSortColumn(column);
                if (isSortColumn) {
                    column.className = classNames(column.className, (_a = {},
                        _a[prefixCls + "-column-sort"] = sortOrder,
                        _a));
                }
                var isAscend_1 = isSortColumn && sortOrder === 'ascend';
                var isDescend_1 = isSortColumn && sortOrder === 'descend';
                if (column.sorterType === 'firstLetter') {
                    var sortButtonInner = function () {
                        if (isAscend_1) {
                            return (React.createElement("span", { className: prefixCls + "-column-sorter-up " + (isAscend_1 ? 'on' : 'off'), onClick: function () { return _this.toggleTwoStateSortOrder('ascend', column); } },
                                React.createElement(Icon, { type: "a-z" })));
                        }
                        else if (isDescend_1) {
                            return (React.createElement("span", { className: prefixCls + "-column-sorter-down " + (isDescend_1 ? 'on' : 'off'), onClick: function () { return _this.toggleTwoStateSortOrder('descend', column); }, style: { top: -2 } },
                                React.createElement(Icon, { type: "z-a" })));
                        }
                        else {
                            return (React.createElement("span", { className: prefixCls + "-column-sorter-up", onClick: function () { return _this.toggleTwoStateSortOrder('ascend', column); } },
                                React.createElement(Icon, { type: "a-z" })));
                        }
                    };
                    sortButton = React.createElement("div", { className: prefixCls + "-column-sorter" }, sortButtonInner());
                }
                else {
                    sortButton = (React.createElement("div", { className: prefixCls + "-column-sorter" },
                        React.createElement("span", { className: prefixCls + "-column-sorter-up " + (isAscend_1 ? 'on' : 'off'), title: "\u2191", onClick: function () { return _this.toggleSortOrder('ascend', column); } },
                            React.createElement(Icon, { type: "up-fill" })),
                        React.createElement("span", { className: prefixCls + "-column-sorter-down " + (isDescend_1 ? 'on' : 'off'), title: "\u2193", onClick: function () { return _this.toggleSortOrder('descend', column); } },
                            React.createElement(Icon, { type: "down-fill" }))));
                }
            }
            column.title = (React.createElement("span", { key: key },
                column.title,
                sortButton,
                filterDropdown));
            if (sortButton || filterDropdown) {
                column.className = classNames(prefixCls + "-column-has-filters", column.className);
            }
            return column;
        });
    };
    Table.prototype.renderPagination = function (paginationPosition) {
        // 强制不需要分页
        if (!this.hasPagination()) {
            return null;
        }
        var size = 'default';
        var pagination = this.state.pagination;
        if (pagination.size) {
            size = pagination.size;
        }
        else if (this.props.size === 'small') {
            size = 'small';
        }
        var position = pagination.position || 'bottom';
        var total = pagination.total || this.getLocalData().length;
        return total > 0 && (position === paginationPosition || position === 'both') ? (React.createElement(Pagination, __assign({ key: "pagination-" + paginationPosition }, pagination, { className: classNames(pagination.className, this.props.prefixCls + "-pagination"), onChange: this.handlePageChange, total: total, size: size, current: this.getMaxCurrent(total), onShowSizeChange: this.handleShowSizeChange }))) : null;
    };
    // Get pagination, filters, sorter
    Table.prototype.prepareParamsArguments = function (state) {
        var pagination = __assign({}, state.pagination);
        // remove useless handle function in Table.onChange
        delete pagination.onChange;
        delete pagination.onShowSizeChange;
        var filters = state.filters;
        var sorter = {};
        if (state.sortColumn && state.sortOrder) {
            sorter.column = state.sortColumn;
            sorter.order = state.sortOrder;
            sorter.field = state.sortColumn.dataIndex;
            sorter.columnKey = this.getColumnKey(state.sortColumn);
        }
        return [pagination, filters, sorter];
    };
    Table.prototype.findColumn = function (myKey) {
        var _this = this;
        var column;
        treeMap(this.state.columns, function (c) {
            if (_this.getColumnKey(c) === myKey) {
                column = c;
            }
        });
        return column;
    };
    Table.prototype.getCurrentPageData = function () {
        var data = this.getLocalData();
        var current;
        var pageSize;
        var state = this.state;
        // 如果没有分页的话，默认全部展示
        if (!this.hasPagination()) {
            pageSize = Number.MAX_VALUE;
            current = 1;
        }
        else {
            pageSize = state.pagination.pageSize;
            current = this.getMaxCurrent(state.pagination.total || data.length);
        }
        // 分页
        // ---
        // 当数据量少于等于每页数量时，直接设置数据
        // 否则进行读取分页数据
        if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
            data = data.filter(function (_, i) {
                return i >= (current - 1) * pageSize && i < current * pageSize;
            });
        }
        return data;
    };
    Table.prototype.getFlatData = function () {
        return flatArray(this.getLocalData());
    };
    Table.prototype.getFlatCurrentPageData = function () {
        return flatArray(this.getCurrentPageData());
    };
    Table.prototype.recursiveSort = function (data, sorterFn) {
        var _this = this;
        var _a = this.props.childrenColumnName, childrenColumnName = _a === void 0 ? 'children' : _a;
        return data.sort(sorterFn).map(function (item) {
            var _a;
            return item[childrenColumnName]
                ? __assign(__assign({}, item), (_a = {}, _a[childrenColumnName] = _this.recursiveSort(item[childrenColumnName], sorterFn), _a)) : item;
        });
    };
    Table.prototype.getLocalData = function () {
        var _this = this;
        var state = this.state;
        var dataSource = this.props.dataSource;
        var data = dataSource || [];
        // 优化本地排序
        data = data.slice(0);
        var sorterFn = this.getSorterFn();
        if (sorterFn) {
            data = this.recursiveSort(data, sorterFn);
        }
        // 筛选
        if (state.filters) {
            Object.keys(state.filters).forEach(function (columnKey) {
                var col = _this.findColumn(columnKey);
                if (!col) {
                    return;
                }
                var values = state.filters[columnKey] || [];
                if (values.length === 0) {
                    return;
                }
                var onFilter = col.onFilter;
                data = onFilter
                    ? data.filter(function (record) {
                        return values.some(function (v) { return onFilter(v, record); });
                    })
                    : data;
            });
        }
        return data;
    };
    Table.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, className = _a.className, prefixCls = _a.prefixCls;
        var data = this.getCurrentPageData();
        var loading = this.props.loading;
        if (typeof loading === 'boolean') {
            loading = {
                spinning: loading
            };
        }
        // if there is no pagination or no data,
        // the height of spin should decrease by half of pagination
        var paginationPatchClass = this.hasPagination() && data && data.length !== 0
            ? prefixCls + "-with-pagination"
            : prefixCls + "-without-pagination";
        return (React.createElement(ConfigConsumer, { componentName: "Table" }, function (Locale) {
            return React.createElement("div", { className: classNames(prefixCls + "-wrapper", className), style: style },
                React.createElement(Spin, __assign({}, loading, { className: loading.spinning ? paginationPatchClass + " " + prefixCls + "-spin-holder" : '' }),
                    _this.renderPagination('top'),
                    React.createElement("div", null, _this.renderTable(loading, Locale)),
                    _this.renderPagination('bottom')));
        }));
    };
    Table.Column = Column;
    Table.ColumnGroup = ColumnGroup;
    Table.propTypes = {
        dataSource: PropTypes.array,
        columns: PropTypes.array,
        activeRowByClick: PropTypes.bool,
        prefixCls: PropTypes.string,
        useFixedHeader: PropTypes.bool,
        rowSelection: PropTypes.object,
        columnFiltrate: PropTypes.object,
        className: PropTypes.string,
        size: PropTypes.string,
        loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        bordered: PropTypes.bool,
        onChange: PropTypes.func,
        locale: PropTypes.object,
        dropdownPrefixCls: PropTypes.string
    };
    Table.defaultProps = {
        activeRowByClick: false,
        dataSource: [],
        prefixCls: 'fishd-table',
        useFixedHeader: false,
        className: '',
        size: 'default',
        loading: false,
        bordered: false,
        indentSize: 20,
        locale: {},
        rowKey: 'key',
        showHeader: true
    };
    return Table;
}(React.Component));
polyfill(Table);
export default Table;
