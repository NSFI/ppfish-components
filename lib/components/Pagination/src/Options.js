"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _KeyCode = _interopRequireDefault(require("./KeyCode"));

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

var Options =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Options, _React$Component);

  function Options(props) {
    var _this;

    _classCallCheck(this, Options);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Options).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "buildOptionText", function (value) {
      return "".concat(value, " ").concat(_this.props.locale.items_per_page);
    });

    _defineProperty(_assertThisInitialized(_this), "changeSize", function (value) {
      _this.props.changeSize(Number(value));
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {
      _this.setState({
        goInputText: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "go", function (e) {
      var val = _this.state.goInputText;

      if (val === '') {
        return;
      }

      val = isNaN(val) ? _this.props.current : Number(val);

      if (e.keyCode === _KeyCode["default"].ENTER || e.type === 'click') {
        _this.setState({
          goInputText: ''
        });

        _this.props.quickGo(val);
      }
    });

    _this.state = {
      goInputText: ''
    };
    return _this;
  }

  _createClass(Options, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var state = this.state;
      var locale = props.locale;
      var prefixCls = "".concat(props.rootPrefixCls, "-options");
      var changeSize = props.changeSize;
      var quickGo = props.quickGo;
      var goButton = props.goButton;
      var buildOptionText = props.buildOptionText || this.buildOptionText;
      var Select = props.selectComponentClass;
      var changeSelect = null;
      var goInput = null;
      var gotoButton = null;

      if (!(changeSize || quickGo)) {
        return null;
      }

      if (changeSize && Select) {
        var Option = Select.Option;
        var pageSize = props.pageSize || props.pageSizeOptions[0];
        var options = props.pageSizeOptions.map(function (opt, i) {
          return _react["default"].createElement(Option, {
            key: i,
            value: opt
          }, buildOptionText(opt));
        });
        changeSelect = _react["default"].createElement(Select, {
          prefixCls: props.selectPrefixCls,
          showSearch: false,
          className: "".concat(prefixCls, "-size-changer"),
          dropdownMatchSelectWidth: false,
          value: pageSize.toString(),
          onChange: this.changeSize,
          getPopupContainer: function getPopupContainer(triggerNode) {
            return triggerNode.parentNode;
          }
        }, options);
      }

      if (quickGo) {
        if (goButton) {
          if (typeof goButton === 'boolean') {
            gotoButton = _react["default"].createElement("button", {
              type: "button",
              onClick: this.go,
              onKeyUp: this.go
            }, locale.jump_to_confirm);
          } else {
            gotoButton = _react["default"].createElement("span", {
              onClick: this.go,
              onKeyUp: this.go
            }, goButton);
          }
        }

        goInput = _react["default"].createElement("div", {
          className: "".concat(prefixCls, "-quick-jumper")
        }, locale.jump_to, _react["default"].createElement("input", {
          type: "text",
          value: state.goInputText,
          onChange: this.handleChange,
          onKeyUp: this.go
        }), locale.page, gotoButton);
      }

      return _react["default"].createElement("li", {
        className: "".concat(prefixCls)
      }, changeSelect, goInput);
    }
  }]);

  return Options;
}(_react["default"].Component);

_defineProperty(Options, "propTypes", {
  changeSize: _propTypes["default"].func,
  quickGo: _propTypes["default"].func,
  selectComponentClass: _propTypes["default"].func,
  current: _propTypes["default"].number,
  pageSizeOptions: _propTypes["default"].arrayOf(_propTypes["default"].string),
  pageSize: _propTypes["default"].number,
  buildOptionText: _propTypes["default"].func,
  locale: _propTypes["default"].object
});

_defineProperty(Options, "defaultProps", {
  pageSizeOptions: ['10', '20', '30', '40']
});

var _default = Options;
exports["default"] = _default;