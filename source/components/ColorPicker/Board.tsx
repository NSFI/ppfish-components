import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Color from './helpers/color';
import { ColorType } from './QuickPanel';

const WIDTH = 200;
const HEIGHT = 150;

interface BoardProps {
  color: ColorType;
  onChange: (color: ColorType) => void;
  rootPrefixCls: string;
}

export default class Board extends React.Component<BoardProps> {
  static propTypes = {
    color: PropTypes.object,
    onChange: PropTypes.func,
    rootPrefixCls: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.removeListeners();
    this.removeTouchListeners();
  }

  onBoardMouseDown = e => {
    const buttons = e.buttons;

    // only work on left click
    // @see https://developer.mozilla.org/en-US/docs/Web/Events/mousedown
    if (buttons !== 1) return;

    this.removeListeners();
    const x = e.clientX;
    const y = e.clientY;
    this.pointMoveTo({ x, y });
    window.addEventListener('mousemove', this.onBoardDrag);
    window.addEventListener('mouseup', this.onBoardDragEnd);
  };

  onBoardTouchStart = e => {
    if (e.touches.length !== 1) {
      return;
    }
    this.removeTouchListeners();
    const x = e.targetTouches[0].clientX;
    const y = e.targetTouches[0].clientY;
    this.pointMoveTo({ x, y });
    window.addEventListener('touchmove', this.onBoardTouchMove);
    window.addEventListener('touchend', this.onBoardTouchEnd);
  };

  onBoardTouchMove = e => {
    if (e.preventDefault) {
      e.preventDefault();
    }

    const x = e.targetTouches[0].clientX;
    const y = e.targetTouches[0].clientY;
    this.pointMoveTo({
      x,
      y
    });
  };

  onBoardTouchEnd = () => {
    this.removeTouchListeners();
  };

  onBoardDrag = e => {
    const x = e.clientX;
    const y = e.clientY;
    this.pointMoveTo({
      x,
      y
    });
  };

  onBoardDragEnd = e => {
    const x = e.clientX;
    const y = e.clientY;
    this.pointMoveTo({
      x,
      y
    });
    this.removeListeners();
  };

  getPrefixCls = () => {
    return `${this.props.rootPrefixCls}-board`;
  };

  removeTouchListeners = () => {
    window.removeEventListener('touchmove', this.onBoardTouchMove);
    window.removeEventListener('touchend', this.onBoardTouchEnd);
  };

  removeListeners = () => {
    window.removeEventListener('mousemove', this.onBoardDrag);
    window.removeEventListener('mouseup', this.onBoardDragEnd);
  };

  /**
   * 移动光标位置到
   * @param  {object} pos X Y 全局坐标点
   */
  pointMoveTo = pos => {
    const rect = (ReactDOM.findDOMNode(this) as HTMLElement).getBoundingClientRect();
    let left = pos.x - rect.left;
    let top = pos.y - rect.top;

    const rWidth = rect.width || WIDTH;
    const rHeight = rect.height || HEIGHT;

    left = Math.max(0, left);
    left = Math.min(left, rWidth);
    top = Math.max(0, top);
    top = Math.min(top, rHeight);

    const { color } = this.props;

    color.saturation = left / rWidth;
    color.brightness = 1 - top / rHeight;

    this.props.onChange(color);
  };

  render() {
    const prefixCls = this.getPrefixCls();
    const color = this.props.color;

    const hueHsv = {
      h: color.hue,
      s: 1,
      v: 1
    };

    const hueColor = new Color(hueHsv).toHexString();

    const xRel = color.saturation * 100;
    const yRel = (1 - color.brightness) * 100;

    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-hsv`} style={{ backgroundColor: hueColor }}>
          <div className={`${prefixCls}-value`} />
          <div className={`${prefixCls}-saturation`} />
        </div>
        <span style={{ left: `${xRel}%`, top: `${yRel}%` }} />

        <div
          className={`${prefixCls}-handler`}
          onMouseDown={this.onBoardMouseDown}
          onTouchStart={this.onBoardTouchStart}
        />
      </div>
    );
  }
}
