import React from 'react';
import PropTypes from 'prop-types';
import BasePopup from '../Base/BasePopup';
import SearchInput from '../SearchInput';
import { createRef } from '../util';
import Button from '../../../Button/index';

import ConfigConsumer from '../../../Config/Locale/Consumer';

class MultiplePopup extends React.Component {
  static propTypes = {
    ...BasePopup.propTypes,
    searchValue: PropTypes.string,
    showSearch: PropTypes.bool,
    dropdownPrefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    disableConfirm: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
  };

  constructor() {
    super();

    this.inputRef = createRef();
  }

  onPlaceholderClick = () => {
    this.inputRef.current.focus();
  };

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
        {/*<i className="select-search-icon iconfont icon-sousuo"></i>*/}
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

  renderConfirmBtn = Locale => {
    const { onCancel, onConfirm, disableConfirm } = this.props;

    return (
      <div className="dropdown-confirm">
        <Button onClick={onCancel}>{Locale.cancelText}</Button>
        <Button type="primary" onClick={onConfirm} disabled={disableConfirm}>
          {Locale.okText}
        </Button>
      </div>
    );
  };

  render() {
    return (
      <ConfigConsumer componentName="TreeSelect">
        {Locale => {
          return (
            <div>
              <BasePopup {...this.props} renderSearch={this.renderSearch} />
              {this.renderConfirmBtn(Locale)}
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}

export default MultiplePopup;
