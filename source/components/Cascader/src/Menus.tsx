import * as React from 'react';
import arrayTreeFilter from 'array-tree-filter';
import { findDOMNode } from 'react-dom';
import { MenusProps, CascaderOptionType, SelectEventHandler, MenuItemProps } from '../interface';


const Menus: React.FC<MenusProps> = props => {
  const { prefixCls, dropdownMenuColumnStyle, visible } = props;
  const menuItemsRef = React.useRef<React.ReactNode>([]);

  const delayTimerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  function delayOnSelect(onSelect?: SelectEventHandler, event?: React.MouseEvent) {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }

    if (typeof onSelect === 'function') {
      delayTimerRef.current = setTimeout(() => {
        onSelect(event);
        delayTimerRef.current = null;
      }, 150);
    }
  }

  function getFieldName(name: string) {
    const { fieldNames, defaultFieldNames } = props;
    // 防止只设置单个属性的名字
    return fieldNames[name] || defaultFieldNames[name];
  }

  function getActiveOptions(values?: string[]): CascaderOptionType[] {
    const activeValue = values || props.activeValue;
    const options = props.options;
    return arrayTreeFilter(
      options,
      (o: CascaderOptionType, level: number) => o[getFieldName('value')] === activeValue[level],
      {
        childrenKeyName: getFieldName('children'),
      },
    );
  }

  function isActiveOption(option: CascaderOptionType, menuIndex: number) {
    const { activeValue = [] } = props;
    return activeValue[menuIndex] === option[getFieldName('value')];
  }

  const saveMenuItem = (index: number) => (node: HTMLElement) => {
    menuItemsRef.current[index] = node;
  };

  function getOption(option: CascaderOptionType, menuIndex: number) {
    const { prefixCls, expandTrigger, expandIcon } = props;
    const handleSelect: SelectEventHandler = (e) => { props.onSelect(option, menuIndex, e) };

    const expandProps: MenuItemProps = {
      onClick: handleSelect,
    };
    let menuItemCls = `${prefixCls}-menu-item`;
    let expandIconNode = null;
    const hasChildren =
      option[getFieldName('children')] && option[getFieldName('children')].length > 0;
    if (hasChildren || option.isLeaf === false) {
      menuItemCls += ` ${prefixCls}-menu-item-expand`;
      expandIconNode = <span className={`${prefixCls}-menu-item-expand-icon`}>{expandIcon}</span>;
    }

    if (expandTrigger === 'hover' && hasChildren) {
      expandProps.onMouseEnter = (event) => delayOnSelect(handleSelect, event);
      expandProps.onMouseLeave = (e) => delayOnSelect();
    }

    if (isActiveOption(option, menuIndex)) {
      menuItemCls += ` ${prefixCls}-menu-item-active`;
      expandProps.ref = saveMenuItem(menuIndex);
    }

    if (option.disabled) {
      menuItemCls += ` ${prefixCls}-menu-item-disabled`;
    }

    if (option.loading) {
      menuItemCls += ` ${prefixCls}-menu-item-loading`;
    }
    let title = '';
    if (option.title) {
      title = option.title;
    } else if (typeof option[getFieldName('label')] === 'string') {
      title = option[getFieldName('label')];
    }

    return (
      <li
        key={option[getFieldName('value')]}
        className={menuItemCls}
        title={title}
        {...expandProps}
      >
        {option[getFieldName('label')]}
        {expandIconNode}
      </li>
    );
  }

  function getShowOptions() {
    const { options } = props;
    const result = getActiveOptions()
      .map(activeOption => activeOption[getFieldName('children')])
      .filter(activeOption => !!activeOption);
    result.unshift(options);
    return result;
  }



  function scrollActiveItemToView() {
    // scroll into view
    const optionsLength = getShowOptions().length;
    for (let i = 0; i < optionsLength; i++) {
      const itemComponent = menuItemsRef[i];
      if (itemComponent) {
        const target = findDOMNode(itemComponent) as HTMLElement;
        (target.parentNode as HTMLElement).scrollTop = target.offsetTop;
      }
    }
  }

  React.useEffect(() => {
    scrollActiveItemToView();
  }, [visible]);



  return (
    <div>
      {getShowOptions().map((options, menuIndex) => (
        <ul className={`${prefixCls}-menu`} key={menuIndex} style={dropdownMenuColumnStyle}>
          {options.map(option => getOption(option, menuIndex))}
        </ul>
      ))}
    </div>
  );
};

Menus.defaultProps = {
  options: [],
  value: [],
  activeValue: [],
  onSelect() {},
  prefixCls: 'rc-cascader-menus',
  visible: false,
  expandTrigger: 'click',
};

export default Menus;