function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import warning from 'warning';
import PropTypes from 'prop-types';

var TabBarTabsNode =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TabBarTabsNode, _React$Component);

  function TabBarTabsNode() {
    _classCallCheck(this, TabBarTabsNode);

    return _possibleConstructorReturn(this, _getPrototypeOf(TabBarTabsNode).apply(this, arguments));
  }

  _createClass(TabBarTabsNode, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          children = _this$props.panels,
          activeKey = _this$props.activeKey,
          prefixCls = _this$props.prefixCls,
          tabBarGutter = _this$props.tabBarGutter;
      var rst = [];
      React.Children.forEach(children, function (child, index) {
        if (!child) {
          return;
        }

        var key = child.key;
        var cls = activeKey === key ? "".concat(prefixCls, "-tab-active") : '';
        cls += " ".concat(prefixCls, "-tab");
        var events = {};

        if (child.props.disabled) {
          cls += " ".concat(prefixCls, "-tab-disabled");
        } else {
          events = {
            onClick: _this.props.onTabClick.bind(_this, key)
          };
        }

        var ref = {};

        if (activeKey === key) {
          ref.ref = _this.props.saveRef('activeTab');
        }

        warning('tab' in child.props, 'There must be `tab` property on children of Tabs.');
        rst.push(React.createElement("div", _extends({
          role: "tab",
          "aria-disabled": child.props.disabled ? 'true' : 'false',
          "aria-selected": activeKey === key ? 'true' : 'false'
        }, events, {
          className: cls,
          key: key,
          style: {
            marginRight: tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter
          }
        }, ref), child.props.tab));
      });
      return rst;
    }
  }]);

  return TabBarTabsNode;
}(React.Component);

export { TabBarTabsNode as default };
TabBarTabsNode.propTypes = {
  activeKey: PropTypes.string.isRequired,
  panels: PropTypes.node,
  prefixCls: PropTypes.string,
  tabBarGutter: PropTypes.number,
  onTabClick: PropTypes.func,
  saveRef: PropTypes.func
};
TabBarTabsNode.defaultProps = {
  panels: [],
  prefixCls: [],
  tabBarGutter: null,
  onTabClick: function onTabClick() {},
  saveRef: function saveRef() {}
};