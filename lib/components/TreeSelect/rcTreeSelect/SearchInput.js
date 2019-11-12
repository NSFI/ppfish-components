"use strict";

exports.__esModule = true;
exports.default = exports.searchContextTypes = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _util = require("./util");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var searchContextTypes = {
  onSearchInputChange: _propTypes.default.func.isRequired
};
exports.searchContextTypes = searchContextTypes;

var SearchInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SearchInput, _React$Component);

  SearchInput.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var newState = {
      prevProps: nextProps
    };
    var _prevState$prevProps = prevState.prevProps,
        prevProps = _prevState$prevProps === void 0 ? {} : _prevState$prevProps;

    if (nextProps.searchValue != prevProps.searchValue) {
      newState.showClear = !!nextProps.searchValue;
    }

    return newState;
  };

  function SearchInput(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "alignInputWidth", function () {
      _this.inputRef.current.style.width = _this.mirrorInputRef.current.clientWidth + "px";
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

  var _proto = SearchInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        open = _this$props.open,
        needAlign = _this$props.needAlign;

    if (needAlign) {
      this.alignInputWidth();
    }

    if (open) {
      this.focus(true);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
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
  ;

  _proto.render = function render() {
    var _classNames;

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
    var clearIconClass = (0, _classnames.default)((_classNames = {
      'hide': !showClear,
      'select-clear-icon': true
    }, _classNames[prefixCls + "-selection__clear"] = true, _classNames));
    return _react.default.createElement("span", {
      className: prefixCls + "-search__field__wrap"
    }, _react.default.createElement("input", {
      type: "text",
      ref: this.inputRef,
      onChange: this.handleInputChange,
      onKeyDown: onSearchInputKeyDown,
      value: searchValue,
      disabled: disabled,
      className: prefixCls + "-search__field",
      "aria-label": "filter select",
      "aria-autocomplete": "list",
      "aria-controls": open ? ariaId : undefined,
      "aria-multiline": "false"
    }), _react.default.createElement("span", {
      ref: this.mirrorInputRef,
      className: prefixCls + "-search__field__mirror"
    }, searchValue, "\xA0"), renderPlaceholder ? renderPlaceholder() : null, _react.default.createElement("span", {
      className: clearIconClass,
      onClick: this.handleClearInput
    }));
  };

  return SearchInput;
}(_react.default.Component);

_defineProperty(SearchInput, "propTypes", {
  open: _propTypes.default.bool,
  searchValue: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  renderPlaceholder: _propTypes.default.func,
  needAlign: _propTypes.default.bool,
  ariaId: _propTypes.default.string
});

_defineProperty(SearchInput, "contextTypes", {
  rcTreeSelect: _propTypes.default.shape(Object.assign({}, searchContextTypes))
});

(0, _reactLifecyclesCompat.polyfill)(SearchInput);
var _default = SearchInput;
exports.default = _default;