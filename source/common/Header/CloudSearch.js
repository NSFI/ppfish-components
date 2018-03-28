import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button } from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;

class CloudSearch extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    size: PropTypes.string,
    placeholder: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focus: false,
    };
  }
  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  handleFocusBlur = (e) => {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }
  InputGroup = () => {
    const { style, size, placeholder } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="ant-search-input-wrapper" style={style}>
        <InputGroup className={searchCls}>
          <Input placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
          />
          <div className="ant-input-group-wrap">
            <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.InputGroup()}
      </div>
    );
  }
}
export default CloudSearch;
