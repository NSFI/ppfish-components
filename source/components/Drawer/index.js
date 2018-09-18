import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import RcDrawer from './src';

import './style/index.less';

export default class Drawer extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    visible: PropTypes.bool,
    closed: PropTypes.bool,
    placement: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
    getContainer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.func,
      PropTypes.bool,
    ]),
    style: PropTypes.object,
    mask: PropTypes.bool,
    maskStyle: PropTypes.object,
    children: PropTypes.node,
    handler: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    level: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
    onMaskClick: PropTypes.func,
    onHandleClick: PropTypes.func,
    onCloseClick: PropTypes.func
  };

  static defaultProps = {
    prefixCls: 'fishd-drawer',
    placement: 'right',
    onChange: () => { },
    onMaskClick: () => { },
    onHandleClick: () => { },
  };

  constructor(props) {
    super(props);
  }

  handleMaskClick = (e) => {
    this.props.onMaskClick(e);
  }

  handleChange = (status) => {
    this.props.onChange(status);
  }

  handleHandleClick = (e) => {
    this.props.onHandleClick(e);
  }

  handleCloseClick = (e) => {
    this.props.onCloseClick(e);
  }

  render() {
    const {
      prefixCls,
      className,
      wrapperClassName,
      width,
      height,
      visible,
      placement,
      getContainer,
      style,
      mask,
      maskStyle,
      handler,
      level,
      closed
    } = this.props;

    return (
      <RcDrawer
        className={className}
        wrapperClassName={wrapperClassName}
        width={width}
        height={height}
        open={visible}
        closed={closed}
        placement={placement}
        getContainer={getContainer}
        showMask={mask}
        level={level}
        maskStyle={maskStyle}
        style={style}
        handler={handler}
        onMaskClick={this.handleMaskClick}
        onHandleClick={this.handleHandleClick}
        onChange={this.handleChange}
        onCloseClick={this.handleCloseClick}
      >
        {this.props.children}
      </RcDrawer>
    );
  }
}
