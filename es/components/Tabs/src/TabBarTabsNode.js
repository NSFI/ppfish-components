"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _warning = _interopRequireDefault(require("warning"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TabBarTabsNode =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TabBarTabsNode, _React$Component);

  function TabBarTabsNode() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TabBarTabsNode.prototype;

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        children = _this$props.panels,
        activeKey = _this$props.activeKey,
        prefixCls = _this$props.prefixCls,
        tabBarGutter = _this$props.tabBarGutter;
    var rst = [];

    _react.default.Children.forEach(children, function (child, index) {
      if (!child) {
        return;
      }

      var key = child.key;
      var cls = activeKey === key ? prefixCls + "-tab-active" : '';
      cls += " " + prefixCls + "-tab";
      var events = {};

      if (child.props.disabled) {
        cls += " " + prefixCls + "-tab-disabled";
      } else {
        events = {
          onClick: _this.props.onTabClick.bind(_this, key)
        };
      }

      var ref = {};

      if (activeKey === key) {
        ref.ref = _this.props.saveRef('activeTab');
      }

      (0, _warning.default)('tab' in child.props, 'There must be `tab` property on children of Tabs.');
      rst.push(_react.default.createElement("div", _extends({
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
  };

  return TabBarTabsNode;
}(_react.default.Component);

exports.default = TabBarTabsNode;
TabBarTabsNode.propTypes = {
  activeKey: _propTypes.default.string.isRequired,
  panels: _propTypes.default.node,
  prefixCls: _propTypes.default.string,
  tabBarGutter: _propTypes.default.number,
  onTabClick: _propTypes.default.func,
  saveRef: _propTypes.default.func
};
TabBarTabsNode.defaultProps = {
  panels: [],
  prefixCls: [],
  tabBarGutter: null,
  onTabClick: function onTabClick() {},
  saveRef: function saveRef() {}
};