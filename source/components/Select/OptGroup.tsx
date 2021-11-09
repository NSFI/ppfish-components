import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

interface OptGroupProps {
  prefixCls?: string;
  label?: React.ReactNode | string;
  _isShow?: boolean;
  children?: React.ReactNode | React.ReactChildren;
}

type InternalOptGroupInterface = React.ForwardRefRenderFunction<HTMLDivElement, OptGroupProps>;

export type OptGroupInterface = React.ForwardRefExoticComponent<
  OptGroupProps & React.RefAttributes<HTMLDivElement>
> & { isSelectOptGroup: true };

const InternalOptGroup: InternalOptGroupInterface = (props, ref) => {
  const { children, label, prefixCls, _isShow } = props;
  return (
    _isShow && (
      <div ref={ref} className={classNames(`${prefixCls}`)}>
        <p className={`${prefixCls}-label`}>{label}</p>
        {children}
      </div>
    )
  );
};

// TODO valid
const OptGroup = React.forwardRef(InternalOptGroup) as OptGroupInterface;

OptGroup.defaultProps = {
  _isShow: true,
  prefixCls: 'fishd-select-dropdown-option-group',
};

OptGroup.isSelectOptGroup = true;
OptGroup.displayName = 'OptGroup';

export default OptGroup;
