import * as React from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * Work as `componentDidUpdate`
 */
export default function useUpdateEffect(callback: () => void | (() => void), condition: any[]) {
  const initRef = React.useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      return undefined;
    }

    return callback();
  }, condition);
}