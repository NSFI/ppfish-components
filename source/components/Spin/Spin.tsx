import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import omit from 'omit.js';
import Container from './Container';
import TextLoading from './TextLoading';
import { polyfill } from 'react-lifecycles-compat';

export type SpinSize = 'small' | 'default' | 'large';
export type SpinIndicator = React.ReactElement<any>;

export interface SpinProps {
  prefixCls?: string;
  className?: string;
  spinning?: boolean;
  style?: React.CSSProperties;
  size?: SpinSize;
  tip?: string;
  delay?: number;
  wrapperClassName?: string;
  indicator?: SpinIndicator;
}

export interface SpinState {
  spinning?: boolean;
  notCssAnimationSupported?: boolean;
}

// Render indicator
let defaultIndicator: React.ReactNode = null;

function renderIndicator(props: SpinProps): React.ReactNode {
  const { prefixCls, indicator } = props;
  const dotClassName = `${prefixCls}-dot`;
  if (React.isValidElement(indicator)) {
    return React.cloneElement(indicator as SpinIndicator, {
      className: classNames((indicator as SpinIndicator).props.className, dotClassName),
    });
  }

  if (React.isValidElement(defaultIndicator)) {
    return React.cloneElement(defaultIndicator as SpinIndicator, {
      className: classNames((defaultIndicator as SpinIndicator).props.className, dotClassName),
    });
  }

  return (
    <span className={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

class Spin extends React.Component<SpinProps, SpinState> {
  static Container: typeof Container;
  static TextLoading: typeof TextLoading;

  static defaultProps = {
    prefixCls: 'fishd-spin',
    spinning: true,
    size: 'default' as SpinSize,
    wrapperClassName: '',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    wrapperClassName: PropTypes.string,
    indicator: PropTypes.node,
  };

  static setDefaultIndicator(indicator: React.ReactNode) {
    defaultIndicator = indicator;
  }

  debounceTimeout: number;
  delayTimeout: number;

  constructor(props: SpinProps) {
    super(props);
    const spinning = props.spinning;
    this.state = {
      spinning,
    };
  }

  static getDerivedStateFromProps(nextProps: SpinProps, prevState: SpinState) {
    const { spinning, delay } = nextProps;
    if (prevState.spinning !== spinning) {
      if (spinning == false || isNaN(Number(delay)) || delay === 0) {
        // spinning -> false
        // spinning -> true && delay -> falsy
        return {
          ...prevState,
          spinning,
        };
      }
    }
    return null;
  }

  isNestedPattern() {
    return !!(this.props && this.props.children);
  }

  componentDidMount() {
    const { spinning, delay } = this.props;
    if (spinning && delay && !isNaN(Number(delay))) {
      this.setState({ spinning: false });
      this.delayTimeout = window.setTimeout(() => this.setState({ spinning }), delay);
    }
  }

  componentWillUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }

  componentDidUpdate(prevProps: SpinProps) {
    const spinning = this.props.spinning;
    const prevSpinning = prevProps.spinning;
    const { delay } = this.props;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (prevSpinning && !spinning) {
      this.debounceTimeout = window.setTimeout(() => this.setState({ spinning }), 200);
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    } else {
      if (spinning && delay && !isNaN(Number(delay))) {
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout);
        }
        this.delayTimeout = window.setTimeout(() => this.setState({ spinning }), delay);
      } else if (spinning !== this.state.spinning) {
        this.setState({ spinning });
      }
    }
  }

  render() {
    const { className, size, prefixCls, tip, wrapperClassName, ...restProps } = this.props;
    const { spinning } = this.state;

    const spinClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-spinning`]: spinning,
        [`${prefixCls}-show-text`]: !!tip,
      },
      className,
    );

    // fix https://fb.me/react-unknown-prop
    const divProps = omit(restProps, ['spinning', 'delay', 'indicator']);

    const spinElement = (
      <div {...divProps} className={spinClassName}>
        {renderIndicator(this.props)}
        {tip ? <span className={`${prefixCls}-text`}>{tip}</span> : null}
      </div>
    );
    if (this.isNestedPattern()) {
      let animateClassName = prefixCls + '-nested-loading';
      if (wrapperClassName) {
        animateClassName += ' ' + wrapperClassName;
      }
      const nestedClassName = classNames({
        [`${prefixCls}-nested`]: true,
        [`${prefixCls}-blur`]: spinning,
      });
      return (
        <Animate
          {...divProps}
          component="div"
          className={animateClassName}
          style={null}
          transitionName="fade"
        >
          {spinning && <div key="loading">{spinElement}</div>}
          <div className={nestedClassName} key="nested">
            {this.props.children}
          </div>
        </Animate>
      );
    }
    return spinElement;
  }
}

polyfill(Spin);
export default Spin;
