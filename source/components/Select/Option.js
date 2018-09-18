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
    showOptionCheckedIcon: PropTypes.bool,
    // INTERNAL USE ONLY
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOptionClick: PropTypes.func,
    onOptionMouseEnter: PropTypes.func,
    onOptionMouseLeave: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'fishd-select-dropdown-option',
    showOptionCheckedIcon: true,
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

  onOptionMouseEnter = (e) => {
    const {disabled, onOptionMouseEnter, value} = this.props;
    if (!disabled) {
      onOptionMouseEnter && onOptionMouseEnter(value);
    }
  };

  onOptionMouseLeave = (e) => {
    const {disabled, onOptionMouseLeave, value} = this.props;
    if (!disabled) {
      onOptionMouseLeave && onOptionMouseLeave(value);
    }
  };

  render() {
    const {title, children, activeKey, showOptionCheckedIcon, value, disabled, checked, prefixCls} = this.props;
    const label = children && children.length === 1 ? children[0] : children;
    const optionCls =
      classNames(
        {[`${prefixCls}-item`]: true},
        {[`${prefixCls}-item-disabled`]: !!disabled},
        {[`checked`]: !!checked},
        {[`checked-icon`]: !!checked && showOptionCheckedIcon},
        {[`active`]: 'activeKey' in this.props && activeKey === value}
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
