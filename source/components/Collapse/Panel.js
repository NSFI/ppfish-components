import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/index.tsx';
import PanelContent from './PanelContent';

class CollapsePanel extends Component {
  static propTypes = {
    itemKey: PropTypes.func,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    children: PropTypes.node,
    openAnimation: PropTypes.object,
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    header: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.node,
    ]),
    showArrow: PropTypes.bool,
    showClose:PropTypes.bool,
    isActive: PropTypes.bool,
    onItemClick: PropTypes.func,
    onCloseItem: PropTypes.func,
  };
  static defaultProps = {
    isActive: false,
    disabled: false,
    showArrow: true,
    onItemClick() {
    },
    onCloseItem() {
    },
  };

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemClose = this.handleItemClose.bind(this);
  }

  handleItemClick() {
    const { onItemClick, disabled } = this.props;
    if( !disabled ) {
      onItemClick();
    }
  }

  handleItemClose(e) {
    e.stopPropagation();
    const { onCloseItem } = this.props;
    onCloseItem();
  }

  render() {
    const {
      itemKey,
      className,
      prefixCls,
      disabled,
      header,
      showArrow,
      showClose,
      style,
      children,
      isActive
    } = this.props;
    const headerCls = classNames({
      [`${prefixCls}-header`]: true,
      [`${prefixCls}-header-disabled`]: disabled,
    });
    const itemCls = classNames({
      // 'clearfix': true,
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-active`]: isActive,
      [className]: className,
    });
    const arrowCls = classNames({
      'arrow': true,
      'z-arrow-show': showArrow,
    });
    const closeCls = classNames({
      'close': true,
      'z-close-show': showClose,
    });
    const getArrowIcon = (isActive) => {
      if (isActive) {
        return (
          <Icon className="icon" type="top" />
        );
      }else {
        return (
          <Icon className="icon" type="bottom" />
        );
      }
    };
    return (
      <div className={itemCls} style={style}>
        <div
          className={headerCls}
          onClick={this.handleItemClick}
          role="tab"
          aria-expanded={isActive}
          ref={itemKey}
        >
          <div className={arrowCls}>
            {getArrowIcon(isActive)}
          </div>
          <div className="title">{header}</div>
          <div className={closeCls} onClick={this.handleItemClose} >
            <Icon className="icon" type="picture-close" />
          </div>
        </div>
        <PanelContent prefixCls={prefixCls} isActive={isActive}>
          {children}
        </PanelContent>
      </div>
    );
  }
}

export default CollapsePanel;
