"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isString(str) {
  return typeof str === 'string';
}

var Step =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Step, _React$Component);

  function Step() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Step.prototype;

  _proto.renderIconNode = function renderIconNode() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        progressDot = _this$props.progressDot,
        stepNumber = _this$props.stepNumber,
        status = _this$props.status,
        title = _this$props.title,
        description = _this$props.description,
        icon = _this$props.icon,
        iconPrefix = _this$props.iconPrefix,
        icons = _this$props.icons;
    var iconNode;
    var iconClassName = (0, _classnames.default)(prefixCls + "-icon", iconPrefix + "icon", (_classNames = {}, _classNames[iconPrefix + "icon-" + icon] = icon && isString(icon), _classNames[iconPrefix + "icon-check-line"] = !icon && status === 'finish', _classNames[iconPrefix + "icon-close-tag-line"] = !icon && status === 'error', _classNames));

    var iconDot = _react.default.createElement("span", {
      className: prefixCls + "-icon-dot"
    }); // `progressDot` enjoy the highest priority


    if (progressDot) {
      if (typeof progressDot === 'function') {
        iconNode = _react.default.createElement("span", {
          className: prefixCls + "-icon"
        }, progressDot(iconDot, {
          index: stepNumber - 1,
          status: status,
          title: title,
          description: description
        }));
      } else {
        iconNode = _react.default.createElement("span", {
          className: prefixCls + "-icon"
        }, iconDot);
      }
    } else if (icon && !isString(icon)) {
      iconNode = _react.default.createElement("span", {
        className: prefixCls + "-icon"
      }, icon);
    } else if (icons && icons.finish && status === 'finish') {
      iconNode = _react.default.createElement("span", {
        className: prefixCls + "-icon"
      }, icons.finish);
    } else if (icons && icons.error && status === 'error') {
      iconNode = _react.default.createElement("span", {
        className: prefixCls + "-icon"
      }, icons.error);
    } else if (icon || status === 'finish' || status === 'error') {
      iconNode = _react.default.createElement("span", {
        className: iconClassName
      });
    } else {
      iconNode = _react.default.createElement("span", {
        className: prefixCls + "-icon"
      }, stepNumber);
    }

    return iconNode;
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props2 = this.props,
        className = _this$props2.className,
        prefixCls = _this$props2.prefixCls,
        style = _this$props2.style,
        itemWidth = _this$props2.itemWidth,
        _this$props2$status = _this$props2.status,
        status = _this$props2$status === void 0 ? 'wait' : _this$props2$status,
        iconPrefix = _this$props2.iconPrefix,
        icon = _this$props2.icon,
        wrapperStyle = _this$props2.wrapperStyle,
        adjustMarginRight = _this$props2.adjustMarginRight,
        stepNumber = _this$props2.stepNumber,
        description = _this$props2.description,
        title = _this$props2.title,
        progressDot = _this$props2.progressDot,
        tailContent = _this$props2.tailContent,
        icons = _this$props2.icons,
        restProps = _objectWithoutPropertiesLoose(_this$props2, ["className", "prefixCls", "style", "itemWidth", "status", "iconPrefix", "icon", "wrapperStyle", "adjustMarginRight", "stepNumber", "description", "title", "progressDot", "tailContent", "icons"]);

    var classString = (0, _classnames.default)(prefixCls + "-item", prefixCls + "-item-" + status, className, (_classNames2 = {}, _classNames2[prefixCls + "-item-custom"] = icon, _classNames2));
    var stepItemStyle = Object.assign({}, style);

    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }

    if (adjustMarginRight) {
      stepItemStyle.marginRight = adjustMarginRight;
    }

    return _react.default.createElement("div", _extends({}, restProps, {
      className: classString,
      style: stepItemStyle
    }), _react.default.createElement("div", {
      className: prefixCls + "-item-tail"
    }, tailContent), _react.default.createElement("div", {
      className: prefixCls + "-item-icon"
    }, this.renderIconNode()), _react.default.createElement("div", {
      className: prefixCls + "-item-content"
    }, _react.default.createElement("div", {
      className: prefixCls + "-item-title"
    }, title), description && _react.default.createElement("div", {
      className: prefixCls + "-item-description"
    }, description)));
  };

  return Step;
}(_react.default.Component);

exports.default = Step;

_defineProperty(Step, "propTypes", {
  className: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  style: _propTypes.default.object,
  wrapperStyle: _propTypes.default.object,
  itemWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  status: _propTypes.default.string,
  iconPrefix: _propTypes.default.string,
  icon: _propTypes.default.node,
  adjustMarginRight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  stepNumber: _propTypes.default.string,
  description: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  progressDot: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  tailContent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  icons: _propTypes.default.shape({
    finish: _propTypes.default.node,
    error: _propTypes.default.node
  })
});