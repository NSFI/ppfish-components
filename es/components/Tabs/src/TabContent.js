"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var _index = _interopRequireDefault(require("../../Spin/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TabContent =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TabContent, _React$Component);

  function TabContent() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TabContent.prototype;

  _proto.getTabPanes = function getTabPanes() {
    var props = this.props;
    var activeKey = props.activeKey;
    var children = props.children;
    var newChildren = [];

    if (props.loading) {
      return _react.default.createElement(_index.default.Container, {
        style: {
          height: '100%',
          width: '100%',
          minHeight: '28px'
        }
      }, _react.default.createElement(_index.default, {
        spinning: true
      }));
    }

    _react.default.Children.forEach(children, function (child) {
      if (!child) {
        return;
      }

      var key = child.key;
      var active = activeKey === key;
      newChildren.push(_react.default.cloneElement(child, {
        active: active,
        destroyInactiveTabPane: props.destroyInactiveTabPane,
        rootPrefixCls: props.prefixCls
      }));
    });

    return newChildren;
  };

  _proto.render = function render() {
    var _classnames;

    var props = this.props;
    var prefixCls = props.prefixCls,
        children = props.children,
        activeKey = props.activeKey,
        tabBarPosition = props.tabBarPosition,
        animated = props.animated,
        animatedWithMargin = props.animatedWithMargin;
    var style = props.style;
    var classes = (0, _classnames2.default)((_classnames = {}, _classnames[prefixCls + "-content"] = true, _classnames[animated ? prefixCls + "-content-animated" : prefixCls + "-content-no-animated"] = true, _classnames));

    if (animated) {
      var activeIndex = (0, _utils.getActiveIndex)(children, activeKey);

      if (activeIndex !== -1) {
        var animatedStyle = animatedWithMargin ? (0, _utils.getMarginStyle)(activeIndex, tabBarPosition) : (0, _utils.getTransformPropValue)((0, _utils.getTransformByIndex)(activeIndex, tabBarPosition));
        style = Object.assign({}, style, {}, animatedStyle);
      } else {
        style = Object.assign({}, style, {
          display: 'none'
        });
      }
    }

    return _react.default.createElement("div", {
      className: classes,
      style: style
    }, this.getTabPanes());
  };

  return TabContent;
}(_react.default.Component);

exports.default = TabContent;
TabContent.propTypes = {
  animated: _propTypes.default.bool,
  animatedWithMargin: _propTypes.default.bool,
  prefixCls: _propTypes.default.string,
  children: _propTypes.default.node,
  activeKey: _propTypes.default.string,
  // style: PropTypes.any,
  style: _propTypes.default.object,
  tabBarPosition: _propTypes.default.string
};
TabContent.defaultProps = {
  animated: true
};