import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../../Icon/index.tsx';
import Tooltip from '../../Tooltip/index.tsx';

export default class Play extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    vjsComponent: PropTypes.object
  };

  static defaultProps = {
    prefixCls: 'fishd-video-viewer-play'
  }

  constructor(props) {
    super(props);
    console.log(props.vjsComponent.player_.paused())
    this.state = {
      isPlay: !props.vjsComponent.player_.paused()
    }
  }

  handleClick = () => {
    const { vjsComponent } = this.props;
    const { isPlay } = this.state;

    if(!isPlay) {
      vjsComponent.player_.play();

    }else{
      vjsComponent.player_.pause();
    }

    this.setState({
      isPlay: !isPlay
    })
  }

  render() {
    const { vjsComponent, prefixCls } = this.props;
    const { isPlay } = this.state;

    const pausePlayIcon = !isPlay ? 'play' : 'stop';
    const title = !isPlay ? '播放' : '暂停';

    return (
      <div className={classnames(prefixCls, "fishd-video-js-customer-button")}>
        <Tooltip title={title} getPopupContainer={(e) => e.parentNode}>
          <a onClick={()=>this.handleClick()}>
            <Icon
              className={`${prefixCls}-customer-handle`}
              type={pausePlayIcon}
            />
          </a>
        </Tooltip>
      </div>
    );
  }
}
