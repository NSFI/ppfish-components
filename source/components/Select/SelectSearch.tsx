import * as React from 'react';
import Input from '../Input';
import { InputRef } from '../Input/Input';
import Icon from '../Icon';
interface SelectSearchProps {
  prefixCls: string;

  searchValue: string;
  searchInputProps: object;
  searchPlaceholder: string;

  allowClear: boolean;

  emitEmpty: (event: React.MouseEvent<any>) => void;
  updateSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RefSelectSearchProps {
  focus: () => void;
  blur: () => void;
}

const InternalSelectSearch: React.ForwardRefRenderFunction<
  RefSelectSearchProps,
  SelectSearchProps
> = (props, ref) => {
  const {
    allowClear,
    emitEmpty,
    prefixCls,
    searchInputProps,
    searchPlaceholder,
    searchValue,
    updateSearchValue,
  } = props;

  const inputRef = React.useRef<InputRef>();

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    },
  }));

  const suffix = searchValue && allowClear && (
    <Icon type="close-circle-fill" className={`${prefixCls}-clear`} onClick={emitEmpty} />
  );

  return (
    <div className={prefixCls}>
      <Input
        placeholder={searchPlaceholder}
        ref={inputRef}
        value={searchValue}
        onChange={updateSearchValue}
        suffix={suffix}
        {...searchInputProps}
      />
    </div>
  );
};

const SelectSearch = React.forwardRef<unknown, SelectSearchProps>(InternalSelectSearch);
SelectSearch.displayName = 'SelectSearch';

export default SelectSearch;
