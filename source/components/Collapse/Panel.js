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
    style: PropTypes.object,
    children: PropTypes.node,
    openAnimation: PropTypes.object,
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    header: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.func
    ]),
    showClose:PropTypes.bool,
    isActive: PropTypes.bool,
    onItemClick: PropTypes.func,
    onCloseItem: PropTypes.func,
  };
  static defaultProps = {
    isActive: false,
    disabled: false,
    style: {},
    onItemClick() {
    },
    onCloseItem() {
    },
  };

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemClose = this.handleItemClose.bind(this);
    this.state = {
      isCustom: typeof this.props.header === 'function', //是否显示箭头,不可关闭时不显示
    };
  }

  handleItemClick() {
    const { onItemClick, disabled } = this.props;
    if( !disabled ) {
      onItemClick();
    }
  }

  handleItemClose(e) {
    e.stopPropagation();
    const { onCloseItem, disabled } = this.props;
    if (!disabled) {
      onCloseItem();
    }
  }

  getHeader = (status) => {
    const { header } = this.props;

    if (typeof header === 'function') {

      return header(status);
    } else {
      return header;
    }
  }

  render() {
    const {
      itemKey,
      className,
      prefixCls,
      disabled,
      header,
      showClose,
      style,
      children,
      isActive
    } = this.props;
    const { isCustom } = this.state;
    const headerCls = classNames({
      [`${prefixCls}-header`]: true,
      [`${prefixCls}-header-disabled`]: disabled,
      [`${prefixCls}-header-close`]: showClose, // 可关闭时，箭头放置在左侧
      [`${prefixCls}-header-custom`]: isCustom,
    });
    const itemCls = classNames({
      // 'clearfix': true,
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-active`]: isActive,
      [className]: className,
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
          <div className="arrow">
            {getArrowIcon(isActive)}
          </div>
          <div className="title">{this.getHeader(isActive)}</div>
          <div className={closeCls} onClick={this.handleItemClose}>
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
