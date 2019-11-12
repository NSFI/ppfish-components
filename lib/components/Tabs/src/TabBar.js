"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _TabBarRootNode = _interopRequireDefault(require("./TabBarRootNode"));

var _TabBarTabsNode = _interopRequireDefault(require("./TabBarTabsNode"));

var _SaveRef = _interopRequireDefault(require("./SaveRef"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TabBar1 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TabBar1, _React$Component);

  function TabBar1() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TabBar1.prototype;

  _proto.render = function render() {
    var _this = this;

    return _react.default.createElement(_SaveRef.default, null, function (saveRef) {
      return _react.default.createElement(_TabBarRootNode.default, _extends({
        saveRef: saveRef
      }, _this.props), _react.default.createElement(_TabBarTabsNode.default, _extends({
        saveRef: saveRef
      }, _this.props)));
    });
  };

  return TabBar1;
}(_react.default.Component);

exports.default = TabBar1;