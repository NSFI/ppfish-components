import React from 'react';
import { addEventListener } from '../../../utils';
import classNames from 'classnames';
import warning from 'warning';
import Steps from './Steps';
import Marks from './Marks';
import Handle from '../RcHandle';
import * as utils from '../utils';
import Tip from './Tip';
import type { GenericSliderProps, GenericSliderState, GenericSlider } from '../interface';

function noop() {}

export default function createSlider<
  Props extends GenericSliderProps,
  State extends GenericSliderState,
>(Component: GenericSlider<Props, State>): React.ComponentClass<Props, State> {
  return class ComponentEnhancer extends Component {
    static displayName = `ComponentEnhancer(${Component.displayName})`;

    static defaultProps = {
      ...Component.defaultProps,
      prefixCls: 'rc-slider',
      className: '',
      min: 0,
      max: 100,
      step: 1,
      marks: {},
      handle({ index, ...restProps }) {
        delete restProps.dragging;
        return <Handle {...restProps} key={index} />;
      },
      onBeforeChange: noop,
      onChange: noop,
      onAfterChange: noop,
      included: true,
      disabled: false,
      dots: false,
      vertical: false,
      trackStyle: [{}],
      handleStyle: [{}],
      railStyle: {},
      dotStyle: {},
      activeDotStyle: {},
    };

    handlesRefs: any;

    sliderRef: HTMLDivElement;

    document: Document;

    dragOffset: number;

    prevMovedHandleIndex: number;

    onTouchMoveListener: any;

    onTouchUpListener: any;

    onMouseMoveListener: any;

    onMouseUpListener: any;

    onMove: any;

    tipPercent: any;

    tipOffset: any;

    tipVisible: boolean;

    constructor(props) {
      super(props);

      if (process.env.NODE_ENV !== 'production') {
        const { step, max, min } = props;
        warning(
          step && Math.floor(step) === step ? (max - min) % step === 0 : true,
          'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)',
          max - min,
          step,
        );
      }
      this.handlesRefs = {};
      this.tipPercent = 0;
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) super.componentWillUnmount();
      this.removeDocumentEvents();
    }

    componentDidMount() {
      // Snapshot testing cannot handle refs, so be sure to null-check this.
      this.document = this.sliderRef && this.sliderRef.ownerDocument;
    }

    onMouseDown = e => {
      if (e.button !== 0) {
        return;
      }

      const isVertical = this.props.vertical;
      let position = utils.getMousePosition(isVertical, e);
      if (!utils.isEventFromHandle(e, this.handlesRefs)) {
        this.dragOffset = 0;
      } else {
        const handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
      }
      this.removeDocumentEvents();
      this.onStart(position);
      this.addDocumentMouseEvents();
    };

    onTouchStart = e => {
      if (utils.isNotTouchEvent(e)) return;

      const isVertical = this.props.vertical;
      let position = utils.getTouchPosition(isVertical, e);
      if (!utils.isEventFromHandle(e, this.handlesRefs)) {
        this.dragOffset = 0;
      } else {
        const handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
      }
      this.onStart(position);
      this.addDocumentTouchEvents();
      utils.pauseEvent(e);
    };

    onFocus = e => {
      const { onFocus, vertical } = this.props;
      if (utils.isEventFromHandle(e, this.handlesRefs)) {
        const handlePosition = utils.getHandleCenterPosition(vertical, e.target);
        this.dragOffset = 0;
        this.onStart(handlePosition);
        utils.pauseEvent(e);
        if (onFocus) {
          onFocus(e);
        }
      }
    };

    onBlur = e => {
      const { onBlur } = this.props;
      this.onEnd(e);
      if (onBlur) {
        onBlur(e);
      }
    };

    addDocumentTouchEvents() {
      // just work for Chrome iOS Safari and Android Browser
      this.onTouchMoveListener = addEventListener(this.document, 'touchmove', this.onTouchMove);
      this.onTouchUpListener = addEventListener(this.document, 'touchend', this.onEnd);
    }

    addDocumentMouseEvents() {
      this.onMouseMoveListener = addEventListener(this.document, 'mousemove', this.onMouseMove);
      this.onMouseUpListener = addEventListener(this.document, 'mouseup', this.onEnd);
    }

    removeDocumentEvents() {
      /* eslint-disable no-unused-expressions */
      this.onTouchMoveListener && this.onTouchMoveListener.remove();
      this.onTouchUpListener && this.onTouchUpListener.remove();

      this.onMouseMoveListener && this.onMouseMoveListener.remove();
      this.onMouseUpListener && this.onMouseUpListener.remove();
      /* eslint-enable no-unused-expressions */
    }

    onMouseUp = () => {
      if (this.handlesRefs[this.prevMovedHandleIndex]) {
        this.handlesRefs[this.prevMovedHandleIndex].clickFocus();
      }
    };

    onMouseMoveTooltip = e => {
      this.tipOffset = utils.getMousePosition(this.props.vertical, e) - this.getSliderStart();
      this.tipPercent = this.calcValueByPos(utils.getMousePosition(this.props.vertical, e));
      this.tipVisible = !(this.tipOffset > this.getSliderLength() || this.tipOffset < 0);
      this.forceUpdate();
    };

    onMouseLeaveTooltip = () => {
      this.tipVisible = false;
      this.forceUpdate();
    };

    onMouseEnterTooltip = () => {
      this.tipVisible = true;
      this.forceUpdate();
    };

    onMouseMove = e => {
      if (!this.sliderRef) {
        this.onEnd();
        return;
      }
      const position = utils.getMousePosition(this.props.vertical, e);
      this.onMove(e, position - this.dragOffset);
    };

    onTouchMove = e => {
      if (utils.isNotTouchEvent(e) || !this.sliderRef) {
        this.onEnd();
        return;
      }

      const position = utils.getTouchPosition(this.props.vertical, e);
      this.onMove(e, position - this.dragOffset);
    };

    onKeyDown = e => {
      if (this.sliderRef && utils.isEventFromHandle(e, this.handlesRefs)) {
        this.onKeyboard(e);
      }
    };

    focus() {
      if (!this.props.disabled) {
        this.handlesRefs[0].focus();
      }
    }

    blur() {
      if (!this.props.disabled) {
        this.handlesRefs[0].blur();
      }
    }

    getSliderStart() {
      const slider = this.sliderRef;
      const rect = slider.getBoundingClientRect();

      return this.props.vertical ? rect.top : rect.left;
    }

    getSliderLength() {
      const slider = this.sliderRef;
      if (!slider) {
        return 0;
      }

      const coords = slider.getBoundingClientRect();
      return this.props.vertical ? coords.height : coords.width;
    }

    calcValue(offset) {
      const { vertical, min, max } = this.props;
      const ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
      const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
      return value;
    }

    calcValueByPos(position) {
      const pixelOffset = position - this.getSliderStart();
      const nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
      return nextValue;
    }

    calcOffset(value) {
      const { min, max } = this.props;
      const ratio = (value - min) / (max - min);
      return ratio * 100;
    }

    saveSlider = slider => {
      this.sliderRef = slider;
    };

    saveHandle(index, handle) {
      this.handlesRefs[index] = handle;
    }

    onClickMarkLabel = (e, value) => {
      e.stopPropagation();
      this.onChange({ value });
    };

    render() {
      const {
        prefixCls,
        className,
        marks,
        dots,
        step,
        included,
        disabled,
        vertical,
        min,
        max,
        children,
        maximumTrackStyle,
        style,
        railStyle,
        dotStyle,
        activeDotStyle,
        tipMode,
        tipFormatter,
      } = this.props;
      const { tracks, handles } = super.render() as any;
      const showTipComponent = !disabled && tipMode === 'all';
      let tipComponentListener = {};
      if (showTipComponent) {
        tipComponentListener = {
          onMouseMove: disabled ? noop : this.onMouseMoveTooltip,
          onMouseLeave: disabled ? noop : this.onMouseLeaveTooltip,
          onMouseEnter: disabled ? noop : this.onMouseEnterTooltip,
        };
      }
      const sliderClassName = classNames(prefixCls, {
        [`${prefixCls}-with-marks`]: Object.keys(marks).length,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-vertical`]: vertical,
        [className]: className,
      });
      return (
        <div
          ref={this.saveSlider}
          className={sliderClassName}
          {...tipComponentListener}
          onTouchStart={disabled ? noop : this.onTouchStart}
          onMouseDown={disabled ? noop : this.onMouseDown}
          onMouseUp={disabled ? noop : this.onMouseUp}
          onKeyDown={disabled ? noop : this.onKeyDown}
          onFocus={disabled ? noop : this.onFocus}
          onBlur={disabled ? noop : this.onBlur}
          style={style}
        >
          {
            // 添加滚动条tooltip功能，tipMode="all"
            showTipComponent && (
              <Tip
                prefixCls={prefixCls}
                title={tipFormatter ? tipFormatter(this.tipPercent) : ''}
                position={this.tipOffset}
                visible={this.tipVisible}
                vertical={this.props.vertical}
              />
            )
          }
          <div
            className={`${prefixCls}-rail`}
            style={{
              ...maximumTrackStyle,
              ...railStyle,
            }}
          />
          {tracks}
          <Steps
            prefixCls={prefixCls}
            vertical={vertical}
            marks={marks}
            dots={dots}
            step={step}
            included={included}
            lowerBound={this.getLowerBound()}
            upperBound={this.getUpperBound()}
            max={max}
            min={min}
            dotStyle={dotStyle}
            activeDotStyle={activeDotStyle}
          />
          {handles}
          <Marks
            className={`${prefixCls}-mark`}
            onClickLabel={disabled ? noop : this.onClickMarkLabel}
            vertical={vertical}
            marks={marks}
            included={included}
            lowerBound={this.getLowerBound()}
            upperBound={this.getUpperBound()}
            max={max}
            min={min}
          />
          {children}
        </div>
      );
    }
  };
}
