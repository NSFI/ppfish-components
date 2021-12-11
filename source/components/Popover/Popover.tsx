import React, { forwardRef } from 'react';
import Tooltip, { AbstractTooltipProps, TooltipRef } from '../Tooltip';

export interface PopoverProps extends AbstractTooltipProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
}

const Popover = forwardRef<TooltipRef, PopoverProps>(function Popover(props, ref) {
  const { title, content, ...rest } = props;

  const getOverlay = () => {
    const { prefixCls } = props;
    return (
      <div>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        <div className={`${prefixCls}-inner-content`}>{content}</div>
      </div>
    );
  };

  return <Tooltip {...rest} ref={ref} overlay={getOverlay()} />;
});

Popover.defaultProps = {
  prefixCls: 'fishd-popover',
  placement: 'top' as const,
  transitionName: 'zoom-big',
  trigger: 'hover' as const,
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {},
};

export default Popover;
