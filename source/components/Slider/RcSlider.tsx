/* eslint-disable react/prop-types */
import React from 'react';
import warning from 'warning';
import Track from './common/Track';
import createSlider from './common/createSlider';
import * as utils from './utils';
import { polyfill } from 'react-lifecycles-compat';
import type { GenericSliderProps, GenericSliderState } from './interface';

export interface SliderProps extends GenericSliderProps {
  value?: number;
  defaultValue?: number;
  autoFocus?: boolean;
  min?: number;
  max?: number;
  step?: number | null;
  prefixCls?: string;
  onChange?: (value: number) => void;
  onBeforeChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
  vertical?: boolean;
  included?: boolean;
  disabled?: boolean;
  reverse?: boolean;
  minimumTrackStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;
  tabIndex?: number;
  startPoint?: number;
  handle?: (props: {
    className: string;
    prefixCls?: string;
    vertical?: boolean;
    offset: number;
    value: number;
    dragging?: boolean;
    disabled?: boolean;
    min?: number;
    max?: number;
    reverse?: boolean;
    index: number;
    tabIndex?: number;
    style?: React.CSSProperties;
    ref?: React.Ref<any>;
  }) => React.ReactElement;
}

interface SliderStates extends GenericSliderState {
  value: number;
  dragging: boolean;
}
class Slider extends React.Component<SliderProps, SliderStates> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return null;

    const prevValue = prevState.value;
    const value = nextProps.value !== undefined ? nextProps.value : prevValue;
    const val = utils.ensureValueInRange(value, nextProps);
    const nextValue = utils.ensureValuePrecision(val, nextProps);
    if (nextValue === prevValue) return null;

    return { value: nextValue };
  }

  private startValue: any;

  private startPosition: any;

  private prevMovedHandleIndex: any;

  private removeDocumentEvents: any;

  private saveHandle: any;

  private calcValueByPos: any;

  private focus: any;

  private calcOffset: any;

  constructor(props) {
    super(props);

    const defaultValue = props.defaultValue !== undefined ? props.defaultValue : props.min;
    const value = props.value !== undefined ? props.value : defaultValue;

    this.state = {
      value: this.trimAlignValue(value),
      dragging: false,
    };
    if (process.env.NODE_ENV !== 'production') {
      warning(
        !('minimumTrackStyle' in props),
        'minimumTrackStyle will be deprecate, please use trackStyle instead.',
      );
      warning(
        !('maximumTrackStyle' in props),
        'maximumTrackStyle will be deprecate, please use railStyle instead.',
      );
    }
  }

  componentDidMount() {
    const { autoFocus, disabled } = this.props;
    if (autoFocus && !disabled) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let prevValue = prevState.value;
    let currentValue = this.state.value;
    const { onChange } = this.props;
    if (prevValue !== currentValue) {
      if (
        onChange &&
        utils.isValueOutOfRange(currentValue, {
          min: this.props.min,
          max: this.props.max,
        })
      ) {
        onChange(currentValue);
      }
    }
  }

  onChange(state) {
    const props = this.props;
    const isNotControlled = !('value' in props);
    if (isNotControlled) {
      this.setState(state);
    }

    const changedValue = state.value;
    props.onChange(changedValue);
  }

  onStart(position) {
    this.setState({ dragging: true });
    const props = this.props;
    const prevValue = this.getValue();
    props.onBeforeChange(prevValue);

    const value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;

    if (value === prevValue) return;

    this.prevMovedHandleIndex = 0;

    this.onChange({ value });
  }

  onEnd = () => {
    this.setState({ dragging: false });
    this.removeDocumentEvents();
    this.props.onAfterChange(this.getValue());
  };

  onMove(e, position) {
    utils.pauseEvent(e);
    const { value: oldValue } = this.state;
    const value = this.calcValueByPos(position);
    if (value === oldValue) return;

    this.onChange({ value });
  }

  onKeyboard(e) {
    const valueMutator = utils.getKeyboardValueMutator(e);

    if (valueMutator) {
      utils.pauseEvent(e);
      const state = this.state;
      const oldValue = state.value;
      const mutatedValue = valueMutator(oldValue, this.props);
      const value = this.trimAlignValue(mutatedValue);
      if (value === oldValue) return;

      this.onChange({ value });
    }
  }

  getValue() {
    return this.state.value;
  }

  getLowerBound() {
    return this.props.min;
  }

  getUpperBound() {
    return this.state.value;
  }

  trimAlignValue(v, nextProps = {}) {
    const mergedProps = { ...this.props, ...nextProps };
    const val = utils.ensureValueInRange(v, {
      min: mergedProps.min,
      max: mergedProps.max,
    });
    return utils.ensureValuePrecision(val, mergedProps);
  }

  render() {
    const {
      prefixCls,
      vertical,
      included,
      disabled,
      minimumTrackStyle,
      trackStyle,
      handleStyle,
      tabIndex,
      min,
      max,
      handle: handleGenerator,
    } = this.props;
    const { value, dragging } = this.state;
    const offset = this.calcOffset(value);
    const handle = handleGenerator({
      className: `${prefixCls}-handle`,
      prefixCls,
      vertical,
      offset,
      value,
      dragging,
      disabled,
      min,
      max,
      index: 0,
      tabIndex,
      style: handleStyle[0] || handleStyle,
      ref: h => this.saveHandle(0, h),
    });

    const _trackStyle = trackStyle[0] || trackStyle;
    const track = (
      <Track
        className={`${prefixCls}-track`}
        vertical={vertical}
        included={included}
        offset={0}
        length={offset}
        style={{
          ...minimumTrackStyle,
          ..._trackStyle,
        }}
      />
    );

    return { tracks: track, handles: handle };
  }
}

polyfill(Slider);
export default createSlider(Slider);
