import { useState } from 'react';
import useUpdateEffect from './useUpdateEffect';

type State<T> = T | (() => T);

export default function useControlledState<T>(
  defaultStateValue: State<T>,
  option?: {
    value?: State<T>;
    defaultValue?: State<T>;
    onChange?: (newValue: T, oldValue?: any) => void;
  },
): [T, (newValue: T) => void] {
  const { defaultValue, value, onChange } = option || {};
  const [innerValue, setInnerValue] = useState(() => {
    if (value !== undefined) {
      return value;
    }

    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue;
    }

    return typeof defaultStateValue === 'function'
      ? (defaultStateValue as any)()
      : defaultStateValue;
  });

  const mergedValue = value !== undefined ? value : innerValue;

  const setMergedValue = newValue => {
    if (value === undefined) {
      setInnerValue(newValue);
    }

    if (mergedValue !== newValue && typeof onChange === 'function') {
      // TODO 是否需要传入oldValue
      // onChange(newValue, mergedValue);
      onChange(newValue);
    }
  };

  useUpdateEffect(() => {
    if (value === undefined) {
      setInnerValue(value);
    }
  }, [value]);

  return [mergedValue, setMergedValue];
}
