"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SaveRef =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SaveRef, _React$Component);

  function SaveRef() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "getRef", function (name) {
      return _this[name];
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (name) {
      return function (node) {
        if (node) {
          _this[name] = node;
        }
      };
    });

    return _this;
  }

  var _proto = SaveRef.prototype;

  _proto.render = function render() {
    return this.props.children(this.saveRef, this.getRef);
  };

  return SaveRef;
}(_react.default.Component);

exports.default = SaveRef;
SaveRef.propTypes = {
  children: _propTypes.default.func
};
SaveRef.defaultProps = {
  children: function children() {
    return null;
  }
};