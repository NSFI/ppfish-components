import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popover from '../../Popover/index.tsx';
import scrollIntoView from 'dom-scroll-into-view';

import '../styles/YearAndMonthPopover.less';

export default class YearAndMonthPopover extends React.Component {

  static propTypes = {
    sourceData: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    children: PropTypes.node,
    value: PropTypes.number,
    prefixCls: PropTypes.string
  };

  static defaultProps = {
    prefixCls: 'fishd'
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  scrollToOption = () => {
    const menu = this.refs.root;
    const active = menu.getElementsByClassName('active')[0];
    active && scrollIntoView(active, menu, {
      offsetTop: 91,
      alignWithTop: true,
    });
  };

  handleOnClick(item) {
    this.setState({
      visible: false,
    }, () => {
      this.props.onChange(item);
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({visible}, () => {
      if (visible) {
        this.scrollToOption();
      }
    });
  };

  render() {
    const {children, sourceData, value, prefixCls} = this.props;

    const content = () => {
      return (
        <div
          ref="root"
          className={`${prefixCls}-year-and-month-popover`}
        >
          {
            sourceData.map((item) => {
              return (
                <li
                  className={classNames({
                    [`${prefixCls}-year-and-month-popover-item`]: true,
                    'active': value == item || typeof item === 'string' && item.slice(-1) == '月' && value == item.slice(0,-1)
                  })}
                  key={item}
                  onClick={this.handleOnClick.bind(this, item)}
                >
                  {item}
                </li>
              );
            })}
        </div>
      );
    };

    return (
      <Popover
        transitionName={''}
        content={content()}
        trigger="click"
        placement="bottom"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        getPopupContainer={triggerNode => triggerNode.parentNode}
        forceRender
      >
        {children}
      </Popover>
    );
  }
}
