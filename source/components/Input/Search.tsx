import * as React from 'react';
import classNames from 'classnames';
import Input, { InputProps, InputRef } from './Input';
import Icon from '../Icon';
import Button from '../Button';

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (
    value: string,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => any;
  enterButton?: boolean | React.ReactNode;
}

export interface SearchRef {
  input: InputRef;
}

const InternalSearch: React.ForwardRefRenderFunction<SearchRef, SearchProps> = (props, ref) => {
  const inputRef = React.useRef<InputRef>();

  const onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { onSearch, disabled } = props;
    if (disabled) {
      return false;
    }
    if (onSearch) {
      onSearch(inputRef.current.input.value, e);
    }
    inputRef.current.input.focus();
  };

  const getButtonOrIcon = () => {
    const { enterButton, prefixCls, size, disabled } = props;
    const enterButtonAsElement = enterButton as React.ReactElement<any>;
    let node;
    if (!enterButton) {
      node = <Icon className={`${prefixCls}-icon`} type="search-line" key="searchIcon" />;
    } else if (enterButtonAsElement.type === Button || enterButtonAsElement.type === 'button') {
      node = React.cloneElement(
        enterButtonAsElement,
        enterButtonAsElement.type === Button
          ? {
              className: `${prefixCls}-button`,
              size,
            }
          : {},
      );
    } else {
      node = (
        <Button
          className={`${prefixCls}-button`}
          type="primary"
          size={size}
          disabled={disabled}
          key="enterButton"
        >
          {enterButton === true ? <Icon type="search-line" /> : enterButton}
        </Button>
      );
    }
    return React.cloneElement(node, {
      onClick: onSearch,
    });
  };

  const { className, prefixCls, inputPrefixCls, size, suffix, enterButton, ...others } = props;
  delete (others as any).onSearch;
  const buttonOrIcon = getButtonOrIcon();
  const searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
  const inputClassName = classNames(prefixCls, className, {
    [`${prefixCls}-enter-button`]: !!enterButton,
    [`${prefixCls}-${size}`]: !!size,
  });

  React.useImperativeHandle(ref, () => ({
    input: inputRef.current,
  }));

  return (
    <Input
      onPressEnter={onSearch}
      {...others}
      size={size}
      className={inputClassName}
      prefixCls={inputPrefixCls}
      suffix={searchSuffix}
      ref={inputRef}
    />
  );
};

const Search = React.forwardRef(InternalSearch);

Search.displayName = 'Search';

Search.defaultProps = {
  inputPrefixCls: 'fishd-input',
  prefixCls: 'fishd-input-search',
  enterButton: false,
};

export default Search;
