import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import {
  supportAni,
  addClass,
  removeClass,
  guid
} from '../../utils';
import { AnimateHooks } from './animate';

const noop = () => { };

function off(
  node: HTMLElement,
  eventName: string,
  callback: (e: Event) => void,
  useCapture = false
) {
  if (node.removeEventListener) {
    node.removeEventListener(eventName, callback, useCapture);
  }
}

function on(
  node: HTMLElement,
  eventName: string,
  callback: (e: Event) => void,
  useCapture = false
) {

  if (node.addEventListener) {
    node.addEventListener(eventName, callback, useCapture);
  }

  return {
    off: () => off(node, eventName, callback, useCapture),
  };
}

function getStyleProperty(node, name) {
  const prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];
  const style = window.getComputedStyle(node);
  let ret = '';
  for (let i = 0; i < prefixes.length; i++) {
    ret = style.getPropertyValue(prefixes[i] + name);
    if (ret) {
      break;
    }
  }
  return ret;
}

export type AnimationNames = {
  appear: string
  appearActive: string
  enter: string
  enterActive: string
  leave: string
  leaveActive: string
}

export type AnimateChildProps =
  | { names: AnimationNames }
  & AnimateHooks
  & {
    onAppearing?: (node?: HTMLElement) => void
    onAppeared?: (node?: HTMLElement) => void
    onEntering?: (node?: HTMLElement) => void
    onEntered?: (node?: HTMLElement) => void
    onExit?: (node?: HTMLElement) => void
    onExiting?: (node?: HTMLElement) => void
    onExited?: (node?: HTMLElement) => void
  }

export interface AnimateChildState {
  node: React.ReactNode
  endListeners: [
    transitionend: [],
    animationend: []
  ]
  timeoutMap: object
}

export interface EndListeners {
  transitionend: any[]
  animationend: any[]
}

export default class AnimateChild extends Component<AnimateChildProps, AnimateChildState> {
  static propTypes = {
    names: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onAppear: PropTypes.func,
    onAppearing: PropTypes.func,
    onAppeared: PropTypes.func,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
  };

  static defaultProps = {
    onAppear: noop,
    onAppearing: noop,
    onAppeared: noop,
    onEnter: noop,
    onEntering: noop,
    onEntered: noop,
    onExit: noop,
    onExiting: noop,
    onExited: noop,
  };

  endListeners: EndListeners = {
    transitionend: [],
    animationend: []
  }
  timeoutMap: {}
  node: HTMLElement = null
  transitionOff: () => void
  animationOff: () => void

  constructor(props) {
    super(props);
    this.endListeners = {
      transitionend: [],
      animationend: [],
    };
    this.timeoutMap = {};
  }

  componentWillUnmount() {
    Object.keys(this.endListeners).forEach(eventName => {
      this.endListeners[eventName].forEach(listener => {
        off(this.node, eventName, listener);
      });
    });
    this.endListeners = {
      transitionend: [],
      animationend: [],
    };
  }

  generateEndListener = (node, done, eventName, id) => {
    const _this = this;
    return function endListener(e) {
      if (e && e.target === node) {
        if (_this.timeoutMap[id]) {
          clearTimeout(_this.timeoutMap[id]);
          delete _this.timeoutMap[id];
        }

        done();
        off(node, eventName, endListener);
        const listeners = _this.endListeners[eventName];
        const index = listeners.indexOf(endListener);
        index > -1 && listeners.splice(index, 1);
      }
    };
  };

  addEndListener = (node, done) => {
    if (supportAni.transition || supportAni.animation) {
      const id = guid();

      this.node = node;
      if (supportAni.transition) {
        const transitionEndListener = this.generateEndListener(
          node,
          done,
          'transitionend',
          id
        );
        on(node, 'transitionend', transitionEndListener);
        this.endListeners.transitionend.push(transitionEndListener);
      }
      if (supportAni.animation) {
        const animationEndListener = this.generateEndListener(
          node,
          done,
          'animationend',
          id
        );
        on(node, 'animationend', animationEndListener);
        this.endListeners.animationend.push(animationEndListener);
      }

      setTimeout(() => {
        const transitionDelay =
          parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
        const transitionDuration =
          parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
        const animationDelay =
          parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
        const animationDuration =
          parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
        const time = Math.max(
          transitionDuration + transitionDelay,
          animationDuration + animationDelay
        );

        this.timeoutMap[id] = setTimeout(() => {
          done();
        }, time * 1000 + 200);
      }, 15);
    } else {
      done();
    }
  };

  removeEndtListener = () => {
    this.transitionOff && this.transitionOff();
    this.animationOff && this.animationOff();
  };

  removeClassNames = (node, names) => {
    Object.keys(names).forEach(key => {
      removeClass(node, names[key]);
    });
  };

  handleEnter = (node, isAppearing) => {
    const { names } = this.props;

    if (names) {
      this.removeClassNames(node, names);
      const className = isAppearing ? 'appear' : 'enter';
      addClass(node, names[className]);
    }

    const hook = isAppearing ? this.props.onAppear : this.props.onEnter;
    hook(node);
  };

  handleEntering = (node, isAppearing) => {
    setTimeout(() => {
      const { names } = this.props;

      if (names) {
        const className = isAppearing ? 'appearActive' : 'enterActive';
        addClass(node, names[className]);
      }

      const hook = isAppearing ?
        this.props.onAppearing :
        this.props.onEntering;
      hook(node);
    }, 10);
  };

  handleEntered = (node, isAppearing) => {
    const { names } = this.props;

    if (names && typeof names === 'object') {
      const classNames = isAppearing
        ? [names.appear, names.appearActive]
        : [names.enter, names.enterActive];

      classNames.forEach(className => {
        removeClass(node, className);
      });
    }

    const hook = isAppearing ? this.props.onAppeared : this.props.onEntered;
    hook(node);
  };

  handleExit = (node) => {
    const { names } = this.props;

    if (names) {
      this.removeClassNames(node, names);
      addClass(node, names.leave);
    }

    this.props.onExit(node);
  };

  handleExiting = (node) => {
    setTimeout(() => {
      const {
        names
      } = this.props;
      if (names) {
        addClass(node, names.leaveActive);
      }
      this.props.onExiting(node);
    }, 10);
  };

  handleExited = (node) => {
    const { names } = this.props;

    if (names) {
      [names.leave, names.leaveActive].forEach(className => {
        removeClass(node, className);
      });
    }

    this.props.onExited(node);
  };

  render() {
    const {
      names,
      onAppear,
      onAppeared,
      onAppearing,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...others
    } = this.props;

    return (
      <Transition
        {...others}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
        onExited={this.handleExited}
        addEndListener={this.addEndListener}
      />
    );
  }
}
