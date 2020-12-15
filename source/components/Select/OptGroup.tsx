import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

interface OptGroupProps {
  _isShow?: boolean;
  children?: React.ReactNode | React.ReactChildren;
  label?: React.ReactNode | string;
  prefixCls?: string;
}

export default class OptGroup extends React.Component<OptGroupProps> {
  static isSelectOptGroup = true;

  static propTypes = {
    _isShow: PropTypes.bool, // INTERNAL USE ONLY
    children: PropTypes.node.isRequired,
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    prefixCls: PropTypes.string
  };

  static defaultProps = {
    _isShow: true,
    prefixCls: 'fishd-select-dropdown-option-group'
  };

  constructor(props: OptGroupProps) {
    super(props);
  }

  render() {
    const { children, label, prefixCls, _isShow } = this.props;
    return (
      _isShow && (
        <div className={classNames(`${prefixCls}`)}>
          <p className={`${prefixCls}-label`}>{label}</p>
          {children}
        </div>
      )
    );
  }
}
