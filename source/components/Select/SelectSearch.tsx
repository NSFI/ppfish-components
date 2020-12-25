import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Icon from '../Icon';

interface SelectSearchProps {
  allowClear: boolean;
  emitEmpty: (event: React.MouseEvent<any>) => void;
  prefixCls: string;
  searchInputProps: object;
  searchPlaceholder: string;
  searchValue: string;
  updateSearchValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default class SelectSearch extends React.Component<SelectSearchProps> {
  static propTypes = {
    allowClear: PropTypes.bool,
    emitEmpty: PropTypes.func,
    prefixCls: PropTypes.string,
    searchInputProps: PropTypes.object,
    searchPlaceholder: PropTypes.string,
    searchValue: PropTypes.string,
    updateSearchValue: PropTypes.func
  };

  searchInput: Input;

  constructor(props: SelectSearchProps) {
    super(props);
  }

  render() {
    const {
      allowClear,
      emitEmpty,
      prefixCls,
      searchInputProps,
      searchPlaceholder,
      searchValue,
      updateSearchValue
    } = this.props;
    const suffix = searchValue && allowClear && (
      <Icon type="close-circle-fill" className={`${prefixCls}-clear`} onClick={emitEmpty} />
    );
    return (
      <div className={prefixCls}>
        <Input
          placeholder={searchPlaceholder}
          ref={searchInput => (this.searchInput = searchInput)}
          value={searchValue}
          onChange={updateSearchValue}
          suffix={suffix}
          {...searchInputProps}
        />
      </div>
    );
  }
}
