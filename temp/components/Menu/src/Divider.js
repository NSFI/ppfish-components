import React from 'react';
import PropTypes from 'prop-types';

export default class Divider extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    rootPrefixCls: PropTypes.string,
  };

  static defaultProps = {
    // To fix keyboard UX.
    disabled: true,
  };

  render() {
    const {className = '', rootPrefixCls} = this.props;
    return <li className={`${className} ${rootPrefixCls}-item-divider`}/>;
  }
}
