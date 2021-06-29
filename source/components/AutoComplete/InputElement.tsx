import * as React from 'react';
export interface InputElementProps {
  children: React.ReactElement<any>;
}

export interface InputElementRef {
  focus: () => void,
  blur: () => void,
}

const InternalInputElement: React.ForwardRefRenderFunction<InputElementRef, InputElementProps> = (
  props,
  ref,
) => {
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      ele.current.focus();
    },
    blur: () => {
      ele.current.blur();
    },
  }));

  const ele = React.useRef<HTMLInputElement>();
  const saveRef = (elem: HTMLInputElement) => {
    ele.current = elem;
    const { ref: childRef } = props.children as any;
    if (typeof childRef === 'function') {
      childRef(elem);
    }
  };

  return React.cloneElement(
    props.children,
    {
      ...props,
      ref: saveRef,
    },
    null,
  );
};

const InputElement = React.forwardRef(InternalInputElement);

InputElement.displayName = 'InputElement';

export default InputElement;
