import * as React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import classNames from 'classnames';
import './style/index.less';

interface TrendProps {
  className?: string;
  style?: React.CSSProperties;
  flag?: string;
  size?: string;
  value?: string;
  colorful?: boolean;
  reverseColor?: boolean;
  children?: React.ReactChildren;
}

const Trend: React.SFC<TrendProps> = props => {
  const {
    colorful = true,
    reverseColor = false,
    flag,
    children,
    className,
    size = 'small',
    style,
    value,
    ...restProps
  } = props;
  const cls = classNames(
    'trend-item',
    {
      'trend-item-grey': !colorful,
      'reverse-color': reverseColor && colorful,
      normal: size == 'normal',
      large: size == 'large'
    },
    className
  );

  const renderFlag = () => {
    if (!flag) return;

    let iconType = null,
      mark = null;
    if (flag == 'up') {
      mark = '+';
      iconType = 'trendrise';
    } else {
      mark = '-';
      iconType = 'trenddecline';
    }

    return (
      <span className={flag}>
        {value && typeof value == 'string' ? `${mark}${value}` : <Icon type={iconType} />}
      </span>
    );
  };

  return (
    <div
      {...restProps}
      className={cls}
      title={typeof children === 'string' ? children : ''}
      style={style}
    >
      <span className="value">{children}</span>
      {renderFlag()}
    </div>
  );
};

Trend.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  flag: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.string,
  colorful: PropTypes.bool,
  reverseColor: PropTypes.bool,
  children: PropTypes.node
};

export default Trend;
