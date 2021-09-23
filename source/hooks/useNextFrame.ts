import * as React from 'react';
import raf from 'rc-util/lib/raf';

export default (): [
  (callback: (info: { isCanceled: () => boolean }) => void) => void,
  () => void,
] => {
  const nextFrameRef = React.useRef<number>(null);

  function cancelNextFrame() {
    raf.cancel(nextFrameRef.current);
  }

  function nextFrame(
    callback: (info: { isCanceled: () => boolean }) => void,
    delay = 2,
  ) {
    cancelNextFrame();

    const nextFrameId = raf(() => {
      if (delay <= 1) {
        callback({ isCanceled: () => nextFrameId !== nextFrameRef.current });
      } else {
        nextFrame(callback, delay - 1);
      }
    });

    nextFrameRef.current = nextFrameId;
  }

  React.useEffect(
    () => () => {
      cancelNextFrame();
    },
    [],
  );

  return [nextFrame, cancelNextFrame];
};