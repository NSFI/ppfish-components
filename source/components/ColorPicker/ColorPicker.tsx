import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

import { KeyCode } from '../../utils';
import ColorPickerPanel from './Panel';
import placements from './placements';
import Color from './helpers/color';
import QuickPanel, { ColorType } from './QuickPanel';
import { ParamsColor } from './Params';

function refFn(field, component) {
  this[field] = component;
}

function prevent(e) {
  e.preventDefault();
}

function noop() {}

export interface ColorPickerProps {
  alpha?: number;
  children?: React.ReactNode;
  className?: string;
  color?: string | ParamsColor | Color;
  colorMap?: string[];
  defaultAlpha?: number;
  defaultColor?: string;
  disabled?: boolean;
  enableAlpha?: boolean;
  enableHistory?: boolean;
  maxHistory?: number;
  mode?: 'RGB' | 'HSL' | 'HSB';
  onChange?: (color: any) => void;
  onVisibleChange?: (visible: boolean) => void;
  prefixCls?: string;
  quickMode?: boolean;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  esc?: boolean;
  transitionName?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  align?: string;
  animation?: string;
}

interface ColorPickerState {
  visible?: boolean;
  color?: string;
  alpha?: number;
  colorHistory?: ColorType[];
}

class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  static Panel = ColorPickerPanel;
  static QuickPanel = QuickPanel;

  static propTypes = {
    alpha: PropTypes.number,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    color: PropTypes.string,
    colorMap: PropTypes.array,
    defaultAlpha: PropTypes.number,
    defaultColor: PropTypes.string,
    disabled: PropTypes.bool,
    enableAlpha: PropTypes.bool,
    enableHistory: PropTypes.bool,
    maxHistory: PropTypes.number,
    mode: PropTypes.oneOf(['RGB', 'HSL', 'HSB']),
    onChange: PropTypes.func,
    onVisibleChange: PropTypes.func,
    prefixCls: PropTypes.string.isRequired,
    quickMode: PropTypes.bool,
    style: PropTypes.object,
    popupStyle: PropTypes.object,
    esc: PropTypes.bool
  };

  static defaultProps = {
    children: <span className="fishd-color-picker-trigger" />,
    className: '',
    colorMap: [
      '#33bbff',
      '#337eff',
      '#8a73ff',
      '#bb67e6',
      '#f290b6',
      '#f24957',
      '#cc613d',
      '#faa702',
      '#ffe500',
      '#aacc00',
      '#26bf40',
      '#3dd9af'
    ],
    defaultAlpha: 100,
    defaultColor: '#33bbff',
    disabled: false,
    enableAlpha: false,
    enableHistory: true,
    maxHistory: 8,
    onChange: noop,
    onVisibleChange: noop,
    prefixCls: 'fishd-color-picker',
    quickMode: false,
    style: {},
    popupStyle: {},
    esc: true
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState: {
      color?: string;
      alpha?: number;
    } = {};

    if ('color' in nextProps) {
      newState.color = nextProps.color;
    }
    if ('alpha' in nextProps && nextProps.alpha !== undefined && nextProps.alpha !== null) {
      newState.alpha = nextProps.alpha;
    }
    return newState;
  }

  constructor(props) {
    super(props);

    const alpha =
      typeof props.alpha === 'undefined'
        ? props.defaultAlpha
        : Math.min(props.alpha, props.defaultAlpha);

    this.state = {
      color: props.color || props.defaultColor,
      alpha,
      visible: false,
      colorHistory: []
    };

    this.saveTriggerRef = refFn.bind(this, 'triggerInstance');
  }

  saveTriggerRef: HTMLElement | null;
  triggerInstance: any;

  onChange = colors => {
    this.setState({ ...colors }, () => {
      this.props.onChange(this.state);
    });
  };

  onBlur = () => {
    this.setVisible(false);
  };

  onVisibleChangeFromTrigger = visible => {
    this.setVisible(visible);
  };

  onPanelMount = panelDOMRef => {
    if (this.state.visible) {
      setTimeout(() => {
        panelDOMRef.focus();
      }, 0);
    }
  };

  setVisible = (visible: boolean, callback?: any) => {
    if (this.state.visible !== visible) {
      this.setState({ visible }, () => {
        if (typeof callback === 'function') callback();
        const { onVisibleChange, enableHistory, maxHistory } = this.props;
        onVisibleChange(this.state.visible);
        //关闭时记录历史记录
        if (!this.state.visible && enableHistory) {
          const { color, alpha, colorHistory } = this.state;

          // @ts-ignore
          if (
            colorHistory.length &&
            color === colorHistory[0].color &&
            alpha === colorHistory[0].alpha
          )
            return;

          const history =
            colorHistory.length >= maxHistory
              ? [{ color, alpha }, ...colorHistory.slice(0, -1)]
              : [{ color, alpha }, ...colorHistory];

          // @ts-ignore
          this.setState({ colorHistory: history });
        }
      });
    }
  };

  getRootDOMNode = () => {
    return findDOMNode(this);
  };

  getTriggerDOMNode = () => {
    return findDOMNode(this.triggerInstance);
  };

  getPickerElement = () => {
    if (this.props.quickMode) {
      return (
        <QuickPanel
          __useInComponent
          onMount={this.onPanelMount}
          defaultColor={this.state.color}
          color={this.state.color}
          onChange={this.onChange}
          onVisibleChange={this.setVisible}
          onBlur={this.onBlur}
          colorMap={this.props.colorMap}
          className={this.props.className}
          userSelectColor={false}
          esc={this.props.esc}
        />
      );
    }
    return (
      <ColorPickerPanel
        onMount={this.onPanelMount}
        defaultColor={this.state.color}
        alpha={this.state.alpha}
        enableAlpha={this.props.enableAlpha}
        prefixCls={`${this.props.prefixCls}-panel`}
        onChange={this.onChange}
        onBlur={this.onBlur}
        mode={this.props.mode}
        className={this.props.className}
        colorHistory={this.state.colorHistory}
        enableHistory={this.props.enableHistory}
        maxHistory={this.props.maxHistory}
      />
    );
  };

  focus = () => {
    if (!this.state.visible) {
      (findDOMNode(this) as HTMLElement).focus();
    }
  };

  handleKeyDown = e => {
    const keyCode = e.keyCode;
    if ((keyCode === KeyCode.ESC && this.props.esc) || keyCode === KeyCode.ENTER) {
      this.setVisible(false);
    }
  };

  render() {
    const props = this.props;
    const state = this.state;
    const classes = [`${props.prefixCls}-wrap`, props.className];
    if (state.visible) {
      classes.push(`${props.prefixCls}-open`);
    }

    let children = props.children;

    const [r, g, b] = new Color(this.state.color).RGB;
    const RGBA = [r, g, b];

    RGBA.push(this.state.alpha / 100);

    if (children) {
      children = React.cloneElement(children as React.ReactElement<any>, {
        ref: this.saveTriggerRef,
        unselectable: 'unselectable',
        style: {
          ...props.style,
          backgroundColor: `rgba(${RGBA.join(',')})`
        },
        onMouseDown: prevent
      });
    }

    const {
      prefixCls,
      popupStyle,
      getPopupContainer,
      align,
      animation,
      disabled,
      transitionName,
      quickMode
    } = props;

    const arrowCls = classNames({
      [`${prefixCls}-arrow`]: true,
      quick: quickMode
    });

    return (
      <div className={classes.join(' ')}>
        <Trigger
          popup={
            <div className={`${prefixCls}-content`} onKeyDown={this.handleKeyDown}>
              <div className={arrowCls} />
              <div className={`${prefixCls}-inner`}>{this.getPickerElement()}</div>
            </div>
          }
          popupAlign={align}
          builtinPlacements={placements}
          popupPlacement={'topCenter'}
          action={disabled ? [] : ['click']}
          destroyPopupOnHide
          getPopupContainer={getPopupContainer}
          popupStyle={popupStyle}
          popupAnimation={animation}
          popupTransitionName={transitionName}
          popupVisible={state.visible}
          onPopupVisibleChange={this.onVisibleChangeFromTrigger}
          prefixCls={prefixCls}
        >
          {children}
        </Trigger>
      </div>
    );
  }
}

polyfill(ColorPicker);

export default ColorPicker;
