import React from 'react';
import PropTypes from 'prop-types';
import Color from './helpers/color';
import { ParamsColor } from './Params';

interface PreviewProps {
  alpha?: number;
  color?: string | ParamsColor | Color;
  onChange?: (color: Color) => void;
  onInputClick?: (event: React.MouseEvent) => void;
  rootPrefixCls?: string;
}

export default class Preview extends React.Component<PreviewProps> {
  static propTypes = {
    alpha: PropTypes.number,
    color: PropTypes.object,
    onChange: PropTypes.func,
    onInputClick: PropTypes.func,
    rootPrefixCls: PropTypes.string
  };

  onChange = e => {
    const value = e.target.value;
    const color = new Color(value);
    this.props.onChange(color);
    e.stopPropagation();
  };

  getPrefixCls = () => {
    return `${this.props.rootPrefixCls}-preview`;
  };

  render() {
    const prefixCls = this.getPrefixCls();
    const hex = this.props.color.toHexString();
    return (
      <div className={prefixCls}>
        <span
          style={{
            backgroundColor: hex,
            opacity: this.props.alpha / 100
          }}
        />
        <input
          type="color"
          value={hex}
          onChange={this.onChange}
          onClick={this.props.onInputClick}
        />
      </div>
    );
  }
}
