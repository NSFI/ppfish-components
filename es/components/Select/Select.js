function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';
import Animate from 'rc-animate';
import scrollIntoView from 'dom-scroll-into-view';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import Button from '../Button/index.js';
import Spin from '../Spin/index.js';
import Icon from '../Icon/index.js';
import SelectSearch from './SelectSearch';
import placements from './placements';
import { KeyCode } from "../../utils";
import isEqual from 'lodash/isEqual';

var noop = function noop() {};

var Select =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Select, _React$Component);

  _createClass(Select, null, [{
    key: "getDerivedStateFromProps",
    //获取所有option的[{label,key,title}]
    //转换传入的value
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var _prevState$prevProps = prevState.prevProps,
          prevProps = _prevState$prevProps === void 0 ? {} : _prevState$prevProps;
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
    }
  }]);

  function Select(props) {
    var _this;

    _classCallCheck(this, Select);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "setDropdownWidth", function () {
      if (!_this.props.dropdownMatchSelectWidth) {
        return;
      }

      var width = ReactDOM.findDOMNode(_assertThisInitialized(_this)).offsetWidth;

      if (width !== _this.state.dropdownWidth) {
        _this.setState({
          dropdownWidth: width
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateSearchValue", function (e) {
      var searchValue = e.target.value;

      _this.props.onSearch(searchValue);

      _this.setState({
        searchValue: searchValue
      });
    });

    _defineProperty(_assertThisInitialized(_this), "emptySearchValue", function () {
      var searchValue = '';

      _this.props.onSearch(searchValue);

      _this.setState({
        searchValue: searchValue
      });

      _this.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "selectAllOption", function () {
      _this.setState({
        selectValue: _this.isSelectAll() ? [] : Select.getOptionFromChildren(_this.props.children, [], function (child) {
          return !child.props.disabled;
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "emptySelectValue", function () {
      _this.changeVisibleState(false);

      _this.props.onChange();

      _this.setState({
        selectValue: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeVisibleState", function (visible) {
      _this.props.onVisibleChange(visible);

      var changedState = {
        popupVisible: visible
      };
      var defaultActiveFirstOption = _this.props.defaultActiveFirstOption;

      if (visible) {
        // 打开弹出框时，开启激活第一个选项
        if (defaultActiveFirstOption) {
          var firstOption = Select.getOptionFromChildren(_this.props.children, [], function (child) {
            return !child.props.disabled;
          })[0] || {};
          changedState.activeKey = firstOption.key;
        }
      } else {
        changedState.activeKey = undefined;
      }

      _this.setState(changedState, function () {
        visible && _this.focus();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "visibleChangeFromTrigger", function (visible) {
      var selectValueForMultiplePanel = _this.state.selectValueForMultiplePanel;
      var mode = _this.props.mode;

      if (!visible && mode === 'multiple') {
        _this.setState({
          selectValue: selectValueForMultiplePanel
        });
      }

      _this.changeVisibleState(visible);
    });

    _defineProperty(_assertThisInitialized(_this), "focusEvent", function (event) {
      var _this$props = _this.props,
          showSearch = _this$props.showSearch,
          loading = _this$props.loading;
      if (loading) return;
      var targetElement = showSearch ? _this.selectSearch && _this.selectSearch.searchInput.input : _this.selection;

      if (targetElement) {
        targetElement[event]();
      } else {
        setTimeout(function () {
          var targetElement = showSearch ? _this.selectSearch.searchInput.input : _this.selection;
          targetElement && targetElement[event]();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onOptionClick", function (e, obj, clickInLabel) {
      e && e.stopPropagation();
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          mode = _this$props2.mode,
          onSelect = _this$props2.onSelect,
          labelInValue = _this$props2.labelInValue;
      var selectValue = _this.state.selectValue;
      var index = selectValue.findIndex(function (selected) {
        return selected.key === obj.key;
      });

      if (mode === 'single') {
        _this.changeVisibleState(false);

        _this.setState({
          selectValue: [obj]
        });

        if (index === -1) {
          if (labelInValue) {
            onChange(obj);
          } else {
            onChange(obj.key);
          }
        }
      } else if (mode === 'multiple') {
        var changedValue,
            changedObj = {}; //label 点击

        if (clickInLabel) {
          var selectValueForMultiplePanel = _this.state.selectValueForMultiplePanel;
          var indexInMultiple = selectValueForMultiplePanel.findIndex(function (selected) {
            return selected.key === obj.key;
          });
          changedValue = [].concat(_toConsumableArray(selectValueForMultiplePanel.slice(0, indexInMultiple)), _toConsumableArray(selectValueForMultiplePanel.slice(indexInMultiple + 1)));
          changedObj = {
            selectValue: changedValue,
            selectValueForMultiplePanel: changedValue
          };
        } else {
          //option 点击
          changedValue = index === -1 ? [].concat(_toConsumableArray(selectValue), [obj]) : [].concat(_toConsumableArray(selectValue.slice(0, index)), _toConsumableArray(selectValue.slice(index + 1)));
          changedObj = {
            selectValue: changedValue
          };
        }

        _this.setState(changedObj);

        if (clickInLabel) {
          //click on label will trigger the onchange event.
          if (labelInValue) {
            onChange(changedValue);
          } else {
            onChange(changedValue.map(function (selected) {
              return selected.key;
            }));
          }
        }
      } //fire onSelect event => option/label click


      onSelect(obj);
    });

    _defineProperty(_assertThisInitialized(_this), "getProcessedChildren", function (children, dropdownCls) {
      return React.Children.map(children, function (child) {
        var typeOfChildren = Object.prototype.toString.call(child).slice(8, -1).toLowerCase();

        if (!!child && typeOfChildren === 'object' && child.type.isSelectOption) {
          var _this$state = _this.state,
              selectValue = _this$state.selectValue,
              activeKey = _this$state.activeKey;
          var showOptionCheckedIcon = _this.props.showOptionCheckedIcon;
          var value = 'value' in child.props ? child.props.value : child.key; //对children中的Option 进行事件绑定、参数补充

          return React.cloneElement(child, {
            prefixCls: "".concat(dropdownCls, "-option"),
            checked: !!selectValue.find(function (obj) {
              return obj && obj.key === value;
            }),
            value: value,
            activeKey: activeKey,
            showOptionCheckedIcon: showOptionCheckedIcon,
            onOptionClick: _this.onOptionClick,
            onOptionMouseEnter: _this.onOptionMouseEnter,
            ref: value,
            children: _this.getProcessedChildren(child.props.children, dropdownCls)
          });
        } else if (!!child && typeOfChildren === 'object' && child.type.isSelectOptGroup) {
          return React.cloneElement(child, {
            prefixCls: "".concat(dropdownCls, "-option-group"),
            children: _this.getProcessedChildren(child.props.children, dropdownCls)
          });
        } else {
          return child;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getFilteredChildren", function (children) {
      var ChildrenList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var filterOption = _this.props.filterOption;
      var searchValue = _this.state.searchValue;
      var typeOfOption = Object.prototype.toString.call(filterOption).slice(8, -1).toLowerCase();
      React.Children.forEach(children, function (child) {
        var filterFlag = false;

        if (child && child.type && child.type.isSelectOption) {
          if (typeOfOption === 'function') {
            filterFlag = filterOption(searchValue, child);
          } else if (typeOfOption === 'boolean') {
            filterFlag = filterOption;
          }

          if (filterFlag) {
            ChildrenList.push(child);
          }
        } else if (child && child.type && child.type.isSelectOptGroup) {
          var _children2 = _this.getFilteredChildren(child.props.children);

          ChildrenList.push(React.cloneElement(child, {
            children: _children2,
            _isShow: !!(_children2 && _children2.length) //搜索后分组下没有东西就隐藏该分组

          }));
        }
      });
      return ChildrenList;
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancelSelect", function () {
      var selectValueForMultiplePanel = _this.state.selectValueForMultiplePanel;

      _this.changeVisibleState(false);

      _this.setState({
        selectValue: selectValueForMultiplePanel
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleConfirmSelect", function () {
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          labelInValue = _this$props3.labelInValue;
      var selectValue = _this.state.selectValue;

      _this.changeVisibleState(false);

      _this.setState({
        selectValueForMultiplePanel: selectValue
      });

      var outputSelectedValue = selectValue; // 是否过滤失效的选中项

      if (_this.props.filterInactiveOption) {
        var optionList = Select.getOptionFromChildren(_this.props.children, [], function (child) {
          return !child.props.disabled;
        });
        outputSelectedValue = selectValue.filter(function (item) {
          return !!optionList.find(function (option) {
            return option.key === item.key;
          });
        });
      }

      if (labelInValue) {
        onChange(outputSelectedValue);
      } else {
        onChange(outputSelectedValue.map(function (selected) {
          return selected.key;
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isSelectAll", function () {
      var isMultiplePanel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$state2 = _this.state,
          selectValueForMultiplePanel = _this$state2.selectValueForMultiplePanel,
          selectValue = _this$state2.selectValue;
      var optionList = Select.getOptionFromChildren(_this.props.children, [], function (child) {
        return !child.props.disabled;
      }); //全选判断逻辑：option中每一项都能在selected中找到（兼容后端搜索的全选判断）

      if (isMultiplePanel) {
        return optionList.length && optionList.every(function (selected) {
          return !!selectValueForMultiplePanel.find(function (option) {
            return option.key === selected.key;
          });
        });
      } else {
        return optionList.every(function (selected) {
          return !!selectValue.find(function (option) {
            return option.key === selected.key;
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardEvent", function (e) {
      var keyCode = e.keyCode;

      if (keyCode === KeyCode.ESC && _this.props.esc) {
        _this.changeVisibleState(false);

        return;
      }

      if (keyCode === KeyCode.ENTER || keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
        e.preventDefault();
        var _this$props4 = _this.props,
            children = _this$props4.children,
            mode = _this$props4.mode,
            labelInValue = _this$props4.labelInValue,
            onChange = _this$props4.onChange;
        var _this$state3 = _this.state,
            activeKey = _this$state3.activeKey,
            selectValue = _this$state3.selectValue;
        var optionList = Select.getOptionFromChildren(children, [], function (child) {
          return !child.props.disabled;
        });
        var optionListLen = optionList.length;
        if (!optionListLen) return; //enter

        if (keyCode === KeyCode.ENTER) {
          var activeTabIndex = optionList.findIndex(function (option) {
            return option.key === activeKey;
          }); // activeKey不在列表中

          if (activeTabIndex !== -1) {
            if (!selectValue.find(function (selected) {
              return selected.key === activeKey;
            })) {
              if (mode === 'single') {
                _this.changeVisibleState(false);

                _this.setState({
                  selectValue: [optionList[activeTabIndex]],
                  activeKey: undefined
                }, function () {
                  if (labelInValue) {
                    onChange(_this.state.selectValue[0]);
                  } else {
                    onChange(_this.state.selectValue.map(function (selected) {
                      return selected.key;
                    })[0]);
                  }
                });
              } else if (mode === 'multiple') {
                _this.setState({
                  selectValue: [].concat(_toConsumableArray(selectValue), [optionList[activeTabIndex]])
                });
              }
            }
          }
        } //38 up 40 down


        if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
          // 有activeKey
          if (activeKey !== undefined) {
            var _activeTabIndex = optionList.findIndex(function (option) {
              return option.key === activeKey;
            }); // activeKey不在列表中


            if (_activeTabIndex === -1) {
              _this.setState({
                activeKey: optionList[0].key
              }, function () {
                _this.setActiveOptionIntoView(optionList[0].key);
              });

              return;
            } // 上按钮


            var nextActiveKey = undefined;

            if (keyCode === KeyCode.UP) {
              //超出到最后一个
              if (_activeTabIndex === 0) {
                nextActiveKey = optionList[optionListLen - 1].key;
              } else {
                nextActiveKey = optionList[_activeTabIndex - 1].key;
              }
            } else if (keyCode === KeyCode.DOWN) {
              if (_activeTabIndex + 1 === optionListLen) {
                nextActiveKey = optionList[0].key;
              } else {
                nextActiveKey = optionList[_activeTabIndex + 1].key;
              }
            }

            _this.setState({
              activeKey: nextActiveKey
            }, function () {
              _this.setActiveOptionIntoView(nextActiveKey);
            });
          } else {
            _this.setState({
              activeKey: optionList[0].key
            }, function () {
              _this.setActiveOptionIntoView(optionList[0].key);
            });
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setActiveOptionIntoView", function (activeKey) {
      scrollIntoView(ReactDOM.findDOMNode(_this.refs[activeKey]), ReactDOM.findDOMNode(_this.dropdownList), {
        onlyScrollIfNeeded: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "resizeTrigger", function () {
      if (_this.trigger && _this.trigger._component && _this.trigger._component.alignInstance) {
        _this.trigger._component.alignInstance.forceAlign();
      }
    });

    var _this$props5 = _this.props,
        _value = _this$props5.value,
        defaultValue = _this$props5.defaultValue,
        _labelInValue = _this$props5.labelInValue,
        _children = _this$props5.children,
        _visible = _this$props5.visible;
    var initialValue = [];

    if ('value' in _this.props) {
      initialValue = _value;
    } else if ('defaultValue' in _this.props) {
      initialValue = defaultValue;
    }

    var initialSelectValue = Select.getValueFromProps(initialValue, _labelInValue, _children);
    _this.state = {
      searchValue: '',
      selectValue: initialSelectValue,
      selectValueForMultiplePanel: initialSelectValue,
      popupVisible: _visible,
      activeKey: undefined,
      dropdownWidth: null,
      prevProps: props
    };
    return _this;
  }

  _createClass(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setDropdownWidth();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.setDropdownWidth();
    } //获取面板宽度

  }, {
    key: "focus",
    // 聚焦
    value: function focus() {
      this.focusEvent('focus');
    } // 失焦

  }, {
    key: "blur",
    value: function blur() {
      this.focusEvent('blur');
    } //处理 label、option的click操作

  }, {
    key: "getDropdownPanel",
    //下拉框内容
    value: function getDropdownPanel() {
      var _this2 = this;

      var _this$props6 = this.props,
          allowClear = _this$props6.allowClear,
          children = _this$props6.children,
          dropdownClassName = _this$props6.dropdownClassName,
          dropdownStyle = _this$props6.dropdownStyle,
          errorMessage = _this$props6.errorMessage,
          extraOptions = _this$props6.extraOptions,
          loading = _this$props6.loading,
          maxCount = _this$props6.maxCount,
          maxScrollHeight = _this$props6.maxScrollHeight,
          mode = _this$props6.mode,
          notFoundContent = _this$props6.notFoundContent,
          onPopupScroll = _this$props6.onPopupScroll,
          placeholder = _this$props6.placeholder,
          prefixCls = _this$props6.prefixCls,
          searchInputProps = _this$props6.searchInputProps,
          searchPlaceholder = _this$props6.searchPlaceholder,
          selectAllText = _this$props6.selectAllText,
          showSearch = _this$props6.showSearch,
          showSelectAll = _this$props6.showSelectAll,
          showSingleClear = _this$props6.showSingleClear,
          required = _this$props6.required;
      var _this$state4 = this.state,
          searchValue = _this$state4.searchValue,
          selectValue = _this$state4.selectValue;
      var dropdownCls = "".concat(prefixCls, "-dropdown"); //获取筛选后的children

      var optionFilteredList = this.getFilteredChildren(this.getProcessedChildren(children, dropdownCls));
      var showNotFoundContent = !Select.getOptionFromChildren(optionFilteredList).length; // optionList为空判断

      var maxCountError = 'maxCount' in this.props && selectValue.length > maxCount; // maxCount值存在且小于选择数量

      var requiredError = mode === 'multiple' && required && !selectValue.length; // required模式下，必须要有option选择

      var multipleConfirmDisabled = maxCountError || requiredError;
      var dropdownPanelCls = classNames(dropdownCls, _defineProperty({}, dropdownClassName, !!dropdownClassName));
      return React.createElement("div", {
        className: dropdownPanelCls,
        onKeyDown: this.handleKeyboardEvent,
        ref: function ref(selection) {
          return _this2.selection = selection;
        },
        style: dropdownStyle,
        tabIndex: "0"
      }, loading ? React.createElement("div", {
        className: "".concat(dropdownCls, "-loading")
      }, React.createElement("div", null, React.createElement("div", null, React.createElement(Spin.Container, {
        style: {
          height: 32,
          justifyContent: 'left'
        }
      }, React.createElement(Spin, {
        size: "small",
        tip: "\u52A0\u8F7D\u4E2D..."
      }))))) : React.createElement("div", {
        className: "".concat(dropdownCls, "-content")
      }, //搜索框
      showSearch && React.createElement(SelectSearch, {
        allowClear: allowClear,
        emitEmpty: this.emptySearchValue,
        prefixCls: "".concat(dropdownCls, "-search"),
        ref: function ref(selectSearch) {
          return _this2.selectSearch = selectSearch;
        },
        searchInputProps: searchInputProps,
        searchPlaceholder: searchPlaceholder,
        searchValue: searchValue,
        updateSearchValue: this.updateSearchValue
      }), React.createElement("div", {
        className: "".concat(dropdownCls, "-list"),
        onScroll: onPopupScroll,
        ref: function ref(dropdownList) {
          return _this2.dropdownList = dropdownList;
        },
        style: {
          maxHeight: maxScrollHeight
        }
      }, //全选按钮-多选未搜索的情况下存在
      !searchValue && showSelectAll && mode === 'multiple' && React.createElement("li", {
        className: classNames(_defineProperty({}, "".concat(dropdownCls, "-option-item"), true), _defineProperty({}, 'checked checked-icon', this.isSelectAll())),
        onClick: this.selectAllOption
      }, selectAllText), //清空选项按钮-单选未搜索的情况下存在
      !searchValue && showSingleClear && mode === 'single' && React.createElement("li", {
        className: "".concat(dropdownCls, "-option-item"),
        onClick: this.emptySelectValue
      }, placeholder), //预留置顶项
      extraOptions, //列表及空状态框
      showNotFoundContent ? React.createElement("div", {
        className: "".concat(dropdownCls, "-not-found")
      }, notFoundContent) : React.createElement("div", {
        className: "".concat(dropdownCls, "-filtered-list")
      }, optionFilteredList)), //多选的点击取消、确定按钮组
      mode === 'multiple' && React.createElement("div", null, maxCountError && React.createElement("div", {
        className: "".concat(dropdownCls, "-error-panel")
      }, React.createElement("p", {
        className: "".concat(dropdownCls, "-error-panel-msg")
      }, errorMessage)), React.createElement("div", {
        className: "".concat(dropdownCls, "-footer")
      }, React.createElement(Button, {
        className: "".concat(dropdownCls, "-footer-btn"),
        onClick: this.handleCancelSelect
      }, "\u53D6\u6D88"), React.createElement(Button, {
        className: "".concat(dropdownCls, "-footer-btn"),
        onClick: this.handleConfirmSelect,
        disabled: multipleConfirmDisabled,
        type: "primary"
      }, "\u786E\u5B9A")))));
    } // 获取面板内容

  }, {
    key: "getSelectionPanel",
    value: function getSelectionPanel() {
      var _this3 = this;

      var _this$props7 = this.props,
          className = _this$props7.className,
          tagWidth = _this$props7.tagWidth,
          disabled = _this$props7.disabled,
          labelClear = _this$props7.labelClear,
          loading = _this$props7.loading,
          maxLabelClearPanelHeight = _this$props7.maxLabelClearPanelHeight,
          mode = _this$props7.mode,
          multipleSelectAllText = _this$props7.multipleSelectAllText,
          onMouseEnter = _this$props7.onMouseEnter,
          onMouseLeave = _this$props7.onMouseLeave,
          placeholder = _this$props7.placeholder,
          prefixCls = _this$props7.prefixCls,
          showArrow = _this$props7.showArrow,
          showMultipleSelectAll = _this$props7.showMultipleSelectAll,
          size = _this$props7.size,
          style = _this$props7.style;
      var _this$state5 = this.state,
          selectValue = _this$state5.selectValue,
          selectValueForMultiplePanel = _this$state5.selectValueForMultiplePanel,
          popupVisible = _this$state5.popupVisible;
      var selectionCls = "".concat(prefixCls);
      var selectionPanelCls = classNames(_defineProperty({}, "".concat(selectionCls), true), _defineProperty({}, className, !!className), _defineProperty({}, "".concat(selectionCls, "-disabled"), disabled), _defineProperty({}, "open", popupVisible), _defineProperty({}, "".concat(selectionCls, "-large"), size === 'large'), _defineProperty({}, "".concat(selectionCls, "-small"), size === 'small'));

      var panelStyle = _objectSpread({}, style);

      if (labelClear) {
        panelStyle.paddingRight = 0;

        if (mode === 'multiple' && selectValueForMultiplePanel.length) {
          panelStyle.height = 'auto';
        }
      }

      var multipleTitle = "";

      if (mode === 'multiple' && !labelClear) {
        var titleArray = selectValueForMultiplePanel.map(function (panel) {
          return panel.title;
        });
        var isShowTitle = titleArray.every(function (title) {
          return !!title;
        });
        multipleTitle = isShowTitle ? titleArray.join("、") : "";
      }

      return React.createElement("div", {
        className: selectionPanelCls,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        style: panelStyle
      }, loading ? React.createElement("div", {
        className: "".concat(selectionCls, "-loading")
      }, React.createElement("div", null, React.createElement(Spin.Container, {
        style: {
          height: 32,
          justifyContent: 'left'
        }
      }, React.createElement(Spin, {
        size: "small",
        tip: "\u52A0\u8F7D\u4E2D..."
      })))) : React.createElement("div", {
        className: "".concat(selectionCls, "-content")
      }, // showArrow并且不是可删除label模式下出现箭头
      showArrow && !labelClear && React.createElement("div", {
        className: "".concat(selectionCls, "-caret")
      }, React.createElement(Icon, {
        type: "down-fill",
        className: classNames(_defineProperty({}, 'open', popupVisible))
      })), // 没有值的情况下显示placeholder
      (!selectValue.length && mode === 'single' || !selectValueForMultiplePanel.length && mode === 'multiple') && React.createElement("div", {
        unselectable: "on",
        className: "".concat(selectionCls, "-placeholder")
      }, placeholder), // 单选模式下有值显示值的label
      mode === 'single' && !!selectValue.length && React.createElement("div", {
        className: "".concat(selectionCls, "-option-single"),
        title: selectValue[0].title
      }, selectValue[0].label), // 多选模式下区分labelClear
      // selectValueForMultiplePanel的更新时机：
      // 1.初始化value、defaultValue
      // 2.props.value 更改
      // 3.多选取消、确定按钮点击
      // 4.label.click事件
      mode === 'multiple' && (labelClear ? //仅在有选中数据时渲染，fix空状态面板上方高度问题
      selectValueForMultiplePanel && selectValueForMultiplePanel.length ? React.createElement(Animate, {
        onEnd: this.resizeTrigger,
        component: "div",
        transitionName: "zoom",
        style: {
          maxHeight: maxLabelClearPanelHeight ? maxLabelClearPanelHeight : null
        },
        className: "".concat(selectionCls, "-option-clearable-list")
      }, selectValueForMultiplePanel.map(function (option) {
        return React.createElement("div", {
          className: "".concat(selectionCls, "-option-clearable-option"),
          style: {
            width: tagWidth
          },
          key: option.key,
          title: option.title
        }, React.createElement("span", {
          className: "".concat(selectionCls, "-option-clearable-option-content")
        }, option.label), React.createElement("span", {
          className: "".concat(selectionCls, "-option-clearable-option-close"),
          onClick: function onClick(e) {
            return _this3.onOptionClick(e, option, true);
          }
        }, React.createElement(Icon, {
          type: "close-modal-line"
        })));
      })) : null : React.createElement("div", {
        className: "".concat(selectionCls, "-option-multiple"),
        title: multipleTitle
      }, this.isSelectAll(true) && showMultipleSelectAll ? React.createElement("span", null, multipleSelectAllText) : selectValueForMultiplePanel.map(function (option, index) {
        return React.createElement("span", {
          key: option.key,
          className: "".concat(selectionCls, "-option-multiple-option")
        }, React.createElement("span", null, option.label), index + 1 !== selectValueForMultiplePanel.length && '、');
      })))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props8 = this.props,
          disabled = _this$props8.disabled,
          dropdownMatchSelectWidth = _this$props8.dropdownMatchSelectWidth,
          getPopupContainer = _this$props8.getPopupContainer,
          placement = _this$props8.placement,
          prefixCls = _this$props8.prefixCls;
      var _this$state6 = this.state,
          popupVisible = _this$state6.popupVisible,
          dropdownWidth = _this$state6.dropdownWidth;
      var popupStyle = {};
      var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';

      if (dropdownWidth) {
        popupStyle[widthProp] = "".concat(dropdownWidth, "px");
      }

      return React.createElement(Trigger, {
        action: disabled ? [] : ['click'],
        builtinPlacements: placements,
        ref: function ref(node) {
          return _this4.trigger = node;
        },
        getPopupContainer: getPopupContainer,
        onPopupVisibleChange: this.visibleChangeFromTrigger,
        popup: this.getDropdownPanel(),
        popupPlacement: placement,
        popupVisible: popupVisible,
        prefixCls: "".concat(prefixCls, "-popup"),
        popupStyle: popupStyle
      }, this.getSelectionPanel());
    }
  }]);

  return Select;
}(React.Component);

_defineProperty(Select, "propTypes", {
  allowClear: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tagWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultActiveFirstOption: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
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
  placement: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']),
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  visible: PropTypes.bool,
  esc: PropTypes.bool,
  required: PropTypes.bool,
  filterInactiveOption: PropTypes.bool // 是否过滤失效的选中项（即不在option列表中）

});

_defineProperty(Select, "defaultProps", {
  allowClear: true,
  tagWidth: 100,
  defaultActiveFirstOption: false,
  disabled: false,
  dropdownMatchSelectWidth: true,
  errorMessage: '超过选项上限',
  filterOption: true,
  labelClear: false,
  labelInValue: false,
  loading: false,
  maxScrollHeight: 250,
  mode: 'single',
  multipleSelectAllText: '所有选项',
  notFoundContent: '无匹配结果',
  onChange: noop,
  onPopupScroll: noop,
  onSearch: noop,
  onSelect: noop,
  onVisibleChange: noop,
  placeholder: '请选择',
  placement: 'bottomLeft',
  prefixCls: 'fishd-select',
  searchInputProps: {},
  searchPlaceholder: '请输入关键字',
  selectAllText: '选择所有',
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
});

_defineProperty(Select, "getOptionFromChildren", function (children) {
  var plainOptionList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var filter = arguments.length > 2 ? arguments[2] : undefined;
  React.Children.forEach(children, function (child) {
    if (child && child.type && child.type.isSelectOption) {
      var selectOption = {
        label: child.props.children,
        key: 'value' in child.props ? child.props.value : child.key,
        title: child.props.title
      };

      if (filter) {
        filter(child) && plainOptionList.push(selectOption);
      } else {
        plainOptionList.push(selectOption);
      }
    } else if (child && child.type && child.type.isSelectOptGroup) {
      Select.getOptionFromChildren(child.props.children, plainOptionList, filter);
    } else {//  其余暂时不做处理
    }
  });
  return plainOptionList;
});

_defineProperty(Select, "getValueFromProps", function (value, labelInValue, children) {
  var valueType = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  var optionList = Select.getOptionFromChildren(children, []);

  if (labelInValue) {
    //labelInValue数据从传入数据中取
    if (valueType === 'array') {
      return value && value.map(function (obj) {
        var option = optionList.find(function (option) {
          return option.key === obj.key;
        }) || {};
        var label = obj.label || option.label || obj.key;
        var title = obj.title || option.title;
        return {
          key: obj.key,
          label: label,
          title: title
        };
      }) || [];
    } else if (valueType === 'object') {
      var option = optionList.find(function (option) {
        return option.key === value.key;
      }) || {};
      var label = value.label || option.label || value.key;
      var title = value.title || option.title;
      return [{
        key: value.key,
        label: label,
        title: title
      }];
    } else {
      // 其余就给空状态
      return [];
    }
  } else {
    // 非labelInValue数据从option里取
    if (valueType === 'string' || valueType === 'number') value = [value];
    return value && value.map(function (key) {
      var option = optionList.find(function (option) {
        return option.key === key;
      }) || {};
      var label = option.label || key;
      var title = option.title;
      return {
        key: key,
        label: label,
        title: title
      };
    }) || [];
  }
});

polyfill(Select);
export default Select;