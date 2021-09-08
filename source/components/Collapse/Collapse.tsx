import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

import CollapsePanel from './Panel';
import useUpdateEffect from '../../hooks/useUpdateEffect';

function toArray(activeKey) {
  let currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
  }
  return currentActiveKey;
}

export type KeyedReactChild = { key: any; props: any } & React.ReactChild;

export interface CollapseProps {
  // Css
  prefixCls?: string;
  className?: string;

  // Values
  defaultActiveKey?: string | string[];
  activeKey?: string | string[];
  statusList?: any[];

  // Options
  isScrollToHeader?: boolean;
  accordion?: boolean;
  showClose?: boolean;
  bordered?: boolean;

  // Events
  onChange?: (value: string) => void;
  close?: (statusList: any[]) => void;
}

interface CollapseInterface extends React.FC<CollapseProps> {
  Panel: typeof CollapsePanel;
}

const Collapse: CollapseInterface = (props) => {
  const {
    prefixCls,
    className,
    defaultActiveKey,
    activeKey,
    statusList,
    isScrollToHeader,
    accordion,
    showClose,
    bordered,
    onChange,
    close,
    children
  } = props;
  const [currentActiveKey, setCurrentActiveKey] = React.useState(toArray(defaultActiveKey));

  useUpdateEffect(() => {
    setCurrentActiveKey(toArray(activeKey))
  }, [activeKey]);

  const [currentStatusList, setCurrentStatusList] = React.useState(statusList || new Array((children as React.ReactNode[]).length).fill(true))
  useUpdateEffect(() => {
    setCurrentStatusList(statusList);
  }, [statusList]);

  const currentKeyRef = React.useRef('');
  function onClickItem(key: string) {
    return () => {
      let activeKey = currentActiveKey;
      // 手风琴效果,只展开一项,收起其他项
      if (accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [...activeKey];
        const index = activeKey.indexOf(key);
        const isActive = index > -1;
        if (isActive) {
          // remove active state
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }

      // 当前点击的key
      currentKeyRef.current = key;

      // 更新
      if (!Reflect.has(props, 'activeKey')) {
        setCurrentActiveKey(activeKey)
      }
      onChange(accordion ? activeKey[0] : activeKey);
    };
  }

  function onCloseItem(key: string) {
    return () => {
      const keyList = React.Children.map(children, (child: KeyedReactChild, index) => {
        return child.key || String(index);
      });
      const index = keyList.findIndex(item => {
        return key == item;
      });
      statusList[index] = false;
      close(statusList);
    };
  }

  const panelsRef = React.useRef({});
  function getItems() {
    const activeKey = currentActiveKey;
    return React.Children.map(props.children, (child: KeyedReactChild, index) => {
      if (!currentStatusList[index]) {
        return null;
      }

      // If there is no key provide, use the panel order as default key
      const key = child.key || String(index);
      const header = child.props.header;

      const isActive = accordion ? activeKey[0] === key : activeKey.indexOf(key) > -1;
      const props = {
        itemKey: el => (panelsRef.current[key] = el),
        header,
        showClose,
        isActive,
        prefixCls,
        children: child.props.children,
        onItemClick: onClickItem(key),
        onCloseItem: onCloseItem(key)
      };

      return React.cloneElement(child as React.ReactElement<any>, props);
    });
  }


  React.useEffect(() => {
    scrollToHeader();
  })


  const collapseRef = React.useRef<HTMLDivElement>();


  function scrollToHeader() {
    const currentKey = currentKeyRef.current;
    const collapse = collapseRef.current;
    if (!isScrollToHeader || !currentKey || !collapse || !currentActiveKey.includes(currentKey)) {
      return;
    }

    const el = panelsRef.current[currentKey];
    const collapseRect = collapse && collapse.getBoundingClientRect();
    const elRect = el && el.getBoundingClientRect();
    const diff = collapse.scrollHeight - collapse.clientHeight;
    if (collapseRect && elRect) {
      let toTop = collapse.scrollTop + elRect.top - collapseRect.top;
      if (toTop < diff) {
        collapse.scrollTop = toTop;
      }
    }
  }

  function getClassName() {
    const classes = { [prefixCls]: true };

    if (className) {
      classes[className] = true;
    }

    if (!bordered) {
      classes[`${prefixCls}-borderless`] = true;
    }

    return classNames(classes);

  }

  function getStyle() {
    const styles = {};

    if (isScrollToHeader) {
      Object.assign(styles, { overflowY: 'auto', overflowX: 'hidden' })
    }

    return styles;
  }

  return (
    <div className={getClassName()} ref={collapseRef} style={getStyle()}>
      {getItems()}
    </div>
  );
}

Collapse.defaultProps = {
  prefixCls: 'fishd-collapse',
  isScrollToHeader: false,
  accordion: false,
  showClose: false,
  bordered: true,
  onChange(value) { },
  close(statusList: any[]) { }
};


Collapse.Panel = CollapsePanel;

export default Collapse;