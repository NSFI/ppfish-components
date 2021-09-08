import React, { Component, FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import PanelContent from './PanelContent';

export interface CollapsePanelProps {
  // Css
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;

  // Header
  header?: string | number | Function;

  // Status
  showClose?: boolean;
  disabled?: boolean;
  isActive?: boolean;

  // Ref
  itemKey?: () => void;

  // Event
  onItemClick?: () => void;
  onCloseItem?: () => void;
}

export interface CollapsePanelState {
  isCustom: boolean;
}

const Panel: FC<CollapsePanelProps> = (props) => {

  const { disabled, onItemClick, onCloseItem, header, prefixCls, showClose, isActive, className, style, children, itemKey } = props;
  const handleItemClick = () => {
    if (!disabled) {
      onItemClick();
    }
  }

  const handleItemClose = (e) => {
    e.stopPropagation();
    if (!disabled) {
      onCloseItem();
    }
  }

  const getHeader = (status: boolean) => {
    if (typeof header === 'function') {
      return header(status);
    } else {
      return header;
    }
  };


  const isCustom = typeof header === 'function' //是否显示箭头,不可关闭时不显示


  const headerCls = classNames({
    [`${prefixCls}-header`]: true,
    [`${prefixCls}-header-disabled`]: disabled,
    [`${prefixCls}-header-close`]: showClose, // 可关闭时，箭头放置在左侧
    [`${prefixCls}-header-custom`]: isCustom
  });

  const itemCls = classNames({
    // 'clearfix': true,
    [`${prefixCls}-item`]: true,
    [`${prefixCls}-item-active`]: isActive,
    [className]: className
  });

  const closeCls = classNames({
    close: true,
    'z-close-show': showClose
  });

  const getArrowIcon = (isActive: boolean) => {
    if (isActive) {
      return <Icon className="icon" type="top" />;
    } else {
      return <Icon className="icon" type="bottom" />;
    }
  };

  return (
    <div className={itemCls} style={style}>
      <div
        className={headerCls}
        onClick={handleItemClick}
        role="tab"
        aria-expanded={isActive}
        ref={itemKey}
      >
        <div className="arrow">{getArrowIcon(isActive)}</div>
        <div className="title">{getHeader(isActive)}</div>
        <div className={closeCls} onClick={handleItemClose}>
          <Icon className="icon" type="picture-close" />
        </div>
      </div>
      <PanelContent prefixCls={prefixCls} isActive={isActive}>
        {children}
      </PanelContent>
    </div>
  );
}

Panel.defaultProps = {
  isActive: false,
  disabled: false,
  style: {},
  onItemClick() { },
  onCloseItem() { }
}


export default Panel;
