"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.number.constructor");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _KeyCode = _interopRequireDefault(require("./KeyCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Options, _React$Component);

  function Options(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "buildOptionText", function (value) {
      return value + " " + _this.props.locale.items_per_page;
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

      if (e.keyCode === _KeyCode.default.ENTER || e.type === 'click') {
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

  var _proto = Options.prototype;

  _proto.render = function render() {
    var props = this.props;
    var state = this.state;
    var locale = props.locale;
    var prefixCls = props.rootPrefixCls + "-options";
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
        return _react.default.createElement(Option, {
          key: i,
          value: opt
        }, buildOptionText(opt));
      });
      changeSelect = _react.default.createElement(Select, {
        prefixCls: props.selectPrefixCls,
        showSearch: false,
        className: prefixCls + "-size-changer",
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
          gotoButton = _react.default.createElement("button", {
            type: "button",
            onClick: this.go,
            onKeyUp: this.go
          }, locale.jump_to_confirm);
        } else {
          gotoButton = _react.default.createElement("span", {
            onClick: this.go,
            onKeyUp: this.go
          }, goButton);
        }
      }

      goInput = _react.default.createElement("div", {
        className: prefixCls + "-quick-jumper"
      }, locale.jump_to, _react.default.createElement("input", {
        type: "text",
        value: state.goInputText,
        onChange: this.handleChange,
        onKeyUp: this.go
      }), locale.page, gotoButton);
    }

    return _react.default.createElement("li", {
      className: "" + prefixCls
    }, changeSelect, goInput);
  };

  return Options;
}(_react.default.Component);

_defineProperty(Options, "propTypes", {
  changeSize: _propTypes.default.func,
  quickGo: _propTypes.default.func,
  selectComponentClass: _propTypes.default.func,
  current: _propTypes.default.number,
  pageSizeOptions: _propTypes.default.arrayOf(_propTypes.default.string),
  pageSize: _propTypes.default.number,
  buildOptionText: _propTypes.default.func,
  locale: _propTypes.default.object
});

_defineProperty(Options, "defaultProps", {
  pageSizeOptions: ['10', '20', '30', '40']
});

var _default = Options;
exports.default = _default;