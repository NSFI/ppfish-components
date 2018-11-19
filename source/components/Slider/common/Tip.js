import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip/index.tsx';

export default class Tip extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    position: PropTypes.number,
    vertical: PropTypes.bool,
    visible: PropTypes.bool,
    title: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ])
  };

  render() {
    const {visible, position, vertical, title, prefixCls} = this.props;
    const tipStyle = {
      position: 'absolute',
    };

    if (position) {
      if (vertical) {
        tipStyle.top = position;
        tipStyle.height = 10;
        tipStyle.width = 5;
      } else {
        tipStyle.left = position - 5;
        tipStyle.width = 10;
        tipStyle.height = 5;
      }
    }

    return (
      <Tooltip title={title} visible={visible}>
        <div className={`${prefixCls}-all-handle`} style={tipStyle}/>
      </Tooltip>
    );
  }
}

