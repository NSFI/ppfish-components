import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Option extends React.Component {
  static isSelectOption = true;

  static propTypes = {
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    children: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
    onOptionClick: PropTypes.func,
    onOptionMouseEnter: PropTypes.func,
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    prefixCls: 'fish-select-dropDown-option'
  };

  constructor(props) {
    super(props);
  }

  onOptionClick = (e, optionObject) => {
    const {disabled, onOptionClick} = this.props;
    if (!disabled) {
      onOptionClick && onOptionClick(e, optionObject);
    }
  };

  onOptionMouseEnter = (e, key) => {
    const {disabled, onOptionMouseEnter, value} = this.props;
    if (!disabled) {
      onOptionMouseEnter && onOptionMouseEnter(value);
    }
  };


  render() {
    const {title, children, activeKey, value, disabled, checked, prefixCls} = this.props;
    return (
      <li
        title={title}
        onMouseEnter={this.onOptionMouseEnter}
        className={classNames(`${prefixCls}-item`, {[`${prefixCls}-item-disabled`]: !!disabled}, {[`checked`]: !!checked}, {[`active`]: activeKey == value},)}
        onClick={(e) => this.onOptionClick(e, {label: children, key: value})}>
        {children}
      </li>
    );
  }
}
