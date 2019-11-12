"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_rcTrigger.default.displayName = 'Trigger';
var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var SelectTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SelectTrigger, _React$Component);

  function SelectTrigger(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "setDropdownWidth", function () {
      var width = _reactDom.default.findDOMNode(_assertThisInitialized(_this)).offsetWidth;

      if (width !== _this.state.dropdownWidth) {
        _this.setState({
          dropdownWidth: width
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getInnerMenu", function () {
      return _this.dropdownMenuRef && _this.dropdownMenuRef.menuRef;
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupDOMNode", function () {
      return _this.triggerRef.getPopupDomNode();
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownElement", function (newProps) {
      var props = _this.props;
      return _react.default.createElement(_DropdownMenu.default, _extends({
        ref: _this.saveDropdownMenuRef
      }, newProps, {
        prefixCls: _this.getDropdownPrefixCls(),
        onMenuSelect: props.onMenuSelect,
        onMenuDeselect: props.onMenuDeselect,
        onPopupScroll: props.onPopupScroll,
        value: props.value,
        backfillValue: props.backfillValue,
        firstActiveValue: props.firstActiveValue,
        defaultActiveFirstOption: props.defaultActiveFirstOption,
        dropdownMenuStyle: props.dropdownMenuStyle
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownTransitionName", function () {
      var props = _this.props;
      var transitionName = props.transitionName;

      if (!transitionName && props.animation) {
        transitionName = _this.getDropdownPrefixCls() + "-" + props.animation;
      }

      return transitionName;
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownPrefixCls", function () {
      return _this.props.prefixCls + "-dropdown";
    });

    _this.saveDropdownMenuRef = (0, _util.saveRef)(_assertThisInitialized(_this), 'dropdownMenuRef');
    _this.saveTriggerRef = (0, _util.saveRef)(_assertThisInitialized(_this), 'triggerRef');
    _this.state = {
      dropdownWidth: null
    };
    return _this;
  }

  var _proto = SelectTrigger.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setDropdownWidth();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.setDropdownWidth();
  };

  _proto.render = function render() {
    var _popupClassName;

    var _this$props = this.props,
        onPopupFocus = _this$props.onPopupFocus,
        props = _objectWithoutPropertiesLoose(_this$props, ["onPopupFocus"]);

    var multiple = props.multiple,
        visible = props.visible,
        inputValue = props.inputValue,
        dropdownAlign = props.dropdownAlign,
        disabled = props.disabled,
        showSearch = props.showSearch,
        dropdownClassName = props.dropdownClassName,
        dropdownStyle = props.dropdownStyle,
        dropdownMatchSelectWidth = props.dropdownMatchSelectWidth;
    var dropdownPrefixCls = this.getDropdownPrefixCls();
    var popupClassName = (_popupClassName = {}, _popupClassName[dropdownClassName] = !!dropdownClassName, _popupClassName[dropdownPrefixCls + "--" + (multiple ? 'multiple' : 'single')] = 1, _popupClassName);
    var popupElement = this.getDropdownElement({
      menuItems: props.options,
      onPopupFocus: onPopupFocus,
      multiple: multiple,
      inputValue: inputValue,
      visible: visible
    });
    var hideAction;

    if (disabled) {
      hideAction = [];
    } else if ((0, _util.isSingleMode)(props) && !showSearch) {
      hideAction = ['click'];
    } else {
      hideAction = ['blur'];
    }

    var popupStyle = Object.assign({}, dropdownStyle);
    var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';

    if (this.state.dropdownWidth) {
      popupStyle[widthProp] = this.state.dropdownWidth + "px";
    }

    return _react.default.createElement(_rcTrigger.default, _extends({}, props, {
      showAction: disabled ? [] : this.props.showAction,
      hideAction: hideAction,
      ref: this.saveTriggerRef,
      popupPlacement: "bottomLeft",
      builtinPlacements: BUILT_IN_PLACEMENTS,
      prefixCls: dropdownPrefixCls,
      popupTransitionName: this.getDropdownTransitionName(),
      onPopupVisibleChange: props.onDropdownVisibleChange,
      popup: popupElement,
      popupAlign: dropdownAlign,
      popupVisible: visible,
      getPopupContainer: props.getPopupContainer,
      popupClassName: (0, _classnames.default)(popupClassName),
      popupStyle: popupStyle
    }), props.children);
  };

  return SelectTrigger;
}(_react.default.Component);

exports.default = SelectTrigger;

_defineProperty(SelectTrigger, "propTypes", {
  onPopupFocus: _propTypes.default.func,
  onPopupScroll: _propTypes.default.func,
  dropdownMatchSelectWidth: _propTypes.default.bool,
  dropdownAlign: _propTypes.default.object,
  visible: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  showSearch: _propTypes.default.bool,
  dropdownClassName: _propTypes.default.string,
  multiple: _propTypes.default.bool,
  inputValue: _propTypes.default.string,
  filterOption: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  options: _propTypes.default.array,
  prefixCls: _propTypes.default.string,
  popupClassName: _propTypes.default.string,
  children: _propTypes.default.node,
  showAction: _propTypes.default.arrayOf(_propTypes.default.string)
});

SelectTrigger.displayName = 'SelectTrigger';