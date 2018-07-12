import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

const span = React.createFactory('span');

const Status = {
  PENDING: 'm-image-loader-pending',
  LOADING: 'm-image-loader-loading',
  LOADED: 'm-image-loader-loaded',
  FAILED: 'm-image-loader-failed',
};
const noop = () => {};

class ImageLoader extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    wrapper: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    preloader: PropTypes.func,
    src: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    imgProps: PropTypes.object,
  };

  static defaultProps = {
    wrapper: span,
    onLoad: noop,
    onError: noop,
    preloader: () => {
      const preUrl = "data:image/png;base64,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";
      return (
        <div style={{'maxWidth': '100%'}}>
          <img src={preUrl} style={{'width': '100%'}} />
        </div>
      );
    },
    style: {'maxWidth': '100%'},
    imgProps: {style : {'width': '100%'}},
  };

  constructor(props) {
    super(props);
    this.state = {status: props.src ? Status.LOADING : Status.PENDING};
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING,
      });
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
    let className = `m-image-loader ${this.state.status}`;
    if (this.props.className) className = `${className} ${this.props.className}`;
    return className;
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
    let props = {src};

    for (let k in imgProps) {
      if (imgProps.hasOwnProperty(k)) {
        props[k] = imgProps[k];
      }
    }

    return <img {...props} />;
  }

  render() {
    let wrapperProps = {
      className: this.getClassName(),
    };

    if (this.props.style) {
      wrapperProps.style = this.props.style;
    }

    let wrapperArgs = [wrapperProps];

    switch (this.state.status) {
      case Status.LOADED:
        wrapperArgs.push(this.renderImg());
        break;

      case Status.FAILED:
        if (this.props.children) wrapperArgs.push(this.props.children);
        break;

      default:
        if (this.props.preloader) wrapperArgs.push(this.props.preloader());
        break;
    }

    return this.props.wrapper(...wrapperArgs);
  }
}

export default ImageLoader;
