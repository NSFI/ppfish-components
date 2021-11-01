import * as React from "react";
import classNames from "classnames";

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckableTag:React.FC<CheckableTagProps> = props => {

  const { prefixCls = "fishd-tag", className, checked, onChange, ...restProps } = props;
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-checkable`]: true,
      [`${prefixCls}-checkable-checked`]: checked
    },
    className
  );

  const handleClick = () => {
    const { checked, onChange } = props;
    if (onChange) {
      onChange(!checked);
    }
  };
  return <div {...restProps} className={cls} onClick={handleClick} />;
};
export default CheckableTag;
