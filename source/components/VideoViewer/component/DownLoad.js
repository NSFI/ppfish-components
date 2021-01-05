import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../../Icon/index.tsx';
import Tooltip from '../../Tooltip/index.tsx';
import ConfigConsumer from '../../Config/Consumer';

export default class DownLoad extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    vjsComponent: PropTypes.object
  };

  static defaultProps = {
    prefixCls: 'fishd-video-viewer-download'
  }

  render() {
    const { vjsComponent, prefixCls } = this.props;
    const src = vjsComponent.options_.playerOptions.downloadSrc;
    return (
      <ConfigConsumer componentName="VideoViewer">
        {
          (Locale) => {
            return (
              <div className={classnames(prefixCls, "fishd-video-js-customer-button")}>
                <Tooltip
                  title={<span style={{ wordBreak: 'keep-all' }}>
                    {Locale.download}</span>}
                  getPopupContainer={(e) => e.parentNode}>
                  <a download href={src} target="_blank" rel="noopener noreferrer">
                    <Icon type="sound-download" />
                  </a>
                </Tooltip>
              </div>
            );
          }
        }

      </ConfigConsumer>
    );
  }
}
