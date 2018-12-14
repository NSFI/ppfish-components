import React, { Component, PropTypes } from 'react';
import Icon from '../../Icon/index.tsx';

export default class DownLoad extends Component {
  render() {
    const src = this.props.vjsComponent.options_.playerOptions.downloadSrc;
    return (
      <div className="fishd-video-js-download">
        <a download href={src} title="下载">
          <Icon type="sound-download" />
        </a>
      </div>
    );
  }
}
