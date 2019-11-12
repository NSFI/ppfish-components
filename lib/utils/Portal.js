"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Portal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Portal, _React$Component);

  function Portal() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Portal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.createContainer();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var didUpdate = this.props.didUpdate;

    if (didUpdate) {
      didUpdate(prevProps);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeContainer();
  };

  _proto.createContainer = function createContainer() {
    this._container = this.props.getContainer();
    this.forceUpdate();
  };

  _proto.removeContainer = function removeContainer() {
    if (this._container) {
      this._container.parentNode.removeChild(this._container);
    }
  };

  _proto.render = function render() {
    if (this._container) {
      return _reactDom.default.createPortal(this.props.children, this._container);
    }

    return null;
  };

  return Portal;
}(_react.default.Component);

exports.default = Portal;

_defineProperty(Portal, "propTypes", {
  getContainer: _propTypes.default.func.isRequired,
  children: _propTypes.default.node.isRequired,
  didUpdate: _propTypes.default.func
});