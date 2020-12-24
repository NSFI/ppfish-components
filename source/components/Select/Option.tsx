import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

interface OptionProps {
  activeKey?: string | number;
  checked?: boolean | (() => void);
  children?: React.ReactNode | React.ReactChildren;
  disabled?: boolean;
  onOptionClick?: (e: React.MouseEvent<any>, option: any) => void;
  prefixCls?: string;
  showOptionCheckedIcon?: boolean;
  title?: string;
  value?: string | number | React.ReactNode;
}

export default class Option extends React.Component<OptionProps> {
  static isSelectOption = true;

  static propTypes = {
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onOptionClick: PropTypes.func,
    prefixCls: PropTypes.string,
    showOptionCheckedIcon: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node])
  };

  static defaultProps = {
    prefixCls: 'fishd-select-dropdown-option',
    showOptionCheckedIcon: true
  };

  constructor(props: OptionProps) {
    super(props);
  }

  onOptionClick = (e: React.MouseEvent<any>, option) => {
    const { disabled, onOptionClick } = this.props;

    if (!disabled) {
      onOptionClick && onOptionClick(e, option);
    }
  };

  render() {
    const {
      title,
      children,
      activeKey,
      showOptionCheckedIcon,
      value,
      disabled,
      checked,
      prefixCls
    } = this.props;
    const label = children && (children as React.ReactNode[]).length === 1 ? children[0] : children;
    const optionCls = classNames(
      { [`${prefixCls}-item`]: true },
      { [`checked`]: !!checked },
      { [`checked-icon`]: !!checked && showOptionCheckedIcon },
      { [`active`]: 'activeKey' in this.props && activeKey === value },
      { [`${prefixCls}-item-disabled`]: !!disabled }
    );
    return (
      <li
        title={title}
        className={optionCls}
        onClick={e => this.onOptionClick(e, { label, title, key: value })}
      >
        {children}
      </li>
    );
  }
}
