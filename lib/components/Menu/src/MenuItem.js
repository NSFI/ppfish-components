"use strict";

exports.__esModule = true;
exports.default = exports.MenuItem = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../../utils");

var _classnames = _interopRequireDefault(require("classnames"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _miniStore = require("mini-store");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint react/no-is-mounted:0 */
var MenuItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MenuItem, _React$Component);

  function MenuItem(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var keyCode = e.keyCode;

      if (keyCode === _utils.KeyCode.ENTER) {
        _this.onClick(e);

        return true;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (e) {
      var _this$props = _this.props,
          eventKey = _this$props.eventKey,
          onItemHover = _this$props.onItemHover,
          onMouseLeave = _this$props.onMouseLeave;
      onItemHover({
        key: eventKey,
        hover: false
      });
      onMouseLeave({
        key: eventKey,
        domEvent: e
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (e) {
      var _this$props2 = _this.props,
          eventKey = _this$props2.eventKey,
          onItemHover = _this$props2.onItemHover,
          onMouseEnter = _this$props2.onMouseEnter;
      onItemHover({
        key: eventKey,
        hover: true
      });
      onMouseEnter({
        key: eventKey,
        domEvent: e
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      var _this$props3 = _this.props,
          eventKey = _this$props3.eventKey,
          multiple = _this$props3.multiple,
          onClick = _this$props3.onClick,
          onSelect = _this$props3.onSelect,
          onDeselect = _this$props3.onDeselect,
          isSelected = _this$props3.isSelected;
      var info = {
        key: eventKey,
        keyPath: [eventKey],
        item: _assertThisInitialized(_this),
        domEvent: e
      };
      onClick(info);

      if (multiple) {
        if (isSelected) {
          onDeselect(info);
        } else {
          onSelect(info);
        }
      } else if (!isSelected) {
        onSelect(info);
      }
    });

    return _this;
  }

  var _proto = MenuItem.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // invoke customized ref to expose component to mixin
    this.callRef();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.props.active) {
      (0, _domScrollIntoView.default)(_reactDom.default.findDOMNode(this), _reactDom.default.findDOMNode(this.props.parentMenu), {
        onlyScrollIfNeeded: true
      });
    }

    this.callRef();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var props = this.props;

    if (props.onDestroy) {
      props.onDestroy(props.eventKey);
    }
  };

  _proto.getPrefixCls = function getPrefixCls() {
    return this.props.rootPrefixCls + "-item";
  };

  _proto.getActiveClassName = function getActiveClassName() {
    return this.getPrefixCls() + "-active";
  };

  _proto.getSelectedClassName = function getSelectedClassName() {
    return this.getPrefixCls() + "-selected";
  };

  _proto.getDisabledClassName = function getDisabledClassName() {
    return this.getPrefixCls() + "-disabled";
  };

  _proto.callRef = function callRef() {
    if (this.props.manualRef) {
      this.props.manualRef(this);
    }
  };

  _proto.render = function render() {
    var _classNames;

    var props = Object.assign({}, this.props);
    var className = (0, _classnames.default)(this.getPrefixCls(), props.className, (_classNames = {}, _classNames[this.getActiveClassName()] = !props.disabled && props.active, _classNames[this.getSelectedClassName()] = props.isSelected, _classNames[this.getDisabledClassName()] = props.disabled, _classNames));
    var attrs = Object.assign({}, props.attribute, {
      title: props.title,
      className: className,
      // set to menuitem by default
      role: props.role || 'menuitem',
      'aria-disabled': props.disabled
    });

    if (props.role === 'option') {
      // overwrite to option
      attrs = Object.assign({}, attrs, {
        role: 'option',
        'aria-selected': props.isSelected
      });
    } else if (props.role === null || props.role === 'none') {
      // sometimes we want to specify role inside <li/> element
      // <li><a role='menuitem'>Link</a></li> would be a good example
      // in this case the role on <li/> should be "none" to
      // remove the implied listitem role.
      // https://www.w3.org/TR/wai-aria-practices-1.1/examples/menubar/menubar-1/menubar-1.html
      attrs.role = 'none';
    } // In case that onClick/onMouseLeave/onMouseEnter is passed down from owner


    var mouseEvent = {
      onClick: props.disabled ? null : this.onClick,
      onMouseLeave: props.disabled ? null : this.onMouseLeave,
      onMouseEnter: props.disabled ? null : this.onMouseEnter
    };
    var style = Object.assign({}, props.style);

    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }

    _util.menuAllProps.forEach(function (key) {
      return delete props[key];
    });

    return _react.default.createElement("li", _extends({}, props, attrs, mouseEvent, {
      style: style
    }), props.children);
  };

  return MenuItem;
}(_react.default.Component);

exports.MenuItem = MenuItem;

_defineProperty(MenuItem, "propTypes", {
  attribute: _propTypes.default.object,
  rootPrefixCls: _propTypes.default.string,
  eventKey: _propTypes.default.string,
  active: _propTypes.default.bool,
  // children: PropTypes.any,
  children: _propTypes.default.node,
  selectedKeys: _propTypes.default.array,
  disabled: _propTypes.default.bool,
  title: _propTypes.default.string,
  onItemHover: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onDeselect: _propTypes.default.func,
  parentMenu: _propTypes.default.object,
  onDestroy: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  multiple: _propTypes.default.bool,
  isSelected: _propTypes.default.bool,
  manualRef: _propTypes.default.func
});

_defineProperty(MenuItem, "defaultProps", {
  onSelect: _util.noop,
  onMouseEnter: _util.noop,
  onMouseLeave: _util.noop,
  manualRef: _util.noop
});

MenuItem.isMenuItem = true;
var connected = (0, _miniStore.connect)(function (_ref, _ref2) {
  var activeKey = _ref.activeKey,
      selectedKeys = _ref.selectedKeys;
  var eventKey = _ref2.eventKey,
      subMenuKey = _ref2.subMenuKey;
  return {
    active: activeKey[subMenuKey] === eventKey,
    isSelected: selectedKeys.indexOf(eventKey) !== -1
  };
})(MenuItem);
var _default = connected;
exports.default = _default;