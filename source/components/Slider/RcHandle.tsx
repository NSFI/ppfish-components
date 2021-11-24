import React from 'react';
import classNames from 'classnames';
import { addEventListener } from '../../utils';

interface HandleProps {
  prefixCls?: string;
  className?: string;
  vertical?: boolean;
  offset?: number;
  style?: React.CSSProperties;
  disabled?: boolean;
  min?: number;
  max?: number;
  value?: number;
  tabIndex?: number;
  handle?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}

interface HandleStates {
  clickFocused: boolean;
}

export default class Handle extends React.Component<HandleProps, HandleStates> {
  state = {
    clickFocused: false,
  };

  private onMouseUpListener: any;

  private handle: any;

  componentDidMount() {
    // mouseup won't trigger if mouse moved out of handle,
    // so we listen on document here.
    this.onMouseUpListener = addEventListener(document, 'mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    if (this.onMouseUpListener) {
      this.onMouseUpListener.remove();
    }
  }

  setClickFocus(focused) {
    this.setState({ clickFocused: focused });
  }

  handleMouseUp = () => {
    if (document.activeElement === this.handle) {
      this.setClickFocus(true);
    }
  };

  handleBlur = () => {
    this.setClickFocus(false);
  };

  handleKeyDown = () => {
    this.setClickFocus(false);
  };

  clickFocus() {
    this.setClickFocus(true);
    this.focus();
  }

  focus() {
    this.handle.focus();
  }

  blur() {
    this.handle.blur();
  }

  render() {
    const {
      prefixCls,
      vertical,
      offset,
      style,
      disabled,
      min,
      max,
      value,
      tabIndex,
      handle,
      ...restProps
    } = this.props;

    const elClassName = classNames({
      [this.props.className]: true,
      [`${prefixCls}-handle-custom`]: !!this.props.handle,
      [`${prefixCls}-handle-click-focused`]: this.state.clickFocused,
    });

    const postionStyle = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    const elStyle = {
      ...style,
      ...postionStyle,
    };
    let ariaProps = {};
    if (value !== undefined) {
      ariaProps = {
        ...ariaProps,
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': value,
        'aria-disabled': !!disabled,
      };
    }

    return (
      <div
        ref={node => (this.handle = node)}
        role="slider"
        tabIndex={disabled ? null : tabIndex || 0}
        {...ariaProps}
        {...restProps}
        className={elClassName}
        style={elStyle}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      >
        {!!handle && handle}
      </div>
    );
  }
}
