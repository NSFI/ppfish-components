import Icon from '../Icon';
import React, { FC, memo, useCallback } from 'react';
import classNames from 'classnames';

interface IProps {
  isFullscreen: boolean;
  isHide: boolean;
  prefixCls: string;
  handleClose: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}

const IconsHandler: FC<IProps> = props => {
  const { isFullscreen, isHide, prefixCls, handlePrev, handleNext, handleClose } = props;

  let closeBtnClass = classNames({
    close: !isFullscreen,
    'close-fullscreen': isFullscreen,
  });

  let leftBtnClass = classNames('prev', {
    [`${prefixCls}-hide`]: isHide,
  });
  let rightBtnClass = classNames('next', {
    [`${prefixCls}-hide`]: isHide,
  });

  return (
    <>
      <Icon type="picture-close" className={closeBtnClass} onClick={handleClose} />
      <Icon type="arrow-line-Bold" className={leftBtnClass} onClick={handlePrev} />
      <Icon type="arrow-line-Bold" className={rightBtnClass} onClick={handleNext} />
    </>
  );
};

export default memo(IconsHandler);
