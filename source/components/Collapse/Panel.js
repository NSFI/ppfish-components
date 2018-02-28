import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    onItemClick() {
    }
  };

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick() {
    const { onItemClick } = this.props;
    onItemClick();
  }

  render() {
    const { itemKey, className, prefixCls, header, children, isActive } = this.props;
    const headerCls = classNames({
      [`${prefixCls}-header`]: true,
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
          <i className="iconfont icon-shangjiantou" />
        );
      }else {
        return (
          <i className="iconfont icon-xiajiantou" />
        );
      }
    };
    return (
      <div className={itemCls}>
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
