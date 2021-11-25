import React, { Component } from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

function noop() {}

export interface RcSwitchProps {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => any;
  onMouseUp?: (e: React.MouseEvent) => any;
  onClick?: (checked: boolean) => any;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
  loadingIcon?: React.ReactNode;
  tabIndex?: number;
  autoFocus?: boolean;
}

interface RcSwitchState {
  checked: boolean;
  clicked: boolean;
}

class RcSwitch extends Component<RcSwitchProps, RcSwitchState> {
  static defaultProps = {
    prefixCls: 'rc-switch',
    checkedChildren: null,
    unCheckedChildren: null,
    className: '',
    defaultChecked: false,
    onChange: noop,
    onClick: noop,
  };

  static getDerivedStateFromProps(nextProps) {
    const newState = {};
    const { checked } = nextProps;

    if ('checked' in nextProps) {
      (newState as RcSwitchState).checked = !!checked;
    }

    return newState;
  }

  public node: any;

  timeoutCurrent: any;

  constructor(props) {
    super(props);

    let checked = false;
    if ('checked' in props) {
      checked = !!props.checked;
    } else {
      checked = !!props.defaultChecked;
    }
    this.state = { checked, clicked: false };
  }

  componentDidMount() {
    const { autoFocus, disabled } = this.props;
    if (autoFocus && !disabled) {
      this.focus();
    }
  }

  setClicked() {
    this.setState({
      clicked: true,
    });
    clearTimeout(this.timeoutCurrent);
    this.timeoutCurrent = window.setTimeout(
      () =>
        this.setState({
          clicked: false,
        }),
      500,
    );
  }

  setChecked(checked) {
    if (this.props.disabled) {
      return;
    }
    if (!('checked' in this.props)) {
      this.setState({
        checked,
      });
    }
    this.props.onChange(checked);
  }

  toggle = () => {
    const { onClick } = this.props;
    const checked = !this.state.checked;
    this.setChecked(checked);
    this.setClicked();
    onClick(checked);
  };

  handleKeyDown = e => {
    if (e.keyCode === 37) {
      // Left
      this.setChecked(false);
    } else if (e.keyCode === 39) {
      // Right
      this.setChecked(true);
    } else if (e.keyCode === 32 || e.keyCode === 13) {
      // Space, Enter
      this.toggle();
    }
  };

  // Handle auto focus when click switch in Chrome
  handleMouseUp = e => {
    if (this.node) {
      this.node.blur();
    }
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }
  };

  focus() {
    this.node.focus();
  }

  blur() {
    this.node.blur();
  }

  saveNode = (node: HTMLSpanElement) => {
    this.node = node;
  };

  render() {
    const {
      className,
      prefixCls,
      disabled,
      loadingIcon,
      checkedChildren,
      tabIndex,
      unCheckedChildren,
      ...restProps
    } = this.props;
    const checked = this.state.checked;
    const clicked = this.state.clicked;
    const switchTabIndex = disabled ? -1 : tabIndex || 0;
    const switchClassName = classNames({
      [className]: !!className,
      [prefixCls]: true,
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-clicked`]: clicked,
      [`${prefixCls}-disabled`]: disabled,
    });
    return (
      <span
        {...omit(restProps, ['onChange', 'checked', 'defaultChecked'])}
        className={switchClassName}
        tabIndex={switchTabIndex}
        ref={this.saveNode}
        onKeyDown={this.handleKeyDown}
        onClick={this.toggle}
        onMouseUp={this.handleMouseUp}
      >
        {loadingIcon}
        <span className={`${prefixCls}-inner`}>
          {checked ? checkedChildren : unCheckedChildren}
        </span>
        <span className={`${prefixCls}-wave`} />
      </span>
    );
  }
}

polyfill(RcSwitch);

export default RcSwitch;
