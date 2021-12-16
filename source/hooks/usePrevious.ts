import { useRef } from 'react';

/**
 * 获取 hooks 上一个状态
 *
 * 使用可参考: https://ahooks.js.org/zh-CN/hooks/state/use-previous
 */

export type compareFunction<T> = (prev: T | undefined, next: T) => boolean;

function usePrevious<T>(state: T, compare?: compareFunction<T>): T | undefined {
  const prevRef = useRef<T>();
  const curRef = useRef<T>();

  const needUpdate = typeof compare === 'function' ? compare(curRef.current, state) : true;
  if (needUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
}

export default usePrevious;
