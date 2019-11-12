"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Notice =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Notice, _Component);

  function Notice() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      _this.clearCloseTimer();

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "startCloseTimer", function () {
      if (_this.props.duration) {
        _this.closeTimer = setTimeout(function () {
          _this.close();
        }, _this.props.duration * 1000);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clearCloseTimer", function () {
      if (_this.closeTimer) {
        clearTimeout(_this.closeTimer);
        _this.closeTimer = null;
      }
    });

    return _this;
  }

  var _proto = Notice.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.startCloseTimer();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.duration !== prevProps.duration || this.props.update) {
      this.restartCloseTimer();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.clearCloseTimer();
  };

  _proto.restartCloseTimer = function restartCloseTimer() {
    this.clearCloseTimer();
    this.startCloseTimer();
  };

  _proto.render = function render() {
    var _className;

    var props = this.props;
    var componentClass = props.prefixCls + "-notice";
    var className = (_className = {}, _className["" + componentClass] = 1, _className[componentClass + "-closable"] = props.closable, _className[props.className] = !!props.className, _className);
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(className),
      style: props.style,
      onMouseEnter: this.clearCloseTimer,
      onMouseLeave: this.startCloseTimer
    }, _react.default.createElement("div", {
      className: componentClass + "-content"
    }, props.children), props.closable ? _react.default.createElement("a", {
      tabIndex: "0",
      onClick: this.close,
      className: componentClass + "-close"
    }, props.closeIcon || _react.default.createElement("span", {
      className: componentClass + "-close-x"
    })) : null);
  };

  return Notice;
}(_react.Component);

exports.default = Notice;

_defineProperty(Notice, "propTypes", {
  duration: _propTypes.default.number,
  onClose: _propTypes.default.func,
  children: _propTypes.default.node,
  update: _propTypes.default.bool,
  closeIcon: _propTypes.default.node
});

_defineProperty(Notice, "defaultProps", {
  onEnd: function onEnd() {},
  onClose: function onClose() {},
  duration: 1.5,
  style: {
    right: '50%'
  }
});