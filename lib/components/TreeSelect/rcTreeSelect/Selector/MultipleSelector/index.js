"use strict";

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = exports.multipleSelectorContextTypes = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _BaseSelector = _interopRequireWildcard(require("../../Base/BaseSelector"));

var _SearchInput = _interopRequireDefault(require("../../SearchInput"));

var _Selection = _interopRequireDefault(require("./Selection"));

var _util = require("../../util");

var _classnames = _interopRequireDefault(require("classnames"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TREE_SELECT_EMPTY_VALUE_KEY = 'RC_TREE_SELECT_EMPTY_VALUE_KEY';
var Selector = (0, _BaseSelector.default)('multiple');
var multipleSelectorContextTypes = {
  onMultipleSelectorRemove: _propTypes.default.func.isRequired
};
exports.multipleSelectorContextTypes = multipleSelectorContextTypes;

var MultipleSelector =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultipleSelector, _React$Component);

  function MultipleSelector() {
    var _this;

    _this = _React$Component.call(this) || this; // this.inputRef = createRef();

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

      return _react.default.createElement("span", {
        style: {
          display: hidden ? 'none' : 'block'
        },
        onClick: _this.onPlaceholderClick,
        className: prefixCls + "-search__field__placeholder"
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
        return _react.default.createElement(_Selection.default, _extends({}, _this.props, {
          key: value || TREE_SELECT_EMPTY_VALUE_KEY,
          label: label,
          value: value,
          onRemove: onMultipleSelectorRemove
        }));
      }); // Rest node count

      if (maxTagCount >= 0 && maxTagCount < selectorValueList.length) {
        var content = "+ " + (selectorValueList.length - maxTagCount) + " ...";

        if (typeof maxTagPlaceholder === 'string') {
          content = maxTagPlaceholder;
        } else if (typeof maxTagPlaceholder === 'function') {
          var restValueList = selectorValueList.slice(maxTagCount);
          content = maxTagPlaceholder(labelInValue ? restValueList : restValueList.map(function (_ref2) {
            var value = _ref2.value;
            return value;
          }));
        }

        var restNodeSelect = _react.default.createElement(_Selection.default, _extends({}, _this.props, {
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

        uniqueTreeNodeByLabel && (labelList = [].concat(new Set(labelList)));
        selectedValueNodes = labelList.filter(function (item) {
          return item != undefined;
        }).join('、');
      } // const className = `${prefixCls}-selection__rendered`;


      var className = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls + "-selection__rendered"] = true, _classNames[prefixCls + "-multiple-readonly"] = !editable, _classNames), className);

      if (choiceTransitionName && editable) {
        return _react.default.createElement(_rcAnimate.default, {
          className: className,
          component: "ul",
          transitionName: choiceTransitionName,
          onLeave: onChoiceAnimationLeave
        }, selectedValueNodes);
      }

      return _react.default.createElement("ul", {
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


  var _proto = MultipleSelector.prototype;

  _proto.render = function render() {
    return _react.default.createElement(Selector, _extends({}, this.props, {
      tabIndex: -1,
      showArrow: !this.props.editable,
      renderSelection: this.renderSelection,
      renderPlaceholder: this.renderPlaceholder
    }));
  };

  return MultipleSelector;
}(_react.default.Component);

_defineProperty(MultipleSelector, "propTypes", Object.assign({}, _BaseSelector.selectorPropTypes, {
  selectorValueList: _propTypes.default.array,
  disabled: _propTypes.default.bool,
  disableCloseTag: _propTypes.default.bool,
  editable: _propTypes.default.bool,
  searchValue: _propTypes.default.string,
  labelInValue: _propTypes.default.bool,
  maxTagCount: _propTypes.default.number,
  maxTagPlaceholder: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  tagWidth: _propTypes.default.number,
  onChoiceAnimationLeave: _propTypes.default.func
}));

_defineProperty(MultipleSelector, "contextTypes", {
  rcTreeSelect: _propTypes.default.shape(Object.assign({}, multipleSelectorContextTypes, {
    onSearchInputChange: _propTypes.default.func
  }))
});

var _default = MultipleSelector;
exports.default = _default;