import React from 'react';
import Tooltip from '../../Tooltip/index';

interface TipProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  position?: number;
  vertical?: boolean;
  visible?: boolean;
  title: React.ReactNode | string;
}

export default class Tip extends React.Component<TipProps> {
  render() {
    const { visible, position, vertical, title, prefixCls } = this.props;
    const tipStyle: React.CSSProperties = {
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
        <div className={`${prefixCls}-all-handle`} style={tipStyle} />
      </Tooltip>
    );
  }
}
