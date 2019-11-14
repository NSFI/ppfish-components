"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScroll = getScroll;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var isDev = process.env.NODE_ENV !== 'production';

function getScroll(w, top) {
  var ret = w["page".concat(top ? 'Y' : 'X', "Offset")];
  var method = "scroll".concat(top ? 'Top' : 'Left');

  if (typeof ret !== 'number') {
    var d = w.document; // ie6,7,8 standard mode

    ret = d.documentElement[method];

    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }

  return ret;
}

function offset(elem) {
  var box;
  var x;
  var y;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  box = elem.getBoundingClientRect();
  x = box.left;
  y = box.top;
  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;
  var w = doc.defaultView || doc.parentWindow;
  x += getScroll(w);
  y += getScroll(w, true);
  return {
    left: x,
    top: y
  };
}

function _componentDidUpdate(component, init) {
  var styles = component.props.styles;
  var rootNode = component.props.getRef('root');
  var wrapNode = component.props.getRef('nav') || rootNode;
  var containerOffset = offset(wrapNode);
  var inkBarNode = component.props.getRef('inkBar');
  var activeTab = component.props.getRef('activeTab');
  var inkBarNodeStyle = inkBarNode.style;
  var tabBarPosition = component.props.tabBarPosition;

  if (init) {
    // prevent mount animation
    inkBarNodeStyle.display = 'none';
  }

  if (activeTab) {
    var tabNode = activeTab;
    var tabOffset = offset(tabNode);
    var transformSupported = (0, _utils.isTransformSupported)(inkBarNodeStyle);

    if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
      var left = tabOffset.left - containerOffset.left;
      var width = tabNode.offsetWidth; // If tabNode'width width equal to wrapNode'width when tabBarPosition is top or bottom
      // It means no css working, then ink bar should not have width until css is loaded
      // Fix https://github.com/ant-design/ant-design/issues/7564

      if (width === rootNode.offsetWidth) {
        width = 0;
      } else if (styles.inkBar && styles.inkBar.width !== undefined) {
        width = parseFloat(styles.inkBar.width, 10);

        if (width) {
          left = left + (tabNode.offsetWidth - width) / 2;
        }
      } // use 3d gpu to optimize render


      if (transformSupported) {
        (0, _utils.setTransform)(inkBarNodeStyle, "translate3d(".concat(left, "px,0,0)"));
        inkBarNodeStyle.width = "".concat(width, "px");
        inkBarNodeStyle.height = '';
      } else {
        inkBarNodeStyle.left = "".concat(left, "px");
        inkBarNodeStyle.top = '';
        inkBarNodeStyle.bottom = '';
        inkBarNodeStyle.right = "".concat(wrapNode.offsetWidth - left - width, "px");
      }
    } else {
      var top = tabOffset.top - containerOffset.top;
      var height = tabNode.offsetHeight;

      if (styles.inkBar && styles.inkBar.height !== undefined) {
        height = parseFloat(styles.inkBar.height, 10);

        if (height) {
          top = top + (tabNode.offsetHeight - height) / 2;
        }
      }

      if (transformSupported) {
        (0, _utils.setTransform)(inkBarNodeStyle, "translate3d(0,".concat(top, "px,0)"));
        inkBarNodeStyle.height = "".concat(height, "px");
        inkBarNodeStyle.width = '';
      } else {
        inkBarNodeStyle.left = '';
        inkBarNodeStyle.right = '';
        inkBarNodeStyle.top = "".concat(top, "px");
        inkBarNodeStyle.bottom = "".concat(wrapNode.offsetHeight - top - height, "px");
      }
    }
  }

  inkBarNodeStyle.display = activeTab ? 'block' : 'none';
}

var InkTabBarNode =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InkTabBarNode, _React$Component);

  function InkTabBarNode() {
    _classCallCheck(this, InkTabBarNode);

    return _possibleConstructorReturn(this, _getPrototypeOf(InkTabBarNode).apply(this, arguments));
  }

  _createClass(InkTabBarNode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      // if (isDev) {
      // https://github.com/ant-design/ant-design/issues/8678
      this.timeout = setTimeout(function () {
        _componentDidUpdate(_this, true);
      }, 0); // } else {
      //   componentDidUpdate(this, true);
      // }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      _componentDidUpdate(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          styles = _this$props.styles,
          inkBarAnimated = _this$props.inkBarAnimated;
      var className = "".concat(prefixCls, "-ink-bar");
      var classes = (0, _classnames2["default"])((_classnames = {}, _defineProperty(_classnames, className, true), _defineProperty(_classnames, inkBarAnimated ? "".concat(className, "-animated") : "".concat(className, "-no-animated"), true), _classnames));
      return _react["default"].createElement("div", {
        style: styles.inkBar,
        className: classes,
        key: "inkBar",
        ref: this.props.saveRef('inkBar')
      });
    }
  }]);

  return InkTabBarNode;
}(_react["default"].Component);

exports["default"] = InkTabBarNode;
InkTabBarNode.propTypes = {
  prefixCls: _propTypes["default"].string,
  styles: _propTypes["default"].object,
  inkBarAnimated: _propTypes["default"].bool,
  saveRef: _propTypes["default"].func
};
InkTabBarNode.defaultProps = {
  prefixCls: '',
  inkBarAnimated: true,
  styles: {},
  saveRef: function saveRef() {}
};