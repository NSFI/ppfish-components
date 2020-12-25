// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

import { KeyCode } from '../../utils';
import typeColor from './utils/validationColor';
import ColorPickerPanel from './Panel';
import placements from './placements';
import Color from './helpers/color';
import Icon from '../Icon/index';
import { ColorPickerProps } from './ColorPicker';
import { ParamsColor } from './Params';

function noop() {}

type QuickPanelProps = Omit<ColorPickerProps, 'children'> & {
  __useInComponent: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onMount?: (ref: HTMLElement) => void;
  userSelectColor: boolean;
};

export type ColorType = string | ParamsColor | Color;

interface QuickPanelState {
  color?: ColorType;
  alpha?: number;
  visible?: boolean;
  colorHistory?: ColorType[];
}

class QuickPanel extends React.Component<QuickPanelProps, QuickPanelState> {
  _blurTimer: any;
  ref: HTMLDivElement;
  systemColorPickerOpen: boolean;

  static propTypes = {
    __useInComponent: PropTypes.bool,
    alpha: PropTypes.number,
    className: PropTypes.string,
    color: typeColor, // Hex string
    colorHistory: PropTypes.array,
    colorMap: PropTypes.array,
    defaultAlpha: PropTypes.number,
    defaultColor: typeColor, // Hex string
    disabled: PropTypes.bool,
    enableAlpha: PropTypes.bool,
    enableHistory: PropTypes.bool,
    getPopupContainer: PropTypes.func,
    maxHistory: PropTypes.number,
    mode: PropTypes.oneOf(['RGB', 'HSL', 'HSB']),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onMount: PropTypes.func,
    onVisibleChange: PropTypes.func,
    prefixCls: PropTypes.string,
    userSelectColor: PropTypes.bool,
    style: PropTypes.object,
    popupStyle: PropTypes.object,
    esc: PropTypes.bool
  };

  static defaultProps = {
    __useInComponent: false,
    className: '',
    colorHistory: [],
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
      '#3dd9af',
      '#333333',
      '#666666',
      '#999999',
      '#cccccc'
    ],
    defaultAlpha: 100,
    defaultColor: '#33bbff',
    enableAlpha: false,
    enableHistory: true,
    maxHistory: 8,
    mode: 'RGB',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onMount: noop,
    onVisibleChange: noop,
    prefixCls: 'fishd-color-picker-quick-panel',
    userSelectColor: true,
    style: {},
    popupStyle: {},
    esc: true
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState: QuickPanelState = {};

    if ('color' in nextProps) {
      newState.color = nextProps.color;
    }

    if ('alpha' in nextProps && nextProps.alpha !== undefined) {
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
      colorHistory: props.colorHistory
    };
  }

  componentDidMount() {
    this.props.onMount(this.ref as HTMLElement);
  }

  onFocus = () => {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    } else {
      this.props.onFocus();
    }
  };

  onBlur = () => {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
    }
    this._blurTimer = setTimeout(() => {
      // if is system color picker open, then stop run blur
      if (this.systemColorPickerOpen) {
        this.systemColorPickerOpen = false;
        return;
      }

      this.props.onBlur();
    }, 100);
  };

  handleChange = (color, alpha, fireChange = true) => {
    const { disabled, onChange, onVisibleChange, __useInComponent } = this.props;
    if (disabled) return;
    this.setState({ color });
    onChange({ color: color, alpha: alpha });
    // colorPicker弹层中使用，点击时触发visibleChange
    if (__useInComponent && fireChange) {
      onVisibleChange(false);
    }
  };

  onChange = colors => {
    this.setState({ ...colors });
  };

  onVisibleChangeFromTrigger = visible => {
    this.setVisible(visible);
    //自定义选择颜色弹层关闭时才颜色改变确认
    if (!visible) {
      this.props.onChange(this.state);
    }
  };

  onPanelMount = (panelDOMRef: HTMLElement) => {
    if (this.state.visible) {
      setTimeout(() => {
        panelDOMRef.focus();
      }, 0);
    }
  };

  handleKeyDown = e => {
    const keyCode = e.keyCode;
    if ((keyCode === KeyCode.ESC && this.props.esc) || keyCode === KeyCode.ENTER) {
      this.setVisible(false, () => {
        this.props.onChange(this.state);
      });
    }
  };

  handleSpnKeyDown = e => {
    const keyCode = e.keyCode;
    const { colorMap } = this.props;
    const { color, visible } = this.state;
    const activeIndex = colorMap.indexOf(color);
    if (activeIndex === -1 || visible) return;
    // LEFT/RIGHT触发选择
    if (keyCode === KeyCode.LEFT) {
      this.handleChange(
        colorMap[activeIndex - 1 === -1 ? colorMap.length - 1 : activeIndex - 1],
        100,
        false
      );
    }
    if (keyCode === KeyCode.RIGHT) {
      this.handleChange(
        colorMap[activeIndex + 1 === colorMap.length ? 0 : activeIndex + 1],
        100,
        false
      );
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
          if (
            colorHistory.length &&
            color === colorHistory[0].color &&
            alpha === colorHistory[0].alpha
          )
            return;
          this.setState({
            colorHistory:
              colorHistory.length >= maxHistory
                ? [{ color, alpha }, ...colorHistory.slice(0, -1)]
                : [{ color, alpha }, ...colorHistory]
          });
        }
      });
    }
  };

  getPickerElement = () => {
    const { mode, className, enableAlpha, enableHistory, maxHistory } = this.props;
    return (
      <ColorPickerPanel
        onMount={this.onPanelMount}
        defaultColor={this.state.color}
        alpha={this.state.alpha}
        enableAlpha={enableAlpha}
        prefixCls={`fishd-color-picker-panel`}
        onChange={this.onChange}
        onBlur={this.onBlur}
        mode={mode}
        className={className}
        colorHistory={this.state.colorHistory}
        enableHistory={enableHistory}
        maxHistory={maxHistory}
      />
    );
  };

  render() {
    const {
      prefixCls,
      colorMap,
      userSelectColor,
      getPopupContainer,
      disabled,
      __useInComponent,
      popupStyle
    } = this.props;
    const [r, g, b] = new Color(this.state.color).RGB;
    const RGBA = [r, g, b];

    const customChecked = !colorMap.includes(this.state.color);

    RGBA.push(this.state.alpha / 100);

    return (
      <div
        ref={ref => (this.ref = ref)}
        className={[prefixCls, this.props.className].join(' ')}
        style={this.props.style}
        onFocus={this.onFocus}
        onKeyDown={this.handleSpnKeyDown}
        onBlur={this.onBlur}
        tabIndex={0}
      >
        <div className={`${prefixCls}-inner`}>
          {colorMap.map((color, i) => {
            const spnClasses = classNames({
              [`${prefixCls}-color-spn`]: true,
              [`${prefixCls}-color-spn-active`]: this.state.color === color
            });
            return (
              <span
                key={i}
                className={spnClasses}
                style={{ background: color }}
                onClick={() => this.handleChange(color, 100)}
              />
            );
          })}
          {userSelectColor && !__useInComponent && (
            <Trigger
              popup={
                <div className={`${prefixCls}-content`} onKeyDown={this.handleKeyDown}>
                  <div className={`${prefixCls}-arrow`} />
                  <div className={`${prefixCls}-inner`}>{this.getPickerElement()}</div>
                </div>
              }
              builtinPlacements={placements}
              popupPlacement={'topCenter'}
              action={disabled ? [] : ['click']}
              destroyPopupOnHide
              popupStyle={popupStyle}
              getPopupContainer={getPopupContainer}
              popupVisible={this.state.visible}
              onPopupVisibleChange={this.onVisibleChangeFromTrigger}
              prefixCls={`fishd-color-picker-panel`}
            >
              <span className={`${prefixCls}-custom-btn`}>
                <span
                  className={`${prefixCls}-custom-btn-text`}
                  style={
                    customChecked
                      ? {
                          backgroundColor: `rgba(${RGBA.join(',')})`,
                          color: '#fff',
                          textShadow: '0 0.5px 0.5px rgba(0,0,0,50%)'
                        }
                      : {}
                  }
                >
                  {customChecked && <Icon type="check-line-bold" />}自定义
                </span>
              </span>
            </Trigger>
          )}
        </div>
      </div>
    );
  }
}

polyfill(QuickPanel);

export default QuickPanel;
