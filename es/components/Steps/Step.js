function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function isString(str) {
  return typeof str === 'string';
}

var Step =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Step, _React$Component);

  function Step() {
    _classCallCheck(this, Step);

    return _possibleConstructorReturn(this, _getPrototypeOf(Step).apply(this, arguments));
  }

  _createClass(Step, [{
    key: "renderIconNode",
    value: function renderIconNode() {
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
      var iconClassName = classNames("".concat(prefixCls, "-icon"), "".concat(iconPrefix, "icon"), (_classNames = {}, _defineProperty(_classNames, "".concat(iconPrefix, "icon-").concat(icon), icon && isString(icon)), _defineProperty(_classNames, "".concat(iconPrefix, "icon-check-line"), !icon && status === 'finish'), _defineProperty(_classNames, "".concat(iconPrefix, "icon-close-tag-line"), !icon && status === 'error'), _classNames));
      var iconDot = React.createElement("span", {
        className: "".concat(prefixCls, "-icon-dot")
      }); // `progressDot` enjoy the highest priority

      if (progressDot) {
        if (typeof progressDot === 'function') {
          iconNode = React.createElement("span", {
            className: "".concat(prefixCls, "-icon")
          }, progressDot(iconDot, {
            index: stepNumber - 1,
            status: status,
            title: title,
            description: description
          }));
        } else {
          iconNode = React.createElement("span", {
            className: "".concat(prefixCls, "-icon")
          }, iconDot);
        }
      } else if (icon && !isString(icon)) {
        iconNode = React.createElement("span", {
          className: "".concat(prefixCls, "-icon")
        }, icon);
      } else if (icons && icons.finish && status === 'finish') {
        iconNode = React.createElement("span", {
          className: "".concat(prefixCls, "-icon")
        }, icons.finish);
      } else if (icons && icons.error && status === 'error') {
        iconNode = React.createElement("span", {
          className: "".concat(prefixCls, "-icon")
        }, icons.error);
      } else if (icon || status === 'finish' || status === 'error') {
        iconNode = React.createElement("span", {
          className: iconClassName
        });
      } else {
        iconNode = React.createElement("span", {
          className: "".concat(prefixCls, "-icon")
        }, stepNumber);
      }

      return iconNode;
    }
  }, {
    key: "render",
    value: function render() {
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
          restProps = _objectWithoutProperties(_this$props2, ["className", "prefixCls", "style", "itemWidth", "status", "iconPrefix", "icon", "wrapperStyle", "adjustMarginRight", "stepNumber", "description", "title", "progressDot", "tailContent", "icons"]);

      var classString = classNames("".concat(prefixCls, "-item"), "".concat(prefixCls, "-item-").concat(status), className, _defineProperty({}, "".concat(prefixCls, "-item-custom"), icon));

      var stepItemStyle = _objectSpread({}, style);

      if (itemWidth) {
        stepItemStyle.width = itemWidth;
      }

      if (adjustMarginRight) {
        stepItemStyle.marginRight = adjustMarginRight;
      }

      return React.createElement("div", _extends({}, restProps, {
        className: classString,
        style: stepItemStyle
      }), React.createElement("div", {
        className: "".concat(prefixCls, "-item-tail")
      }, tailContent), React.createElement("div", {
        className: "".concat(prefixCls, "-item-icon")
      }, this.renderIconNode()), React.createElement("div", {
        className: "".concat(prefixCls, "-item-content")
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-item-title")
      }, title), description && React.createElement("div", {
        className: "".concat(prefixCls, "-item-description")
      }, description)));
    }
  }]);

  return Step;
}(React.Component);

_defineProperty(Step, "propTypes", {
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  wrapperStyle: PropTypes.object,
  itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.string,
  iconPrefix: PropTypes.string,
  icon: PropTypes.node,
  adjustMarginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stepNumber: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  progressDot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  tailContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icons: PropTypes.shape({
    finish: PropTypes.node,
    error: PropTypes.node
  })
});

export { Step as default };