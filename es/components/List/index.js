var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
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
export default class List extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            paginationCurrent: 1,
        };
        this.defaultPaginationProps = {
            current: 1,
            pageSize: 10,
            onChange: (page, pageSize) => {
                const { pagination } = this.props;
                this.setState({
                    paginationCurrent: page,
                });
                if (pagination && pagination.onChange) {
                    pagination.onChange(page, pageSize);
                }
            },
            total: 0,
        };
        this.keys = {};
        this.renderItem = (item, index) => {
            const { dataSource, renderItem, rowKey } = this.props;
            let key;
            if (typeof rowKey === 'function') {
                key = rowKey(dataSource[index]);
            }
            else if (typeof rowKey === 'string') {
                key = dataSource[rowKey];
            }
            else {
                key = dataSource.key;
            }
            if (!key) {
                key = `list-item-${index}`;
            }
            this.keys[index] = key;
            return renderItem(item, index);
        };
        this.renderEmpty = () => {
            const locale = Object.assign({ emptyText: '暂无数据' }, this.props.locale);
            return (React.createElement("div", { className: `${this.props.prefixCls}-empty-text` }, locale.emptyText));
        };
    }
    getChildContext() {
        return {
            grid: this.props.grid,
        };
    }
    isSomethingAfterLastItem() {
        const { loadMore, pagination, footer } = this.props;
        return !!(loadMore || pagination || footer);
    }
    render() {
        const { paginationCurrent } = this.state;
        const _a = this.props, { bordered, split, className, children, itemLayout, loadMore, pagination, prefixCls, grid, dataSource, size, rowKey, renderItem, header, footer, loading, locale, striped } = _a, rest = __rest(_a, ["bordered", "split", "className", "children", "itemLayout", "loadMore", "pagination", "prefixCls", "grid", "dataSource", "size", "rowKey", "renderItem", "header", "footer", "loading", "locale", "striped"]);
        let loadingProp = loading;
        if (typeof loadingProp === 'boolean') {
            loadingProp = {
                spinning: loadingProp,
            };
        }
        const isLoading = loadingProp && loadingProp.spinning;
        // large => lg
        // small => sm
        let sizeCls = '';
        switch (size) {
            case 'large':
                sizeCls = 'lg';
                break;
            case 'small':
                sizeCls = 'sm';
            default:
                break;
        }
        const classString = classNames(prefixCls, className, {
            [`${prefixCls}-vertical`]: itemLayout === 'vertical',
            [`${prefixCls}-${sizeCls}`]: sizeCls,
            [`${prefixCls}-split`]: split,
            [`${prefixCls}-bordered`]: bordered,
            [`${prefixCls}-loading`]: isLoading,
            [`${prefixCls}-grid`]: grid,
            [`${prefixCls}-striped`]: striped,
            [`${prefixCls}-something-after-last-item`]: this.isSomethingAfterLastItem(),
        });
        const paginationProps = Object.assign({}, this.defaultPaginationProps, { total: dataSource.length, current: paginationCurrent }, pagination || {});
        const largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);
        if (paginationProps.current > largestPage) {
            paginationProps.current = largestPage;
        }
        const paginationContent = pagination ? (React.createElement("div", { className: `${prefixCls}-pagination` },
            React.createElement(Pagination, Object.assign({}, paginationProps, { onChange: this.defaultPaginationProps.onChange })))) : null;
        let splitDataSource = [...dataSource];
        if (pagination) {
            if (dataSource.length >
                (paginationProps.current - 1) * paginationProps.pageSize) {
                splitDataSource = [...dataSource].splice((paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize);
            }
        }
        let childrenContent;
        childrenContent = isLoading && React.createElement("div", { style: { minHeight: 53 } });
        if (splitDataSource.length > 0) {
            const items = splitDataSource.map((item, index) => this.renderItem(item, index));
            const childrenList = React.Children.map(items, (child, index) => React.cloneElement(child, {
                key: this.keys[index],
            }));
            childrenContent = grid ? (React.createElement(Row, { gutter: grid.gutter }, childrenList)) : (childrenList);
        }
        else if (!children && !isLoading) {
            childrenContent = (React.createElement("div", null, this.renderEmpty));
        }
        const paginationPosition = paginationProps.position || 'bottom';
        return (React.createElement("div", Object.assign({ className: classString }, rest),
            (paginationPosition === 'top' || paginationPosition === 'both') && paginationContent,
            header && React.createElement("div", { className: `${prefixCls}-header` }, header),
            React.createElement(Spin, Object.assign({}, loadingProp),
                childrenContent,
                children),
            footer && React.createElement("div", { className: `${prefixCls}-footer` }, footer),
            loadMore || (paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent));
    }
}
List.Item = Item;
List.Sortable = Sortable;
List.childContextTypes = {
    grid: PropTypes.any,
};
List.defaultProps = {
    dataSource: [],
    prefixCls: 'fishd-list',
    bordered: false,
    split: true,
    loading: false,
    pagination: false,
    striped: false,
};
