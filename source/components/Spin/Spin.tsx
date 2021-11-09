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

interface SpinInterface extends React.FC<SpinProps> {
  Container: typeof Container;
  TextLoading: typeof TextLoading;
  setDefaultIndicator: (indicator: React.ReactNode) => void;
}

const Spin: SpinInterface = props => {
  const {
    className,
    size,
    prefixCls,
    tip,
    wrapperClassName,
    spinning,
    delay,
    indicator,
    ...restProps
  } = props;
  const [innerSpinning, setInnerSpinning] = React.useState(props.spinning);

  const delayTimeout = React.useRef<number>();
  React.useEffect(() => {
    // 防止快速切换时，innerSpinning未能展示正确的状态
    clearDelayTimeout();

    if (spinning && delay && !isNaN(Number(delay))) {
      delayTimeout.current = window.setTimeout(() => {
        setInnerSpinning(true);
      }, delay);
    } else {
      setInnerSpinning(spinning);
    }
  }, [spinning, delay]);

  const clearDelayTimeout = () => {
    if (delayTimeout.current) {
      clearTimeout(delayTimeout.current);
    }
  };

  function isNestedPattern() {
    return !!(props && props.children);
  }

  // Render
  const spinClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-spinning`]: innerSpinning,
      [`${prefixCls}-show-text`]: !!tip,
    },
    className,
  );

  // fix https://fb.me/react-unknown-prop
  const divProps = restProps;

  const spinElement = (
    <div {...divProps} className={spinClassName}>
      {renderIndicator(props)}
      {tip ? <span className={`${prefixCls}-text`}>{tip}</span> : null}
    </div>
  );

  if (isNestedPattern()) {
    let animateClassName = prefixCls + '-nested-loading';
    if (wrapperClassName) {
      animateClassName += ' ' + wrapperClassName;
    }
    const nestedClassName = classNames({
      [`${prefixCls}-nested`]: true,
      [`${prefixCls}-blur`]: innerSpinning,
    });
    return (
      <Animate
        {...divProps}
        component="div"
        className={animateClassName}
        style={null}
        transitionName="fade"
      >
        {innerSpinning && <div key="loading">{spinElement}</div>}
        <div className={nestedClassName} key="nested">
          {props.children}
        </div>
      </Animate>
    );
  }

  return spinElement;
};

Spin.defaultProps = {
  prefixCls: 'fishd-spin',
  spinning: true,
  size: 'default' as SpinSize,
  wrapperClassName: '',
};

Spin.Container = Container;
Spin.TextLoading = TextLoading;
Spin.setDefaultIndicator = indicator => {
  defaultIndicator = indicator;
};

export default Spin;
