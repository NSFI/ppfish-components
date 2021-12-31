import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../../Icon/index';
import Tooltip from '../../Tooltip/index';
import ConfigConsumer from '../../Config/Consumer';

interface DownLoadProps {
  prefixCls?: string;
  vjsComponent: any;
}

export default class DownLoad extends Component<DownLoadProps, any> {
  static defaultProps = {
    prefixCls: 'fishd-video-viewer-download',
  };

  render() {
    const { vjsComponent, prefixCls } = this.props;
    const src = vjsComponent.options_.playerOptions.downloadSrc;
    return (
      <ConfigConsumer componentName="VideoViewer">
        {Locale => {
          return (
            <div className={classnames(prefixCls, 'fishd-video-js-customer-button')}>
              <Tooltip
                title={<span style={{ wordBreak: 'keep-all' }}>{Locale.download}</span>}
                getPopupContainer={e => e.parentElement}
              >
                <a download href={src} target="_blank" rel="noopener noreferrer">
                  <Icon type="sound-download" />
                </a>
              </Tooltip>
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}
