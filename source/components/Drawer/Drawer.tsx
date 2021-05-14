import * as React from 'react';
import * as PropTypes from 'prop-types';
import RcDrawer from './src';

type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

interface DrawerProps {
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  open?: boolean;
  placement?: string;
  wrapperClassName: string | undefined;
  level?: string | [string, string];
  levelMove?: number | [number, number];
  ease?: string;
  duration?: string;
  getContainer?: string | React.ReactNode | (() => React.ReactNode) | boolean;
  handler?: boolean | React.ReactNode;
  onChange?: (flag: boolean) => void;
  onMaskClick?: (e: EventType) => void;
  onHandleClick?: (e: EventType) => void;
  onCloseClick?: (e: EventType) => void;
  showMask?: boolean;
  maskStyle?: React.CSSProperties;
  closed?: boolean;
  visible?: boolean;
  mask?: boolean;
}

export default class Drawer extends React.Component<DrawerProps> {
  static propTypes = {
    // prefixCls: PropTypes.string,
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
      PropTypes.bool
    ]),
    style: PropTypes.object,
    mask: PropTypes.bool,
    maskStyle: PropTypes.object,
    children: PropTypes.node,
    handler: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    level: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    ease: PropTypes.string,
    duration: PropTypes.string,
    onChange: PropTypes.func,
    onMaskClick: PropTypes.func,
    onHandleClick: PropTypes.func,
    onCloseClick: PropTypes.func
  };

  static defaultProps = {
    // prefixCls: "fishd-drawer",
    placement: 'right',
    onChange: () => {},
    onMaskClick: () => {},
    onHandleClick: () => {}
  };

  constructor(props: DrawerProps) {
    super(props);
  }

  render() {
    const {
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
      ease,
      duration,
      closed,
      onMaskClick,
      onChange,
      onHandleClick,
      onCloseClick
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
        ease={ease}
        duration={duration}
        maskStyle={maskStyle}
        style={style}
        handler={handler}
        onMaskClick={onMaskClick}
        onHandleClick={onHandleClick}
        onChange={onChange}
        onCloseClick={onCloseClick}
      >
        {this.props.children}
      </RcDrawer>
    );
  }
}
