import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { LocaleProperties } from "../Locale";
import ConfigConsumer from "../Config/Consumer";
export interface TextLoadingProps {
  text?: string;
  className?: string;
  prefixCls?: string;
}

const TextLoading = (props: TextLoadingProps) => {
  const { text, className = '', prefixCls = 'fishd-spin' } = props;
  const otherProps = omit(props, ['className', 'prefixCls']);
  const classString = classNames(`${prefixCls}-text-loading`, className);
  return (
    <ConfigConsumer componentName="Spin">
      {
        (Locale: LocaleProperties["Spin"]) => {
          return (
          <div {...otherProps} className={classString}>
            {text === undefined ? Locale.loading : text}
            <span className={`${prefixCls}-text-loading-dot`}>
              <i>.</i>
            </span>
           </div>
         )
        }
      }
      
    </ConfigConsumer>
    
  );
};

export default TextLoading;
