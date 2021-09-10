import * as React from 'react';
import Tooltip from '../Tooltip';
import { EllipsisProps } from './Ellipsis';

type EllipsisLineClampProps = Omit<EllipsisProps, 'length' | 'width' | 'fullWidthRecognition'>;

const EllipsisLineClamp = (props: EllipsisLineClampProps) => {
  const { className, prefix, lines, tooltip, tooltipProps, children, ...restProps } = props;

  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const lineClampNodeRef = React.useRef(null);

  const handleTooltipVisibleChange = visible => {
    const node = lineClampNodeRef.current;
    if (!node) {
      return;
    }

    const nextVisible =
      visible && (node.offsetHeight < node.scrollHeight || node.offsetWidth < node.scrollWidth);

    setTooltipVisible(nextVisible);
  };

  //行数限制

  // support document.body.style.webkitLineClamp
  const id = `fishd-ellipsis-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`;
  const style = `#${id}{-webkit-line-clamp:${lines};-webkit-box-orient: vertical;}`;

  const node = (
    <div ref={lineClampNodeRef} id={id} className={className} {...restProps}>
      <style>{style}</style>
      {children}
    </div>
  );

  return tooltip ? (
    <Tooltip
      {...tooltipProps}
      overlayClassName={`${prefix}-tooltip`}
      title={children}
      visible={tooltipVisible}
      onVisibleChange={handleTooltipVisibleChange}
    >
      {node}
    </Tooltip>
  ) : (
    node
  );
};

export default EllipsisLineClamp;
