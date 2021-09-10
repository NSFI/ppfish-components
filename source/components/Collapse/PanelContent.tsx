import React, { FC, memo, useRef } from 'react';
import classnames from 'classnames';

export interface PanelContentProps {
  isActive: boolean;
  prefixCls: string;
}

const PanelContent: FC<PanelContentProps> = memo((props) => {

  const isActivedRef = useRef<boolean>(false);

  isActivedRef.current = isActivedRef.current || props.isActive;
  if (!isActivedRef.current) {
    return null;
  }

  const { prefixCls, isActive, children } = props;
  const contentCls = classnames({
    [`${prefixCls}-content`]: true,
    [`${prefixCls}-content-active`]: isActive,
    [`${prefixCls}-content-inactive`]: !isActive
  });
  return (
    <div className={contentCls} role="tabpanel">
      <div className={`${prefixCls}-content-box`}>{children}</div>
    </div>
  );
}, (prevProp, nextProps) => !prevProp.isActive && !nextProps.isActive)

export default PanelContent;
