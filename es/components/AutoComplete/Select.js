"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireWildcard(require("./src/index.js"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var SelectPropTypes = {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  size: _propTypes.default.oneOf(['default', 'large', 'small']),
  notFoundContent: _propTypes.default.any,
  showSearch: _propTypes.default.bool,
  optionLabelProp: _propTypes.default.string,
  transitionName: _propTypes.default.string,
  choiceTransitionName: _propTypes.default.string,
  id: _propTypes.default.string
}; // => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };

var Select =
/** @class */
function (_super) {
  __extends(Select, _super);

  function Select(props) {
    var _this = _super.call(this, props) || this;

    _this.saveSelect = function (node) {
      _this.rcSelect = node;
    };

    _this.renderSelect = function (locale) {
      var _a;

      var _b = _this.props,
          prefixCls = _b.prefixCls,
          _c = _b.className,
          className = _c === void 0 ? '' : _c,
          size = _b.size,
          mode = _b.mode,
          restProps = __rest(_b, ["prefixCls", "className", "size", "mode"]);

      var cls = (0, _classnames.default)((_a = {}, _a[prefixCls + "-lg"] = size === 'large', _a[prefixCls + "-sm"] = size === 'small', _a), className);
      var optionLabelProp = _this.props.optionLabelProp;

      if (_this.isCombobox()) {
        // children 带 dom 结构时，无法填入输入框
        optionLabelProp = optionLabelProp || 'value';
      }

      var modeConfig = {
        multiple: mode === 'multiple',
        tags: mode === 'tags',
        combobox: _this.isCombobox()
      };
      return React.createElement(_index.default, __assign({}, restProps, modeConfig, {
        prefixCls: prefixCls,
        className: cls,
        optionLabelProp: optionLabelProp || 'children',
        notFoundContent: _this.getNotFoundContent(locale),
        ref: _this.saveSelect
      }));
    };

    (0, _warning.default)(props.mode !== 'combobox', 'The combobox mode of Select is deprecated,' + 'it will be removed in next major version,' + 'please use AutoComplete instead');
    return _this;
  }

  Select.prototype.focus = function () {
    this.rcSelect.focus();
  };

  Select.prototype.blur = function () {
    this.rcSelect.blur();
  };

  Select.prototype.getNotFoundContent = function (locale) {
    var notFoundContent = this.props.notFoundContent;

    if (this.isCombobox()) {
      // AutoComplete don't have notFoundContent defaultly
      return notFoundContent === undefined ? null : notFoundContent;
    }

    return notFoundContent === undefined ? locale.notFoundContent : notFoundContent;
  };

  Select.prototype.isCombobox = function () {
    var mode = this.props.mode;
    return mode === 'combobox' || mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;
  };

  Select.prototype.render = function () {
    return this.renderSelect({
      notFoundContent: '无匹配结果'
    });
  };

  Select.Option = _index.Option;
  Select.OptGroup = _index.OptGroup;
  Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
  Select.defaultProps = {
    prefixCls: 'fishd-autocomplete-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom'
  };
  Select.propTypes = SelectPropTypes;
  return Select;
}(React.Component);

var _default = Select;
exports.default = _default;