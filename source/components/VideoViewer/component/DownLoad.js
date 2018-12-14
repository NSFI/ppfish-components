import React, { Component, PropTypes } from 'react';
import Icon from '../../Icon/index.tsx';

export default class DownLoad extends Component {
  static propTypes = {
    vjsComponent: PropTypes.object
  };

  render() {
    const { vjsComponent } = this.props;
    const src = vjsComponent.options_.playerOptions.downloadSrc;
    return (
      <div className="fishd-video-js-download">
        <a download href={src} title="下载">
          <Icon type="sound-download" />
        </a>
      </div>
    );
  }
}
