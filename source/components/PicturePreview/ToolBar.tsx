import Icon from '../Icon';
import React, { FC, memo, MutableRefObject } from 'react';
import classNames from 'classnames';
import { downloadFn, ImageItem, setStyle } from './utils';

const MAX_RATIO = 2; //最大的图片显示比例
const MIN_RATIO = 0.1; //最小的图片显示比例
const STEP_RATIO = 0.1; //图片缩放比例步长

interface IProps {
  current: number;
  imgs: ImageItem[];
  isFullscreen: boolean;
  image: {
    marginT: number;
    el: null;
    naturalHeight: number;
    startY: number;
    marginL: number;
    startX: number;
    naturalWidth: number;
    ratio: number;
  };
  prefixCls?: string;
  progress?: boolean;
  toolbar?: boolean;
  handleZoom(ratio: number): void;
  handleSwitchFull():void;
  imgElRef:MutableRefObject<ImageItem & HTMLImageElement>
}

const ToolBar: FC<IProps> = props => {
  const {
    current,
    imgs,
    isFullscreen,
    image,
    prefixCls,
    progress,
    toolbar,
    handleZoom,
    handleSwitchFull,
    imgElRef,
  } = props;

  const handleSave = () => {
    downloadFn(imgElRef.current.src + '?' + +new Date(), imgElRef.current.alt);
  };

  const handleRotate = () => {
    if (!imgElRef.current) return;

    let old = imgElRef.current.rotateValue || 0,
      rotate = old + 90,
      transform = 'rotate(' + rotate + 'deg)';

    imgElRef.current.rotateValue = rotate;

    setStyle(imgElRef.current, {
      '-webkit-ransform': transform,
      '-ms-transform': transform,
      transform: transform,
    });
  };

  let toolbarClass = classNames('toolbar', {
    [`${prefixCls}-hide`]: !toolbar,
  });
  let one2oneClass = classNames('icon', {
    'icon-disabled': image.ratio == 1,
  });
  let zoomInClass = classNames('icon', {
    'icon-disabled': image.ratio >= MAX_RATIO,
  });
  let zoomOutClass = classNames('icon', {
    'icon-disabled': image.ratio <= MIN_RATIO,
  });

  let progressClass = classNames('toolbarTitle', {
    [`${prefixCls}-hide`]: !progress,
  });

  return (
    <div className={toolbarClass} style={isFullscreen ? { bottom: '20px' } : null}>
      <div className={progressClass}>
        {current + 1}/{imgs.length}
      </div>
      <div className="toolbarCon">
        <Icon type="picture-equal" className={one2oneClass} onClick={() => handleZoom(1)} />
        <Icon
          type={isFullscreen ? 'picture-shrink' : 'picture-fullscreen'}
          className="icon"
          onClick={handleSwitchFull}
        />
        <Icon
          type="picture-enlarge"
          className={zoomInClass}
          onClick={() => handleZoom(image.ratio + STEP_RATIO)}
        />
        <Icon
          type="picture-micrify"
          className={zoomOutClass}
          onClick={() => handleZoom(image.ratio - STEP_RATIO)}
        />
        <Icon type="picture-rotate" className="icon" onClick={handleRotate} />
        <Icon type="picture-download" className="icon" onClick={handleSave} />
      </div>
    </div>
  );
};

export default memo(ToolBar);
