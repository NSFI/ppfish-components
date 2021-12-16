import { MutableRefObject, useCallback, useRef, useState } from 'react';
import useUnmount from './useUnmount';
import { addFullscreenchangeEvent, checkFullscreen, exitfullscreen, fullscreen } from '../utils';

/**
 * 来源于 ahooks
 * https://ahooks.js.org/zh-CN/hooks/dom/use-fullscreen
 */

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>;

type TargetElement = HTMLElement | Element | Document | Window;

export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement,
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetElement | undefined | null;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}

const isFullEnabled = () => {
  return (
    document.fullscreenEnabled ||
    document['mozFullScreenEnabled'] ||
    document['webkitFullscreenEnabled'] ||
    document['msFullscreenEnabled']
  );
};

const removeFullscreenchangeEvent = fn => {
  document.removeEventListener('fullscreenchange', fn);
  document.removeEventListener('mozfullscreenchange', fn);
  document.removeEventListener('webkitfullscreenchange', fn);
  document.removeEventListener('msfullscreenchange', fn);
};

export interface Options {
  onExitFull?: () => void;
  onFull?: () => void;
}

export default (target: BasicTarget, options?: Options) => {
  const { onExitFull, onFull } = options || {};

  const onExitFullRef = useRef(onExitFull);
  onExitFullRef.current = onExitFull;

  const onFullRef = useRef(onFull);
  onFullRef.current = onFull;

  const [state, setState] = useState(false);

  const onChange = useCallback(() => {
    if (isFullEnabled()) {
      const isFullScreen = checkFullscreen();
      if (isFullScreen) {
        onFullRef.current && onFullRef.current();
      } else {
        removeFullscreenchangeEvent(onChange);
        onExitFullRef.current && onExitFullRef.current();
      }
      setState(isFullScreen);
    }
  }, []);

  const setFull = useCallback(() => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (isFullEnabled()) {
      try {
        addFullscreenchangeEvent(document, onChange);
        fullscreen(el);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  }, [target, onChange]);

  const exitFull = useCallback(() => {
    if (!state) {
      return;
    }
    if (isFullEnabled()) {
      exitfullscreen();
    }
  }, [state]);

  const toggleFull = useCallback(() => {
    if (state) {
      exitFull();
    } else {
      setFull();
    }
  }, [state, setFull, exitFull]);

  useUnmount(() => {
    if (isFullEnabled()) {
      removeFullscreenchangeEvent(onChange);
    }
  });

  return [
    state,
    {
      setFull,
      exitFull,
      toggleFull,
    },
  ] as const;
};
