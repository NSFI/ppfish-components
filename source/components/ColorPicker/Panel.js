import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Color from './helpers/color';
import typeColor from './utils/validationColor';
import Board from './Board';
import Preview from './Preview';
import Ribbon from './Ribbon';
import Alpha from './Alpha';
import Params from './Params';
import History from './History';

function noop() {
}

export default class Panel extends React.Component {

  static propTypes = {
    alpha: PropTypes.number,
    className: PropTypes.string,
    color: typeColor, // Hex string
    colorHistory: PropTypes.array,
    defaultAlpha: PropTypes.number,
    defaultColor: typeColor, // Hex string
    enableAlpha: PropTypes.bool,
    enableHistory: PropTypes.bool,
    maxHistory: PropTypes.number,
    mode: PropTypes.oneOf(['RGB', 'HSL', 'HSB']),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onMount: PropTypes.func,
    prefixCls: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    colorHistory: [],
    defaultAlpha: 100,
    defaultColor: '#e93334',
    enableAlpha: false,
    enableHistory: true,
    maxHistory: 8,
    mode: 'RGB',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onMount: noop,
    prefixCls: 'fishd-color-picker-panel',
    style: {},
  };

  constructor(props) {
    super(props);

    const alpha = typeof props.alpha === 'undefined'
      ? props.defaultAlpha
      : Math.min(props.alpha, props.defaultAlpha);

    const color = new Color(props.color || props.defaultColor);

    this.state = {
      color,
      alpha
    };
  }

  componentDidMount() {
    this.props.onMount(this.ref);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color) {
      const color = new Color(nextProps.color);
      this.setState({
        color,
      });
    }
    if (nextProps.alpha !== undefined) {
      this.setState({
        alpha: nextProps.alpha,
      });
    }
  }

  onSystemColorPickerOpen = e => {
    // only work with broswer which support color input
    if (e.target.type === 'color') {
      this.systemColorPickerOpen = true;
    }
  };

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

  /**
   * 响应 alpha 的变更
   * @param  {Number} alpha Range 0~100
   */
  handleAlphaChange = alpha => {
    const {color} = this.state;
    color.alpha = alpha;

    this.setState({
      alpha,
      color,
    });
    this.props.onChange({
      color: color.toHexString(),
      alpha,
    });
  };

  /**
   * color change
   * @param  {Object}  color      tinycolor instance
   */
  handleChange = (color) => {
    const {alpha} = this.state;
    color.alpha = alpha;

    this.setState({color});
    this.props.onChange({
      color: color.toHexString(),
      alpha: color.alpha,
    });
  };

  /**
   * 响应 History 的变更
   * @param  {Object} obj color and alpha
   */
  handleHistoryClick = (obj) => {
    this.setState({
      color: new Color(obj.color),
      alpha: obj.alpha
    });
    this.props.onChange({
      color: obj.color,
      alpha: obj.alpha
    });
  };

  render() {
    const {prefixCls, enableAlpha, enableHistory, colorHistory} = this.props;
    const {color, alpha} = this.state;

    const wrapClasses = classNames({
      [`${prefixCls}-wrap`]: true,
      [`${prefixCls}-wrap-has-alpha`]: enableAlpha,
    });

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
          <Board rootPrefixCls={prefixCls} color={color} onChange={this.handleChange}/>
          <div className={wrapClasses}>
            <div className={`${prefixCls}-wrap-ribbon`}>
              <Ribbon rootPrefixCls={prefixCls} color={color} onChange={this.handleChange}/>
            </div>
            {enableAlpha &&
            <div className={`${prefixCls}-wrap-alpha`}>
              <Alpha
                rootPrefixCls={prefixCls}
                alpha={alpha}
                color={color}
                onChange={this.handleAlphaChange}
              />
            </div>}
            <div className={`${prefixCls}-wrap-preview`}>
              <Preview
                rootPrefixCls={prefixCls}
                alpha={alpha}
                onChange={this.handleChange}
                onInputClick={this.onSystemColorPickerOpen}
                color={color}
              />
            </div>
          </div>
          <div className={`${prefixCls}-wrap`} style={{height: 40, marginTop: 6}}>
            <Params
              rootPrefixCls={prefixCls}
              color={color}
              alpha={alpha}
              onAlphaChange={this.handleAlphaChange}
              onChange={this.handleChange}
              mode={this.props.mode}
              enableAlpha={this.props.enableAlpha}
              enableHistory={this.props.enableHistory}
            />
          </div>
          {enableHistory && <div className={`${prefixCls}-wrap-history`}>
            <History
              prefixCls={prefixCls}
              colorHistory={colorHistory}
              onHistoryClick={this.handleHistoryClick}
              maxHistory={this.props.maxHistory}
            />
          </div>}
        </div>
      </div>
    );
  }
}
