import * as React from 'react';
import { findDOMNode } from 'react-dom';
import RcTabs, { TabPane, TabContent, ScrollableInkTabBar } from './src/index.js';
import classNames from 'classnames';
import Icon from '../Icon';
import './style/index.less';

function isFlexSupported() {
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    const { documentElement } = window.document;
    return (
      'flex' in documentElement.style ||
      'webkitFlex' in documentElement.style ||
      'Flex' in documentElement.style ||
      'msFlex' in documentElement.style
    );
  }
  return false;
}

export type TabsType =
  | 'line'
  | 'card'
  | 'editable-card'
  | 'section'
  | 'borderless-section'
  | 'highlighted-section';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TabsProps {
  activeKey?: string;
  animated?: boolean | { inkBar: boolean; tabPane: boolean };
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

type TabsFuncType = React.FC<TabsProps> & {
  TabPane: React.ClassicComponentClass<TabPaneProps>;
};

const Tabs: TabsFuncType = props => {
  const rcTabsRef = React.useRef<RcTabs>();

  const createNewTab = (targetKey: React.MouseEvent<HTMLElement>) => {
    const onEdit = props.onEdit;
    if (onEdit) {
      onEdit(targetKey, 'add');
    }
  };

  const removeTab = (targetKey: string, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!targetKey) {
      return;
    }

    const onEdit = props.onEdit;
    if (onEdit) {
      onEdit(targetKey, 'remove');
    }
  };

  const handleChange = (activeKey: string) => {
    const onChange = props.onChange;
    if (onChange) {
      onChange(activeKey);
    }
  };

  React.useEffect(() => {
    const NO_FLEX = ' no-flex';
    const tabNode = findDOMNode(rcTabsRef.current) as Element;
    if (tabNode && !isFlexSupported() && tabNode.className.indexOf(NO_FLEX) === -1) {
      tabNode.className += NO_FLEX;
    }
  }, []);

  let {
    prefixCls,
    className = '',
    size,
    type,
    tabPosition,
    children,
    tabBarExtraContent,
    tabBarStyle,
    hideAdd,
    loading,
    onTabClick,
    onPrevClick,
    onNextClick,
    animated,
    tabBarGutter,
  } = props;

  let { inkBarAnimated, tabPaneAnimated } =
    typeof animated === 'object'
      ? {
          inkBarAnimated: animated.inkBar,
          tabPaneAnimated: animated.tabPane,
        }
      : {
          inkBarAnimated: animated,
          tabPaneAnimated: animated,
        };

  let showInkBar = true;

  // card tabs should not have animation
  if (type !== 'line') {
    showInkBar = false;
    tabPaneAnimated = 'animated' in props ? tabPaneAnimated : false;
  }

  const cls = classNames(className, {
    [`${prefixCls}-vertical`]: tabPosition === 'left' || tabPosition === 'right',
    [`${prefixCls}-${size}`]: !!size,
    [`${prefixCls}-card`]: type.indexOf('card') >= 0,
    [`${prefixCls}-${type}`]: true,
    [`${prefixCls}-no-animation`]: !tabPaneAnimated,
  });

  // only card type tabs can be added and closed
  let childrenWithClose: React.ReactElement<any>[] = [];

  if (type === 'editable-card') {
    childrenWithClose = [];
    React.Children.forEach(children as React.ReactNode, (child: React.ReactElement<any>, index) => {
      let closable = child.props.closable;
      closable = typeof closable === 'undefined' ? true : closable;
      const closeIcon = closable ? (
        <Icon type="close-tag-line" onClick={e => removeTab(child.key as string, e)} />
      ) : null;
      childrenWithClose.push(
        React.cloneElement(child, {
          tab: (
            <div className={closable ? undefined : `${prefixCls}-tab-unclosable`}>
              {child.props.tab}
              {closeIcon}
            </div>
          ),
          key: child.key || index,
        }),
      );
    });
    // Add new tab handler
    if (!hideAdd) {
      tabBarExtraContent = (
        <span>
          <Icon type="upload-plus" className={`${prefixCls}-new-tab`} onClick={createNewTab} />
          {tabBarExtraContent}
        </span>
      );
    }
  }

  tabBarExtraContent = tabBarExtraContent ? (
    <div className={`${prefixCls}-extra-content`}>{tabBarExtraContent}</div>
  ) : null;

  const renderTabBar = () => (
    <ScrollableInkTabBar
      showInkBar={showInkBar}
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
    <RcTabs
      {...props}
      className={cls}
      tabBarPosition={tabPosition}
      renderTabBar={renderTabBar}
      renderTabContent={() => (
        <TabContent animated={tabPaneAnimated} animatedWithMargin loading={loading} />
      )}
      onChange={handleChange}
      ref={rcTabsRef}
    >
      {childrenWithClose.length > 0 ? childrenWithClose : children}
    </RcTabs>
  );
};

Tabs.TabPane = TabPane;

Tabs.defaultProps = {
  prefixCls: 'fishd-tabs',
  hideAdd: false,
  loading: false,
  size: 'default',
  tabPosition: 'top',
  type: 'line',
};

export default Tabs;
