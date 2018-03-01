/**
 * AnimationImageLoader
 * qz
 * 2017年10月25日
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.less';
import defaultImage from './POI@2x.jpg';
import classNames from 'classnames';

class AnimationImageLoader extends Component {

  static propTypes = {
    src: PropTypes.string,
    zoom: PropTypes.number,
    extraCls: PropTypes.string
  };

  static defaultProps = {
    src: defaultImage,
    zoom: 0.5,
    extraCls: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      scroll: 0, //播放位置
      bgHeight: 0, //图片高度
      bgWidth: 0, //图片宽度
      perFrame: 0,//每一帧的移动距离
      stage: 1 //1 顺序播放  0 倒序播放
    };
  }

  componentDidMount() {
    const imageSrc = this.refs['img-loader']
      .style
      .backgroundImage
      .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
      .split(',')[0];

    const testImage = new Image();
    testImage.src = imageSrc;

    testImage.addEventListener('load', () => {
      this.setState({
        bgHeight: testImage.height,
        bgWidth: testImage.width,
        perFrame: (testImage.height / (testImage.height / testImage.width)) * this.props.zoom
      });
    });
  }

  handleMouseEnter = () => {
    this.setState({
      stage: 1
    }, () => {
      this.startLoop();
    });
  };

  handleMouseLeave = () => {
    this.setState({
      stage: 0
    }, () => {
      this.startLoop();
    });
  };

  startLoop = () => {
    if (!this._frameId) {
      this._frameId = window.requestAnimationFrame(this.loop);
    }
  };

  loop = () => {
    // Perform loop work here
    this.setState({
      scroll: this.state.scroll + (this.state.stage ? +this.state.perFrame : -this.state.perFrame)
    }, () => {
      // Stop loop when boundary value
      if (this.state.scroll === this.state.bgHeight * this.props.zoom - this.state.perFrame || this.state.scroll === 0) {
        this.stopLoop();
      } else {
        // Set up next iteration of the loop
        this._frameId = window.requestAnimationFrame(this.loop);
      }
    });
  };

  stopLoop = () => {
    window.cancelAnimationFrame(this._frameId);
    this._frameId = null;
  };

  render() {
    const animationClass = classNames(
      'u-animationImage',
      'animation-type-1',
      `${this.props.extraCls}`
    );

    return (
      <div
        className={animationClass}
        ref="img-loader"
        style={{
          backgroundPosition: `0px -${this.state.scroll}px`,
          backgroundImage: `url(${this.props.src})`,
          backgroundSize: this.state.bgWidth * this.props.zoom,
          width: this.state.bgWidth * this.props.zoom,
          height: this.state.bgWidth * this.props.zoom,
          background: `no-repeat ${this.props.zoom}`
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

export default AnimationImageLoader;
