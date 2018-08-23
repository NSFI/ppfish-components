import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/index.tsx';
import Icon from '../Icon/index.tsx';
import Tooltip from '../Tooltip/index.tsx';
import './index.less';

/**
 * SearchInput框
 * @description 带搜索的通用输入框组件
 * @prop {string} placeholder 提示文字
 * @prop {function} onSearch 搜索回调
 * @prop {string} className 样式
 * @prop {string} defaultValue 默认值
 */
class SearchInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    className: PropTypes.string,
    defaultValue: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      searchInput: this.props.defaultValue || '',
    };
  }

  search = () => {
    this.searchInput.focus();
    const {onSearch} = this.props;
    onSearch && onSearch(this.state.searchInput);
  };

  onChangeSearchInput = (e) => {
    this.setState({searchInput: e.target.value});
  };

  clearSearch = () => {
    this.setState({searchInput: ''});
  };

  render() {
    const {searchInput} = this.state;
    const {onSearch, placeholder, className, ...otherProps} = this.props;
    const suffix = (
      <Tooltip placement="bottom" title="搜索">
        <Icon type="search" onClick={this.search}
              className={`${this.state.searchInput ? 'u-search-icon-active' : ''}`}/>
      </Tooltip>
    );

    return (
      <Input
        {...otherProps}
        className={`u-searchInput ${className}`}
        placeholder={placeholder}
        suffix={suffix}
        value={searchInput}
        onChange={this.onChangeSearchInput}
        onPressEnter={this.search}
        ref={node => this.searchInput = node}
      />
    );
  }
}

export default SearchInput;
