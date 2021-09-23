import { useEffect, useState, useRef } from 'react';

export default function useMountStatus<T>(
  defaultValue?: T,
): [T, (next: T | (() => T)) => void] {
  const destroyRef = useRef(false);
  const [val, setVal] = useState<T>(defaultValue);

  function setValue(next: T | (() => T)) {
    if (!destroyRef.current) {
      setVal(next);
    }
  }

  useEffect(
    () => () => {
      destroyRef.current = true;
    },
    [],
  );

  return [val, setValue];
}