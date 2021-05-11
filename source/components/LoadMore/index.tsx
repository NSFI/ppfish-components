import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button';
import './style/index.less';
import ConfigConsumer from '../Config/Consumer';
import { LocaleProperties } from '../Locale';

const noop = () => {};

interface LoadMoreProps {
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

export default class LoadMore extends React.Component<LoadMoreProps> {
  static propTypes = {
    onLoadMore: PropTypes.func,
    className: PropTypes.string,
    status: PropTypes.string,
    defaultText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    loadingText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    endText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    extraCls: PropTypes.string,
    buttonSize: PropTypes.string
  };

  static defaultProps = {
    onLoadMore: noop,
    status: 'default',
    defaultText: '查看更多',
    loadingText: '加载中',
    errorText: '加载失败，请重试',
    endText: '没有更多了',
    buttonSize: 'default'
  };

  constructor(props: LoadMoreProps) {
    super(props);
  }

  render() {
    const {
      defaultText,
      onLoadMore,
      status,
      buttonSize,
      loadingText,
      errorText,
      endText,
      extraCls,
      ...otherProps
    } = this.props;
    return (
      <ConfigConsumer componentName="LoadMore">
        {
          (Locale: LocaleProperties["LoadMore"]) =>
            <div
              className={classNames('fishd-loadmore', {
                [`${extraCls}`]: !!extraCls
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
                          break;
                        case 'loading':
                          return Locale.loadingText;
                          break;
                        case 'error':
                          return Locale.errorText;
                          break;
                        case 'end':
                          return Locale.endText;
                      }
                    }
                  )()}
                </Button>
              )}
            </div>
        }

      </ConfigConsumer>

    );
  }
}
