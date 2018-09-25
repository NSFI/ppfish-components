import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/index.tsx';
import Icon from '../Icon/index.tsx';

export default class SelectSearch extends React.Component {
  static propTypes = {
    allowClear: PropTypes.bool,
    emitEmpty: PropTypes.func,
    prefixCls: PropTypes.string,
    searchInputProps: PropTypes.object,
    searchPlaceholder: PropTypes.string,
    searchValue: PropTypes.string,
    updateSearchValue: PropTypes.func,
  };

  constructor(props) {
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
      updateSearchValue,
    } = this.props;
    const suffix = searchValue && allowClear &&
      <Icon type="close-circle-fill" className={`${prefixCls}-clear`} onClick={emitEmpty}/>;
    return (
      <div className={prefixCls}>
        <Input placeholder={searchPlaceholder}
               ref={(searchInput) => this.searchInput = searchInput}
               value={searchValue}
               onChange={updateSearchValue}
               suffix={suffix}
               {...searchInputProps}
        />
      </div>
    );
  }
}
