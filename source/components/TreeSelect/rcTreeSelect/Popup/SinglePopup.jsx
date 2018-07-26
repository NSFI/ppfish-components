import React from 'react';
import PropTypes from 'prop-types';
import BasePopup from '../Base/BasePopup';
import SearchInput from '../SearchInput';
import { createRef } from '../util';

class SinglePopup extends React.Component {
  static propTypes = {
    ...BasePopup.propTypes,
    searchValue: PropTypes.string,
    showSearch: PropTypes.bool,
    dropdownPrefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
  };

  constructor() {
    super();

    this.inputRef = createRef();
  }

  onPlaceholderClick = () => {
    this.inputRef.current.focus();
  }

  renderPlaceholder = () => {
    const { searchPlaceholder, searchValue, prefixCls } = this.props;

    if (!searchPlaceholder) {
      return null;
    }

    return (
      <span
        style={{
          display: searchValue ? 'none' : 'block',
        }}
        onClick={this.onPlaceholderClick}
        className={`${prefixCls}-search__field__placeholder`}
      >
        {searchPlaceholder}
        <i className="select-search-icon iconfont icon-sousuo"></i>
      </span>
    );
  };

  renderSearch = () => {
    const { showSearch, dropdownPrefixCls } = this.props;

    if (!showSearch) {
      return null;
    }

    return (
      <span className={`${dropdownPrefixCls}-search`}>
        <SearchInput
          {...this.props}
          ref={this.inputRef}
          renderPlaceholder={this.renderPlaceholder}
        />
      </span>
    );
  };

  renderResetItem = () => {
    const { dropdownPrefixCls } = this.props;

    return (
      <span className={`${dropdownPrefixCls}-reset`}>不选择任何分类</span>
    );
  };

  render() {
    return (
      <BasePopup
        {...this.props}
        renderSearch={this.renderSearch}
        renderResetItem={this.renderResetItem}
      />
    );
  }
}

export default SinglePopup;
