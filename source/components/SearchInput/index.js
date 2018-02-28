import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';
import {Input, Icon, Tooltip} from 'antd';
import './index.less';

class SearchInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func
  };

  static defaultProps = {
    placeholder: '请输入搜索内容',
    onSearch: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
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

  render() {
    const {searchInput} = this.state;
    const {placeholder} = this.props;
    const suffix = (
      <Tooltip placement="bottom" title="搜索">
        <Icon type="search" onClick={this.search}
              className={`${this.state.searchInput ? 'u-search-icon-active' : null}`}/>
      </Tooltip>
    );
    return (
      <Input
        className="u-searchInput"
        size="large"
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
