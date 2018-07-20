import React from 'react';
import PropTypes from 'prop-types';
import {Input, Icon} from 'antd';

export default class SelectSearch extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    searchValue: PropTypes.string,
    updateSearchValue: PropTypes.func,
    emitEmpty: PropTypes.func,
    searchInputProps: PropTypes.object,
    allowClear: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {prefixCls, searchInputProps, allowClear, searchPlaceholder, searchValue, updateSearchValue, emitEmpty} = this.props;
    const suffix = searchValue && allowClear ?
      <Icon type="close-circle" className={`${prefixCls}-clear`} onClick={emitEmpty}/> : null;
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
