import { useCallback } from 'react';

const STEP_RATIO = 0.1; //图片缩放比例步长

const usePictureWheel = ({ show, handleZoom, image }) => {
  return useCallback(e => {
    if (!show) return;
    e.preventDefault();
    let { deltaY, wheelDelta, detail } = e,
      delta = 1;

    if (deltaY) {
      delta = deltaY > 0 ? -1 : 1;
    } else if (wheelDelta) {
      delta = wheelDelta / 120;
    } else if (detail) {
      delta = detail > 0 ? -1 : 1;
    }

    handleZoom(image.ratio + (delta > 0 ? STEP_RATIO : -STEP_RATIO));
  }, [show, handleZoom, image]);
};

export default usePictureWheel;
