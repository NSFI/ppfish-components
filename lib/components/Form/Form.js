"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _createDOMForm = _interopRequireDefault(require("./RcForm/createDOMForm"));

var _createFormField = _interopRequireDefault(require("./RcForm/createFormField"));

var _omit = _interopRequireDefault(require("omit.js"));

var _FormItem = _interopRequireDefault(require("./FormItem"));

var _constants = require("./constants");

require("./style/index.less");

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

var Form =
/** @class */
function (_super) {
  __extends(Form, _super);

  function Form(props) {
    return _super.call(this, props) || this;
  }

  Form.prototype.getChildContext = function () {
    var layout = this.props.layout;
    return {
      vertical: layout === 'vertical'
    };
  };

  Form.prototype.render = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        hideRequiredMark = _b.hideRequiredMark,
        _c = _b.className,
        className = _c === void 0 ? '' : _c,
        layout = _b.layout;
    var formClassName = (0, _classnames.default)(prefixCls, (_a = {}, _a[prefixCls + "-horizontal"] = layout === 'horizontal', _a[prefixCls + "-vertical"] = layout === 'vertical', _a[prefixCls + "-inline"] = layout === 'inline', _a[prefixCls + "-hide-required-mark"] = hideRequiredMark, _a), className);
    var formProps = (0, _omit.default)(this.props, ['prefixCls', 'className', 'layout', 'form', 'hideRequiredMark']);
    return React.createElement("form", __assign({}, formProps, {
      className: formClassName
    }));
  };

  Form.defaultProps = {
    prefixCls: 'fishd-form',
    layout: 'horizontal',
    hideRequiredMark: false,
    onSubmit: function onSubmit(e) {
      e.preventDefault();
    }
  };
  Form.propTypes = {
    prefixCls: _propTypes.default.string,
    layout: _propTypes.default.oneOf(['horizontal', 'inline', 'vertical']),
    children: _propTypes.default.any,
    onSubmit: _propTypes.default.func,
    hideRequiredMark: _propTypes.default.bool
  };
  Form.childContextTypes = {
    vertical: _propTypes.default.bool
  };
  Form.Item = _FormItem.default;
  Form.createFormField = _createFormField.default;

  Form.create = function (options) {
    if (options === void 0) {
      options = {};
    }

    return (0, _createDOMForm.default)(__assign(__assign({
      fieldNameProp: 'id'
    }, options), {
      fieldMetaProp: _constants.FIELD_META_PROP,
      fieldDataProp: _constants.FIELD_DATA_PROP
    }));
  };

  return Form;
}(React.Component);

var _default = Form;
exports.default = _default;