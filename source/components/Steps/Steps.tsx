/* eslint react/no-did-mount-set-state: 0 */
import * as React from 'react';
import classNames from 'classnames';
import { isFlexSupported } from './utils';
import Step, { StepProps } from './Step';
import useDebounce from '../../hooks/useDebounce';

type StepsProps = {
  direction?: string;
  labelPlacement?;
  size?: string;
  current?: number;
  initial?: number;
} & StepProps;

interface StepsState {
  flexSupported: boolean;
  lastStepOffsetWidth: number;
}

interface StepsInterface extends React.FC<StepsProps> {
  Step: React.FC<StepProps>;
}

const Steps: StepsInterface = props => {
  const {
    prefixCls,
    style = {},
    className,
    children,
    direction,
    labelPlacement,
    iconPrefix,
    status,
    size,
    current,
    progressDot,
    initial,
    icons,
  } = props;

  const [flexSupported, setFlexSupported] = React.useState(true);
  const [lastStepOffsetWidth, setLastStepOffsetWidth] = React.useState(0);

  const calcTimeout = React.useRef<number>();
  const clearCalcTimeout = () => {
    if (calcTimeout.current) {
      clearTimeout(calcTimeout.current);
    }
  };

  React.useEffect(() => {
    if (!isFlexSupported()) {
      setFlexSupported(false);
    }

    return () => {
      clearCalcTimeout();
    };
  }, []);

  const ref = React.useRef<HTMLDivElement>();

  const calcStepOffsetWidth = (): any => {
    if (isFlexSupported()) {
      return;
    }
    // Just for IE9
    const domNode = ref.current;
    if (domNode.children.length > 0) {
      clearCalcTimeout();

      calcTimeout.current = window.setTimeout(() => {
        // +1 for fit edge bug of digit width, like 35.4px
        const offsetWidth = ((domNode.lastChild as HTMLElement).offsetWidth || 0) + 1;
        // Reduce shake bug
        if (
          lastStepOffsetWidth !== offsetWidth &&
          Math.abs(lastStepOffsetWidth - offsetWidth) > 3
        ) {
          setLastStepOffsetWidth(offsetWidth);
        }
      });
    }
  };

  const debounceCalcStepOffsetWidth = useDebounce(calcStepOffsetWidth, { wait: 150 });
  debounceCalcStepOffsetWidth();

  // Render
  const filteredChildren = React.Children.toArray(children).filter(c => !!c);
  const lastIndex = filteredChildren.length - 1;
  const adjustedlabelPlacement = progressDot ? 'vertical' : labelPlacement;
  const classString = classNames(prefixCls, `${prefixCls}-${direction}`, className, {
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
    [`${prefixCls}-dot`]: !!progressDot,
  });

  return (
    <div className={classString} style={style} ref={ref}>
      {React.Children.map(filteredChildren, (child: React.ReactElement<StepsProps>, index) => {
        if (!child) {
          return null;
        }

        const stepNumber = initial + index;
        const childProps = {
          stepNumber: `${stepNumber + 1}`,
          prefixCls,
          iconPrefix,
          wrapperStyle: style,
          progressDot,
          icons,
          ...child.props,
        };

        if (!flexSupported && direction !== 'vertical' && index !== lastIndex) {
          childProps.itemWidth = `${100 / lastIndex}%`;
          childProps.adjustMarginRight = -Math.round(lastStepOffsetWidth / lastIndex + 1);
        }

        // fix tail color
        if (status === 'error' && index === current - 1) {
          childProps.className = `${prefixCls}-next-error`;
        }

        if (!child.props.status) {
          if (stepNumber === current) {
            childProps.status = status;
          } else if (stepNumber < current) {
            childProps.status = 'finish';
          } else {
            childProps.status = 'wait';
          }
        }

        // @ts-ignore
        return React.cloneElement(child, childProps);
      })}
    </div>
  );
};

Steps.Step = Step;

Steps.defaultProps = {
  prefixCls: 'fishd-steps',
  iconPrefix: 'fishd',
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  initial: 0,
  current: 0,
  status: 'process',
  size: '',
  progressDot: false,
};

export default Steps;
