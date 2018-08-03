import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class OptGroup extends React.Component {
  static isSelectOptGroup = true;

  static propTypes = {
    _isShow: PropTypes.bool, // INTERNAL USE ONLY
    children: PropTypes.node.isRequired,
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    prefixCls: PropTypes.string,
  };

  static defaultProps = {
    _isShow: true,
    prefixCls: 'fishd-select-dropdown-option-group'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {children, label, prefixCls, _isShow} = this.props;
    if (_isShow) {
      return (
        <div className={classNames(`${prefixCls}`)}>
          <p className={`${prefixCls}-label`}>{label}</p>
          {children}
        </div>
      );
    } else {
      return null;
    }
  }
}
