import * as React from 'react';
import { useRef } from 'react';

import { animationEndName, transitionEndName } from '../utils/motion';
import { MotionEvent } from '../interface';

export default (
  callback: (event: MotionEvent) => void,
): [(element: HTMLElement) => void, (element: HTMLElement) => void] => {
  const cacheElementRef = useRef<HTMLElement>();

  // Cache callback
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  // Internal motion event handler
  const onInternalMotionEnd = React.useCallback((event: MotionEvent) => {
    callbackRef.current(event);
  }, []);

  // Remove events
  function removeMotionEvents(element: HTMLElement) {
    if (element) {
      element.removeEventListener(transitionEndName, onInternalMotionEnd);
      element.removeEventListener(animationEndName, onInternalMotionEnd);
    }
  }

  // Patch events
  function patchMotionEvents(element: HTMLElement) {
    if (cacheElementRef.current && cacheElementRef.current !== element) {
      removeMotionEvents(cacheElementRef.current);
    }

    if (element && element !== cacheElementRef.current) {
      element.addEventListener(transitionEndName, onInternalMotionEnd);
      element.addEventListener(animationEndName, onInternalMotionEnd);

      // Save as cache in case dom removed trigger by `motionDeadline`
      cacheElementRef.current = element;
    }
  }

  // Clean up when removed
  React.useEffect(
    () => () => {
      removeMotionEvents(cacheElementRef.current);
    },
    [],
  );

  return [patchMotionEvents, removeMotionEvents];
};