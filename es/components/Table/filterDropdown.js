import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Menu, { SubMenu, Item as MenuItem } from '../Menu/src';
import closest from 'dom-closest';
import classNames from 'classnames';
import { shallowEqual } from '../../utils';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import FilterDropdownMenuWrapper from './FilterDropdownMenuWrapper';
export default class FilterMenu extends React.Component {
    constructor(props) {
        super(props);
        this.setNeverShown = (column) => {
            const rootNode = ReactDOM.findDOMNode(this);
            const filterBelongToScrollBody = !!closest(rootNode, `.fishd-table-scroll`);
            if (filterBelongToScrollBody) {
                // When fixed column have filters, there will be two dropdown menus
                // Filter dropdown menu inside scroll body should never be shown
                // To fix https://github.com/ant-design/ant-design/issues/5010 and
                // https://github.com/ant-design/ant-design/issues/7909
                this.neverShown = !!column.fixed;
            }
        };
        this.setSelectedKeys = ({ selectedKeys }) => {
            this.setState({ selectedKeys });
        };
        this.handleClearFilters = () => {
            this.setState({
                selectedKeys: [],
            }, this.handleConfirm);
        };
        this.handleConfirm = () => {
            this.setVisible(false);
            this.confirmFilter();
        };
        this.onVisibleChange = (visible) => {
            this.setVisible(visible);
            if (!visible) {
                this.confirmFilter();
            }
        };
        this.handleMenuItemClick = (info) => {
            if (!info.keyPath || info.keyPath.length <= 1) {
                return;
            }
            const keyPathOfSelectedItem = this.state.keyPathOfSelectedItem;
            if (this.state.selectedKeys.indexOf(info.key) >= 0) {
                // deselect SubMenu child
                delete keyPathOfSelectedItem[info.key];
            }
            else {
                // select SubMenu child
                keyPathOfSelectedItem[info.key] = info.keyPath;
            }
            this.setState({ keyPathOfSelectedItem });
        };
        this.renderFilterIcon = () => {
            const { column, locale, prefixCls } = this.props;
            const filterd = this.props.selectedKeys.length > 0;
            let filterIcon = column.filterIcon;
            if (typeof filterIcon === 'function') {
                filterIcon = filterIcon(filterd);
            }
            const dropdownSelectedClass = filterd ? `${prefixCls}-selected` : '';
            return filterIcon ? React.cloneElement(filterIcon, {
                title: locale.filterTitle,
                className: classNames(`${prefixCls}-icon`, filterIcon.props.className),
            }) : React.createElement(Icon, { title: locale.filterTitle, type: "filter", className: dropdownSelectedClass });
        };
        const visible = ('filterDropdownVisible' in props.column) ?
            props.column.filterDropdownVisible : false;
        this.state = {
            selectedKeys: props.selectedKeys,
            keyPathOfSelectedItem: {},
            visible,
        };
    }
    componentDidMount() {
        const { column } = this.props;
        this.setNeverShown(column);
    }
    componentWillReceiveProps(nextProps) {
        const { column } = nextProps;
        this.setNeverShown(column);
        const newState = {};
        /**
         * if the state is visible the component should ignore updates on selectedKeys prop to avoid
         * that the user selection is lost
         * this happens frequently when a table is connected on some sort of realtime data
         * Fixes https://github.com/ant-design/ant-design/issues/10289 and
         * https://github.com/ant-design/ant-design/issues/10209
         */
        if ('selectedKeys' in nextProps && !shallowEqual(this.props.selectedKeys, nextProps.selectedKeys)) {
            newState.selectedKeys = nextProps.selectedKeys;
        }
        if ('filterDropdownVisible' in column) {
            newState.visible = column.filterDropdownVisible;
        }
        if (Object.keys(newState).length > 0) {
            this.setState(newState);
        }
    }
    setVisible(visible) {
        const { column } = this.props;
        if (!('filterDropdownVisible' in column)) {
            this.setState({ visible });
        }
        if (column.onFilterDropdownVisibleChange) {
            column.onFilterDropdownVisibleChange(visible);
        }
    }
    confirmFilter() {
        if (this.state.selectedKeys !== this.props.selectedKeys) {
            this.props.confirmFilter(this.props.column, this.state.selectedKeys);
        }
    }
    renderMenuItem(item) {
        const { column } = this.props;
        const { selectedKeys } = this.state;
        const multiple = ('filterMultiple' in column) ? column.filterMultiple : true;
        const input = multiple
            ? React.createElement(Checkbox, { checked: selectedKeys.indexOf(item.value.toString()) >= 0 })
            : React.createElement(Radio, { checked: selectedKeys.indexOf(item.value.toString()) >= 0 });
        return (React.createElement(MenuItem, { key: item.value },
            input,
            React.createElement("span", null, item.text)));
    }
    hasSubMenu() {
        const { column: { filters = [] } } = this.props;
        return filters.some(item => !!(item.children && item.children.length > 0));
    }
    renderMenus(items) {
        return items.map(item => {
            if (item.children && item.children.length > 0) {
                const { keyPathOfSelectedItem } = this.state;
                const containSelected = Object.keys(keyPathOfSelectedItem).some(key => keyPathOfSelectedItem[key].indexOf(item.value) >= 0);
                const subMenuCls = containSelected ? `${this.props.dropdownPrefixCls}-submenu-contain-selected` : '';
                return (React.createElement(SubMenu, { title: item.text, className: subMenuCls, key: item.value.toString() }, this.renderMenus(item.children)));
            }
            return this.renderMenuItem(item);
        });
    }
    render() {
        const { column, locale, prefixCls, dropdownPrefixCls, getPopupContainer } = this.props;
        // default multiple selection in filter dropdown
        const multiple = ('filterMultiple' in column) ? column.filterMultiple : true;
        const dropdownMenuClass = classNames({
            [`${dropdownPrefixCls}-menu-without-submenu`]: !this.hasSubMenu(),
        });
        let { filterDropdown } = column;
        if (filterDropdown && typeof filterDropdown === 'function') {
            filterDropdown = filterDropdown({
                prefixCls: `${dropdownPrefixCls}-custom`,
                setSelectedKeys: (selectedKeys) => this.setSelectedKeys({ selectedKeys }),
                selectedKeys: this.state.selectedKeys,
                confirm: this.handleConfirm,
                clearFilters: this.handleClearFilters,
                filters: column.filters,
                getPopupContainer: (triggerNode) => triggerNode.parentNode,
            });
        }
        const menus = filterDropdown ? (React.createElement(FilterDropdownMenuWrapper, null, filterDropdown)) : (React.createElement(FilterDropdownMenuWrapper, { className: `${prefixCls}-dropdown` },
            React.createElement(Menu, { multiple: multiple, onClick: this.handleMenuItemClick, prefixCls: `${dropdownPrefixCls}-menu`, className: dropdownMenuClass, onSelect: this.setSelectedKeys, onDeselect: this.setSelectedKeys, selectedKeys: this.state.selectedKeys, getPopupContainer: (triggerNode) => triggerNode.parentNode }, this.renderMenus(column.filters)),
            React.createElement("div", { className: `${prefixCls}-dropdown-btns` },
                React.createElement("a", { className: `${prefixCls}-dropdown-link clear`, onClick: this.handleClearFilters }, locale.filterReset),
                React.createElement("a", { className: `${prefixCls}-dropdown-link confirm`, onClick: this.handleConfirm }, locale.filterConfirm))));
        return (React.createElement(Dropdown, { trigger: ['click'], overlay: menus, visible: this.neverShown ? false : this.state.visible, onVisibleChange: this.onVisibleChange, getPopupContainer: getPopupContainer, forceRender: true }, this.renderFilterIcon()));
    }
}
FilterMenu.defaultProps = {
    handleFilter() {
    },
    column: {},
};
