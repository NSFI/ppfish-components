import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

export interface TextLoadingProps {
  text?: string;
  className?: string;
  prefixCls?: string;
}

const TextLoading = (props: TextLoadingProps) => {
  const { text = '加载中', className = '', prefixCls = 'fishd-spin' } = props;
  const otherProps = omit(props, ['className', 'prefixCls']);
  const classString = classNames(`${prefixCls}-text-loading`, className);
  return (
    <div {...otherProps} className={classString}>
      {text}
      <span className={`${prefixCls}-text-loading-dot`}>
        <i>.</i>
      </span>
    </div>
  );
};

export default TextLoading;
