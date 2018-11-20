import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/index.js';
import classNames from 'classnames';
import './style/index.less';

const Trend = ({ colorful = true, reverseColor = false, flag, children, className, style, ...rest }) => {
  const classString = classNames('trendItem', {
    'trendItemGrey': !colorful,
    'reverseColor': reverseColor && colorful,
  }, className);

  return (
    <div {...rest} className={classString} title={typeof children === 'string' ? children : ''} style={style}>
      <span className={'value'}>{children}</span>
      {flag && (
        <span className={flag}>
          <Icon type={`${flag}-fill`} />
        </span>
      )}
    </div>
  );
};

Trend.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  flag: PropTypes.string,
  colorful: PropTypes.bool,
  reverseColor: PropTypes.bool,
  children: PropTypes.node,
};

export default Trend;
