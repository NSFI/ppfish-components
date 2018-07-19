import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SelectOptionGroup extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    children: PropTypes.node.isRequired,
    _isShow: PropTypes.bool,
  };

  static defaultProps = {
    _isShow: true,
    prefixCls: 'm-biz-select-dropDown-option'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {children, label, prefixCls, _isShow} = this.props;
    if (_isShow) {
      return (
        <div className={classNames(`${prefixCls}-group`)}>
          <p className={`${prefixCls}-group-label`}>{label}</p>
          {children}
        </div>
      );
    } else {
      return null;
    }
  }
}
