import debounce from 'lodash/debounce';
import { DebouncedFunc } from 'lodash';
import { useCallback, useRef } from 'react';
import useUnmount from './useUnmount';

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

export default function useDebounce<T extends Function>(fn: T, options: DebounceOptions) {
  const fnRef = useRef<T>();
  fnRef.current = fn;

  const wait = options?.wait || 1000;

  const debounceRef = useRef<DebouncedFunc<undefined>>();
  debounceRef.current = useCallback(
    debounce((...args: any) => fnRef.current(...args), wait, options),
    [],
  );

  useUnmount(() => debounceRef.current?.cancel);

  return debounceRef.current;
}
