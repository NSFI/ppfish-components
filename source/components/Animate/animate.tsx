import React, {
  Component,
  Children,
  ReactNode,
  ReactChild,
  ReactChildren
} from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import AnimateChild from './child';

const noop = () => {};
const FirstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

export interface AnimateHooks {
  beforeAppear?: () => void
  onAppear?: (node?: HTMLElement) => void
  afterAppear?: (node?: HTMLElement) => void

  beforeEnter?: (node?: HTMLElement) => void
  onEnter?: (node?: HTMLElement) => void
  afterEnter?: (node?: HTMLElement) => void

  beforeLeave?: (node?: HTMLElement) => void
  afterLeave?: (node?: HTMLElement) => void
  onLeave?: (node?: HTMLElement) => void
}

export type AnimateProps  = {
  animation: string | {
    appear: string
    enter: string
    leave: string
  }
  animationAppear: boolean
  component: ReactNode | string
  singleMode: boolean
  children: ReactNode
} & AnimateHooks


export type KeyedReactNode = ReactChild & { key: any }

class Animate extends Component<AnimateProps, any> {
  static propTypes = {
    animation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    animationAppear: PropTypes.bool,
    component: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    singleMode: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    beforeAppear: PropTypes.func,
    onAppear: PropTypes.func,
    afterAppear: PropTypes.func,
    beforeEnter: PropTypes.func,
    onEnter: PropTypes.func,
    afterEnter: PropTypes.func,
    beforeLeave: PropTypes.func,
    onLeave: PropTypes.func,
    afterLeave: PropTypes.func,
  };

  static defaultProps = {
    animationAppear: true,
    component: 'span',
    singleMode: true,
    beforeAppear: noop,
    onAppear: noop,
    afterAppear: noop,
    beforeEnter: noop,
    onEnter: noop,
    afterEnter: noop,
    beforeLeave: noop,
    onLeave: noop,
    afterLeave: noop,
  };

  normalizeNames(names) {
    if (typeof names === 'string') {
      return {
        appear: `${names}-appear`,
        appearActive: `${names}-appear-active`,
        enter: `${names}-enter`,
        enterActive: `${names}-enter-active`,
        leave: `${names}-leave`,
        leaveActive: `${names}-leave-active`,
      };
    }
    if (typeof names === 'object') {
      return {
        appear: names.appear,
        appearActive: `${names.appear}-active`,
        enter: `${names.enter}`,
        enterActive: `${names.enter}-active`,
        leave: `${names.leave}`,
        leaveActive: `${names.leave}-active`,
      };
    }
  }

  render() {
    const {
      animation,
      children,
      animationAppear,
      singleMode,
      component,
      beforeAppear,
      onAppear,
      afterAppear,
      beforeEnter,
      onEnter,
      afterEnter,
      beforeLeave,
      onLeave,
      afterLeave,
      ...others
    } = this.props;

    const animateChildren = Children.map(children, (child: ReactNode) => {
      return (
        <AnimateChild
          // @ts-ignore
          key={child.key}
          names={this.normalizeNames(animation)}
          onAppear={beforeAppear}
          onAppearing={onAppear}
          onAppeared={afterAppear}
          onEnter={beforeEnter}
          onEntering={onEnter}
          onEntered={afterEnter}
          onExit={beforeLeave}
          onExiting={onLeave}
          onExited={afterLeave}
        >
          {child}
        </AnimateChild>
      );
    });

    return (
      <TransitionGroup
        appear={animationAppear}
        component={singleMode ? FirstChild : component}
        {...others}
      >
        {animateChildren}
      </TransitionGroup>
    );
  }
}

export default Animate;
