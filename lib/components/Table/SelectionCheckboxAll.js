"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _Dropdown = _interopRequireDefault(require("../Dropdown"));

var _Menu = _interopRequireDefault(require("../Menu"));

var _Icon = _interopRequireDefault(require("../Icon"));

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

function checkSelection(props, data, type, byDefaultChecked) {
  var store = props.store,
      getCheckboxPropsByItem = props.getCheckboxPropsByItem,
      getRecordKey = props.getRecordKey; // type should be 'every' | 'some'

  if (type === 'every' || type === 'some') {
    return byDefaultChecked ? data[type](function (item, i) {
      return getCheckboxPropsByItem(item, i).defaultChecked;
    }) : data[type](function (item, i) {
      return store.getState().selectedRowKeys.indexOf(getRecordKey(item, i)) >= 0;
    });
  }

  return false;
}

function getCheckState(props) {
  var store = props.store,
      data = props.data;
  var checked;

  if (!data.length) {
    checked = false;
  } else {
    checked = store.getState().selectionDirty ? checkSelection(props, data, 'every', false) : checkSelection(props, data, 'every', false) || checkSelection(props, data, 'every', true);
  }

  return checked;
}

function getIndeterminateState(props) {
  var store = props.store,
      data = props.data;
  var indeterminate;

  if (!data.length) {
    indeterminate = false;
  } else {
    indeterminate = store.getState().selectionDirty ? checkSelection(props, data, 'some', false) && !checkSelection(props, data, 'every', false) : checkSelection(props, data, 'some', false) && !checkSelection(props, data, 'every', false) || checkSelection(props, data, 'some', true) && !checkSelection(props, data, 'every', true);
  }

  return indeterminate;
}

function getCheckAndIndeterminateState(props, state) {
  var checked = getCheckState(props);
  var indeterminate = getIndeterminateState(props);
  var newState = {};

  if (indeterminate !== state.indeterminate) {
    newState.indeterminate = indeterminate;
  }

  if (checked !== state.checked) {
    newState.checked = checked;
  }

  return newState;
}

var SelectionCheckboxAll =
/** @class */
function (_super) {
  __extends(SelectionCheckboxAll, _super);

  function SelectionCheckboxAll(props) {
    var _this = _super.call(this, props) || this;

    _this.handleSelectAllChange = function (e) {
      var checked = e.target.checked;

      _this.props.onSelect(checked ? 'all' : 'removeAll', 0, null);
    };

    _this.defaultSelections = props.hideDefaultSelections ? [] : [{
      key: 'all',
      text: props.locale.selectAll,
      onSelect: function onSelect() {}
    }, {
      key: 'invert',
      text: props.locale.selectInvert,
      onSelect: function onSelect() {}
    }];
    _this.state = {
      checked: getCheckState(props),
      indeterminate: getIndeterminateState(props)
    };
    return _this;
  }

  SelectionCheckboxAll.getDerivedStateFromProps = function (nextProps, prevState) {
    return getCheckAndIndeterminateState(nextProps, prevState);
  };

  ;

  SelectionCheckboxAll.prototype.componentDidMount = function () {
    this.subscribe();
  };

  SelectionCheckboxAll.prototype.componentWillUnmount = function () {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  SelectionCheckboxAll.prototype.subscribe = function () {
    var _this = this;

    var store = this.props.store;
    this.unsubscribe = store.subscribe(function () {
      _this.setState(getCheckAndIndeterminateState(_this.props, _this.state));
    });
  };

  SelectionCheckboxAll.prototype.renderMenus = function (selections) {
    var _this = this;

    return selections.map(function (selection, index) {
      return React.createElement(_Menu["default"].Item, {
        key: selection.key || index
      }, React.createElement("div", {
        onClick: function onClick() {
          _this.props.onSelect(selection.key, index, selection.onSelect);
        }
      }, selection.text));
    });
  };

  SelectionCheckboxAll.prototype.render = function () {
    var _a;

    var _b = this.props,
        disabled = _b.disabled,
        prefixCls = _b.prefixCls,
        selections = _b.selections,
        getPopupContainer = _b.getPopupContainer;
    var _c = this.state,
        checked = _c.checked,
        indeterminate = _c.indeterminate;
    var selectionPrefixCls = prefixCls + "-selection";
    var customSelections = null;

    if (selections) {
      var newSelections = Array.isArray(selections) ? this.defaultSelections.concat(selections) : this.defaultSelections;
      var menu = React.createElement(_Menu["default"], {
        className: selectionPrefixCls + "-menu",
        selectedKeys: []
      }, this.renderMenus(newSelections));
      customSelections = newSelections.length > 0 ? React.createElement(_Dropdown["default"], {
        overlay: menu,
        getPopupContainer: getPopupContainer
      }, React.createElement("div", {
        className: selectionPrefixCls + "-down"
      }, React.createElement(_Icon["default"], {
        type: "down-bolder"
      }))) : null;
    }

    return React.createElement("div", {
      className: selectionPrefixCls
    }, React.createElement(_Checkbox["default"], {
      className: (0, _classnames["default"])((_a = {}, _a[selectionPrefixCls + "-select-all-custom"] = customSelections, _a)),
      checked: checked,
      indeterminate: indeterminate,
      disabled: disabled,
      onChange: this.handleSelectAllChange
    }), customSelections);
  };

  return SelectionCheckboxAll;
}(React.Component);

(0, _reactLifecyclesCompat.polyfill)(SelectionCheckboxAll);
var _default = SelectionCheckboxAll;
exports["default"] = _default;