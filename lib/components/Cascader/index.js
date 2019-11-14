"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _src = _interopRequireDefault(require("./src"));

var _arrayTreeFilter = _interopRequireDefault(require("array-tree-filter"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _warning = _interopRequireDefault(require("warning"));

var _utils = require("../../utils");

var _Input = _interopRequireDefault(require("../Input"));

var _Icon = _interopRequireDefault(require("../Icon"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

// We limit the filtered item count by default
var defaultLimit = 50; //搜索项高亮-String类型支持

function highlightKeyword(str, keyword, prefixCls) {
  return str.split(keyword).map(function (node, index) {
    return index === 0 ? node : [React.createElement("span", {
      className: prefixCls + "-menu-item-keyword",
      key: "seperator"
    }, keyword), node];
  });
} //默认filterOption


function defaultFilterOption(inputValue, path, names) {
  return path.some(function (option) {
    return option[names.label].indexOf(inputValue) > -1;
  });
} //默认的搜索后的option渲染方法


function defaultRenderFilteredOption(inputValue, path, prefixCls, names) {
  return path.map(function (option, index) {
    var label = option[names.label];
    var node = label.indexOf(inputValue) > -1 ? highlightKeyword(label, inputValue, prefixCls) : label;
    return index === 0 ? node : [' / ', node];
  });
} //默认搜索后的option排序方案


function defaultSortFilteredOption(a, b, inputValue, names) {
  function callback(elem) {
    return elem[names.label].indexOf(inputValue) > -1;
  }

  return a.findIndex(callback) - b.findIndex(callback);
} //自定义option参数的名字


function getFilledFieldNames(props) {
  var fieldNames = props.fieldNames || {};
  var names = {
    children: fieldNames.children || 'children',
    label: fieldNames.label || 'label',
    value: fieldNames.value || 'value'
  };
  return names;
}

function flattenTree(options, props, ancestor) {
  if (ancestor === void 0) {
    ancestor = [];
  }

  var names = getFilledFieldNames(props);
  var flattenOptions = [];
  var childrenName = names.children;
  options.forEach(function (option) {
    var path = ancestor.concat(option);

    if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
      flattenOptions.push(path);
    }

    if (option[childrenName]) {
      flattenOptions = flattenOptions.concat(flattenTree(option[childrenName], props, path));
    }
  });
  return flattenOptions;
}

var defaultDisplayRender = function defaultDisplayRender(label) {
  return label.join(' / ');
};

var Cascader =
/** @class */
function (_super) {
  __extends(Cascader, _super);

  function Cascader(props) {
    var _this = _super.call(this, props) || this;

    _this.handleChange = function (value, selectedOptions) {
      _this.setState({
        inputValue: ''
      });

      if (selectedOptions[0].__IS_FILTERED_OPTION) {
        var unwrappedValue = value[0];
        var unwrappedSelectedOptions = selectedOptions[0].path;

        _this.setValue(unwrappedValue, unwrappedSelectedOptions);

        return;
      }

      _this.setValue(value, selectedOptions);
    };

    _this.handlePopupVisibleChange = function (popupVisible) {
      if (!('popupVisible' in _this.props)) {
        _this.setState({
          popupVisible: popupVisible,
          inputFocused: popupVisible,
          inputValue: popupVisible ? _this.state.inputValue : ''
        });
      }

      var onVisibleChange = _this.props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(popupVisible);
      }
    };

    _this.handleInputBlur = function () {
      _this.setState({
        inputFocused: false
      });
    };

    _this.handleInputClick = function (e) {
      var _a = _this.state,
          inputFocused = _a.inputFocused,
          popupVisible = _a.popupVisible; // Prevent `Trigger` behaviour.

      if (inputFocused || popupVisible) {
        e.stopPropagation();

        if (e.nativeEvent.stopImmediatePropagation) {
          e.nativeEvent.stopImmediatePropagation();
        }
      }
    };

    _this.handleKeyDown = function (e) {
      if (e.keyCode === _utils.KeyCode.BACKSPACE) {
        e.stopPropagation();
      }
    };

    _this.handleInputChange = function (e) {
      var inputValue = e.target.value;

      _this.setState({
        inputValue: inputValue
      });
    };

    _this.setValue = function (value, selectedOptions) {
      if (selectedOptions === void 0) {
        selectedOptions = [];
      }

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value, selectedOptions);
      }
    };

    _this.clearSelection = function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!_this.state.inputValue) {
        _this.setValue([]);

        _this.handlePopupVisibleChange(false);
      } else {
        _this.setState({
          inputValue: ''
        });
      }
    };

    _this.saveInput = function (node) {
      _this.input = node;
    };

    _this.state = {
      value: props.value || props.defaultValue || [],
      inputValue: '',
      inputFocused: false,
      popupVisible: props.popupVisible,
      flattenOptions: props.showSearch ? flattenTree(props.options, props) : undefined,
      prevProps: props
    };
    return _this;
  }

  Cascader.getDerivedStateFromProps = function (nextProps, _a) {
    var prevProps = _a.prevProps;
    var newState = {
      prevProps: nextProps
    };

    if ('value' in nextProps) {
      newState.value = nextProps.value || [];
    }

    if ('popupVisible' in nextProps) {
      newState.popupVisible = nextProps.popupVisible;
    }

    if (nextProps.showSearch && prevProps.options !== nextProps.options) {
      newState.flattenOptions = flattenTree(nextProps.options, nextProps);
    }

    return newState;
  };

  Cascader.prototype.getLabel = function () {
    var _a = this.props,
        options = _a.options,
        _b = _a.displayRender,
        displayRender = _b === void 0 ? defaultDisplayRender : _b;
    var names = getFilledFieldNames(this.props);
    var value = this.state.value;
    var unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
    var selectedOptions = (0, _arrayTreeFilter["default"])(options, function (o, level) {
      return o[names.value] === unwrappedValue[level];
    });
    var label = selectedOptions.map(function (o) {
      return o[names.label];
    });
    return displayRender(label, selectedOptions);
  };

  Cascader.prototype.generateFilteredOptions = function (prefixCls) {
    var _a;

    var _this = this;

    var _b = this.props,
        showSearch = _b.showSearch,
        notFoundContent = _b.notFoundContent;
    var names = getFilledFieldNames(this.props);
    var _c = showSearch,
        _d = _c.filter,
        filter = _d === void 0 ? defaultFilterOption : _d,
        _e = _c.render,
        render = _e === void 0 ? defaultRenderFilteredOption : _e,
        _f = _c.sort,
        sort = _f === void 0 ? defaultSortFilteredOption : _f,
        _g = _c.limit,
        limit = _g === void 0 ? defaultLimit : _g;
    var _h = this.state,
        _j = _h.flattenOptions,
        flattenOptions = _j === void 0 ? [] : _j,
        inputValue = _h.inputValue; // Limit the filter if needed

    var filtered;

    if (limit > 0) {
      filtered = [];
      var matchCount_1 = 0; // Perf optimization to filter items only below the limit

      flattenOptions.some(function (path) {
        var match = filter(_this.state.inputValue, path, names);

        if (match) {
          filtered.push(path);
          matchCount_1 += 1;
        }

        return matchCount_1 >= limit;
      });
    } else {
      (0, _warning["default"])(typeof limit !== 'number', "'limit' of showSearch in Cascader should be positive number or false.");
      filtered = flattenOptions.filter(function (path) {
        return filter(_this.state.inputValue, path, names);
      });
    }

    filtered.sort(function (a, b) {
      return sort(a, b, inputValue, names);
    });

    if (filtered.length > 0) {
      return filtered.map(function (path) {
        var _a;

        return _a = {
          __IS_FILTERED_OPTION: true,
          path: path
        }, _a[names.label] = render(inputValue, path, prefixCls, names), _a[names.value] = path.map(function (o) {
          return o[names.value];
        }), _a.disabled = path.some(function (o) {
          return !!o.disabled;
        }), _a;
      });
    }

    return [(_a = {}, _a[names.label] = notFoundContent, _a[names.value] = 'FISHD_CASCADER_NOT_FOUND', _a.disabled = true, _a)];
  };

  Cascader.prototype.focus = function () {
    this.input.focus();
  };

  Cascader.prototype.blur = function () {
    this.input.blur();
  };

  Cascader.prototype.render = function () {
    var _a, _b, _c;

    var _d = this,
        props = _d.props,
        state = _d.state;

    var prefixCls = props.prefixCls,
        inputPrefixCls = props.inputPrefixCls,
        children = props.children,
        placeholder = props.placeholder,
        size = props.size,
        disabled = props.disabled,
        className = props.className,
        style = props.style,
        allowClear = props.allowClear,
        _e = props.showSearch,
        showSearch = _e === void 0 ? false : _e,
        otherProps = __rest(props, ["prefixCls", "inputPrefixCls", "children", "placeholder", "size", "disabled", "className", "style", "allowClear", "showSearch"]);

    var value = state.value,
        inputFocused = state.inputFocused;
    var sizeCls = (0, _classnames["default"])((_a = {}, _a[inputPrefixCls + "-lg"] = size === 'large', _a[inputPrefixCls + "-sm"] = size === 'small', _a));
    var clearIcon = allowClear && !disabled && value.length > 0 || state.inputValue ? React.createElement(_Icon["default"], {
      type: "close-circle-fill",
      className: prefixCls + "-picker-clear",
      onClick: this.clearSelection
    }) : null;
    var arrowCls = (0, _classnames["default"])((_b = {}, _b[prefixCls + "-picker-arrow"] = true, _b[prefixCls + "-picker-arrow-expand"] = state.popupVisible, _b));
    var pickerCls = (0, _classnames["default"])(className, prefixCls + "-picker", (_c = {}, _c[prefixCls + "-picker-with-value"] = state.inputValue, _c[prefixCls + "-picker-disabled"] = disabled, _c[prefixCls + "-picker-" + size] = !!size, _c[prefixCls + "-picker-show-search"] = !!showSearch, _c[prefixCls + "-picker-focused"] = inputFocused, _c)); // Fix bug of https://github.com/facebook/react/pull/5004
    // and https://fb.me/react-unknown-prop

    var inputProps = (0, _omit["default"])(otherProps, ['onChange', 'options', 'popupPlacement', 'transitionName', 'displayRender', 'onVisibleChange', 'changeOnSelect', 'expandTrigger', 'popupVisible', 'getPopupContainer', 'loadData', 'popupClassName', 'filterOption', 'renderFilteredOption', 'sortFilteredOption', 'notFoundContent', 'fieldNames', 'esc']);
    var options = props.options;

    if (state.inputValue) {
      options = this.generateFilteredOptions(prefixCls);
    } // Dropdown menu should keep previous status until it is fully closed.


    if (!state.popupVisible) {
      options = this.cachedOptions;
    } else {
      this.cachedOptions = options;
    }

    var dropdownMenuColumnStyle = {};
    var isNotFound = (options || []).length === 1 && options[0].value === 'FISHD_CASCADER_NOT_FOUND';

    if (isNotFound) {
      dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
    } // The default value of `matchInputWidth` is `true`


    var resultListMatchInputWidth = showSearch.matchInputWidth === false ? false : true;

    if (resultListMatchInputWidth && state.inputValue && this.input) {
      dropdownMenuColumnStyle.width = this.input.input.offsetWidth;
    }

    var label = this.getLabel();
    var input = children || React.createElement("span", {
      style: style,
      className: pickerCls
    }, React.createElement("span", {
      className: prefixCls + "-picker-label",
      title: typeof label === 'string' ? label : ''
    }, label), React.createElement(_Input["default"], __assign({}, inputProps, {
      ref: this.saveInput,
      prefixCls: inputPrefixCls,
      placeholder: value && value.length > 0 ? undefined : placeholder,
      className: prefixCls + "-input " + sizeCls,
      value: state.inputValue,
      disabled: disabled,
      readOnly: !showSearch,
      autoComplete: "off",
      onClick: showSearch ? this.handleInputClick : undefined,
      onBlur: showSearch ? this.handleInputBlur : undefined,
      onKeyDown: this.handleKeyDown,
      onChange: showSearch ? this.handleInputChange : undefined
    })), clearIcon, React.createElement(_Icon["default"], {
      type: "down-fill",
      className: arrowCls
    }));
    return React.createElement(_src["default"], __assign({}, props, {
      options: options,
      value: value,
      popupVisible: state.popupVisible,
      onPopupVisibleChange: this.handlePopupVisibleChange,
      onChange: this.handleChange,
      dropdownMenuColumnStyle: dropdownMenuColumnStyle
    }), input);
  };

  Cascader.defaultProps = {
    prefixCls: 'fishd-cascader',
    inputPrefixCls: 'fishd-input',
    placeholder: '请选择',
    transitionName: 'slide-up',
    popupPlacement: 'bottomLeft',
    options: [],
    disabled: false,
    allowClear: true,
    notFoundContent: '无匹配结果'
  };
  return Cascader;
}(React.Component);

(0, _reactLifecyclesCompat.polyfill)(Cascader);
var _default = Cascader;
exports["default"] = _default;