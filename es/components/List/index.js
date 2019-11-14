var __extends = this && this.__extends || function () {
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

var __assign = this && this.__assign || function () {
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Sortable from './sortable';
import Spin from '../Spin';
import Pagination from '../Pagination';
import { Row } from '../Grid';
import Item from './Item';
import './style/index.less';

var List =
/** @class */
function (_super) {
  __extends(List, _super);

  function List() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      paginationCurrent: 1
    };
    _this.defaultPaginationProps = {
      current: 1,
      pageSize: 10,
      onChange: function onChange(page, pageSize) {
        var pagination = _this.props.pagination;

        _this.setState({
          paginationCurrent: page
        });

        if (pagination && pagination.onChange) {
          pagination.onChange(page, pageSize);
        }
      },
      total: 0
    };
    _this.keys = {};

    _this.renderItem = function (item, index) {
      var _a = _this.props,
          dataSource = _a.dataSource,
          renderItem = _a.renderItem,
          rowKey = _a.rowKey;
      var key;

      if (typeof rowKey === 'function') {
        key = rowKey(dataSource[index]);
      } else if (typeof rowKey === 'string') {
        key = dataSource[rowKey];
      } else {
        key = dataSource.key;
      }

      if (!key) {
        key = "list-item-" + index;
      }

      _this.keys[index] = key;
      return renderItem(item, index);
    };

    _this.renderEmpty = function () {
      var locale = __assign({
        emptyText: '暂无数据'
      }, _this.props.locale);

      return React.createElement("div", {
        className: _this.props.prefixCls + "-empty-text"
      }, locale.emptyText);
    };

    return _this;
  }

  List.prototype.getChildContext = function () {
    return {
      grid: this.props.grid
    };
  };

  List.prototype.isSomethingAfterLastItem = function () {
    var _a = this.props,
        loadMore = _a.loadMore,
        pagination = _a.pagination,
        footer = _a.footer;
    return !!(loadMore || pagination || footer);
  };

  List.prototype.render = function () {
    var _a;

    var _this = this;

    var paginationCurrent = this.state.paginationCurrent;

    var _b = this.props,
        bordered = _b.bordered,
        split = _b.split,
        className = _b.className,
        children = _b.children,
        itemLayout = _b.itemLayout,
        loadMore = _b.loadMore,
        pagination = _b.pagination,
        prefixCls = _b.prefixCls,
        grid = _b.grid,
        dataSource = _b.dataSource,
        size = _b.size,
        rowKey = _b.rowKey,
        renderItem = _b.renderItem,
        header = _b.header,
        footer = _b.footer,
        loading = _b.loading,
        locale = _b.locale,
        striped = _b.striped,
        rest = __rest(_b, ["bordered", "split", "className", "children", "itemLayout", "loadMore", "pagination", "prefixCls", "grid", "dataSource", "size", "rowKey", "renderItem", "header", "footer", "loading", "locale", "striped"]);

    var loadingProp = loading;

    if (typeof loadingProp === 'boolean') {
      loadingProp = {
        spinning: loadingProp
      };
    }

    var isLoading = loadingProp && loadingProp.spinning; // large => lg
    // small => sm

    var sizeCls = '';

    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;

      case 'small':
        sizeCls = 'sm';

      default:
        break;
    }

    var classString = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-vertical"] = itemLayout === 'vertical', _a[prefixCls + "-" + sizeCls] = sizeCls, _a[prefixCls + "-split"] = split, _a[prefixCls + "-bordered"] = bordered, _a[prefixCls + "-loading"] = isLoading, _a[prefixCls + "-grid"] = grid, _a[prefixCls + "-striped"] = striped, _a[prefixCls + "-something-after-last-item"] = this.isSomethingAfterLastItem(), _a));

    var paginationProps = __assign(__assign(__assign({}, this.defaultPaginationProps), {
      total: dataSource.length,
      current: paginationCurrent
    }), pagination || {});

    var largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);

    if (paginationProps.current > largestPage) {
      paginationProps.current = largestPage;
    }

    var paginationContent = pagination ? React.createElement("div", {
      className: prefixCls + "-pagination"
    }, React.createElement(Pagination, __assign({}, paginationProps, {
      onChange: this.defaultPaginationProps.onChange
    }))) : null;

    var splitDataSource = __spreadArrays(dataSource);

    if (pagination) {
      if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
        splitDataSource = __spreadArrays(dataSource).splice((paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize);
      }
    }

    var childrenContent;
    childrenContent = isLoading && React.createElement("div", {
      style: {
        minHeight: 53
      }
    });

    if (splitDataSource.length > 0) {
      var items = splitDataSource.map(function (item, index) {
        return _this.renderItem(item, index);
      });
      var childrenList = React.Children.map(items, function (child, index) {
        return React.cloneElement(child, {
          key: _this.keys[index]
        });
      });
      childrenContent = grid ? React.createElement(Row, {
        gutter: grid.gutter
      }, childrenList) : childrenList;
    } else if (!children && !isLoading) {
      childrenContent = React.createElement("div", null, this.renderEmpty());
    }

    var paginationPosition = paginationProps.position || 'bottom';
    return React.createElement("div", __assign({
      className: classString
    }, rest), (paginationPosition === 'top' || paginationPosition === 'both') && paginationContent, header && React.createElement("div", {
      className: prefixCls + "-header"
    }, header), React.createElement(Spin, __assign({}, loadingProp), childrenContent, children), footer && React.createElement("div", {
      className: prefixCls + "-footer"
    }, footer), loadMore || (paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent);
  };

  List.Item = Item;
  List.Sortable = Sortable;
  List.childContextTypes = {
    grid: PropTypes.any
  };
  List.defaultProps = {
    dataSource: [],
    prefixCls: 'fishd-list',
    bordered: false,
    split: true,
    loading: false,
    pagination: false,
    striped: false
  };
  return List;
}(React.Component);

export default List;