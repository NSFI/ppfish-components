import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * 原生H5 Video视频组件
 * 使用React.forwardRef透传ref，让调用组件的代码可以拿到原生video节点
 */
const Video = React.forwardRef((props, ref) => {
  const modalProps = Object.assign({}, props);
  ['autoPlay', 'controls', 'loop', 'muted', 'preload'].forEach(key => {
    if (modalProps[key] === false) {
      delete modalProps[key];
    }
  });
  return (
    <video
      ref={ref}
      {...modalProps}
      src={props.src}
      style={{maxWidth: '100%'}}
    />
  );
});

Video.propTypes = {
  src: PropTypes.string.isRequired,
  controls: PropTypes.bool,
  autoPlay: PropTypes.bool,
};

Video.defaultProps = {
  controls: true,
  autoPlay: true,
};

export default Video;
