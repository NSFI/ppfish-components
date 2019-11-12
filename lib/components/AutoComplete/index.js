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

var _index = require("./src/index.js");

var _Select = _interopRequireDefault(require("./Select"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Input = _interopRequireDefault(require("../Input"));

var _InputElement = _interopRequireDefault(require("./InputElement"));

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

function isSelectOptionOrSelectOptGroup(child) {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

var AutoComplete =
/** @class */
function (_super) {
  __extends(AutoComplete, _super);

  function AutoComplete() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.getInputElement = function () {
      var children = _this.props.children;
      var element = children && React.isValidElement(children) && children.type !== _index.Option ? React.Children.only(_this.props.children) : React.createElement(_Input.default, null);

      var elementProps = __assign({}, element.props); // https://github.com/ant-design/ant-design/pull/7742


      delete elementProps.children;
      return React.createElement(_InputElement.default, __assign({}, elementProps), element);
    };

    _this.saveSelect = function (node) {
      _this.select = node;
    };

    return _this;
  }

  AutoComplete.prototype.focus = function () {
    this.select.focus();
  };

  AutoComplete.prototype.blur = function () {
    this.select.blur();
  };

  AutoComplete.prototype.render = function () {
    var _a;

    var _b = this.props,
        size = _b.size,
        _c = _b.className,
        className = _c === void 0 ? '' : _c,
        notFoundContent = _b.notFoundContent,
        prefixCls = _b.prefixCls,
        optionLabelProp = _b.optionLabelProp,
        dataSource = _b.dataSource,
        children = _b.children,
        highlightSelected = _b.highlightSelected;
    var cls = (0, _classnames.default)((_a = {}, _a[prefixCls + "-lg"] = size === 'large', _a[prefixCls + "-sm"] = size === 'small', _a[className] = !!className, _a[prefixCls + "-show-search"] = true, _a[prefixCls + "-auto-complete"] = true, _a));
    var options;
    var childArray = React.Children.toArray(children);

    if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
      options = children;
    } else {
      options = dataSource ? dataSource.map(function (item) {
        if (React.isValidElement(item)) {
          return item;
        }

        switch (typeof item) {
          case 'string':
            return React.createElement(_index.Option, {
              key: item
            }, item);

          case 'object':
            return React.createElement(_index.Option, {
              key: item.value
            }, item.text);

          default:
            throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
        }
      }) : [];
    }

    return React.createElement(_Select.default, __assign({}, this.props, {
      className: cls,
      dropdownClassName: highlightSelected ? null : prefixCls + "-nohighlight",
      mode: _Select.default.SECRET_COMBOBOX_MODE_DO_NOT_USE,
      optionLabelProp: optionLabelProp,
      getInputElement: this.getInputElement,
      notFoundContent: notFoundContent,
      ref: this.saveSelect
    }), options);
  };

  AutoComplete.Option = _index.Option;
  AutoComplete.OptGroup = _index.OptGroup;
  AutoComplete.defaultProps = {
    prefixCls: 'fishd-autocomplete-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
    filterOption: false,
    highlightSelected: true
  };
  return AutoComplete;
}(React.Component);

var _default = AutoComplete;
exports.default = _default;