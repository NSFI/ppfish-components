import * as React from 'react';
import {createElement, Component} from 'react';
import omit from 'omit.js';
import {polyfill} from 'react-lifecycles-compat';
import classNames from 'classnames';

function getNumberArray(num: string | number | undefined | null) {
  return num ?
    num.toString()
      .split('')
      .reverse()
      .map(i => Number(i)) : [];
}

export interface ScrollNumberProps {
  prefixCls?: string;
  className?: string;
  count?: string | number | null;
  component?: string;
  onAnimated?: Function;
  style?: React.CSSProperties;
  title?: string | number | null;
}

export interface ScrollNumberState {
  animateStarted?: boolean;
  count?: string | number | null;
  prevProps: ScrollNumberProps,
  lastCount?: string | number | null;
  nextCount?: string | number | null;
}

class ScrollNumber extends Component<ScrollNumberProps, ScrollNumberState> {
  static defaultProps = {
    prefixCls: 'fishd-scroll-number',
    count: null,
    onAnimated() {
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {prevProps: nextProps};
    const {prevProps = {}} = prevState;
    if ('count' in nextProps) {
      if (prevProps.count === nextProps.count) {
        return newState;
      }
      return {
        ...newState,
        animateStarted: true,
        lastCount: prevProps.count,
        nextCount: nextProps.count,
      }
    }
  }

  constructor(props: ScrollNumberProps) {
    super(props);
    this.state = {
      prevProps: props,
      animateStarted: false,
      count: props.count,
      lastCount: props.count,
      nextCount: undefined,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if ('count' in this.props) {
      if (prevState.animateStarted === false && this.state.animateStarted === true) {
        setTimeout(() => {
          this.setState({
            animateStarted: false,
            count: this.state.nextCount,
          }, () => {
            const onAnimated = this.props.onAnimated;
            if (onAnimated) {
              onAnimated();
            }
          });
        }, 5)
      }
    }
  }

  getPositionByNum(num: number, i: number) {
    if (this.state.animateStarted) {
      return 10 + num;
    }
    const currentDigit = getNumberArray(this.state.count)[i];
    const lastDigit = getNumberArray(this.state.lastCount)[i];
    // 同方向则在同一侧切换数字
    if (this.state.count! > this.state.lastCount) {
      if (currentDigit >= lastDigit) {
        return 10 + num;
      }
      return 20 + num;
    }
    if (currentDigit <= lastDigit) {
      return 10 + num;
    }
    return num;
  }

  renderNumberList(position: number) {
    const childrenToReturn: React.ReactElement<any>[] = [];
    for (let i = 0; i < 30; i++) {
      const currentClassName = (position === i) ? 'current' : '';
      childrenToReturn.push(<p key={i.toString()} className={currentClassName}>{i % 10}</p>);
    }
    return childrenToReturn;
  }

  renderCurrentNumber(num: number, i: number) {
    const position = this.getPositionByNum(num, i);
    const removeTransition = this.state.animateStarted ||
      (getNumberArray(this.state.lastCount)[i] === undefined);
    return createElement('span', {
      className: `${this.props.prefixCls}-only`,
      style: {
        transition: removeTransition ? 'none' : undefined,
        msTransform: `translateY(${-position * 100}%)`,
        WebkitTransform: `translateY(${-position * 100}%)`,
        transform: `translateY(${-position * 100}%)`,
      },
      key: i,
    }, this.renderNumberList(position));
  }

  renderNumberElement() {
    const state = this.state;
    if (!state.count || isNaN(state.count as number)) {
      return state.count;
    }
    return getNumberArray(state.count)
      .map((num, i) => this.renderCurrentNumber(num, i)).reverse();
  }

  render() {
    const {prefixCls, className, style, title, component = 'sup'} = this.props;
    // fix https://fb.me/react-unknown-prop
    const restProps = omit(this.props, [
      'count',
      'onAnimated',
      'component',
      'prefixCls',
    ]);
    const newProps = {
      ...restProps,
      className: classNames(prefixCls, className),
      title: title as string,
    };
    // allow specify the border
    // mock border-color by box-shadow for compatible with old usage:
    // <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />
    if (style && style.borderColor) {
      newProps.style.boxShadow = `0 0 0 1px ${style.borderColor} inset`;
    }
    return createElement(
      component as any,
      newProps,
      this.renderNumberElement(),
    );
  }
}

polyfill(ScrollNumber);

export default ScrollNumber;
