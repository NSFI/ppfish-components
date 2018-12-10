import React from 'react';
import PropTypes from 'prop-types';
import typeColor from './utils/validationColor';
import ColorPickerPanel from './Panel';
import Trigger from 'rc-trigger';
import placements from "./placements";
import Color from "./helpers/color";
import classNames from 'classnames';

function noop() {
}

export default class QuickPanel extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    color: typeColor, // Hex string
    defaultColor: typeColor, // Hex string
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onMount: PropTypes.func,
    prefixCls: PropTypes.string,
    style: PropTypes.object,
    colorMap: PropTypes.array,
    quickModeCustom: PropTypes.bool,
    enableHistory: PropTypes.bool,
    maxHistory: PropTypes.number,
    enableAlpha: PropTypes.bool,
    defaultAlpha: PropTypes.number,
    alpha: PropTypes.number,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    mode: PropTypes.oneOf(['RGB', 'HSL', 'HSB']),
    colorHistory: PropTypes.array,
    getPopupContainer: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    mode: 'RGB',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onMount: noop,
    onOpen: noop,
    onClose: noop,
    defaultAlpha: 100,
    prefixCls: 'fishd-color-picker-quick-panel',
    quickModeCustom: true,
    enableAlpha: false,
    maxHistory: 8,
    defaultColor: '#e93334',
    style: {},
    colorHistory: [],
    colorMap: ['#e93334', '#e86819', '#ff9b25', '#654520', '#e0c5a6', '#ffe637', '#009a20'],
  };

  constructor(props) {
    super(props);

    const alpha = typeof props.alpha === 'undefined'
      ? props.defaultAlpha
      : Math.min(props.alpha, props.defaultAlpha);


    this.state = {
      color: props.color || props.defaultColor,
      alpha,
      open: false,
      colorHistory: props.colorHistory
    };
  }

  componentDidMount() {
    this.props.onMount(this.ref);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color) {
      this.setState({
        color: nextProps.color,
      });
    }
    if (nextProps.alpha !== undefined) {
      this.setState({
        alpha: nextProps.alpha,
      });
    }
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

  handleChange = (color, alpha) => {
    this.setState({color});
    this.props.onChange({
      color: color,
      alpha: alpha,
      open: false
    });
  };

  onChange = (colors) => {
    this.setState({...colors});
  };

  onVisibleChange = (open) => {
    this.setOpen(open);
  };

  setOpen = (open, callback) => {
    if (this.state.open !== open) {
      this.setState({
          open: open
        },
        () => {
          if (typeof callback === 'function') callback();
          const {enableHistory, maxHistory, onOpen, onClose, onChange} = this.props;
          if (this.state.open) {
            onOpen(this.state);
          } else {
            // history record
            if (enableHistory) {
              const {color, alpha, colorHistory} = this.state;
              if (colorHistory.length && color === colorHistory[0].color && alpha === colorHistory[0].alpha) return;
              this.setState({
                colorHistory: colorHistory.length >= maxHistory ?
                  [{color, alpha}, ...colorHistory.slice(0, -1)] : [{color, alpha}, ...colorHistory]
              }, () => {
                onClose(this.state);
              });
            } else {
              onClose(this.state);
            }
            onChange(this.state);
          }
        },
      );
    }
  };

  getPickerElement = () => {
    const {mode, className, enableAlpha, enableHistory, maxHistory} = this.props;
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
    const {prefixCls, colorMap, quickModeCustom, getPopupContainer} = this.props;
    const [r, g, b] = new Color(this.state.color).RGB;
    const RGBA = [r, g, b];

    const customChecked = !colorMap.includes(this.state.color);

    RGBA.push(this.state.alpha / 100);

    return (
      <div
        ref={(ref) => this.ref = ref}
        className={[prefixCls, this.props.className].join(' ')}
        style={this.props.style}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        tabIndex="0"
      >
        <div className={`${prefixCls}-inner`}>
          {colorMap.map((color, i) => {
              const spnClasses = classNames({
                [`${prefixCls}-color-spn`]: true,
                [`${prefixCls}-color-spn-active`]: this.state.color === color,
              });
              return (
                <span key={i}
                      className={spnClasses}
                      style={{background: color}}
                      onClick={() => this.handleChange(color, 100)}/>
              );
            }
          )}
          {
            quickModeCustom &&
            <Trigger
              popup={this.getPickerElement()}
              builtinPlacements={placements}
              popupPlacement={'rightTop'}
              action={['click']}
              destroyPopupOnHide
              getPopupContainer={getPopupContainer}
              popupVisible={this.state.open}
              onPopupVisibleChange={this.onVisibleChange}
              prefixCls={`fishd-color-picker-panel`}
            >
              <span className={`${prefixCls}-custom-btn`}>
                {
                  customChecked &&
                  <span className={`${prefixCls}-custom-btn-color`} style={{
                    backgroundColor: `rgba(${RGBA.join(',')})`
                  }}
                  />
                }
                <span className={`${prefixCls}-custom-btn-text`}>自定义</span>
              </span>
            </Trigger>
          }
        </div>
      </div>
    );
  }
}
