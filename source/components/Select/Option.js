import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Option extends React.Component {
  static isSelectOption = true;

  static propTypes = {
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    children: PropTypes.node,
    disabled: PropTypes.bool,
    prefixCls: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
    // INTERNAL USE ONLY
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOptionClick: PropTypes.func,
    onOptionMouseEnter: PropTypes.func,
    onOptionMouseLeave: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'fishd-select-dropdown-option'
  };

  constructor(props) {
    super(props);
  }

  onOptionClick = (e, option) => {
    const {disabled, onOptionClick} = this.props;
    if (!disabled) {
      onOptionClick && onOptionClick(e, option);
    }
  };

  onOptionMouseEnter = () => {
    const {disabled, onOptionMouseEnter, value} = this.props;
    if (!disabled) {
      onOptionMouseEnter && onOptionMouseEnter(value);
    }
  };

  onOptionMouseLeave = () => {
    const {disabled, onOptionMouseLeave, value} = this.props;
    if (!disabled) {
      onOptionMouseLeave && onOptionMouseLeave(value);
    }
  };

  render() {
    const {title, children, activeKey, value, disabled, checked, prefixCls} = this.props;
    const label = children && children.length === 1 ? children[0] : children;
    const optionCls =
      classNames(
        {[`${prefixCls}-item`]: true},
        {[`${prefixCls}-item-disabled`]: !!disabled},
        {[`checked`]: !!checked},
        {[`active`]: activeKey === value}
      );
    return (
      <li
        title={title}
        onMouseEnter={this.onOptionMouseEnter}
        onMouseLeave={this.onOptionMouseLeave}
        className={optionCls}
        onClick={(e) => this.onOptionClick(e, {label, title, key: value})}>
        {children}
      </li>
    );
  }
}
