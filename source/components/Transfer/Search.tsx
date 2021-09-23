import * as React from 'react';
import Icon from '../Icon';
import Input from '../Input';
import { InputRef } from '../Input/Input';

export interface TransferSearchProps {
  prefixCls?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<any>) => void;
  handleClear?: (e: React.MouseEvent<any>) => void;
  value?: any;
}

export default class Search extends React.Component<TransferSearchProps, any> {
  static defaultProps = {
    placeholder: '',
  };

  input: InputRef;

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  handleClear = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { handleClear } = this.props;
    if (handleClear) {
      handleClear(e);
    }
  };

  render() {
    const { placeholder, value, prefixCls } = this.props;
    const icon =
      value && value.length > 0 ? (
        <a href="#" className={`${prefixCls}-action`} onClick={this.handleClear}>
          <Icon type="close-circle-fill" />
        </a>
      ) : (
        <span className={`${prefixCls}-action`}>
          <Icon type="search-line" />
        </span>
      );
    return (
      <div>
        <Input
          placeholder={placeholder}
          className={prefixCls}
          value={value}
          ref={el => (this.input = el)}
          onChange={this.handleChange}
        />
        {icon}
      </div>
    );
  }
}
