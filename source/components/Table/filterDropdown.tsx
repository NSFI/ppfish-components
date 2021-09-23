import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { polyfill } from 'react-lifecycles-compat';
import Menu, { SubMenu, Item as MenuItem } from '../Menu/src';
import closest from 'dom-closest';
import classNames from 'classnames';
import { shallowEqual } from '../../utils';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import FilterDropdownMenuWrapper from './FilterDropdownMenuWrapper';
import { FilterMenuProps, FilterMenuState, ColumnProps, ColumnFilterItem } from './interface';

class FilterMenu<T> extends React.Component<FilterMenuProps<T>, FilterMenuState> {
  static defaultProps = {
    handleFilter() {},
    column: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps = {} } = prevState;
    const newState = { prevProps: nextProps } as {
      selectedKeys: string[];
      visible: boolean;
      prevProps: object;
    };
    if (
      'selectedKeys' in nextProps &&
      !shallowEqual(prevProps.selectedKeys, nextProps.selectedKeys)
    ) {
      newState.selectedKeys = nextProps.selectedKeys;
    }
    const { column } = nextProps;
    if ('filterDropdownVisible' in column) {
      newState.visible = column.filterDropdownVisible as boolean;
    }

    return newState;
  }

  constructor(props: FilterMenuProps<T>) {
    super(props);

    const visible =
      'filterDropdownVisible' in props.column ? props.column.filterDropdownVisible : false;

    this.state = {
      selectedKeys: props.selectedKeys,
      keyPathOfSelectedItem: {}, // 记录所有有选中子菜单的祖先菜单
      visible,
      prevProps: props,
      neverShown: false,
    };
  }

  componentDidMount() {
    const { column } = this.props;
    this.setState({
      neverShown: this.getNeverShown(column),
    });
  }

  componentDidUpdate() {
    const { column } = this.props;
    const neverShown = this.getNeverShown(column);
    if (this.state.neverShown !== neverShown) {
      this.setState({
        neverShown,
      });
    }
  }

  getNeverShown = (column: ColumnProps<T>) => {
    const rootNode = ReactDOM.findDOMNode(this);
    const filterBelongToScrollBody = !!closest(rootNode, `.fishd-table-scroll`);
    if (filterBelongToScrollBody) {
      // When fixed column have filters, there will be two dropdown menus
      // Filter dropdown menu inside scroll body should never be shown
      // To fix https://github.com/ant-design/ant-design/issues/5010 and
      // https://github.com/ant-design/ant-design/issues/7909
      return !!column.fixed;
    }
    return false;
  };

  setSelectedKeys = ({ selectedKeys }: { selectedKeys: string[] }) => {
    this.setState({ selectedKeys });
  };

  setVisible(visible: boolean) {
    const { column } = this.props;
    if (!('filterDropdownVisible' in column)) {
      this.setState({ visible });
    }
    if (column.onFilterDropdownVisibleChange) {
      column.onFilterDropdownVisibleChange(visible);
    }
  }

  handleClearFilters = () => {
    this.setState(
      {
        selectedKeys: [],
      },
      this.handleConfirm,
    );
  };

  handleConfirm = () => {
    this.setVisible(false);
    this.confirmFilter();
  };

  onVisibleChange = (visible: boolean) => {
    this.setVisible(visible);
    if (!visible) {
      this.confirmFilter();
    }
  };

  confirmFilter() {
    if (this.state.selectedKeys !== this.props.selectedKeys) {
      this.props.confirmFilter(this.props.column, this.state.selectedKeys);
    }
  }

  renderMenuItem(item: ColumnFilterItem) {
    const { column } = this.props;
    const { selectedKeys } = this.state;
    const multiple = 'filterMultiple' in column ? column.filterMultiple : true;
    const input = multiple ? (
      <Checkbox checked={selectedKeys.indexOf(item.value.toString()) >= 0} />
    ) : (
      <Radio checked={selectedKeys.indexOf(item.value.toString()) >= 0} />
    );

    return (
      <MenuItem key={item.value}>
        {input}
        <span>{item.text}</span>
      </MenuItem>
    );
  }

  hasSubMenu() {
    const {
      column: { filters = [] },
    } = this.props;
    return filters.some(item => !!(item.children && item.children.length > 0));
  }

  renderMenus(items: ColumnFilterItem[]): React.ReactElement<any>[] {
    return items.map(item => {
      if (item.children && item.children.length > 0) {
        const { keyPathOfSelectedItem } = this.state;
        const containSelected = Object.keys(keyPathOfSelectedItem).some(
          key => keyPathOfSelectedItem[key].indexOf(item.value) >= 0,
        );
        const subMenuCls = containSelected
          ? `${this.props.dropdownPrefixCls}-submenu-contain-selected`
          : '';
        return (
          <SubMenu title={item.text} className={subMenuCls} key={item.value.toString()}>
            {this.renderMenus(item.children)}
          </SubMenu>
        );
      }
      return this.renderMenuItem(item);
    });
  }

  handleMenuItemClick = (info: { keyPath: string[]; key: string }) => {
    if (!info.keyPath || info.keyPath.length <= 1) {
      return;
    }
    const keyPathOfSelectedItem = this.state.keyPathOfSelectedItem;
    if (this.state.selectedKeys.indexOf(info.key) >= 0) {
      // deselect SubMenu child
      delete keyPathOfSelectedItem[info.key];
    } else {
      // select SubMenu child
      keyPathOfSelectedItem[info.key] = info.keyPath;
    }
    this.setState({ keyPathOfSelectedItem });
  };

  renderFilterIcon = () => {
    const { column, locale, prefixCls } = this.props;
    const filterd = this.props.selectedKeys.length > 0;
    let filterIcon = column.filterIcon as any;
    if (typeof filterIcon === 'function') {
      filterIcon = filterIcon(filterd);
    }
    const dropdownSelectedClass = filterd ? `${prefixCls}-selected` : '';

    return filterIcon ? (
      React.cloneElement(filterIcon as any, {
        title: locale.filterTitle,
        className: classNames(`${prefixCls}-icon`, filterIcon.props.className),
      })
    ) : (
      <Icon title={locale.filterTitle} type="filter" className={dropdownSelectedClass} />
    );
  };

  render() {
    const { column, locale, prefixCls, dropdownPrefixCls, getPopupContainer } = this.props;
    // default multiple selection in filter dropdown
    const multiple = 'filterMultiple' in column ? column.filterMultiple : true;
    const dropdownMenuClass = classNames({
      [`${dropdownPrefixCls}-menu-without-submenu`]: !this.hasSubMenu(),
    });
    let { filterDropdown } = column;
    if (filterDropdown && typeof filterDropdown === 'function') {
      filterDropdown = (filterDropdown as (props: Object) => React.ReactNode)({
        prefixCls: `${dropdownPrefixCls}-custom`,
        setSelectedKeys: (selectedKeys: Array<any>) => this.setSelectedKeys({ selectedKeys }),
        selectedKeys: this.state.selectedKeys,
        confirm: this.handleConfirm,
        clearFilters: this.handleClearFilters,
        filters: column.filters,
        getPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode,
      });
    }

    const menus = filterDropdown ? (
      <FilterDropdownMenuWrapper>{filterDropdown}</FilterDropdownMenuWrapper>
    ) : (
      <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
        <Menu
          multiple={multiple}
          onClick={this.handleMenuItemClick}
          prefixCls={`${dropdownPrefixCls}-menu`}
          className={dropdownMenuClass}
          onSelect={this.setSelectedKeys}
          onDeselect={this.setSelectedKeys}
          selectedKeys={this.state.selectedKeys}
          getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentNode as HTMLElement}
        >
          {this.renderMenus(column.filters!)}
        </Menu>
        <div className={`${prefixCls}-dropdown-btns`}>
          <a className={`${prefixCls}-dropdown-link clear`} onClick={this.handleClearFilters}>
            {locale.filterReset}
          </a>
          <a className={`${prefixCls}-dropdown-link confirm`} onClick={this.handleConfirm}>
            {locale.filterConfirm}
          </a>
        </div>
      </FilterDropdownMenuWrapper>
    );

    return (
      <Dropdown
        trigger={['click']}
        overlay={menus}
        visible={this.state.neverShown ? false : this.state.visible}
        onVisibleChange={this.onVisibleChange}
        getPopupContainer={getPopupContainer}
      >
        {this.renderFilterIcon()}
      </Dropdown>
    );
  }
}

polyfill(FilterMenu);

export default FilterMenu;
