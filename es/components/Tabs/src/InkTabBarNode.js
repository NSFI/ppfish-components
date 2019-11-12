"use strict";

exports.__esModule = true;
exports.getScroll = getScroll;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var isDev = process.env.NODE_ENV !== 'production';

function getScroll(w, top) {
  var ret = w["page" + (top ? 'Y' : 'X') + "Offset"];
  var method = "scroll" + (top ? 'Top' : 'Left');

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
        (0, _utils.setTransform)(inkBarNodeStyle, "translate3d(" + left + "px,0,0)");
        inkBarNodeStyle.width = width + "px";
        inkBarNodeStyle.height = '';
      } else {
        inkBarNodeStyle.left = left + "px";
        inkBarNodeStyle.top = '';
        inkBarNodeStyle.bottom = '';
        inkBarNodeStyle.right = wrapNode.offsetWidth - left - width + "px";
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
        (0, _utils.setTransform)(inkBarNodeStyle, "translate3d(0," + top + "px,0)");
        inkBarNodeStyle.height = height + "px";
        inkBarNodeStyle.width = '';
      } else {
        inkBarNodeStyle.left = '';
        inkBarNodeStyle.right = '';
        inkBarNodeStyle.top = top + "px";
        inkBarNodeStyle.bottom = wrapNode.offsetHeight - top - height + "px";
      }
    }
  }

  inkBarNodeStyle.display = activeTab ? 'block' : 'none';
}

var InkTabBarNode =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InkTabBarNode, _React$Component);

  function InkTabBarNode() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InkTabBarNode.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this = this;

    // if (isDev) {
    // https://github.com/ant-design/ant-design/issues/8678
    this.timeout = setTimeout(function () {
      _componentDidUpdate(_this, true);
    }, 0); // } else {
    //   componentDidUpdate(this, true);
    // }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    _componentDidUpdate(this);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeout);
  };

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        styles = _this$props.styles,
        inkBarAnimated = _this$props.inkBarAnimated;
    var className = prefixCls + "-ink-bar";
    var classes = (0, _classnames2.default)((_classnames = {}, _classnames[className] = true, _classnames[inkBarAnimated ? className + "-animated" : className + "-no-animated"] = true, _classnames));
    return _react.default.createElement("div", {
      style: styles.inkBar,
      className: classes,
      key: "inkBar",
      ref: this.props.saveRef('inkBar')
    });
  };

  return InkTabBarNode;
}(_react.default.Component);

exports.default = InkTabBarNode;
InkTabBarNode.propTypes = {
  prefixCls: _propTypes.default.string,
  styles: _propTypes.default.object,
  inkBarAnimated: _propTypes.default.bool,
  saveRef: _propTypes.default.func
};
InkTabBarNode.defaultProps = {
  prefixCls: '',
  inkBarAnimated: true,
  styles: {},
  saveRef: function saveRef() {}
};