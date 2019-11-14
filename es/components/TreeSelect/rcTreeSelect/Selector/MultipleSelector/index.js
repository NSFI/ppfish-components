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

import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import generateSelector, { selectorPropTypes } from '../../Base/BaseSelector';
import SearchInput from '../../SearchInput';
import Selection from './Selection';
import { createRef } from '../../util';
import classNames from 'classnames';
var TREE_SELECT_EMPTY_VALUE_KEY = 'RC_TREE_SELECT_EMPTY_VALUE_KEY';
var Selector = generateSelector('multiple');
export var multipleSelectorContextTypes = {
  onMultipleSelectorRemove: PropTypes.func.isRequired
};

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

      return React.createElement("span", {
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
        return React.createElement(Selection, _extends({}, _this.props, {
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

        var restNodeSelect = React.createElement(Selection, _extends({}, _this.props, {
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


      var className = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-selection__rendered"), true), _defineProperty(_classNames, "".concat(prefixCls, "-multiple-readonly"), !editable), _classNames), className);

      if (choiceTransitionName && editable) {
        return React.createElement(Animate, {
          className: className,
          component: "ul",
          transitionName: choiceTransitionName,
          onLeave: onChoiceAnimationLeave
        }, selectedValueNodes);
      }

      return React.createElement("ul", {
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
      return React.createElement(Selector, _extends({}, this.props, {
        tabIndex: -1,
        showArrow: !this.props.editable,
        renderSelection: this.renderSelection,
        renderPlaceholder: this.renderPlaceholder
      }));
    }
  }]);

  return MultipleSelector;
}(React.Component);

_defineProperty(MultipleSelector, "propTypes", _objectSpread({}, selectorPropTypes, {
  selectorValueList: PropTypes.array,
  disabled: PropTypes.bool,
  disableCloseTag: PropTypes.bool,
  editable: PropTypes.bool,
  searchValue: PropTypes.string,
  labelInValue: PropTypes.bool,
  maxTagCount: PropTypes.number,
  maxTagPlaceholder: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  tagWidth: PropTypes.number,
  onChoiceAnimationLeave: PropTypes.func
}));

_defineProperty(MultipleSelector, "contextTypes", {
  rcTreeSelect: PropTypes.shape(_objectSpread({}, multipleSelectorContextTypes, {
    onSearchInputChange: PropTypes.func
  }))
});

export default MultipleSelector;