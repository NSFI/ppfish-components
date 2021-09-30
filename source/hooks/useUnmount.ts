import { useEffect } from 'react';

export default function useUnmount(fn: () => any) {
  useEffect(() => {
    if (typeof fn === 'function') {
      return fn;
    }
  }, []);
}
