"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../../Popover/index.js"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

require("../style/YearAndMonthPopover.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var YearAndMonthPopover =
/*#__PURE__*/
function (_React$Component) {
  _inherits(YearAndMonthPopover, _React$Component);

  function YearAndMonthPopover(props) {
    var _this;

    _classCallCheck(this, YearAndMonthPopover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(YearAndMonthPopover).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "scrollToOption", function () {
      var menu = _this.refs.root;
      var active = menu.getElementsByClassName('active')[0];
      active && (0, _domScrollIntoView["default"])(active, menu, {
        offsetTop: 91,
        alignWithTop: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleVisibleChange", function (visible) {
      _this.setState({
        visible: visible
      }, function () {
        if (visible) {
          _this.scrollToOption();
        }
      });
    });

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(YearAndMonthPopover, [{
    key: "handleOnClick",
    value: function handleOnClick(item) {
      var _this2 = this;

      this.setState({
        visible: false
      }, function () {
        _this2.props.onChange(item);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          children = _this$props.children,
          sourceData = _this$props.sourceData,
          value = _this$props.value,
          prefixCls = _this$props.prefixCls;

      var content = function content() {
        return _react["default"].createElement("div", {
          ref: "root",
          className: "".concat(prefixCls, "-year-and-month-popover")
        }, sourceData.map(function (item) {
          var _classNames;

          return _react["default"].createElement("li", {
            className: (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-year-and-month-popover-item"), true), _defineProperty(_classNames, 'active', value == item || typeof item === 'string' && item.slice(-1) == '月' && value == item.slice(0, -1)), _classNames)),
            key: item,
            onClick: _this3.handleOnClick.bind(_this3, item)
          }, item);
        }));
      };

      return _react["default"].createElement(_index["default"], {
        transitionName: '',
        content: content(),
        trigger: "click",
        placement: "bottom",
        visible: this.state.visible,
        onVisibleChange: this.handleVisibleChange,
        getPopupContainer: function getPopupContainer(triggerNode) {
          return triggerNode.parentNode;
        },
        forceRender: true
      }, children);
    }
  }]);

  return YearAndMonthPopover;
}(_react["default"].Component);

exports["default"] = YearAndMonthPopover;

_defineProperty(YearAndMonthPopover, "propTypes", {
  sourceData: _propTypes["default"].array.isRequired,
  onChange: _propTypes["default"].func,
  children: _propTypes["default"].node,
  value: _propTypes["default"].number,
  prefixCls: _propTypes["default"].string
});

_defineProperty(YearAndMonthPopover, "defaultProps", {
  prefixCls: 'fishd'
});