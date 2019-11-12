"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ContainerRender =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ContainerRender, _React$Component);

  function ContainerRender() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "removeContainer", function () {
      if (_this.container) {
        _reactDom.default.unmountComponentAtNode(_this.container);

        _this.container.parentNode.removeChild(_this.container);

        _this.container = null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderComponent", function (props, ready) {
      var _this$props = _this.props,
          visible = _this$props.visible,
          getComponent = _this$props.getComponent,
          forceRender = _this$props.forceRender,
          getContainer = _this$props.getContainer,
          parent = _this$props.parent;

      if (visible || parent._component || forceRender) {
        if (!_this.container) {
          _this.container = getContainer();
        }

        _reactDom.default.unstable_renderSubtreeIntoContainer(parent, getComponent(props), _this.container, function callback() {
          if (ready) {
            ready.call(this);
          }
        });
      }
    });

    return _this;
  }

  var _proto = ContainerRender.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.autoMount) {
      this.renderComponent();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.props.autoMount) {
      this.renderComponent();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.props.autoDestroy) {
      this.removeContainer();
    }
  };

  _proto.render = function render() {
    return this.props.children({
      renderComponent: this.renderComponent,
      removeContainer: this.removeContainer
    });
  };

  return ContainerRender;
}(_react.default.Component);

exports.default = ContainerRender;

_defineProperty(ContainerRender, "propTypes", {
  autoMount: _propTypes.default.bool,
  autoDestroy: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  forceRender: _propTypes.default.bool,
  parent: _propTypes.default.node,
  getComponent: _propTypes.default.func.isRequired,
  getContainer: _propTypes.default.func.isRequired,
  children: _propTypes.default.func.isRequired
});

_defineProperty(ContainerRender, "defaultProps", {
  autoMount: true,
  autoDestroy: true,
  forceRender: false
});