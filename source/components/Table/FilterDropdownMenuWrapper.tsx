import * as React from 'react';

export interface FilterDropdownMenuWrapperProps {
  onClick?: React.MouseEventHandler<any>;
  children?: any;
  className?: string;
}

const FilterDropdownMenuWrapper = (props: FilterDropdownMenuWrapperProps) => (
  <div className={props.className} onClick={props.onClick}>
    {props.children}
  </div>
);

export default FilterDropdownMenuWrapper;
