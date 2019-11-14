function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getDataAttr } from './utils';

var TabBarRootNode =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TabBarRootNode, _React$Component);

  function TabBarRootNode() {
    _classCallCheck(this, TabBarRootNode);

    return _possibleConstructorReturn(this, _getPrototypeOf(TabBarRootNode).apply(this, arguments));
  }

  _createClass(TabBarRootNode, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          onKeyDown = _this$props.onKeyDown,
          className = _this$props.className,
          extraContent = _this$props.extraContent,
          style = _this$props.style,
          tabBarPosition = _this$props.tabBarPosition,
          children = _this$props.children,
          restProps = _objectWithoutProperties(_this$props, ["prefixCls", "onKeyDown", "className", "extraContent", "style", "tabBarPosition", "children"]);

      var cls = classnames("".concat(prefixCls, "-bar"), _defineProperty({}, className, !!className));
      var topOrBottom = tabBarPosition === 'top' || tabBarPosition === 'bottom';
      var tabBarExtraContentStyle = topOrBottom ? {
        "float": 'right'
      } : {};
      var extraContentStyle = extraContent && extraContent.props ? extraContent.props.style : {};
      var newChildren = children;

      if (extraContent) {
        newChildren = [cloneElement(extraContent, {
          key: 'extra',
          style: _objectSpread({}, tabBarExtraContentStyle, {}, extraContentStyle)
        }), cloneElement(children, {
          key: 'content'
        })];
        newChildren = topOrBottom ? newChildren : newChildren.reverse();
      }

      return React.createElement("div", _extends({
        role: "tablist",
        className: cls,
        tabIndex: "0",
        ref: this.props.saveRef('root'),
        onKeyDown: onKeyDown,
        style: style
      }, getDataAttr(restProps)), newChildren);
    }
  }]);

  return TabBarRootNode;
}(React.Component);

export { TabBarRootNode as default };
TabBarRootNode.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  tabBarPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  children: PropTypes.node,
  extraContent: PropTypes.node,
  onKeyDown: PropTypes.func,
  saveRef: PropTypes.func
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