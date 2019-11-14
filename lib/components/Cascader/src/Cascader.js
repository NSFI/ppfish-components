"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _Menus = _interopRequireDefault(require("./Menus"));

var _utils = require("../../../utils");

var _arrayTreeFilter = _interopRequireDefault(require("array-tree-filter"));

var _placements = _interopRequireDefault(require("./placements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var Cascader =
/*#__PURE__*/
function (_Component) {
  _inherits(Cascader, _Component);

  _createClass(Cascader, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var _prevState$prevProps = prevState.prevProps,
          prevProps = _prevState$prevProps === void 0 ? {} : _prevState$prevProps;
      var newState = {
        prevProps: nextProps
      };

      if ('value' in nextProps && !(0, _utils.shallowEqualArrays)(prevProps.value, nextProps.value)) {
        newState.value = nextProps.value || []; // allow activeValue diff from value
        // https://github.com/ant-design/ant-design/issues/2767

        if (!('loadData' in nextProps)) {
          newState.activeValue = nextProps.value || [];
        }
      }

      if ('popupVisible' in nextProps) {
        newState.popupVisible = nextProps.popupVisible;
      }

      return newState;
    }
  }]);

  function Cascader(props) {
    var _this;

    _classCallCheck(this, Cascader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cascader).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "setPopupVisible", function (popupVisible) {
      if (!('popupVisible' in _this.props)) {
        _this.setState({
          popupVisible: popupVisible
        });
      } // sync activeValue with value when panel open


      if (popupVisible && !_this.state.popupVisible) {
        _this.setState({
          activeValue: _this.state.value
        });
      }

      _this.props.onPopupVisibleChange(popupVisible);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (options, setProps, e) {
      if (e.type !== 'keydown' || e.keyCode === _utils.KeyCode.ENTER) {
        _this.props.onChange(options.map(function (o) {
          return o[_this.getFieldName('value')];
        }), options);

        _this.setPopupVisible(setProps.visible);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePopupVisibleChange", function (popupVisible) {
      _this.setPopupVisible(popupVisible);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMenuSelect", function (targetOption, menuIndex, e) {
      // Keep focused state for keyboard support
      var triggerNode = _this.trigger.getRootDomNode();

      if (triggerNode && triggerNode.focus) {
        triggerNode.focus();
      }

      var _this$props = _this.props,
          changeOnSelect = _this$props.changeOnSelect,
          loadData = _this$props.loadData,
          expandTrigger = _this$props.expandTrigger;

      if (!targetOption || targetOption.disabled) {
        return;
      }

      var activeValue = _this.state.activeValue;
      activeValue = activeValue.slice(0, menuIndex + 1);
      activeValue[menuIndex] = targetOption[_this.getFieldName('value')];

      var activeOptions = _this.getActiveOptions(activeValue);

      if (targetOption.isLeaf === false && !targetOption[_this.getFieldName('children')] && loadData) {
        if (changeOnSelect) {
          _this.handleChange(activeOptions, {
            visible: true
          }, e);
        }

        _this.setState({
          activeValue: activeValue
        });

        loadData(activeOptions);
        return;
      }

      var newState = {};

      if (!targetOption[_this.getFieldName('children')] || !targetOption[_this.getFieldName('children')].length) {
        _this.handleChange(activeOptions, {
          visible: false
        }, e); // set value to activeValue when select leaf option


        newState.value = activeValue; // add e.type judgement to prevent `onChange` being triggered by mouseEnter
      } else if (changeOnSelect && (e.type === 'click' || e.type === 'keydown')) {
        if (expandTrigger === 'hover') {
          _this.handleChange(activeOptions, {
            visible: false
          }, e);
        } else {
          _this.handleChange(activeOptions, {
            visible: true
          }, e);
        } // set value to activeValue on every select


        newState.value = activeValue;
      }

      newState.activeValue = activeValue; //  not change the value by keyboard

      if ('value' in _this.props || e.type === 'keydown' && e.keyCode !== _utils.KeyCode.ENTER) {
        delete newState.value;
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      var children = _this.props.children; // https://github.com/ant-design/ant-design/issues/6717
      // Don't bind keyboard support when children specify the onKeyDown

      if (children && children.props.onKeyDown) {
        children.props.onKeyDown(e);
        return;
      }

      var activeValue = _toConsumableArray(_this.state.activeValue);

      var currentLevel = activeValue.length - 1 < 0 ? 0 : activeValue.length - 1;

      var currentOptions = _this.getCurrentLevelOptions();

      var currentIndex = currentOptions.map(function (o) {
        return o[_this.getFieldName('value')];
      }).indexOf(activeValue[currentLevel]);

      if (e.keyCode !== _utils.KeyCode.DOWN && e.keyCode !== _utils.KeyCode.UP && e.keyCode !== _utils.KeyCode.LEFT && e.keyCode !== _utils.KeyCode.RIGHT && e.keyCode !== _utils.KeyCode.ENTER && e.keyCode !== _utils.KeyCode.BACKSPACE && e.keyCode !== _utils.KeyCode.ESC) {
        return;
      } // Press any keys above to reopen menu


      if (!_this.state.popupVisible && e.keyCode !== _utils.KeyCode.BACKSPACE && e.keyCode !== _utils.KeyCode.LEFT && e.keyCode !== _utils.KeyCode.RIGHT && e.keyCode !== _utils.KeyCode.ESC) {
        _this.setPopupVisible(true);

        return;
      }

      if (e.keyCode === _utils.KeyCode.DOWN || e.keyCode === _utils.KeyCode.UP) {
        var nextIndex = currentIndex;

        if (nextIndex !== -1) {
          if (e.keyCode === _utils.KeyCode.DOWN) {
            nextIndex += 1;
            nextIndex = nextIndex >= currentOptions.length ? 0 : nextIndex;
          } else {
            nextIndex -= 1;
            nextIndex = nextIndex < 0 ? currentOptions.length - 1 : nextIndex;
          }
        } else {
          nextIndex = 0;
        }

        activeValue[currentLevel] = currentOptions[nextIndex][_this.getFieldName('value')];
      } else if (e.keyCode === _utils.KeyCode.LEFT || e.keyCode === _utils.KeyCode.BACKSPACE) {
        activeValue.splice(activeValue.length - 1, 1);
      } else if (e.keyCode === _utils.KeyCode.RIGHT) {
        if (currentOptions[currentIndex] && currentOptions[currentIndex][_this.getFieldName('children')]) {
          activeValue.push(currentOptions[currentIndex][_this.getFieldName('children')][0][_this.getFieldName('value')]);
        }
      } else if (e.keyCode === _utils.KeyCode.ESC) {
        _this.props.esc && _this.setPopupVisible(false);
        return;
      }

      if (!activeValue || activeValue.length === 0) {
        _this.setPopupVisible(false);
      }

      var activeOptions = _this.getActiveOptions(activeValue);

      var targetOption = activeOptions[activeOptions.length - 1];

      _this.handleMenuSelect(targetOption, activeOptions.length - 1, e);

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveTrigger", function (node) {
      _this.trigger = node;
    });

    var initialValue = [];

    if ('value' in props) {
      initialValue = props.value || [];
    } else if ('defaultValue' in props) {
      initialValue = props.defaultValue || [];
    }

    _this.state = {
      popupVisible: props.popupVisible,
      activeValue: initialValue,
      value: initialValue,
      prevProps: props
    };
    _this.defaultFieldNames = {
      label: 'label',
      value: 'value',
      children: 'children'
    };
    return _this;
  }

  _createClass(Cascader, [{
    key: "getPopupDOMNode",
    value: function getPopupDOMNode() {
      return this.trigger.getPopupDomNode();
    }
  }, {
    key: "getFieldName",
    value: function getFieldName(name) {
      return this.props.fieldNames[name] || this.defaultFieldNames[name];
    }
  }, {
    key: "getFieldNames",
    value: function getFieldNames() {
      return this.props.fieldNames;
    }
  }, {
    key: "getCurrentLevelOptions",
    value: function getCurrentLevelOptions() {
      var _this2 = this;

      var _this$props$options = this.props.options,
          options = _this$props$options === void 0 ? [] : _this$props$options;
      var _this$state$activeVal = this.state.activeValue,
          activeValue = _this$state$activeVal === void 0 ? [] : _this$state$activeVal;
      var result = (0, _arrayTreeFilter["default"])(options, function (o, level) {
        return o[_this2.getFieldName('value')] === activeValue[level];
      }, {
        childrenKeyName: this.getFieldName('children')
      });

      if (result[result.length - 2]) {
        return result[result.length - 2][this.getFieldName('children')];
      }

      return _toConsumableArray(options).filter(function (o) {
        return !o.disabled;
      });
    }
  }, {
    key: "getActiveOptions",
    value: function getActiveOptions(activeValue) {
      var _this3 = this;

      return (0, _arrayTreeFilter["default"])(this.props.options || [], function (o, level) {
        return o[_this3.getFieldName('value')] === activeValue[level];
      }, {
        childrenKeyName: this.getFieldName('children')
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          transitionName = _this$props2.transitionName,
          popupClassName = _this$props2.popupClassName,
          options = _this$props2.options,
          disabled = _this$props2.disabled,
          builtinPlacements = _this$props2.builtinPlacements,
          popupPlacement = _this$props2.popupPlacement,
          children = _this$props2.children,
          restProps = _objectWithoutProperties(_this$props2, ["prefixCls", "transitionName", "popupClassName", "options", "disabled", "builtinPlacements", "popupPlacement", "children"]); // Did not show popup when there is no options


      var menus = _react["default"].createElement("div", null);

      var emptyMenuClassName = '';

      if (options && options.length > 0) {
        menus = _react["default"].createElement(_Menus["default"], _extends({}, this.props, {
          fieldNames: this.getFieldNames(),
          defaultFieldNames: this.defaultFieldNames,
          activeValue: this.state.activeValue,
          onSelect: this.handleMenuSelect,
          visible: this.state.popupVisible
        }));
      } else {
        emptyMenuClassName = " ".concat(prefixCls, "-menus-empty");
      }

      return _react["default"].createElement(_rcTrigger["default"], _extends({
        ref: this.saveTrigger
      }, restProps, {
        options: options,
        disabled: disabled,
        popupPlacement: popupPlacement,
        builtinPlacements: builtinPlacements,
        popupTransitionName: transitionName,
        action: disabled ? [] : ['click'],
        popupVisible: disabled ? false : this.state.popupVisible,
        onPopupVisibleChange: this.handlePopupVisibleChange,
        prefixCls: "".concat(prefixCls, "-menus"),
        popupClassName: popupClassName + emptyMenuClassName,
        popup: menus
      }), (0, _react.cloneElement)(children, {
        onKeyDown: this.handleKeyDown,
        tabIndex: disabled ? undefined : 0
      }));
    }
  }]);

  return Cascader;
}(_react.Component);

Cascader.defaultProps = {
  options: [],
  onChange: function onChange() {},
  onPopupVisibleChange: function onPopupVisibleChange() {},
  disabled: false,
  transitionName: '',
  prefixCls: 'rc-cascader',
  popupClassName: '',
  popupPlacement: 'bottomLeft',
  builtinPlacements: _placements["default"],
  expandTrigger: 'click',
  fieldNames: {
    label: 'label',
    value: 'value',
    children: 'children'
  },
  expandIcon: '',
  esc: true
};
Cascader.propTypes = {
  value: _propTypes["default"].array,
  defaultValue: _propTypes["default"].array,
  options: _propTypes["default"].array.isRequired,
  onChange: _propTypes["default"].func,
  onPopupVisibleChange: _propTypes["default"].func,
  popupVisible: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  transitionName: _propTypes["default"].string,
  popupClassName: _propTypes["default"].string,
  popupPlacement: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string,
  dropdownMenuColumnStyle: _propTypes["default"].object,
  builtinPlacements: _propTypes["default"].object,
  loadData: _propTypes["default"].func,
  changeOnSelect: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  onKeyDown: _propTypes["default"].func,
  expandTrigger: _propTypes["default"].string,
  fieldNames: _propTypes["default"].object,
  expandIcon: _propTypes["default"].node,
  esc: _propTypes["default"].bool
};
(0, _reactLifecyclesCompat.polyfill)(Cascader);
var _default = Cascader;
exports["default"] = _default;