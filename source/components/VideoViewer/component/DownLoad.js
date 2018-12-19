import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon/index.tsx';
import Tooltip from '../../Tooltip/index.tsx';

export default class DownLoad extends Component {
  static propTypes = {
    vjsComponent: PropTypes.object
  };

  render() {
    const { vjsComponent } = this.props;
    const src = vjsComponent.options_.playerOptions.downloadSrc;
    return (
      <div className="fishd-video-js-customer-button download">
        <Tooltip title="下载" getPopupContainer={(e) => e.parentNode}>
          <a download href={src} target="_blank">
            <Icon type="sound-download"/>
          </a>
        </Tooltip>
      </div>
    );
  }
}
