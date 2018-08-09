import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popover from '../../Popover';
import scrollIntoView from 'dom-scroll-into-view';

import '../styles/YearAndMonthPopover.less'

export default class YearAndMonthPopover extends React.Component {

  static propTypes = {
    sourceData: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    children: PropTypes.node,
    value: PropTypes.number
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    }
  }

  scrollToOption(className="active") {
    const menu = this.refs.root;
    const active = menu.getElementsByClassName(className)[0];
    scrollIntoView(active, menu);
  }

  handleOnClick(item) {
    this.setState({
      visible: false,
    }, () => {
      this.props.onChange(item);
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible }, () => {
      if(visible) {
        this.scrollToOption()
      }
    });
  }

  render() {
    const { children, sourceData, value } = this.props;

    const content = () => {
      return (
        <div
          ref="root"
          className="fishd-year-and-month-popover"
        >
          {
            sourceData.map((item) => {
            return (
              <li
                className={classNames({
                  'fishd-year-and-month-popover-item': true,
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
      )
    };

    return (
      <Popover
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
