import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import TextArea, { TextAreaProps } from './TextArea';

function countValue(value: string) {
  return value.length;
}

export interface CounterProps extends TextAreaProps {
  inputPrefixCls?: string;
  prefixCls?: string;
  limit: number;
  count?: (value: string) => number;
  value: any;
  defaultValue: any;
}

export default class Counter extends React.Component<CounterProps, any> {
  static defaultProps = {
    inputPrefixCls: 'fishd-input',
    prefixCls: 'fishd-input-counter',
  };

  constructor(props) {
    super(props);
    const { defaultValue, value } = props;
    let total = 0;
    if ( 'defaultValue' in props ) {
      total = this.getCount(defaultValue);
    } else if ( 'value' in props ) {
      total = this.getCount(value);
    }
    this.state = {
      total,
    };
  }

  private textarea: TextArea;

  focus() {
    this.textarea.focus();
  }

  blur() {
    this.textarea.blur();
  }

  saveTextarea = (node: TextArea) => {
    this.textarea = node;
  }

  getTextAreaClassName() {
    const { inputPrefixCls, className, disabled } = this.props;
    return classNames(inputPrefixCls, className, {
      [`${inputPrefixCls}-disabled`]: disabled,
    });
  }

  handleClick = () => {
    this.focus();
  }

  handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    const textareaValue = this.textarea && this.textarea.textAreaRef.value;
    this.setState({
      total: this.getCount(textareaValue)
    });
    if (onChange) {
      onChange(e);
    }
  };

  getCount = (value) => {
    const { count } = this.props;
    if (!value) {
      return 0;
    }
    // 自定义计数方法
    if (count) {
      return count(value);
    }
    return countValue(value);
  };

  render() {
    const { className, prefixCls, limit } = this.props;
    const inputClassName = classNames(className, {
      [`${prefixCls}`]: true,
    });
    const otherProps = omit(this.props, [
      'inputPrefixCls',
      'prefixCls',
      'limit',
      'count',
    ]);
    return (
      <div className={inputClassName} onClick={this.handleClick}>
        <TextArea
          {...otherProps}
          className={this.getTextAreaClassName()}
          maxLength={limit}
          onChange={this.handleTextareaChange}
          ref={this.saveTextarea}
        />
        <div className={`${prefixCls}-footer`}>
          <span className={`${prefixCls}-indicator`}>{this.state.total}/{limit}</span>
        </div>
      </div>
    );
  }
}
