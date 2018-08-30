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
    isActive: PropTypes.bool,
    onItemClick: PropTypes.func,
  };
  static defaultProps = {
    isActive: false,
    disabled: false,
    onItemClick() {
    }
  };

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick() {
    const { onItemClick, disabled } = this.props;
    if( !disabled ) {
      onItemClick();
    }
  }

  render() {
    const {
      itemKey,
      className,
      prefixCls,
      disabled,
      header,
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
          <div className="title">{header}</div>
          <div className="arrow">
            {getArrowIcon(isActive)}
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
