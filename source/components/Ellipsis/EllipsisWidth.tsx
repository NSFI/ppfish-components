import * as React from 'react';
import Tooltip from '../Tooltip';
import { EllipsisProps } from './Ellipsis';

type EllipsisWidthProps = Omit<EllipsisProps, 'length' | 'lines' | 'fullWidthRecognition'>;

const EllipsisWidth = (props: EllipsisWidthProps) => {
  const { className, prefix, style, tooltip, tooltipProps, width, children, ...restProps } = props;

  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const widthNodeRef = React.useRef(null);

  const handleTooltipVisibleChange = visible => {
    const node = widthNodeRef.current;
    if (!node) {
      return;
    }

    const nextVisible =
      visible && (node.offsetHeight < node.scrollHeight || node.offsetWidth < node.scrollWidth);

    setTooltipVisible(nextVisible);
  };

  const node = (
    <span
      ref={widthNodeRef}
      className={className}
      {...restProps}
      style={{ ...style, maxWidth: width }}
    >
      {children}
    </span>
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

export default EllipsisWidth;
