import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import './style/index.less';
import ConfigConsumer from '../Config/Consumer';
import { LocaleProperties } from '../Locale';

const noop = () => {};

export interface LoadMoreProps {
  buttonSize: 'small' | 'default' | 'large';
  className?: string;
  defaultText: string | React.ReactNode;
  onLoadMore: () => void;
  endText: string | React.ReactNode;
  errorText: string | React.ReactNode;
  loadingText: string | React.ReactNode;
  status: string;
  extraCls?: string;
}
const LoadMore: React.FC<LoadMoreProps> = ({
  onLoadMore = noop,
  status = 'default',
  defaultText = '查看更多',
  loadingText = '加载中',
  errorText = '加载失败，请重试',
  endText = '没有更多了',
  buttonSize = 'default',
  extraCls,
  ...otherProps
}) => {
  return (
    <ConfigConsumer componentName="LoadMore">
      {(Locale: LocaleProperties['LoadMore']) => (
        <div
          className={classNames('fishd-loadmore', {
            [`${extraCls}`]: !!extraCls,
          })}
        >
          {status === 'end' ? (
            <span className="z-load-end">{Locale.endText}</span>
          ) : (
            <Button
              size={buttonSize}
              onClick={onLoadMore}
              loading={status === 'loading'}
              {...otherProps}
            >
              {(() => {
                switch (status) {
                  case 'default':
                    return Locale.defaultText;
                  case 'loading':
                    return Locale.loadingText;
                  case 'error':
                    return Locale.errorText;
                  case 'end':
                    return Locale.endText;
                }
              })()}
            </Button>
          )}
        </div>
      )}
    </ConfigConsumer>
  );
};

export default LoadMore;
