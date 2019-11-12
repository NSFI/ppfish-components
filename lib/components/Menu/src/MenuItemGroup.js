"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MenuItemGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MenuItemGroup, _React$Component);

  function MenuItemGroup() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "renderInnerMenuItem", function (item) {
      var _this$props = _this.props,
          renderMenuItem = _this$props.renderMenuItem,
          index = _this$props.index;
      return renderMenuItem(item, index, _this.props.subMenuKey);
    });

    return _this;
  }

  var _proto = MenuItemGroup.prototype;

  _proto.render = function render() {
    var props = Object.assign({}, this.props);
    var _props$className = props.className,
        className = _props$className === void 0 ? '' : _props$className,
        rootPrefixCls = props.rootPrefixCls;
    var titleClassName = rootPrefixCls + "-item-group-title";
    var listClassName = rootPrefixCls + "-item-group-list";
    var title = props.title,
        children = props.children;

    _util.menuAllProps.forEach(function (key) {
      return delete props[key];
    }); // Set onClick to null, to ignore propagated onClick event


    delete props.onClick;
    return _react.default.createElement("li", _extends({}, props, {
      className: className + " " + rootPrefixCls + "-item-group"
    }), _react.default.createElement("div", {
      className: titleClassName,
      title: typeof title === 'string' ? title : undefined
    }, title), _react.default.createElement("ul", {
      className: listClassName
    }, _react.default.Children.map(children, this.renderInnerMenuItem)));
  };

  return MenuItemGroup;
}(_react.default.Component);

_defineProperty(MenuItemGroup, "propTypes", {
  renderMenuItem: _propTypes.default.func,
  index: _propTypes.default.number,
  className: _propTypes.default.string,
  subMenuKey: _propTypes.default.string,
  rootPrefixCls: _propTypes.default.string
});

_defineProperty(MenuItemGroup, "defaultProps", {
  disabled: true
});

MenuItemGroup.isMenuItemGroup = true;
var _default = MenuItemGroup;
exports.default = _default;