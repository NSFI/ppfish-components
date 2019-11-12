"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../../Popover/index.js"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

require("../style/YearAndMonthPopover.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var YearAndMonthPopover =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(YearAndMonthPopover, _React$Component);

  function YearAndMonthPopover(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "scrollToOption", function () {
      var menu = _this.refs.root;
      var active = menu.getElementsByClassName('active')[0];
      active && (0, _domScrollIntoView.default)(active, menu, {
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

  var _proto = YearAndMonthPopover.prototype;

  _proto.handleOnClick = function handleOnClick(item) {
    var _this2 = this;

    this.setState({
      visible: false
    }, function () {
      _this2.props.onChange(item);
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        children = _this$props.children,
        sourceData = _this$props.sourceData,
        value = _this$props.value,
        prefixCls = _this$props.prefixCls;

    var content = function content() {
      return _react.default.createElement("div", {
        ref: "root",
        className: prefixCls + "-year-and-month-popover"
      }, sourceData.map(function (item) {
        var _classNames;

        return _react.default.createElement("li", {
          className: (0, _classnames.default)((_classNames = {}, _classNames[prefixCls + "-year-and-month-popover-item"] = true, _classNames['active'] = value == item || typeof item === 'string' && item.slice(-1) == '月' && value == item.slice(0, -1), _classNames)),
          key: item,
          onClick: _this3.handleOnClick.bind(_this3, item)
        }, item);
      }));
    };

    return _react.default.createElement(_index.default, {
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
  };

  return YearAndMonthPopover;
}(_react.default.Component);

exports.default = YearAndMonthPopover;

_defineProperty(YearAndMonthPopover, "propTypes", {
  sourceData: _propTypes.default.array.isRequired,
  onChange: _propTypes.default.func,
  children: _propTypes.default.node,
  value: _propTypes.default.number,
  prefixCls: _propTypes.default.string
});

_defineProperty(YearAndMonthPopover, "defaultProps", {
  prefixCls: 'fishd'
});