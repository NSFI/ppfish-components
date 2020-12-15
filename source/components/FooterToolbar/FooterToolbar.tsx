import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addEventListener } from '../../utils';

interface FooterToolbarProps {
  prefixCls: string;
  className?: string;
  target: () => HTMLElement | Window | null;
  style: React.CSSProperties;
}

interface FooterToolbarState {
  offset: number;
}

class FooterToolbar extends React.Component<FooterToolbarProps> {
  static defaultProps = {
    children: null,
    className: '',
    prefixCls: 'fishd-footer-toolbar',
  };

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    target: PropTypes.func,
    style: PropTypes.object,
  };

  private scrollListener;
  private resizeListener;
  private wrapper;

  state: Readonly<FooterToolbarState> = {
    offset: 0,
  };

  constructor(props: FooterToolbarProps) {
    super(props);
  }

  componentDidMount() {
    this.setToolbarPosition();
    const target = (this.props.target && this.props.target()) || window;
    this.scrollListener = addEventListener(target, 'scroll', () => {
      this.setToolbarPosition();
    });
    this.resizeListener = addEventListener(window, 'resize', () => {
      this.setToolbarPosition();
    });
  }

  componentWillUnmount() {
    if (this.scrollListener) {
      this.scrollListener.remove();
    }
    if (this.resizeListener) {
      this.resizeListener.remove();
    }
  }

  setToolbarPosition = () => {
    const { target } = this.props;
    const { height } = getComputedStyle(this.wrapper);
    const wrapperHeight = Number.parseInt(height);

    let targetElement: null | Window | HTMLElement = document.documentElement;
    if (target && typeof target === 'function' && target() !== window) {
      targetElement = target();
    }
    const offsetObj = {
      containerHeight: (targetElement as HTMLElement).clientHeight,
      containerScrollTop: (targetElement as HTMLElement).scrollTop,
    };

    const offset =
      offsetObj.containerHeight + offsetObj.containerScrollTop - wrapperHeight;
    const maxOffset =
      (targetElement as HTMLElement).scrollHeight - wrapperHeight;
    this.setState({
      offset: offset > maxOffset ? maxOffset : offset,
    });
  };

  render() {
    const { children, className, prefixCls, style } = this.props;
    const toolbarStyle: React.CSSProperties = {
      ...style,
      position: 'absolute',
      top: this.state.offset,
    };
    return (
      <div
        className={classNames({ [className]: true, [prefixCls]: true })}
        style={toolbarStyle}
        ref={wrapper => {
          this.wrapper = wrapper;
        }}
      >
        <div className={`${prefixCls}-inner`}>{children}</div>
      </div>
    );
  }
}

export default FooterToolbar;
