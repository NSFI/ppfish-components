import * as React from 'react';
import { findDOMNode } from 'react-dom';
import RcTabs, { TabPane, TabContent, ScrollableInkTabBar } from './src/index.js';
import * as classNames from 'classnames';
import Icon from '../Icon';
import * as BizLoading from '../BizLoading';
import * as warning from 'warning';
import './style/index.less';

function isFlexSupported() {
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    const { documentElement } = window.document;
    return 'flex' in documentElement.style ||
      'webkitFlex' in documentElement.style ||
      'Flex' in documentElement.style ||
      'msFlex' in documentElement.style;
  }
  return false;
}

export type TabsType = 'line' | 'card' | 'editable-card' | 'section' | 'borderless-section';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TabsProps {
  activeKey?: string;
  animated?: boolean | { inkBar: boolean; tabPane: boolean; };
  className?: string;
  defaultActiveKey?: string;
  hideAdd?: boolean;
  loading?: boolean;
  prefixCls?: string;
  size?: 'large' | 'default' | 'small';
  style?: React.CSSProperties;
  tabBarExtraContent?: React.ReactNode | null;
  tabBarStyle?: React.CSSProperties;
  tabBarGutter?: number;
  type?: TabsType;
  tabPosition?: TabsPosition;
  // tabScrollable?: boolean;
  onEdit?: (targetKey: string | React.MouseEvent<HTMLElement>, action: any) => void;
  onChange?: (activeKey: string) => void;
  onTabClick?: Function;
  onPrevClick?: React.MouseEventHandler<any>;
  onNextClick?: React.MouseEventHandler<any>;
}

// Tabs
export interface TabPaneProps {
  /** 选项卡头显示文字 */
  tab?: React.ReactNode | string;
  style?: React.CSSProperties;
  closable?: boolean;
  className?: string;
  disabled?: boolean;
  forceRender?: boolean;
}

export default class Tabs extends React.Component<TabsProps, any> {
  static TabPane = TabPane as React.ClassicComponentClass<TabPaneProps>;

  static defaultProps = {
    prefixCls: 'fishd-tabs',
    hideAdd: false,
    loading: false,
    size: 'default',
    // tabScrollable: false,
    tabPosition: 'top',
    type: 'line',
  };

  createNewTab = (targetKey: React.MouseEvent<HTMLElement>) => {
    const onEdit = this.props.onEdit;
    if (onEdit) {
      onEdit(targetKey, 'add');
    }
  }

  removeTab = (targetKey: string, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!targetKey) {
      return;
    }

    const onEdit = this.props.onEdit;
    if (onEdit) {
      onEdit(targetKey, 'remove');
    }
  }

  handleChange = (activeKey: string) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(activeKey);
    }
  }

  componentDidMount() {
    const NO_FLEX = ' no-flex';
    const tabNode = findDOMNode(this) as Element;
    if (tabNode && !isFlexSupported() && tabNode.className.indexOf(NO_FLEX) === -1) {
      tabNode.className += NO_FLEX;
    }
  }

  render() {
    let {
      prefixCls,
      className = '',
      size,
      type = 'line',
      tabPosition,
      // tabScrollable,
      children,
      tabBarExtraContent,
      tabBarStyle,
      hideAdd,
      loading,
      onTabClick,
      onPrevClick,
      onNextClick,
      animated = true,
      tabBarGutter,
    } = this.props;

    let { inkBarAnimated, tabPaneAnimated } = typeof animated === 'object' ? {
      inkBarAnimated: animated.inkBar, tabPaneAnimated: animated.tabPane,
    } : {
      inkBarAnimated: animated, tabPaneAnimated: animated,
    };

    // card tabs should not have animation
    if (type !== 'line') {
      tabPaneAnimated = 'animated' in this.props ? tabPaneAnimated : false;
    }

    warning(
      !(type.indexOf('card') >= 0 && (size === 'small' || size === 'large')),
      'Tabs[type=card|editable-card] doesn\'t have small or large size, it\'s by designed.',
    );

    const cls = classNames(className, {
      [`${prefixCls}-vertical`]: tabPosition === 'left' || tabPosition === 'right',
      [`${prefixCls}-${size}`]: !!size,
      [`${prefixCls}-card`]: type.indexOf('card') >= 0,
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-no-animation`]: !tabPaneAnimated,
    });
    let loadingCls = classNames({
      'hide': !loading
    });

    // only card type tabs can be added and closed
    let childrenWithClose: React.ReactElement<any>[] = [];

    if (type === 'editable-card') {
      childrenWithClose = [];
      React.Children.forEach(children as React.ReactNode, (child: React.ReactElement<any>, index) => {
        let closable = child.props.closable;
        closable = typeof closable === 'undefined' ? true : closable;
        const closeIcon = closable ? (
           <Icon
             type="close"
             onClick={e => this.removeTab(child.key as string, e)}
           />
        ) : null;
        childrenWithClose.push(React.cloneElement(child, {
          tab: (
            <div className={closable ? undefined : `${prefixCls}-tab-unclosable`}>
              {child.props.tab}
              {closeIcon}
            </div>
          ),
          key: child.key || index,
        }));
      });
      // Add new tab handler
      if (!hideAdd) {
        tabBarExtraContent = (
          <span>
            <Icon type="plus" className={`${prefixCls}-new-tab`} onClick={this.createNewTab} />
            {tabBarExtraContent}
          </span>
        );
      }
    }

    tabBarExtraContent = tabBarExtraContent ? (
      <div className={`${prefixCls}-extra-content`}>
        {tabBarExtraContent}
      </div>
    ) : null;

    const renderTabBar = () => (
      <ScrollableInkTabBar
        inkBarAnimated={inkBarAnimated}
        extraContent={tabBarExtraContent}
        onTabClick={onTabClick}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        style={tabBarStyle}
        tabBarGutter={tabBarGutter}
      />
    );

    return (
      <div className={prefixCls + '-ctner'}>
        <RcTabs
          {...this.props}
          className={cls}
          tabBarPosition={tabPosition}
          renderTabBar={renderTabBar}
          renderTabContent={() => <TabContent animated={tabPaneAnimated} animatedWithMargin />}
          onChange={this.handleChange}
        >
          {childrenWithClose.length > 0 ? childrenWithClose : children}
        </RcTabs>
        <BizLoading extraCls={loadingCls}/>
      </div>
    );
  }
}
