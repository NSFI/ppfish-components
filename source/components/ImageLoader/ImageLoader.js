import React from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import {polyfill} from 'react-lifecycles-compat';

import './style/index.less';

const defaultSizeMap = {
  small: {
    width: 90,
    height: 60,
  },
  default: {
    width: 150,
    height: 100,
  },
  large: {
    width: 240,
    height: 160,
  }
};

const Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};
const noop = () => {
};

class ImageLoader extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    placeholderSize: PropTypes.string,
    style: PropTypes.object,
    preLoader: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
    failedLoader: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
    src: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    imgProps: PropTypes.object,
  };

  static defaultProps = {
    prefixCls: 'fishd-image-loader',
    placeholderSize: 'default',
    onLoad: noop,
    onError: noop,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {prevProps = {}} = prevState;
    const newState = {prevProps: nextProps};
    if (prevProps.src !== nextProps.src) {
      newState.status = nextProps.src ? Status.LOADING : Status.PENDING;
    }

    return newState;
  }

  constructor(props) {
    super(props);
    this.state = {status: props.src ? Status.LOADING : Status.PENDING, prevProps: props};
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }

  componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this.createLoader();
    }
  }

  componentWillUnmount() {
    this.destroyLoader();
  }

  getClassName() {
    const {prefixCls} = this.props;
    let className = `${prefixCls} ${prefixCls}-${this.state.status}`;
    if (this.props.className) {
      className = `${className} ${this.props.className}`;
    }
    return className;
  }

  base64Img = (cls) => {
    const {placeholderSize} = this.props;
    let sizeProps = {
      width: '100%'
    };
    if (typeof placeholderSize === 'object') {
      sizeProps = Object.assign({}, sizeProps, placeholderSize);
    } else if (['small', 'default', 'large'].indexOf(placeholderSize) > -1) {
      sizeProps = Object.assign({}, sizeProps, defaultSizeMap[placeholderSize]);
    }
    return (
      <div className={cls} style={{...sizeProps}}/>
    );
  }

  createLoader() {
    this.destroyLoader();  // We can only have one loader at a time.

    this.img = new Image();
    this.img.onload = this.handleLoad.bind(this);
    this.img.onerror = this.handleError.bind(this);
    this.img.src = this.props.src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  handleLoad(event) {
    this.destroyLoader();
    this.setState({status: Status.LOADED});

    if (this.props.onLoad) this.props.onLoad(event);
  }

  handleError(error) {
    this.destroyLoader();
    this.setState({status: Status.FAILED});

    if (this.props.onError) this.props.onError(error);
  }

  renderImg() {
    const {src, imgProps} = this.props;
    const otherProps = omit(imgProps, [
      'src',
    ]);

    return <img src={src} {...otherProps} />;
  }

  render() {
    const {style, preLoader, failedLoader} = this.props;
    let wrapperProps = {
      className: this.getClassName(),
    };

    if (style) {
      wrapperProps.style = style;
    }

    let content = null;

    switch (this.state.status) {
      case Status.LOADED:
        // 加载成功
        content = this.renderImg();
        break;

      case Status.FAILED:
        // 使用自定义加载失败图片
        if (failedLoader) {
          if (typeof failedLoader === 'function') {
            content = failedLoader();
          } else {
            content = failedLoader;
          }
          // 使用系统预置加载失败图片
        } else {
          content = this.base64Img('failed-img');
        }
        break;

      default:
        // 使用自定义占位图片
        if (preLoader) {
          if (typeof preLoader === 'function') {
            content = preLoader();
          } else {
            content = preLoader;
          }
          // 使用系统预置占位图片
        } else {
          content = this.base64Img('preload-img');
        }
        break;
    }

    return <div {...wrapperProps}>{content}</div>;

  }
}

polyfill(ImageLoader);

export default ImageLoader;
