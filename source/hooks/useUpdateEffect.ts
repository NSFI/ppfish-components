import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export default function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
}
