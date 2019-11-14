function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';
import Options from './Options';
import KEYCODE from './KeyCode';
import LOCALE from './locale/zh_CN';
import { polyfill } from 'react-lifecycles-compat';

function noop() {}

function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

function defaultItemRender(page, type, element) {
  return element;
}

function calculatePage(p, state, props) {
  var pageSize = p;

  if (typeof pageSize === 'undefined') {
    pageSize = state.pageSize;
  }

  return Math.floor((props.total - 1) / pageSize) + 1;
}

var Pagination =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Pagination, _React$Component);

  _createClass(Pagination, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, prevState) {
      var newState = {};

      if ('current' in props) {
        newState.current = props.current;

        if (props.current !== prevState.current) {
          newState.currentInputValue = newState.current;
        }
      }

      if ('pageSize' in props && props.pageSize !== prevState.pageSize) {
        var current = prevState.current;
        var newCurrent = calculatePage(props.pageSize, prevState, props);
        current = current > newCurrent ? newCurrent : current;

        if (!('current' in props)) {
          newState.current = current;
          newState.currentInputValue = current;
        }

        newState.pageSize = props.pageSize;
      }

      return newState;
    }
  }]);

  function Pagination(props) {
    var _this;

    _classCallCheck(this, Pagination);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pagination).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "savePaginationNode", function (node) {
      _this.paginationNode = node;
    });

    _defineProperty(_assertThisInitialized(_this), "isValid", function (page) {
      return isInteger(page) && page >= 1 && page !== _this.state.current;
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyUp", function (e) {
      var inputValue = e.target.value;
      var currentInputValue = _this.state.currentInputValue;
      var value;

      if (inputValue === '') {
        value = inputValue;
      } else if (isNaN(Number(inputValue))) {
        value = currentInputValue;
      } else {
        value = Number(inputValue);
      }

      if (value !== currentInputValue) {
        _this.setState({
          currentInputValue: value
        });
      }

      if (e.keyCode === KEYCODE.ENTER) {
        _this.handleChange(value);
      } else if (e.keyCode === KEYCODE.ARROW_UP) {
        _this.handleChange(value - 1);
      } else if (e.keyCode === KEYCODE.ARROW_DOWN) {
        _this.handleChange(value + 1);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changePageSize", function (size) {
      var current = _this.state.current;
      var newCurrent = calculatePage(size, _this.state, _this.props);
      current = current > newCurrent ? newCurrent : current; // fix the issue:
      // Once 'total' is 0, 'current' in 'onShowSizeChange' is 0, which is not correct.

      if (newCurrent === 0) {
        current = _this.state.current;
      }

      if (typeof size === 'number') {
        if (!('pageSize' in _this.props)) {
          _this.setState({
            pageSize: size
          });
        }

        if (!('current' in _this.props)) {
          _this.setState({
            current: current,
            currentInputValue: current
          });
        }
      }

      _this.props.onShowSizeChange(current, size);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (p) {
      var page = p;

      if (_this.isValid(page)) {
        var currentPage = calculatePage(undefined, _this.state, _this.props);

        if (page > currentPage) {
          page = currentPage;
        }

        if (!('current' in _this.props)) {
          _this.setState({
            current: page,
            currentInputValue: page
          });
        }

        var pageSize = _this.state.pageSize;

        _this.props.onChange(page, pageSize);

        return page;
      }

      return _this.state.current;
    });

    _defineProperty(_assertThisInitialized(_this), "prev", function () {
      if (_this.hasPrev()) {
        _this.handleChange(_this.state.current - 1);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "next", function () {
      if (_this.hasNext()) {
        _this.handleChange(_this.state.current + 1);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "jumpPrev", function () {
      _this.handleChange(_this.getJumpPrevPage());
    });

    _defineProperty(_assertThisInitialized(_this), "jumpNext", function () {
      _this.handleChange(_this.getJumpNextPage());
    });

    _defineProperty(_assertThisInitialized(_this), "hasPrev", function () {
      return _this.state.current > 1;
    });

    _defineProperty(_assertThisInitialized(_this), "hasNext", function () {
      return _this.state.current < calculatePage(undefined, _this.state, _this.props);
    });

    _defineProperty(_assertThisInitialized(_this), "runIfEnter", function (event, callback) {
      if (event.key === 'Enter' || event.charCode === 13) {
        for (var _len = arguments.length, restParams = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          restParams[_key - 2] = arguments[_key];
        }

        callback.apply(void 0, restParams);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "runIfEnterPrev", function (e) {
      _this.runIfEnter(e, _this.prev);
    });

    _defineProperty(_assertThisInitialized(_this), "runIfEnterNext", function (e) {
      _this.runIfEnter(e, _this.next);
    });

    _defineProperty(_assertThisInitialized(_this), "runIfEnterJumpPrev", function (e) {
      _this.runIfEnter(e, _this.jumpPrev);
    });

    _defineProperty(_assertThisInitialized(_this), "runIfEnterJumpNext", function (e) {
      _this.runIfEnter(e, _this.jumpNext);
    });

    _defineProperty(_assertThisInitialized(_this), "handleGoTO", function (e) {
      if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
        _this.handleChange(_this.state.currentInputValue);
      }
    });

    var hasOnChange = props.onChange !== noop;
    var hasCurrent = 'current' in props;

    if (hasCurrent && !hasOnChange) {
      console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.'); // eslint-disable-line
    }

    var _current = props.defaultCurrent;

    if ('current' in props) {
      _current = props.current;
    }

    var _pageSize = props.defaultPageSize;

    if ('pageSize' in props) {
      _pageSize = props.pageSize;
    }

    _this.state = {
      current: _current,
      currentInputValue: _current,
      pageSize: _pageSize
    };
    return _this;
  }

  _createClass(Pagination, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // When current page change, fix focused style of prev item
      // A hacky solution of https://github.com/ant-design/ant-design/issues/8948
      var prefixCls = this.props.prefixCls;

      if (prevState.current !== this.state.current && this.paginationNode) {
        var lastCurrentNode = this.paginationNode.querySelector(".".concat(prefixCls, "-item-").concat(prevState.current));

        if (lastCurrentNode && document.activeElement === lastCurrentNode) {
          lastCurrentNode.blur();
        }
      }
    }
  }, {
    key: "getJumpPrevPage",
    value: function getJumpPrevPage() {
      return Math.max(1, this.state.current - (this.props.showLessItems ? 3 : 5));
    }
  }, {
    key: "getJumpNextPage",
    value: function getJumpNextPage() {
      return Math.min(calculatePage(undefined, this.state, this.props), this.state.current + (this.props.showLessItems ? 3 : 5));
    }
  }, {
    key: "render",
    value: function render() {
      // When hideOnSinglePage is true and there is only 1 page, hide the pager
      if (this.props.hideOnSinglePage === true && this.props.total <= this.state.pageSize) {
        return null;
      }

      var props = this.props;
      var locale = props.locale;
      var prefixCls = props.prefixCls;
      var allPages = calculatePage(undefined, this.state, this.props);
      var pagerList = [];
      var jumpPrev = null;
      var jumpNext = null;
      var firstPager = null;
      var lastPager = null;
      var gotoButton = null;
      var goButton = props.showQuickJumper && props.showQuickJumper.goButton;
      var pageBufferSize = props.showLessItems ? 1 : 2;
      var _this$state = this.state,
          current = _this$state.current,
          pageSize = _this$state.pageSize;
      var prevPage = current - 1 > 0 ? current - 1 : 0;
      var nextPage = current + 1 < allPages ? current + 1 : allPages;
      var dataOrAriaAttributeProps = Object.keys(props).reduce(function (prev, key) {
        if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') {
          prev[key] = props[key];
        }

        return prev;
      }, {});

      if (props.simple) {
        if (goButton) {
          if (typeof goButton === 'boolean') {
            gotoButton = React.createElement("button", {
              type: "button",
              onClick: this.handleGoTO,
              onKeyUp: this.handleGoTO
            }, locale.jump_to_confirm);
          } else {
            gotoButton = React.createElement("span", {
              onClick: this.handleGoTO,
              onKeyUp: this.handleGoTO
            }, goButton);
          }

          gotoButton = React.createElement("li", {
            title: props.showTitle ? "".concat(locale.jump_to).concat(this.state.current, "/").concat(allPages) : null,
            className: "".concat(prefixCls, "-simple-pager")
          }, gotoButton);
        }

        return React.createElement("ul", _extends({
          className: "".concat(prefixCls, " ").concat(prefixCls, "-simple ").concat(props.className),
          style: props.style,
          ref: this.savePaginationNode
        }, dataOrAriaAttributeProps), React.createElement("li", {
          title: props.showTitle ? locale.prev_page : null,
          onClick: this.prev,
          tabIndex: this.hasPrev() ? 0 : null,
          onKeyPress: this.runIfEnterPrev,
          className: "".concat(this.hasPrev() ? '' : "".concat(prefixCls, "-disabled"), " ").concat(prefixCls, "-prev"),
          "aria-disabled": !this.hasPrev()
        }, props.itemRender(prevPage, 'prev', React.createElement("a", {
          className: "".concat(prefixCls, "-item-link")
        }))), React.createElement("li", {
          title: props.showTitle ? "".concat(this.state.current, "/").concat(allPages) : null,
          className: "".concat(prefixCls, "-simple-pager")
        }, React.createElement("input", {
          type: "text",
          value: this.state.currentInputValue,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onChange: this.handleKeyUp,
          size: "3"
        }), React.createElement("span", {
          className: "".concat(prefixCls, "-slash")
        }, "\uFF0F"), allPages), React.createElement("li", {
          title: props.showTitle ? locale.next_page : null,
          onClick: this.next,
          tabIndex: this.hasPrev() ? 0 : null,
          onKeyPress: this.runIfEnterNext,
          className: "".concat(this.hasNext() ? '' : "".concat(prefixCls, "-disabled"), " ").concat(prefixCls, "-next"),
          "aria-disabled": !this.hasNext()
        }, props.itemRender(nextPage, 'next', React.createElement("a", {
          className: "".concat(prefixCls, "-item-link")
        }))), gotoButton);
      }

      if (allPages <= 5 + pageBufferSize * 2) {
        for (var i = 1; i <= allPages; i++) {
          var active = this.state.current === i;
          pagerList.push(React.createElement(Pager, {
            locale: locale,
            rootPrefixCls: prefixCls,
            onClick: this.handleChange,
            onKeyPress: this.runIfEnter,
            key: i,
            page: i,
            active: active,
            showTitle: props.showTitle,
            itemRender: props.itemRender
          }));
        }
      } else {
        var prevItemTitle = props.showLessItems ? locale.prev_3 : locale.prev_5;
        var nextItemTitle = props.showLessItems ? locale.next_3 : locale.next_5;

        if (props.showPrevNextJumpers) {
          jumpPrev = React.createElement("li", {
            title: props.showTitle ? prevItemTitle : null,
            key: "prev",
            onClick: this.jumpPrev,
            tabIndex: "0",
            onKeyPress: this.runIfEnterJumpPrev,
            className: "".concat(prefixCls, "-jump-prev")
          }, props.itemRender(this.getJumpPrevPage(), 'jump-prev', React.createElement("a", {
            className: "".concat(prefixCls, "-item-link")
          })));
          jumpNext = React.createElement("li", {
            title: props.showTitle ? nextItemTitle : null,
            key: "next",
            tabIndex: "0",
            onClick: this.jumpNext,
            onKeyPress: this.runIfEnterJumpNext,
            className: "".concat(prefixCls, "-jump-next")
          }, props.itemRender(this.getJumpNextPage(), 'jump-next', React.createElement("a", {
            className: "".concat(prefixCls, "-item-link")
          })));
        }

        lastPager = React.createElement(Pager, {
          locale: props.locale,
          last: true,
          rootPrefixCls: prefixCls,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          key: allPages,
          page: allPages,
          active: false,
          showTitle: props.showTitle,
          itemRender: props.itemRender
        });
        firstPager = React.createElement(Pager, {
          locale: props.locale,
          rootPrefixCls: prefixCls,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          key: 1,
          page: 1,
          active: false,
          showTitle: props.showTitle,
          itemRender: props.itemRender
        });
        var left = Math.max(1, current - pageBufferSize);
        var right = Math.min(current + pageBufferSize, allPages);

        if (current - 1 <= pageBufferSize) {
          right = 1 + pageBufferSize * 2;
        }

        if (allPages - current <= pageBufferSize) {
          left = allPages - pageBufferSize * 2;
        }

        for (var _i = left; _i <= right; _i++) {
          var _active = current === _i;

          pagerList.push(React.createElement(Pager, {
            locale: props.locale,
            rootPrefixCls: prefixCls,
            onClick: this.handleChange,
            onKeyPress: this.runIfEnter,
            key: _i,
            page: _i,
            active: _active,
            showTitle: props.showTitle,
            itemRender: props.itemRender
          }));
        }

        if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
          pagerList[0] = React.cloneElement(pagerList[0], {
            className: "".concat(prefixCls, "-item-after-jump-prev")
          });
          pagerList.unshift(jumpPrev);
        }

        if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
          pagerList[pagerList.length - 1] = React.cloneElement(pagerList[pagerList.length - 1], {
            className: "".concat(prefixCls, "-item-before-jump-next")
          });
          pagerList.push(jumpNext);
        }

        if (left !== 1) {
          pagerList.unshift(firstPager);
        }

        if (right !== allPages) {
          pagerList.push(lastPager);
        }
      }

      var totalText = null;

      if (props.showTotal) {
        totalText = React.createElement("li", {
          className: "".concat(prefixCls, "-total-text")
        }, props.showTotal(props.total, [(current - 1) * pageSize + 1, current * pageSize > props.total ? props.total : current * pageSize]));
      }

      var prevDisabled = !this.hasPrev();
      var nextDisabled = !this.hasNext();
      return React.createElement("ul", _extends({
        className: "".concat(prefixCls, " ").concat(props.className),
        style: props.style,
        unselectable: "unselectable",
        ref: this.savePaginationNode
      }, dataOrAriaAttributeProps), totalText, React.createElement("li", {
        title: props.showTitle ? locale.prev_page : null,
        onClick: this.prev,
        tabIndex: prevDisabled ? null : 0,
        onKeyPress: this.runIfEnterPrev,
        className: "".concat(!prevDisabled ? '' : "".concat(prefixCls, "-disabled"), " ").concat(prefixCls, "-prev"),
        "aria-disabled": prevDisabled
      }, props.itemRender(prevPage, 'prev', React.createElement("a", {
        className: "".concat(prefixCls, "-item-link")
      }))), pagerList, React.createElement("li", {
        title: props.showTitle ? locale.next_page : null,
        onClick: this.next,
        tabIndex: nextDisabled ? null : 0,
        onKeyPress: this.runIfEnterNext,
        className: "".concat(!nextDisabled ? '' : "".concat(prefixCls, "-disabled"), " ").concat(prefixCls, "-next"),
        "aria-disabled": nextDisabled
      }, props.itemRender(nextPage, 'next', React.createElement("a", {
        className: "".concat(prefixCls, "-item-link")
      }))), React.createElement(Options, {
        locale: props.locale,
        rootPrefixCls: prefixCls,
        selectComponentClass: props.selectComponentClass,
        selectPrefixCls: props.selectPrefixCls,
        changeSize: this.props.showSizeChanger ? this.changePageSize : null,
        current: this.state.current,
        pageSize: this.state.pageSize,
        pageSizeOptions: this.props.pageSizeOptions,
        quickGo: this.props.showQuickJumper ? this.handleChange : null,
        goButton: goButton
      }));
    }
  }]);

  return Pagination;
}(React.Component);

_defineProperty(Pagination, "propTypes", {
  prefixCls: PropTypes.string,
  current: PropTypes.number,
  defaultCurrent: PropTypes.number,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  defaultPageSize: PropTypes.number,
  onChange: PropTypes.func,
  hideOnSinglePage: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  showLessItems: PropTypes.bool,
  onShowSizeChange: PropTypes.func,
  selectComponentClass: PropTypes.func,
  showPrevNextJumpers: PropTypes.bool,
  showQuickJumper: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  showTitle: PropTypes.bool,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
  showTotal: PropTypes.func,
  locale: PropTypes.object,
  style: PropTypes.object,
  itemRender: PropTypes.func
});

_defineProperty(Pagination, "defaultProps", {
  defaultCurrent: 1,
  total: 0,
  defaultPageSize: 10,
  onChange: noop,
  className: '',
  selectPrefixCls: 'rc-select',
  prefixCls: 'rc-pagination',
  selectComponentClass: null,
  hideOnSinglePage: false,
  showPrevNextJumpers: true,
  showQuickJumper: false,
  showSizeChanger: false,
  showLessItems: false,
  showTitle: true,
  onShowSizeChange: noop,
  locale: LOCALE,
  style: {},
  itemRender: defaultItemRender
});

polyfill(Pagination);
export default Pagination;