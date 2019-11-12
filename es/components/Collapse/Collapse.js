"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.fill");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _Panel = _interopRequireDefault(require("./Panel"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function toArray(activeKey) {
  var currentActiveKey = activeKey;

  if (!Array.isArray(currentActiveKey)) {
    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
  }

  return currentActiveKey;
}

var Collapse =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Collapse, _Component);

  Collapse.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var _prevState$prevProps = prevState.prevProps,
        prevProps = _prevState$prevProps === void 0 ? {} : _prevState$prevProps;
    var newState = {
      prevProps: nextProps
    };

    if ('activeKey' in nextProps) {
      newState.activeKey = toArray(nextProps.activeKey);
    }

    if (nextProps.statusList !== prevProps.statusList) {
      newState.statusList = nextProps.statusList;
    }

    return newState;
  };

  function Collapse(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    var activeKey = props.activeKey,
        defaultActiveKey = props.defaultActiveKey,
        statusList = props.statusList;
    var currentActiveKey = defaultActiveKey;

    if ("activeKey" in props) {
      currentActiveKey = activeKey;
    }

    _this.state = {
      // 已激活面板的key
      activeKey: toArray(currentActiveKey),
      statusList: statusList || new Array(_this.props.children.length).fill(true),
      prevProps: props
    }; // 当前点击的key

    _this.currentKey = null;
    return _this;
  }

  var _proto = Collapse.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    this.scrollToHeader();
  };

  _proto.onClickItem = function onClickItem(key) {
    var _this2 = this;

    return function () {
      var activeKey = _this2.state.activeKey; // 手风琴效果,只展开一项,收起其他项

      if (_this2.props.accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [].concat(activeKey);
        var index = activeKey.indexOf(key);
        var isActive = index > -1;

        if (isActive) {
          // remove active state
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      } // 当前点击的key


      _this2.currentKey = key;

      _this2.setActiveKey(activeKey);
    };
  };

  _proto.onCloseItem = function onCloseItem(key) {
    var _this3 = this;

    return function () {
      var _this3$props = _this3.props,
          children = _this3$props.children,
          statusList = _this3$props.statusList;

      var keyList = _react.Children.map(children, function (child, index) {
        return child.key || String(index);
      });

      var index = keyList.findIndex(function (item) {
        return key == item;
      });
      statusList[index] = false;

      _this3.props.close(statusList);
    };
  };

  _proto.getItems = function getItems() {
    var _this4 = this;

    var activeKey = this.state.activeKey;
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        accordion = _this$props.accordion,
        showClose = _this$props.showClose;
    return _react.Children.map(this.props.children, function (child, index) {
      if (!_this4.state.statusList[index]) {
        return null;
      } // If there is no key provide, use the panel order as default key


      var key = child.key || String(index);
      var header = child.props.header;
      var isActive = false;

      if (accordion) {
        isActive = activeKey[0] === key;
      } else {
        isActive = activeKey.indexOf(key) > -1;
      }

      var props = {
        itemKey: function itemKey(el) {
          return _this4[key] = el;
        },
        header: header,
        showClose: showClose,
        isActive: isActive,
        prefixCls: prefixCls,
        children: child.props.children,
        onItemClick: _this4.onClickItem(key).bind(_this4),
        onCloseItem: _this4.onCloseItem(key).bind(_this4)
      };
      return _react.default.cloneElement(child, props);
    });
  };

  _proto.setActiveKey = function setActiveKey(activeKey) {
    if (!("activeKey" in this.props)) {
      this.setState({
        activeKey: activeKey
      });
    }

    this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
  };

  _proto.scrollToHeader = function scrollToHeader() {
    var activeKey = this.state.activeKey;
    var isScrollToHeader = this.props.isScrollToHeader;
    var currentKey = this.currentKey;
    var collapse = this.collapse;

    if (!isScrollToHeader || !currentKey || !activeKey.includes(currentKey)) {
      return;
    }

    var el = this[currentKey];
    var collapseRect = collapse && collapse.getBoundingClientRect();
    var elRect = el && el.getBoundingClientRect();
    var diff = collapse.scrollHeight - collapse.clientHeight;

    if (collapseRect && elRect) {
      var toTop = collapse.scrollTop + elRect.top - collapseRect.top;

      if (toTop < diff) {
        collapse.scrollTop = toTop;
      }
    }

    this.currentKey = null;
  };

  _proto.render = function render() {
    var _this5 = this;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        isScrollToHeader = _this$props2.isScrollToHeader,
        bordered = _this$props2.bordered;
    var clsObj = {};
    var style = null;
    clsObj[prefixCls] = true;

    if (className) {
      clsObj[className] = true;
    }

    if (!bordered) {
      clsObj[prefixCls + "-borderless"] = true;
    }

    if (isScrollToHeader) {
      style = {
        overflowY: "auto",
        overflowX: "hidden"
      };
    }

    return _react.default.createElement("div", {
      className: (0, _classnames.default)(clsObj),
      ref: function ref(node) {
        return _this5.collapse = node;
      },
      style: style
    }, this.getItems());
  };

  return Collapse;
}(_react.Component);

_defineProperty(Collapse, "propTypes", {
  children: _propTypes.default.node,
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  defaultActiveKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  activeKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  // 是否开启功能：点击header后将header置顶
  isScrollToHeader: _propTypes.default.bool,
  // 是否开启功能：手风琴效果，既每次点击header只展开一项
  accordion: _propTypes.default.bool,
  // 是否开启删除功能
  showClose: _propTypes.default.bool,
  // 是否显示边框
  bordered: _propTypes.default.bool,
  // 是否显示面板的状态数组
  statusList: _propTypes.default.array,
  onChange: _propTypes.default.func,
  close: _propTypes.default.func
});

_defineProperty(Collapse, "defaultProps", {
  prefixCls: "fishd-collapse",
  isScrollToHeader: false,
  accordion: false,
  showClose: false,
  bordered: true,
  onChange: function onChange() {},
  close: function close() {}
});

_defineProperty(Collapse, "Panel", _Panel.default);

(0, _reactLifecyclesCompat.polyfill)(Collapse);
var _default = Collapse;
exports.default = _default;