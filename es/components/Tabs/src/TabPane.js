"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TabPane =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TabPane, _React$Component);

  function TabPane() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TabPane.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        className = _this$props.className,
        destroyInactiveTabPane = _this$props.destroyInactiveTabPane,
        active = _this$props.active,
        forceRender = _this$props.forceRender,
        rootPrefixCls = _this$props.rootPrefixCls,
        style = _this$props.style,
        children = _this$props.children,
        placeholder = _this$props.placeholder,
        restProps = _objectWithoutPropertiesLoose(_this$props, ["className", "destroyInactiveTabPane", "active", "forceRender", "rootPrefixCls", "style", "children", "placeholder"]);

    this._isActived = this._isActived || active;
    var prefixCls = rootPrefixCls + "-tabpane";
    var cls = (0, _classnames2.default)((_classnames = {}, _classnames[prefixCls] = 1, _classnames[prefixCls + "-inactive"] = !active, _classnames[prefixCls + "-active"] = active, _classnames[className] = className, _classnames));
    var isRender = destroyInactiveTabPane ? active : this._isActived;
    return _react.default.createElement("div", _extends({
      style: style,
      role: "tabpanel",
      "aria-hidden": active ? 'false' : 'true',
      className: cls
    }, (0, _utils.getDataAttr)(restProps)), isRender || forceRender ? children : placeholder);
  };

  return TabPane;
}(_react.default.Component);

exports.default = TabPane;
TabPane.propTypes = {
  className: _propTypes.default.string,
  active: _propTypes.default.bool,
  // style: PropTypes.any,
  style: _propTypes.default.object,
  destroyInactiveTabPane: _propTypes.default.bool,
  forceRender: _propTypes.default.bool,
  placeholder: _propTypes.default.node,
  rootPrefixCls: _propTypes.default.string,
  children: _propTypes.default.node
};
TabPane.defaultProps = {
  placeholder: null
};