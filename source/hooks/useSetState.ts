import { useCallback, useState } from 'react';


/**
 * 来源于 ahooks
 * https://ahooks.js.org/zh-CN/hooks/state/use-set-state
 */

function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

const useSetState = <T extends object>(
  initialState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  const [state, setState] = useState<T>(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => ({ ...prevState, ...(isFunction(patch) ? patch(prevState) : patch) }));
  }, []);

  return [state, setMergeState];
};

export default useSetState;
