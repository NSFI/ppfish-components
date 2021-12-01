import React, { createRef, useContext } from 'react';
import classNames from 'classnames';
import RcCheckbox from '../Checkbox/src/Checkbox';
import { RadioChangeEvent, RadioProps } from './interface';
import RadioContext from './context';

// todo check  ref
const InternalRadio: React.ForwardRefRenderFunction<HTMLElement, RadioProps> = (props, ref) => {
  const context = useContext(RadioContext);
  const checkBoxRef = createRef<HTMLInputElement>();
  const { prefixCls, className, children, style, ...restProps } = props;

  const onChange = (e: RadioChangeEvent) => {
    // props.onChange?.(e);
    context?.onChange?.(e);
  };

  let radioProps: RadioProps = { ...restProps };
  if (context) {
    radioProps.name = context.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === context.value;
    radioProps.disabled = props.disabled || context.disabled;
  }

  const wrapperClassString = classNames(className, {
    [`${prefixCls}-wrapper`]: true,
    [`${prefixCls}-wrapper-checked`]: radioProps.checked,
    [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
  });

  return (
    <label
      className={wrapperClassString}
      style={style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <RcCheckbox {...radioProps} type="radio" prefixCls={prefixCls} ref={checkBoxRef} />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  );
};

const Radio = React.forwardRef<unknown, RadioProps>(InternalRadio);

Radio.defaultProps = {
  prefixCls: 'fishd-radio',
};

Radio.displayName = 'Radio';

export default Radio;
