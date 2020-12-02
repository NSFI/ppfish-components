import * as React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

function rgbaColor(r: number, g: number, b: number, a: number) {
  return `rgba(${[r, g, b, a / 100].join(',')})`;
}

export interface AlphaProps {
  alpha?: number;
  color?: {
    red: number;
    green: number;
    blue: number;
  };
  onChange?: (data: any) => void;
  rootPrefixCls?: string;
}

export default class Alpha extends React.Component<AlphaProps> {
  static propTypes = {
    alpha: PropTypes.number,
    color: PropTypes.object,
    onChange: PropTypes.func,
    rootPrefixCls: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const y = e.clientY;

    this.pointMoveTo({
      x,
      y,
    });

    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('mouseup', this.onDragEnd);
  };

  onDrag = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    this.pointMoveTo({
      x,
      y,
    });
  };

  onDragEnd = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    this.pointMoveTo({
      x,
      y,
    });
    this.removeListeners();
  };

  getBackground = () => {
    const { red, green, blue } = this.props.color;
    const opacityGradient = `linear-gradient(to right, ${rgbaColor(
      red,
      green,
      blue,
      0,
    )} , ${rgbaColor(red, green, blue, 100)})`; // eslint-disable-line max-len
    return opacityGradient;
  };

  getPrefixCls = () => {
    return `${this.props.rootPrefixCls}-alpha`;
  };

  pointMoveTo = coords => {
    const rect = (findDOMNode(this) as HTMLElement).getBoundingClientRect();
    const width = rect.width;
    let left = coords.x - rect.left;

    left = Math.max(0, left);
    left = Math.min(left, width);

    const alpha = Math.round((left / width) * 100);

    this.props.onChange(alpha);
  };

  removeListeners = () => {
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('mouseup', this.onDragEnd);
  };

  render() {
    const prefixCls = this.getPrefixCls();
    const background = this.getBackground();
    const left = `${this.props.alpha}%`;

    return (
      <div className={prefixCls}>
        <div ref="bg" className={`${prefixCls}-bg`} style={{ background }} />
        <span style={{ left }} />
        <div
          className={`${prefixCls}-handler`}
          onMouseDown={this.onMouseDown}
        />
      </div>
    );
  }
}
