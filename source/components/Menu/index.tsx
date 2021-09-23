import * as React from 'react';
import RcMenu, { ItemGroup, MenuProps as RcMenuProps } from './src';
import classNames from 'classnames';
import Icon from '../Icon';
import omit from 'rc-util/lib/omit';
import SubMenu, { SubMenuProps } from './SubMenu';
import Item, { MenuItemProps } from './MenuItem';
import warning from '../../utils/warning';
import { SiderContext, SiderContextProps } from '../Layout/Sider';
import collapseMotion from '../../utils/motion';
import { cloneElement } from '../../utils/reactNode';
import MenuContext, { MenuTheme } from './MenuContext';
import MenuDivider from './MenuDivider';

import './style/index.less';

export { MenuDividerProps } from './MenuDivider';

export { MenuItemGroupProps } from './src';

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

export interface MenuProps extends RcMenuProps {
  theme?: MenuTheme;
  inlineIndent?: number;
}

type InternalMenuProps = MenuProps &
  SiderContextProps & {
    collapsedWidth?: string | number;
  };

class InternalMenu extends React.Component<InternalMenuProps> {
  static defaultProps: Partial<MenuProps> = {
    prefixCls: 'fishd-menu',
    // focusable: false,
    className: '',
    theme: 'light', // or dark
  };

  constructor(props: InternalMenuProps) {
    super(props);

    warning(
      !('inlineCollapsed' in props && props.mode !== 'inline'),
      '`inlineCollapsed` should only be used when `mode` is inline.',
    );

    warning(
      !(props.siderCollapsed !== undefined && 'inlineCollapsed' in props),
      '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.',
    );
  }

  getInlineCollapsed() {
    const { inlineCollapsed, siderCollapsed } = this.props;
    if (siderCollapsed !== undefined) {
      return siderCollapsed;
    }
    return inlineCollapsed;
  }

  renderMenu = () => {
    const { prefixCls, className, theme, expandIcon, ...restProps } = this.props;

    const passedProps = omit(restProps, ['siderCollapsed', 'collapsedWidth']);
    const inlineCollapsed = this.getInlineCollapsed();

    const defaultMotions = {
      horizontal: { motionName: `slide-up` },
      inline: collapseMotion,
      other: { motionName: `zoom-big` },
    };
    const menuClassName = classNames(`${prefixCls}-${theme}`, className);

    const direction = 'ltr';
    return (
      <MenuContext.Provider
        value={{
          prefixCls,
          inlineCollapsed: inlineCollapsed || false,
          fishdMenuTheme: theme,
          firstLevel: true,
        }}
      >
        <RcMenu
          // getPopupContainer={}
          overflowedIndicator={<Icon type="more-point" />}
          overflowedIndicatorPopupClassName={`${prefixCls}-${theme}`}
          {...passedProps}
          inlineCollapsed={inlineCollapsed}
          className={menuClassName}
          prefixCls={prefixCls}
          direction={direction}
          defaultMotions={defaultMotions}
          expandIcon={cloneElement(expandIcon, {
            className: `${prefixCls}-submenu-expand-icon`,
          })}
        />
      </MenuContext.Provider>
    );
  };

  render() {
    return this.renderMenu();
  }
}

// We should keep this as ref-able
class Menu extends React.Component<MenuProps, {}> {
  static Divider = MenuDivider;

  static Item = Item;

  static SubMenu = SubMenu;

  static ItemGroup = ItemGroup;

  render() {
    return (
      <SiderContext.Consumer>
        {(context: SiderContextProps) => <InternalMenu {...this.props} {...context} />}
      </SiderContext.Consumer>
    );
  }
}

export { MenuTheme, SubMenuProps, MenuItemProps };

export default Menu;
