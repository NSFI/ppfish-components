"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.multipleSelectorContextTypes = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _BaseSelector = _interopRequireWildcard(require("../../Base/BaseSelector"));

var _SearchInput = _interopRequireDefault(require("../../SearchInput"));

var _Selection = _interopRequireDefault(require("./Selection"));

var _util = require("../../util");

var _classnames = _interopRequireDefault(require("classnames"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TREE_SELECT_EMPTY_VALUE_KEY = 'RC_TREE_SELECT_EMPTY_VALUE_KEY';
var Selector = (0, _BaseSelector["default"])('multiple');
var multipleSelectorContextTypes = {
  onMultipleSelectorRemove: _propTypes["default"].func.isRequired
};
exports.multipleSelectorContextTypes = multipleSelectorContextTypes;

var MultipleSelector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MultipleSelector, _React$Component);

  function MultipleSelector() {
    var _this;

    _classCallCheck(this, MultipleSelector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MultipleSelector).call(this)); // this.inputRef = createRef();

    _defineProperty(_assertThisInitialized(_this), "renderPlaceholder", function () {
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          placeholder = _this$props.placeholder,
          searchPlaceholder = _this$props.searchPlaceholder,
          searchValue = _this$props.searchValue,
          selectorValueList = _this$props.selectorValueList;
      var currentPlaceholder = placeholder || searchPlaceholder;
      if (!currentPlaceholder) return null; // const hidden = searchValue || selectorValueList.length;

      var hidden = selectorValueList.length; // [Legacy] Not remove the placeholder

      return _react["default"].createElement("span", {
        style: {
          display: hidden ? 'none' : 'block'
        },
        onClick: _this.onPlaceholderClick,
        className: "".concat(prefixCls, "-search__field__placeholder")
      }, currentPlaceholder);
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelection", function () {
      var _classNames;

      var _this$props2 = _this.props,
          selectorValueList = _this$props2.selectorValueList,
          choiceTransitionName = _this$props2.choiceTransitionName,
          prefixCls = _this$props2.prefixCls,
          onChoiceAnimationLeave = _this$props2.onChoiceAnimationLeave,
          labelInValue = _this$props2.labelInValue,
          maxTagCount = _this$props2.maxTagCount,
          maxTagPlaceholder = _this$props2.maxTagPlaceholder,
          editable = _this$props2.editable,
          uniqueTreeNodeByLabel = _this$props2.uniqueTreeNodeByLabel;
      var onMultipleSelectorRemove = _this.context.rcTreeSelect.onMultipleSelectorRemove; // Check if `maxTagCount` is set

      var myValueList = selectorValueList;

      if (maxTagCount >= 0) {
        myValueList = selectorValueList.slice(0, maxTagCount);
      } // Selector node list


      var selectedValueNodes = myValueList.map(function (_ref) {
        var label = _ref.label,
            value = _ref.value;
        return _react["default"].createElement(_Selection["default"], _extends({}, _this.props, {
          key: value || TREE_SELECT_EMPTY_VALUE_KEY,
          label: label,
          value: value,
          onRemove: onMultipleSelectorRemove
        }));
      }); // Rest node count

      if (maxTagCount >= 0 && maxTagCount < selectorValueList.length) {
        var content = "+ ".concat(selectorValueList.length - maxTagCount, " ...");

        if (typeof maxTagPlaceholder === 'string') {
          content = maxTagPlaceholder;
        } else if (typeof maxTagPlaceholder === 'function') {
          var restValueList = selectorValueList.slice(maxTagCount);
          content = maxTagPlaceholder(labelInValue ? restValueList : restValueList.map(function (_ref2) {
            var value = _ref2.value;
            return value;
          }));
        }

        var restNodeSelect = _react["default"].createElement(_Selection["default"], _extends({}, _this.props, {
          key: "rc-tree-select-internal-max-tag-counter",
          label: content,
          value: null
        }));

        selectedValueNodes.push(restNodeSelect);
      } // selectedValueNodes.push(
      //   <li className={`${prefixCls}-search ${prefixCls}-search--inline`} key="__input">
      //     <SearchInput {...this.props} ref={this.inputRef} needAlign />
      //   </li>
      // );
      // 处理不可编辑的多选


      if (!editable) {
        var labelList = selectedValueNodes.map(function (item) {
          return item.props.label;
        }); // 相同 label 去重

        uniqueTreeNodeByLabel && (labelList = _toConsumableArray(new Set(labelList)));
        selectedValueNodes = labelList.filter(function (item) {
          return item != undefined;
        }).join('、');
      } // const className = `${prefixCls}-selection__rendered`;


      var className = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-selection__rendered"), true), _defineProperty(_classNames, "".concat(prefixCls, "-multiple-readonly"), !editable), _classNames), className);

      if (choiceTransitionName && editable) {
        return _react["default"].createElement(_rcAnimate["default"], {
          className: className,
          component: "ul",
          transitionName: choiceTransitionName,
          onLeave: onChoiceAnimationLeave
        }, selectedValueNodes);
      }

      return _react["default"].createElement("ul", {
        className: className,
        role: "menubar",
        title: !editable ? selectedValueNodes : null
      }, selectedValueNodes);
    });

    return _this;
  } // onPlaceholderClick = () => {
  //   this.inputRef.current.focus();
  // };
  // focus = () => {
  //   this.inputRef.current.focus();
  // };
  // blur = () => {
  //   this.inputRef.current.blur();
  // };


  _createClass(MultipleSelector, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(Selector, _extends({}, this.props, {
        tabIndex: -1,
        showArrow: !this.props.editable,
        renderSelection: this.renderSelection,
        renderPlaceholder: this.renderPlaceholder
      }));
    }
  }]);

  return MultipleSelector;
}(_react["default"].Component);

_defineProperty(MultipleSelector, "propTypes", _objectSpread({}, _BaseSelector.selectorPropTypes, {
  selectorValueList: _propTypes["default"].array,
  disabled: _propTypes["default"].bool,
  disableCloseTag: _propTypes["default"].bool,
  editable: _propTypes["default"].bool,
  searchValue: _propTypes["default"].string,
  labelInValue: _propTypes["default"].bool,
  maxTagCount: _propTypes["default"].number,
  maxTagPlaceholder: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  tagWidth: _propTypes["default"].number,
  onChoiceAnimationLeave: _propTypes["default"].func
}));

_defineProperty(MultipleSelector, "contextTypes", {
  rcTreeSelect: _propTypes["default"].shape(_objectSpread({}, multipleSelectorContextTypes, {
    onSearchInputChange: _propTypes["default"].func
  }))
});

var _default = MultipleSelector;
exports["default"] = _default;