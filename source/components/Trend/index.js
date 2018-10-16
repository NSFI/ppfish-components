import React from 'react';
import Icon from '../Icon/index.tsx';
import classNames from 'classnames';
import './style/index.less';

const Trend = ({ colorful = true, reverseColor = false, flag, children, className, ...rest }) => {
  const classString = classNames('trendItem', {
    'trendItemGrey': !colorful,
    'reverseColor': reverseColor && colorful,
  }, className);

  return (
    <div {...rest} className={classString} title={typeof children === 'string' ? children : ''}>
      <span className={'value'}>{children}</span>
      {flag && (
        <span className={flag}>
          <Icon type={`${flag}-fill`} />
        </span>
      )}
    </div>
  );
};

export default Trend;
