"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.parse-int");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FooterToolbar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FooterToolbar, _React$Component);

  function FooterToolbar(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "setToolbarPosition", function () {
      var target = _this.props.target;

      var _getComputedStyle = getComputedStyle(_this.wrapper),
          height = _getComputedStyle.height;

      var wrapperHeight = Number.parseInt(height);
      var targetElement = document.documentElement;

      if (target && typeof target === 'function' && target() !== window) {
        targetElement = target();
      }

      var offsetObj = {
        containerHeight: targetElement.clientHeight,
        containerScrollTop: targetElement.scrollTop
      };
      var offset = offsetObj.containerHeight + offsetObj.containerScrollTop - wrapperHeight;
      var maxOffset = targetElement.scrollHeight - wrapperHeight;

      _this.setState({
        offset: offset > maxOffset ? maxOffset : offset
      });
    });

    _this.state = {
      offset: 0
    };
    return _this;
  }

  var _proto = FooterToolbar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.setToolbarPosition();
    var target = this.props.target && this.props.target() || window;
    this.scrollListener = (0, _utils.addEventListener)(target, 'scroll', function () {
      _this2.setToolbarPosition();
    });
    this.resizeListener = (0, _utils.addEventListener)(target, 'resize', function () {
      _this2.setToolbarPosition();
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.scrollListener) {
      this.scrollListener.remove();
    }

    if (this.resizeListener) {
      this.resizeListener.remove();
    }
  };

  _proto.render = function render() {
    var _classNames,
        _this3 = this;

    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        prefixCls = _this$props.prefixCls,
        style = _this$props.style;
    var toolbarStyle = Object.assign({}, style, {
      position: 'absolute',
      top: this.state.offset
    });
    return _react.default.createElement("div", {
      className: (0, _classnames.default)((_classNames = {}, _classNames[className] = true, _classNames[prefixCls] = true, _classNames)),
      style: toolbarStyle,
      ref: function ref(wrapper) {
        _this3.wrapper = wrapper;
      }
    }, _react.default.createElement("div", {
      className: prefixCls + "-inner"
    }, children));
  };

  return FooterToolbar;
}(_react.default.Component);

_defineProperty(FooterToolbar, "defaultProps", {
  children: null,
  className: '',
  prefixCls: 'fishd-footer-toolbar'
});

_defineProperty(FooterToolbar, "propTypes", {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  target: _propTypes.default.func,
  style: _propTypes.default.object
});

var _default = FooterToolbar;
exports.default = _default;