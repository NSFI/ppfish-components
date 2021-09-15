import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import calculateNodeHeight from './calculateNodeHeight';

function onNextFrame(cb: () => void) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId: number) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

export type HTMLTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaProps extends HTMLTextareaProps {
  prefixCls?: string;
  autosize?: boolean | AutoSizeType;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

export interface TextAreaRef {
  textAreaRef: HTMLTextAreaElement;
  focus: () => void;
  blur: () => void;
  resizeTextarea: () => void;
}

const InternalTextArea: React.ForwardRefRenderFunction<TextAreaRef, TextAreaProps> = (
  props,
  ref,
) => {
  const [textareaStyles, setTextareaStyles] = React.useState<React.CSSProperties>({});
  const nextFrameActionIdRef = React.useRef<number>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const { autosize } = props;
    const textAreaNode = textAreaRef.current;
    if (!autosize || !textAreaNode) {
      return;
    }
    const minRows = autosize ? (autosize as AutoSizeType).minRows : null;
    const maxRows = autosize ? (autosize as AutoSizeType).maxRows : null;
    const textareaStyles = calculateNodeHeight(textAreaNode, false, minRows, maxRows);
    setTextareaStyles(textareaStyles);
  };

  const getTextAreaClassName = () => {
    const { prefixCls, className, disabled } = props;
    return classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!('value' in props)) {
      resizeTextarea();
    }
    const { onChange } = props;
    if (onChange) {
      onChange(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { onPressEnter, onKeyDown } = props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  React.useImperativeHandle(ref, () => ({
    textAreaRef: textAreaRef.current,
    focus: () => {
      textAreaRef.current.focus();
    },
    blur: () => {
      textAreaRef.current.blur();
    },
    resizeTextarea,
  }));

  React.useEffect(() => {
    const nextFrameActionId = nextFrameActionIdRef.current;
    if (nextFrameActionId) {
      clearNextFrameAction(nextFrameActionId);
    }
    nextFrameActionIdRef.current = onNextFrame(resizeTextarea);
  }, [props.value]);

  const otherProps = omit(props, ['prefixCls', 'onPressEnter', 'autosize']);
  const style = {
    ...props.style,
    ...textareaStyles,
  };
  // Fix https://github.com/ant-design/ant-design/issues/6776
  // Make sure it could be reset when using form.getFieldDecorator
  if ('value' in otherProps) {
    otherProps.value = otherProps.value || '';
  }
  return (
    <textarea
      {...otherProps}
      className={getTextAreaClassName()}
      style={style}
      onKeyDown={handleKeyDown}
      onChange={handleTextareaChange}
      ref={textAreaRef}
    />
  );
};

const TextArea = React.forwardRef(InternalTextArea);

TextArea.displayName = 'TextArea';

TextArea.defaultProps = {
  prefixCls: 'fishd-input',
};

export default TextArea;
