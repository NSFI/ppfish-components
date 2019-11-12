"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TabBarRootNode =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TabBarRootNode, _React$Component);

  function TabBarRootNode() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TabBarRootNode.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        onKeyDown = _this$props.onKeyDown,
        className = _this$props.className,
        extraContent = _this$props.extraContent,
        style = _this$props.style,
        tabBarPosition = _this$props.tabBarPosition,
        children = _this$props.children,
        restProps = _objectWithoutPropertiesLoose(_this$props, ["prefixCls", "onKeyDown", "className", "extraContent", "style", "tabBarPosition", "children"]);

    var cls = (0, _classnames2.default)(prefixCls + "-bar", (_classnames = {}, _classnames[className] = !!className, _classnames));
    var topOrBottom = tabBarPosition === 'top' || tabBarPosition === 'bottom';
    var tabBarExtraContentStyle = topOrBottom ? {
      float: 'right'
    } : {};
    var extraContentStyle = extraContent && extraContent.props ? extraContent.props.style : {};
    var newChildren = children;

    if (extraContent) {
      newChildren = [(0, _react.cloneElement)(extraContent, {
        key: 'extra',
        style: Object.assign({}, tabBarExtraContentStyle, {}, extraContentStyle)
      }), (0, _react.cloneElement)(children, {
        key: 'content'
      })];
      newChildren = topOrBottom ? newChildren : newChildren.reverse();
    }

    return _react.default.createElement("div", _extends({
      role: "tablist",
      className: cls,
      tabIndex: "0",
      ref: this.props.saveRef('root'),
      onKeyDown: onKeyDown,
      style: style
    }, (0, _utils.getDataAttr)(restProps)), newChildren);
  };

  return TabBarRootNode;
}(_react.default.Component);

exports.default = TabBarRootNode;
TabBarRootNode.propTypes = {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  tabBarPosition: _propTypes.default.oneOf(['left', 'right', 'top', 'bottom']),
  children: _propTypes.default.node,
  extraContent: _propTypes.default.node,
  onKeyDown: _propTypes.default.func,
  saveRef: _propTypes.default.func
};
TabBarRootNode.defaultProps = {
  prefixCls: '',
  className: '',
  style: {},
  tabBarPosition: 'top',
  extraContent: null,
  children: null,
  onKeyDown: function onKeyDown() {},
  saveRef: function saveRef() {}
};