import * as React from 'react';
import Button from '../Button';

export interface TransferOperationProps {
  mode?: 'single' | 'multiple';
  arrowText?: string;
  className?: string;
  leftArrowText?: string;
  rightArrowText?: string;
  moveToLeft?: React.MouseEventHandler<HTMLButtonElement>;
  moveToRight?: React.MouseEventHandler<HTMLButtonElement>;
  leftActive?: boolean;
  rightActive?: boolean;
  style?: React.CSSProperties;
}

export default class Operation extends React.Component<TransferOperationProps, any> {
  render() {
    const {
      mode,
      arrowText,
      moveToLeft,
      moveToRight,
      leftArrowText = '',
      rightArrowText = '',
      leftActive,
      rightActive,
      className,
      style
    } = this.props;

    if (mode === 'single') {
      return (
        <div className={className} style={style}>
          {arrowText}
        </div>
      );
    } else {
      return (
        <div className={className} style={style}>
          <Button
            type="primary"
            size="small"
            disabled={!rightActive}
            onClick={moveToRight}
            icon="right"
          >
            {rightArrowText}
          </Button>
          <Button
            type="primary"
            size="small"
            disabled={!leftActive}
            onClick={moveToLeft}
            icon="left"
          >
            {leftArrowText}
          </Button>
        </div>
      );
    }
  }
}
