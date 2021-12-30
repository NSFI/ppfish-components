import * as React from "react";
import classNames from "classnames";
import omit from "omit.js";
import Icon from "../Icon";
import Animate from "rc-animate";
import CheckableTag from "./CheckableTag";
import ReactDOM from "react-dom";

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  color?: string;
  /** 标签是否可以关闭 */
  closable?: boolean;
  visible?: boolean;
  autoShowClose?: boolean;
  /** 关闭时的回调 */
  onClose?: Function;
  /** 动画关闭后的回调 */
  afterClose?: Function;
  style?: React.CSSProperties;
}

export interface TagState {
  closing: boolean;
  closed: boolean;
  visible: boolean;
}

const BaseTag: React.FC<TagProps> = props => {
  const {
    prefixCls,
    closable,
    color,
    className,
    children,
    style,
    autoShowClose,
    ...otherProps
  } = props;

  const [stateClosing, setStateClosing] = React.useState<TagState["closing"]>(false);
  const [stateClosed, setStateClosed] = React.useState<TagState["closed"]>(false);
  const [stateVisible, setStateVisible] = React.useState<TagState["visible"]>(true);

  const tagRef = React.createRef<HTMLElement>();

  React.useEffect(() => {
    if ("visible" in otherProps) {
      setStateVisible(otherProps.visible);
    }
  }, [otherProps.visible]);

  React.useEffect(() => {
    if (!stateVisible) {
      close();
    } else {
      show();
    }
  }, [stateVisible]);

  const handleIconClick = (e: React.MouseEvent<HTMLElement>) => {
    const {onClose} = props;
    if (onClose) {
      onClose(e);
    }
    if (e.defaultPrevented || "visible" in props) {
      return;
    }
    setStateVisible(false);
  };

  const close = () => {
    if (stateClosing || stateClosed) {
      return;
    }
    const dom = ReactDOM.findDOMNode(tagRef.current) as HTMLElement;
    dom.style.width = `${dom.getBoundingClientRect().width}px`;
    setStateClosing(true);
  };

  const show = () => {
    setStateClosed(false);
  };

  const animationEnd = (_: string, existed: boolean) => {
    if (!existed && !stateClosed) {

      setStateClosed(true);
      setStateClosing(false);

      const afterClose = props.afterClose;
      if (afterClose) {
        afterClose();
      }
    } else {
      setStateClosed(false);
    }
  };

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-has-color`]: color,
      [`${prefixCls}-close`]: stateClosing
    },
    className
  );
  // fix https://fb.me/react-unknown-prop
  const divProps = omit(otherProps, ["onClose", "afterClose", "visible"]);
  const tagStyle = {
    backgroundColor: color ? color : null,
    ...style
  };
  let closeIcon = null;
  if (closable) {
    if (autoShowClose) {
      closeIcon = <Icon type="close-modal-line" onClick={handleIconClick} />;
    } else {
      closeIcon = (
        <Icon type="close-modal-line" onClick={handleIconClick} className="invisible" />
      );
    }
  }

  const tag = stateClosed ? null : (
    <div data-show={!stateClosing} {...divProps} className={classString} style={tagStyle} ref={tagRef}>
      {children}
      {closeIcon}
    </div>
  );

  return (
    <Animate
      component=""
      showProp="data-show"
      transitionName={`${prefixCls}-zoom`}
      transitionAppear
      onEnd={animationEnd}
    >
      {tag}
    </Animate>
  );
};

type BaseTagType = typeof BaseTag;

interface TagInterface extends BaseTagType {
  CheckableTag: typeof CheckableTag;
}

const Tag = BaseTag as TagInterface;

Tag.displayName = 'Tag';

Tag.defaultProps = {
  prefixCls: "fishd-tag",
  closable: false,
  autoShowClose: true,
};

Tag.CheckableTag = CheckableTag;

export default Tag;
