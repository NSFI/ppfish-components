import * as React from 'react';
import classNames from 'classnames';
import Item from './Item';
import { ComponentType, OverflowContext } from './Overflow';

export interface RawItemProps extends React.HTMLAttributes<any> {
  component?: ComponentType;
  children?: React.ReactNode;
}

const InternalRawItem = (props: RawItemProps, ref: React.Ref<any>) => {
  const context = React.useContext(OverflowContext);

  // Render directly when context not provided
  if (!context) {
    const { component: Component = 'div', ...restProps } = props;
    return <Component {...restProps} ref={ref} />;
  }

  const { className: contextClassName, ...restContext } = context;
  const { className, ...restProps } = props;

  // Do not pass context to sub item to avoid multiple measure
  return (
    <OverflowContext.Provider value={null}>
      <Item
        ref={ref}
        className={classNames(contextClassName, className)}
        {...restContext}
        {...restProps}
      />
    </OverflowContext.Provider>
  );
};

const RawItem = React.forwardRef(InternalRawItem);
RawItem.displayName = 'RawItem';

export default RawItem;