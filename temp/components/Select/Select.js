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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';
import Animate from 'rc-animate';
import scrollIntoView from 'dom-scroll-into-view';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import Button from '../Button';
import Spin from '../Spin';
import Icon from '../Icon';
import SelectSearch from './SelectSearch';
import placements from './placements';
import { KeyCode } from '../../utils';
import isEqual from 'lodash/isEqual';
import Option from './Option';
import OptGroup from './OptGroup';
import { LocaleContext } from '../Config/Locale/Context';
var noop = function () { };
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select(props) {
        var _this = _super.call(this, props) || this;
        //获取面板宽度
        _this.setDropdownWidth = function () {
            if (!_this.props.dropdownMatchSelectWidth) {
                return;
            }
            var width = ReactDOM.findDOMNode(_this).offsetWidth;
            if (width !== _this.state.dropdownWidth) {
                _this.setState({ dropdownWidth: width });
            }
        };
        //搜索键入
        _this.updateSearchValue = function (e) {
            var searchValue = e.target.value;
            _this.props.onSearch(searchValue);
            _this.setState({ searchValue: searchValue });
        };
        //清空搜索
        _this.emptySearchValue = function () {
            var searchValue = '';
            _this.props.onSearch(searchValue);
            _this.setState({ searchValue: searchValue });
            _this.focus();
        };
        //全选操作
        _this.selectAllOption = function () {
            _this.setState({
                selectValue: _this.isSelectAll()
                    ? []
                    : Select.getOptionFromChildren(_this.props.children, [], function (child) { return !child.props.disabled; })
            });
        };
        //清空数据项,mode='single'
        _this.emptySelectValue = function () {
            _this.changeVisibleState(false);
            _this.props.onChange();
            _this.setState({
                selectValue: []
            });
        };
        //popup显示隐藏
        _this.changeVisibleState = function (visible) {
            _this.props.onVisibleChange(visible);
            var changedState = {
                popupVisible: visible
            };
            var defaultActiveFirstOption = _this.props.defaultActiveFirstOption;
            if (visible) {
                // 打开弹出框时，开启激活第一个选项
                if (defaultActiveFirstOption) {
                    var firstOption = Select.getOptionFromChildren(_this.props.children, [], function (child) { return !child.props.disabled; })[0] || {};
                    changedState.activeKey = firstOption.key;
                }
            }
            else {
                changedState.activeKey = undefined;
            }
            _this.setState(changedState, function () {
                visible && _this.focus();
            });
        };
        //rc-trigger触发visibleChange事件
        _this.visibleChangeFromTrigger = function (visible) {
            var selectValueForMultiplePanel = _this.state.selectValueForMultiplePanel;
            var mode = _this.props.mode;
            if (!visible && mode === 'multiple') {
                _this.setState({
                    selectValue: selectValueForMultiplePanel
                });
            }
            _this.changeVisibleState(visible);
        };
        // 焦点操作
        _this.focusEvent = function (event) {
            var _a = _this.props, showSearch = _a.showSearch, loading = _a.loading;
            if (loading)
                return;
            var targetElement = showSearch
                ? _this.selectSearch && _this.selectSearch.searchInput.input
                : _this.selection;
            if (targetElement) {
                targetElement[event]();
            }
            else {
                setTimeout(function () {
                    var targetElement = showSearch ? _this.selectSearch.searchInput.input : _this.selection;
                    targetElement && targetElement[event]();
                });
            }
        };
        //处理 label、option的click操作
        _this.onOptionClick = function (e, obj, clickInLabel) {
            e && e.stopPropagation();
            var _a = _this.props, onChange = _a.onChange, mode = _a.mode, onSelect = _a.onSelect, labelInValue = _a.labelInValue;
            var selectValue = _this.state.selectValue;
            var index = selectValue.findIndex(function (selected) { return selected.key === obj.key; });
            if (mode === 'single') {
                _this.changeVisibleState(false);
                _this.setState({
                    selectValue: [obj]
                });
                if (index === -1) {
                    if (labelInValue) {
                        onChange(obj);
                    }
                    else {
                        onChange(obj.key);
                    }
                }
            }
            else if (mode === 'multiple') {
                var changedValue = void 0, changedObj = {};
                //label 点击
                if (clickInLabel) {
                    var selectValueForMultiplePanel = _this.state.selectValueForMultiplePanel;
                    var indexInMultiple = selectValueForMultiplePanel.findIndex(function (selected) { return selected.key === obj.key; });
                    var firstValue = selectValueForMultiplePanel.slice(0, indexInMultiple);
                    var restValues = selectValueForMultiplePanel.slice(indexInMultiple + 1);
                    changedValue = __spreadArrays(firstValue, restValues);
                    changedObj = {
                        selectValue: changedValue,
                        selectValueForMultiplePanel: changedValue
                    };
                }
                else {
                    //option 点击
                    changedValue =
                        index === -1
                            ? __spreadArrays(selectValue, [obj]) : __spreadArrays(selectValue.slice(0, index), selectValue.slice(index + 1));
                    changedObj = {
                        selectValue: changedValue
                    };
                }
                _this.setState(changedObj);
                if (clickInLabel) {
                    //click on label will trigger the onchange event.
                    if (labelInValue) {
                        onChange(changedValue);
                    }
                    else {
                        onChange(changedValue.map(function (selected) { return selected.key; }));
                    }
                }
            }
            //fire onSelect event => option/label click
            onSelect(obj);
        };
        //获取加料后的children
        _this.getProcessedChildren = function (children, dropdownCls) {
            return React.Children.map(children, function (child) {
                var typeOfChildren = Object.prototype.toString.call(child).slice(8, -1).toLowerCase();
                if (!!child && typeOfChildren === 'object' && child.type && child.type.isSelectOption) {
                    var _a = _this.state, selectValue = _a.selectValue, activeKey = _a.activeKey;
                    var showOptionCheckedIcon = _this.props.showOptionCheckedIcon;
                    var value_1 = 'value' in child.props ? child.props.value : child.key;
                    //对children中的Option 进行事件绑定、参数补充
                    return React.cloneElement(child, {
                        prefixCls: dropdownCls + "-option",
                        checked: !!selectValue.find(function (obj) { return obj && obj.key === value_1; }),
                        value: value_1,
                        activeKey: activeKey,
                        showOptionCheckedIcon: showOptionCheckedIcon,
                        onOptionClick: _this.onOptionClick,
                        // NOTICE: onOptionMouseEnter REMOVED (No definition found)
                        // onOptionMouseEnter: this.onOptionMouseEnter,
                        ref: value_1,
                        children: _this.getProcessedChildren(child.props.children, dropdownCls)
                    });
                }
                else if (!!child && typeOfChildren === 'object' && child.type && child.type.isSelectOptGroup) {
                    return React.cloneElement(child, {
                        prefixCls: dropdownCls + "-option-group",
                        children: _this.getProcessedChildren(child.props.children, dropdownCls)
                    });
                }
                else {
                    return child;
                }
            });
        };
        //获取筛选后children
        _this.getFilteredChildren = function (children, ChildrenList) {
            if (ChildrenList === void 0) { ChildrenList = []; }
            var filterOption = _this.props.filterOption;
            var searchValue = _this.state.searchValue;
            var typeOfOption = Object.prototype.toString.call(filterOption).slice(8, -1).toLowerCase();
            React.Children.forEach(children, function (child) {
                var filterFlag = false;
                if (child && child.type && child.type.isSelectOption) {
                    if (typeOfOption === 'function') {
                        filterFlag = filterOption(searchValue, child);
                    }
                    else if (typeOfOption === 'boolean') {
                        filterFlag = filterOption;
                    }
                    if (filterFlag) {
                        ChildrenList.push(child);
                    }
                }
                else if (child && child.type && child.type.isSelectOptGroup) {
                    var children_1 = _this.getFilteredChildren(child.props.children);
                    ChildrenList.push(React.cloneElement(child, {
                        children: children_1,
                        _isShow: !!(children_1 && children_1.length) //搜索后分组下没有东西就隐藏该分组
                    }));
                }
            });
            return ChildrenList;
        };
        //多选-取消
        _this.handleCancelSelect = function () {
            var selectValueForMultiplePanel = _this.state.selectValueForMultiplePanel;
            _this.changeVisibleState(false);
            _this.setState({
                selectValue: selectValueForMultiplePanel
            });
        };
        //多选-确定
        _this.handleConfirmSelect = function () {
            var _a = _this.props, onChange = _a.onChange, labelInValue = _a.labelInValue;
            var selectValue = _this.state.selectValue;
            _this.changeVisibleState(false);
            _this.setState({
                selectValueForMultiplePanel: selectValue
            });
            var outputSelectedValue = selectValue;
            // 是否过滤失效的选中项
            if (_this.props.filterInactiveOption) {
                var optionList_1 = Select.getOptionFromChildren(_this.props.children, [], function (child) { return !child.props.disabled; });
                outputSelectedValue = selectValue.filter(function (item) {
                    return !!optionList_1.find(function (option) {
                        return option.key === item.key;
                    });
                });
            }
            if (labelInValue) {
                onChange(outputSelectedValue);
            }
            else {
                onChange(outputSelectedValue.map(function (selected) { return selected.key; }));
            }
        };
        //判断是否全选
        _this.isSelectAll = function (isMultiplePanel) {
            if (isMultiplePanel === void 0) { isMultiplePanel = false; }
            var _a = _this.state, selectValueForMultiplePanel = _a.selectValueForMultiplePanel, selectValue = _a.selectValue;
            var optionList = Select.getOptionFromChildren(_this.props.children, [], function (child) { return !child.props.disabled; });
            //全选判断逻辑：option中每一项都能在selected中找到（兼容后端搜索的全选判断）
            if (isMultiplePanel) {
                return (optionList.length &&
                    optionList.every(function (selected) {
                        return !!selectValueForMultiplePanel.find(function (option) { return option.key === selected.key; });
                    }));
            }
            else {
                return optionList.every(function (selected) {
                    return !!selectValue.find(function (option) { return option.key === selected.key; });
                });
            }
        };
        //处理键盘事件：ENTER/ESC/UP/DOWN
        _this.handleKeyboardEvent = function (e) {
            var keyCode = e.keyCode;
            if (keyCode === KeyCode.ESC && _this.props.esc) {
                _this.changeVisibleState(false);
                return;
            }
            if (keyCode === KeyCode.ENTER || keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
                e.preventDefault();
                var _a = _this.props, children = _a.children, mode = _a.mode, labelInValue_1 = _a.labelInValue, onChange_1 = _a.onChange;
                var _b = _this.state, activeKey_1 = _b.activeKey, selectValue = _b.selectValue;
                var filteredList = _this.getFilteredChildren(children); // 筛选过的数组
                var optionList_2 = Select.getOptionFromChildren(filteredList, [], function (child) { return !child.props.disabled; }); // 去除 disabled 选项
                var optionListLen = optionList_2.length;
                if (!optionListLen)
                    return;
                //enter
                if (keyCode === KeyCode.ENTER) {
                    var activeTabIndex = optionList_2.findIndex(function (option) { return option.key === activeKey_1; });
                    // activeKey不在列表中
                    if (activeTabIndex !== -1) {
                        if (!selectValue.find(function (selected) { return selected.key === activeKey_1; })) {
                            if (mode === 'single') {
                                _this.changeVisibleState(false);
                                _this.setState({
                                    selectValue: [optionList_2[activeTabIndex]],
                                    activeKey: undefined
                                }, function () {
                                    if (labelInValue_1) {
                                        onChange_1(_this.state.selectValue[0]);
                                    }
                                    else {
                                        onChange_1(_this.state.selectValue.map(function (selected) { return selected.key; })[0]);
                                    }
                                });
                            }
                            else if (mode === 'multiple') {
                                _this.setState({
                                    selectValue: __spreadArrays(selectValue, [optionList_2[activeTabIndex]])
                                });
                            }
                        }
                    }
                }
                //38 up 40 down
                if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
                    // 有activeKey
                    if (activeKey_1 !== undefined) {
                        var activeTabIndex = optionList_2.findIndex(function (option) { return option.key === activeKey_1; });
                        // activeKey不在列表中
                        if (activeTabIndex === -1) {
                            _this.setState({
                                activeKey: optionList_2[0].key
                            }, function () {
                                _this.setActiveOptionIntoView(optionList_2[0].key);
                            });
                            return;
                        }
                        // 上按钮
                        var nextActiveKey_1 = undefined;
                        if (keyCode === KeyCode.UP) {
                            //超出到最后一个
                            if (activeTabIndex === 0) {
                                nextActiveKey_1 = optionList_2[optionListLen - 1].key;
                            }
                            else {
                                nextActiveKey_1 = optionList_2[activeTabIndex - 1].key;
                            }
                        }
                        else if (keyCode === KeyCode.DOWN) {
                            if (activeTabIndex + 1 === optionListLen) {
                                nextActiveKey_1 = optionList_2[0].key;
                            }
                            else {
                                nextActiveKey_1 = optionList_2[activeTabIndex + 1].key;
                            }
                        }
                        _this.setState({
                            activeKey: nextActiveKey_1
                        }, function () {
                            _this.setActiveOptionIntoView(nextActiveKey_1);
                        });
                    }
                    else {
                        _this.setState({
                            activeKey: optionList_2[0].key
                        }, function () {
                            _this.setActiveOptionIntoView(optionList_2[0].key);
                        });
                    }
                }
            }
        };
        //处理option的激活态
        _this.setActiveOptionIntoView = function (activeKey) {
            scrollIntoView(ReactDOM.findDOMNode(_this.refs[activeKey]), ReactDOM.findDOMNode(_this.dropdownList), {
                onlyScrollIfNeeded: true
            });
        };
        // selectionChange后重新定位trigger
        _this.resizeTrigger = function () {
            if (_this.trigger && _this.trigger._component && _this.trigger._component.alignInstance) {
                _this.trigger._component.alignInstance.forceAlign();
            }
        };
        var _a = _this.props, value = _a.value, defaultValue = _a.defaultValue, labelInValue = _a.labelInValue, children = _a.children, visible = _a.visible;
        var initialValue = [];
        if ('value' in _this.props) {
            initialValue = value;
        }
        else if ('defaultValue' in _this.props) {
            initialValue = defaultValue;
        }
        var initialSelectValue = Select.getValueFromProps(initialValue, labelInValue, children);
        _this.state = {
            searchValue: '',
            selectValue: initialSelectValue,
            selectValueForMultiplePanel: initialSelectValue,
            popupVisible: visible,
            activeKey: undefined,
            dropdownWidth: null,
            prevProps: props
        };
        return _this;
    }
    Select.getDerivedStateFromProps = function (nextProps, prevState) {
        var _a = prevState.prevProps, prevProps = _a === void 0 ? {} : _a;
        var newState = {
            prevProps: nextProps
        };
        if ('visible' in nextProps && !isEqual(nextProps.visible, prevProps.visible)) {
            newState.popupVisible = nextProps.visible;
        }
        if ('value' in nextProps) {
            var changedValue = Select.getValueFromProps(nextProps.value, nextProps.labelInValue, nextProps.children);
            var prevValue = Select.getValueFromProps(prevProps.value, prevProps.labelInValue, prevProps.children);
            if (!isEqual(changedValue, prevValue)) {
                newState.selectValue = changedValue;
                if (nextProps.mode === 'multiple') {
                    newState.selectValueForMultiplePanel = changedValue;
                }
            }
        }
        return newState;
    };
    Select.prototype.componentDidMount = function () {
        this.setDropdownWidth();
    };
    Select.prototype.componentDidUpdate = function () {
        this.setDropdownWidth();
    };
    // 聚焦
    Select.prototype.focus = function () {
        this.focusEvent('focus');
    };
    // 失焦
    Select.prototype.blur = function () {
        this.focusEvent('blur');
    };
    //下拉框内容
    Select.prototype.getDropdownPanel = function (Locale) {
        var _a, _b, _c;
        var _this = this;
        var _d = this.props, allowClear = _d.allowClear, children = _d.children, dropdownClassName = _d.dropdownClassName, dropdownStyle = _d.dropdownStyle, extraOptions = _d.extraOptions, loading = _d.loading, maxCount = _d.maxCount, maxScrollHeight = _d.maxScrollHeight, mode = _d.mode, onPopupScroll = _d.onPopupScroll, prefixCls = _d.prefixCls, searchInputProps = _d.searchInputProps, showSearch = _d.showSearch, showSelectAll = _d.showSelectAll, showSingleClear = _d.showSingleClear, required = _d.required, _e = _d.errorMessage, errorMessage = _e === void 0 ? Locale.errorMessage : _e, _f = _d.notFoundContent, notFoundContent = _f === void 0 ? Locale.notFoundContent : _f, _g = _d.placeholder, placeholder = _g === void 0 ? Locale.placeholder : _g, _h = _d.searchPlaceholder, searchPlaceholder = _h === void 0 ? Locale.searchPlaceholder : _h, _j = _d.selectAllText, selectAllText = _j === void 0 ? Locale.selectAllText : _j;
        var _k = this.state, searchValue = _k.searchValue, selectValue = _k.selectValue;
        var dropdownCls = prefixCls + "-dropdown";
        //获取筛选后的children
        var optionFilteredList = this.getFilteredChildren(this.getProcessedChildren(children, dropdownCls));
        var showNotFoundContent = !Select.getOptionFromChildren(optionFilteredList).length; // optionList为空判断
        var maxCountError = 'maxCount' in this.props && selectValue.length > maxCount; // maxCount值存在且小于选择数量
        var requiredError = mode === 'multiple' && required && !selectValue.length; // required模式下，必须要有option选择
        var multipleConfirmDisabled = maxCountError || requiredError;
        var dropdownPanelCls = classNames(dropdownCls, (_a = {},
            _a[dropdownClassName] = !!dropdownClassName,
            _a));
        return (React.createElement("div", { className: dropdownPanelCls, onKeyDown: this.handleKeyboardEvent, ref: function (selection) { return (_this.selection = selection); }, style: dropdownStyle, tabIndex: 0 }, loading ? (React.createElement("div", { className: dropdownCls + "-loading" },
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement(Spin.Container, { style: { height: 32, justifyContent: 'left' } },
                        React.createElement(Spin, { size: "small", tip: "\u52A0\u8F7D\u4E2D..." })))))) : (React.createElement("div", { className: dropdownCls + "-content" },
            //搜索框
            showSearch && (React.createElement(SelectSearch, { allowClear: allowClear, emitEmpty: this.emptySearchValue, prefixCls: dropdownCls + "-search", ref: function (selectSearch) { return (_this.selectSearch = selectSearch); }, searchInputProps: searchInputProps, searchPlaceholder: searchPlaceholder, searchValue: searchValue, updateSearchValue: this.updateSearchValue })),
            React.createElement("div", { className: dropdownCls + "-list", onScroll: onPopupScroll, ref: function (dropdownList) { return (_this.dropdownList = dropdownList); }, style: { maxHeight: maxScrollHeight } },
                //全选按钮-多选未搜索的情况下存在
                !searchValue && showSelectAll && mode === 'multiple' && (React.createElement("li", { className: classNames((_b = {}, _b[dropdownCls + "-option-item"] = true, _b), (_c = {}, _c['checked checked-icon'] = this.isSelectAll(), _c)), onClick: this.selectAllOption }, selectAllText)),
                //清空选项按钮-单选未搜索的情况下存在
                !searchValue && showSingleClear && mode === 'single' && (React.createElement("li", { className: dropdownCls + "-option-item", onClick: this.emptySelectValue }, placeholder)),
                //预留置顶项
                extraOptions,
                //列表及空状态框
                showNotFoundContent ? (React.createElement("div", { className: dropdownCls + "-not-found" }, notFoundContent)) : (React.createElement("div", { className: dropdownCls + "-filtered-list" }, optionFilteredList))),
            //多选的点击取消、确定按钮组
            mode === 'multiple' && (React.createElement("div", null,
                maxCountError && (React.createElement("div", { className: dropdownCls + "-error-panel" },
                    React.createElement("p", { className: dropdownCls + "-error-panel-msg" }, errorMessage))),
                React.createElement("div", { className: dropdownCls + "-footer" },
                    React.createElement(Button, { className: dropdownCls + "-footer-btn", onClick: this.handleCancelSelect }, Locale.cancelText),
                    React.createElement(Button, { className: dropdownCls + "-footer-btn", onClick: this.handleConfirmSelect, disabled: multipleConfirmDisabled, type: "primary" }, Locale.confirmText))))))));
    };
    // 获取面板内容
    Select.prototype.getSelectionPanel = function (Locale) {
        var _a, _b, _c, _d, _e, _f, _g;
        var _this = this;
        var _h = this.props, className = _h.className, tagWidth = _h.tagWidth, disabled = _h.disabled, labelClear = _h.labelClear, loading = _h.loading, maxLabelClearPanelHeight = _h.maxLabelClearPanelHeight, mode = _h.mode, onMouseEnter = _h.onMouseEnter, onMouseLeave = _h.onMouseLeave, prefixCls = _h.prefixCls, showArrow = _h.showArrow, showMultipleSelectAll = _h.showMultipleSelectAll, size = _h.size, style = _h.style, _j = _h.placeholder, placeholder = _j === void 0 ? Locale.placeholder : _j, _k = _h.multipleSelectAllText, multipleSelectAllText = _k === void 0 ? Locale.multipleSelectAllText : _k;
        var _l = this.state, selectValue = _l.selectValue, selectValueForMultiplePanel = _l.selectValueForMultiplePanel, popupVisible = _l.popupVisible;
        var selectionCls = "" + prefixCls;
        var selectionPanelCls = classNames((_a = {}, _a["" + selectionCls] = true, _a), (_b = {}, _b[className] = !!className, _b), (_c = {}, _c[selectionCls + "-disabled"] = disabled, _c), (_d = {}, _d["open"] = popupVisible, _d), (_e = {}, _e[selectionCls + "-large"] = size === 'large', _e), (_f = {}, _f[selectionCls + "-small"] = size === 'small', _f));
        var panelStyle = __assign({}, style);
        if (labelClear) {
            panelStyle.paddingRight = 0;
            if (mode === 'multiple' && selectValueForMultiplePanel.length) {
                panelStyle.height = 'auto';
            }
        }
        var multipleTitle = '';
        if (mode === 'multiple' && !labelClear) {
            var titleArray = selectValueForMultiplePanel.map(function (panel) { return panel.title; });
            var isShowTitle = titleArray.every(function (title) { return !!title; });
            multipleTitle = isShowTitle ? titleArray.join('、') : '';
        }
        return (React.createElement("div", { className: selectionPanelCls, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, style: panelStyle }, loading ? (React.createElement("div", { className: selectionCls + "-loading" },
            React.createElement("div", null,
                React.createElement(Spin.Container, { style: { height: 32, justifyContent: 'left' } },
                    React.createElement(Spin, { size: "small", tip: "\u52A0\u8F7D\u4E2D..." }))))) : (React.createElement("div", { className: selectionCls + "-content" },
            // showArrow并且不是可删除label模式下出现箭头
            showArrow && !labelClear && (React.createElement("div", { className: selectionCls + "-caret" },
                React.createElement(Icon, { type: "down-fill", className: classNames((_g = {}, _g['open'] = popupVisible, _g)) }))),
            // 没有值的情况下显示placeholder
            ((!selectValue.length && mode === 'single') ||
                (!selectValueForMultiplePanel.length && mode === 'multiple')) && (React.createElement("div", { className: selectionCls + "-placeholder" }, placeholder)),
            // 单选模式下有值显示值的label
            mode === 'single' && !!selectValue.length && (React.createElement("div", { className: selectionCls + "-option-single", title: selectValue[0].title }, selectValue[0].label)),
            // 多选模式下区分labelClear
            // selectValueForMultiplePanel的更新时机：
            // 1.初始化value、defaultValue
            // 2.props.value 更改
            // 3.多选取消、确定按钮点击
            // 4.label.click事件
            mode === 'multiple' &&
                (labelClear ? (
                //仅在有选中数据时渲染，fix空状态面板上方高度问题
                selectValueForMultiplePanel && selectValueForMultiplePanel.length ? (React.createElement(Animate, { onEnd: this.resizeTrigger, component: "div", transitionName: "zoom", style: {
                        maxHeight: maxLabelClearPanelHeight ? maxLabelClearPanelHeight : null
                    }, className: selectionCls + "-option-clearable-list" }, selectValueForMultiplePanel.map(function (option) { return (React.createElement("div", { className: selectionCls + "-option-clearable-option", style: { width: tagWidth }, key: option.key, title: option.title },
                    React.createElement("span", { className: selectionCls + "-option-clearable-option-content" }, option.label),
                    React.createElement("span", { className: selectionCls + "-option-clearable-option-close", onClick: function (e) { return _this.onOptionClick(e, option, true); } },
                        React.createElement(Icon, { type: "close-modal-line" })))); }))) : null) : (React.createElement("div", { className: selectionCls + "-option-multiple", title: multipleTitle }, this.isSelectAll(true) && showMultipleSelectAll ? (React.createElement("span", null, multipleSelectAllText)) : (selectValueForMultiplePanel.map(function (option, index) { return (React.createElement("span", { key: option.key, className: selectionCls + "-option-multiple-option" },
                    React.createElement("span", null, option.label),
                    index + 1 !== selectValueForMultiplePanel.length && '、')); })))))))));
    };
    Select.prototype.render = function () {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, dropdownMatchSelectWidth = _a.dropdownMatchSelectWidth, getPopupContainer = _a.getPopupContainer, placement = _a.placement, prefixCls = _a.prefixCls;
        var _b = this.state, popupVisible = _b.popupVisible, dropdownWidth = _b.dropdownWidth;
        var popupStyle = {};
        var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
        if (dropdownWidth) {
            popupStyle[widthProp] = dropdownWidth + "px";
        }
        var LocaleContextValue = this.context;
        var Locale = LocaleContextValue && LocaleContextValue['Select'];
        return (React.createElement(Trigger, { action: disabled ? [] : ['click'], builtinPlacements: placements, ref: function (node) { return (_this.trigger = node); }, getPopupContainer: getPopupContainer, onPopupVisibleChange: this.visibleChangeFromTrigger, popup: this.getDropdownPanel(Locale), popupPlacement: placement, popupVisible: popupVisible, prefixCls: prefixCls + "-popup", popupStyle: popupStyle }, this.getSelectionPanel(Locale)));
    };
    Select.Option = Option;
    Select.OptGroup = OptGroup;
    Select.propTypes = {
        allowClear: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.string,
        tagWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        defaultActiveFirstOption: PropTypes.bool,
        defaultValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.array,
            PropTypes.object
        ]),
        disabled: PropTypes.bool,
        dropdownClassName: PropTypes.string,
        dropdownMatchSelectWidth: PropTypes.bool,
        dropdownStyle: PropTypes.object,
        errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        extraOptions: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        filterOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        getPopupContainer: PropTypes.func,
        labelClear: PropTypes.bool,
        labelInValue: PropTypes.bool,
        loading: PropTypes.bool,
        maxCount: PropTypes.number,
        maxLabelClearPanelHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        maxScrollHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        mode: PropTypes.oneOf(['multiple', 'single']),
        multipleSelectAllText: PropTypes.string,
        notFoundContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        onChange: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onPopupScroll: PropTypes.func,
        onSearch: PropTypes.func,
        onSelect: PropTypes.func,
        onVisibleChange: PropTypes.func,
        placeholder: PropTypes.string,
        placement: PropTypes.oneOf([
            'bottomLeft',
            'bottomCenter',
            'bottomRight',
            'topLeft',
            'topCenter',
            'topRight'
        ]),
        prefixCls: PropTypes.string,
        searchInputProps: PropTypes.object,
        searchPlaceholder: PropTypes.string,
        selectAllText: PropTypes.string,
        showArrow: PropTypes.bool,
        showMultipleSelectAll: PropTypes.bool,
        showOptionCheckedIcon: PropTypes.bool,
        showSearch: PropTypes.bool,
        showSelectAll: PropTypes.bool,
        showSingleClear: PropTypes.bool,
        size: PropTypes.oneOf(['default', 'small', 'large']),
        style: PropTypes.object,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.array,
            PropTypes.object
        ]),
        visible: PropTypes.bool,
        esc: PropTypes.bool,
        required: PropTypes.bool,
        filterInactiveOption: PropTypes.bool // 是否过滤失效的选中项（即不在option列表中）
    };
    Select.contextType = LocaleContext;
    Select.defaultProps = {
        allowClear: true,
        tagWidth: 100,
        defaultActiveFirstOption: false,
        disabled: false,
        dropdownMatchSelectWidth: true,
        filterOption: true,
        labelClear: false,
        labelInValue: false,
        loading: false,
        maxScrollHeight: 250,
        mode: 'single',
        onChange: noop,
        onPopupScroll: noop,
        onSearch: noop,
        onSelect: noop,
        onVisibleChange: noop,
        placement: 'bottomLeft',
        prefixCls: 'fishd-select',
        searchInputProps: {},
        showArrow: true,
        showMultipleSelectAll: false,
        showOptionCheckedIcon: true,
        showSearch: false,
        showSelectAll: false,
        showSingleClear: false,
        size: 'default',
        style: {},
        visible: false,
        esc: true,
        required: false,
        filterInactiveOption: false
    };
    //获取所有option的[{label,key,title}]
    Select.getOptionFromChildren = function (children, plainOptionList, filter) {
        if (plainOptionList === void 0) { plainOptionList = []; }
        React.Children.forEach(children, function (child) {
            if (child && child.type && child.type.isSelectOption) {
                var selectOption = {
                    label: child.props.children,
                    key: 'value' in child.props ? child.props.value : child.key,
                    title: child.props.title
                };
                if (filter) {
                    filter(child) && plainOptionList.push(selectOption);
                }
                else {
                    plainOptionList.push(selectOption);
                }
            }
            else if (child && child.type && child.type.isSelectOptGroup) {
                Select.getOptionFromChildren(child.props.children, plainOptionList, filter);
            }
            else {
                //  其余暂时不做处理
            }
        });
        return plainOptionList;
    };
    //转换传入的value
    Select.getValueFromProps = function (value, labelInValue, children) {
        var valueType = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        var optionList = Select.getOptionFromChildren(children, []);
        if (labelInValue) {
            //labelInValue数据从传入数据中取
            if (valueType === 'array') {
                return ((value &&
                    value.map(function (obj) {
                        var option = optionList.find(function (option) { return option.key === obj.key; }) || {};
                        var label = obj.label || option.label || obj.key;
                        var title = obj.title || option.title;
                        return {
                            key: obj.key,
                            label: label,
                            title: title
                        };
                    })) ||
                    []);
            }
            else if (valueType === 'object') {
                var option = optionList.find(function (option) { return option.key === value.key; }) || {};
                var label = value.label || option.label || value.key;
                var title = value.title || option.title;
                return [
                    {
                        key: value.key,
                        label: label,
                        title: title
                    }
                ];
            }
            else {
                // 其余就给空状态
                return [];
            }
        }
        else {
            // 非labelInValue数据从option里取
            if (valueType === 'string' || valueType === 'number')
                value = [value];
            return ((value &&
                value.map(function (key) {
                    var option = optionList.find(function (option) { return option.key === key; }) || {};
                    var label = option.label || key;
                    var title = option.title;
                    return {
                        key: key,
                        label: label,
                        title: title
                    };
                })) ||
                []);
        }
    };
    return Select;
}(React.Component));
polyfill(Select);
export default Select;
