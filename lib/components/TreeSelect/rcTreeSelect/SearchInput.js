"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.searchContextTypes = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _util = require("./util");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var searchContextTypes = {
  onSearchInputChange: _propTypes["default"].func.isRequired
};
exports.searchContextTypes = searchContextTypes;

var SearchInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SearchInput, _React$Component);

  _createClass(SearchInput, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var newState = {
        prevProps: nextProps
      };
      var _prevState$prevProps = prevState.prevProps,
          prevProps = _prevState$prevProps === void 0 ? {} : _prevState$prevProps;

      if (nextProps.searchValue != prevProps.searchValue) {
        newState.showClear = !!nextProps.searchValue;
      }

      return newState;
    }
  }]);

  function SearchInput(props) {
    var _this;

    _classCallCheck(this, SearchInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchInput).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "alignInputWidth", function () {
      _this.inputRef.current.style.width = "".concat(_this.mirrorInputRef.current.clientWidth, "px");
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function (isDidMount) {
      if (_this.inputRef.current) {
        _this.inputRef.current.focus();

        if (isDidMount) {
          setTimeout(function () {
            _this.inputRef.current.focus();
          }, 0);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "blur", function () {
      if (_this.inputRef.current) {
        _this.inputRef.current.blur();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClearInput", function () {
      var r = _this.inputRef;
      r.current.value = '';

      _this.handleInputChange({
        target: {
          value: ''
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (e) {
      var _this$context$rcTreeS = _this.context.rcTreeSelect,
          onSearchInputChange = _this$context$rcTreeS.onSearchInputChange,
          onSearchInputKeyDown = _this$context$rcTreeS.onSearchInputKeyDown;
      var value = e.target.value;

      if (value) {
        _this.setState({
          showClear: true
        });
      } else {
        _this.setState({
          showClear: false
        });
      }

      onSearchInputChange(e);
    });

    _this.inputRef = (0, _util.createRef)();
    _this.mirrorInputRef = (0, _util.createRef)();
    _this.state = {
      showClear: !!_this.props.searchValue
    };
    return _this;
  }

  _createClass(SearchInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          open = _this$props.open,
          needAlign = _this$props.needAlign;

      if (needAlign) {
        this.alignInputWidth();
      }

      if (open) {
        this.focus(true);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          open = _this$props2.open,
          searchValue = _this$props2.searchValue,
          needAlign = _this$props2.needAlign;

      if (open && prevProps.open !== open) {
        this.focus();
      }

      if (needAlign && searchValue !== prevProps.searchValue) {
        this.alignInputWidth();
      }
    }
    /**
     * `scrollWidth` is not correct in IE, do the workaround.
     * ref: https://github.com/react-component/tree-select/issues/65
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          searchValue = _this$props3.searchValue,
          prefixCls = _this$props3.prefixCls,
          disabled = _this$props3.disabled,
          renderPlaceholder = _this$props3.renderPlaceholder,
          open = _this$props3.open,
          ariaId = _this$props3.ariaId;
      var _this$context$rcTreeS2 = this.context.rcTreeSelect,
          onSearchInputChange = _this$context$rcTreeS2.onSearchInputChange,
          onSearchInputKeyDown = _this$context$rcTreeS2.onSearchInputKeyDown;
      var showClear = this.state.showClear;
      var clearIconClass = (0, _classnames["default"])(_defineProperty({
        'hide': !showClear,
        'select-clear-icon': true
      }, "".concat(prefixCls, "-selection__clear"), true));
      return _react["default"].createElement("span", {
        className: "".concat(prefixCls, "-search__field__wrap")
      }, _react["default"].createElement("input", {
        type: "text",
        ref: this.inputRef,
        onChange: this.handleInputChange,
        onKeyDown: onSearchInputKeyDown,
        value: searchValue,
        disabled: disabled,
        className: "".concat(prefixCls, "-search__field"),
        "aria-label": "filter select",
        "aria-autocomplete": "list",
        "aria-controls": open ? ariaId : undefined,
        "aria-multiline": "false"
      }), _react["default"].createElement("span", {
        ref: this.mirrorInputRef,
        className: "".concat(prefixCls, "-search__field__mirror")
      }, searchValue, "\xA0"), renderPlaceholder ? renderPlaceholder() : null, _react["default"].createElement("span", {
        className: clearIconClass,
        onClick: this.handleClearInput
      }));
    }
  }]);

  return SearchInput;
}(_react["default"].Component);

_defineProperty(SearchInput, "propTypes", {
  open: _propTypes["default"].bool,
  searchValue: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  renderPlaceholder: _propTypes["default"].func,
  needAlign: _propTypes["default"].bool,
  ariaId: _propTypes["default"].string
});

_defineProperty(SearchInput, "contextTypes", {
  rcTreeSelect: _propTypes["default"].shape(_objectSpread({}, searchContextTypes))
});

(0, _reactLifecyclesCompat.polyfill)(SearchInput);
var _default = SearchInput;
exports["default"] = _default;