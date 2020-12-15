import * as React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import Icon from '../Icon';
import Button from '../Button';

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (
    value: string,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
  ) => any;
  enterButton?: boolean | React.ReactNode;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    inputPrefixCls: 'fishd-input',
    prefixCls: 'fishd-input-search',
    enterButton: false
  };

  private input: Input;

  onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { onSearch, disabled } = this.props;
    if (disabled) {
      return false;
    }
    if (onSearch) {
      onSearch(this.input.input.value, e);
    }
    this.input.focus();
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  saveInput = (node: Input) => {
    this.input = node;
  };

  getButtonOrIcon() {
    const { enterButton, prefixCls, size, disabled } = this.props;
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
              size
            }
          : {}
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
      onClick: this.onSearch
    });
  }

  render() {
    const {
      className,
      prefixCls,
      inputPrefixCls,
      size,
      suffix,
      enterButton,
      ...others
    } = this.props;
    delete (others as any).onSearch;
    const buttonOrIcon = this.getButtonOrIcon();
    const searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-enter-button`]: !!enterButton,
      [`${prefixCls}-${size}`]: !!size
    });
    return (
      <Input
        onPressEnter={this.onSearch}
        {...others}
        size={size}
        className={inputClassName}
        prefixCls={inputPrefixCls}
        suffix={searchSuffix}
        ref={this.saveInput}
      />
    );
  }
}
