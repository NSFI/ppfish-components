import React from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import useUpdateEffect from '../../hooks/useUpdateEffect';

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
  },
};

enum Status {
  PENDING = 'pending',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}

const noop = () => {};

interface ImageLoaderProps {
  className?: string;
  prefixCls?: string;
  placeholderSize?: string | object;
  style?: React.CSSProperties;
  preLoader?: React.ReactNode | (() => React.ReactNode);
  failedLoader?: React.ReactNode | (() => React.ReactNode);
  src: string;
  onLoad?: (event: Event) => void;
  onError?: (error: Error) => void;
  imgProps?: object;
}

const InternalImageLoader = (props: ImageLoaderProps, ref) => {
  const [status, setStatus] = React.useState<Status>(props.src ? Status.LOADING : Status.PENDING);
  const imgLoaderRef = React.useRef<HTMLImageElement>(null);

  const getClassName = () => {
    const { prefixCls } = props;
    let className = `${prefixCls} ${prefixCls}-${status}`;
    if (props.className) {
      className = `${className} ${props.className}`;
    }
    return className;
  };

  const base64Img = cls => {
    const { placeholderSize } = props;
    let sizeProps = {
      width: '100%',
    };
    if (typeof placeholderSize === 'object') {
      sizeProps = Object.assign({}, sizeProps, placeholderSize);
    } else if (['small', 'default', 'large'].indexOf(placeholderSize) > -1) {
      sizeProps = Object.assign({}, sizeProps, defaultSizeMap[placeholderSize]);
    }
    return <div className={cls} style={{ ...sizeProps }} />;
  };

  const handleLoad = event => {
    destroyLoader();
    setStatus(Status.LOADED);

    props.onLoad?.(event);
  };

  const handleError = error => {
    destroyLoader();
    setStatus(Status.FAILED);

    props.onError?.(error);
  };

  const createLoader = () => {
    destroyLoader(); // We can only have one loader at a time.

    imgLoaderRef.current = new Image();
    const img = imgLoaderRef.current;
    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = props.src;
  };

  const destroyLoader = () => {
    const img = imgLoaderRef.current;
    if (img) {
      img.onload = null;
      img.onerror = null;
      imgLoaderRef.current = null;
    }
  };

  const renderImg = () => {
    const { src, imgProps } = props;
    const otherProps = omit(imgProps, ['src']);

    return <img ref={ref} src={src} alt={''} {...otherProps} />;
  };

  useUpdateEffect(() => {
    const status = props.src ? Status.LOADING : Status.PENDING;
    setStatus(status);
  }, [props.src]);

  React.useEffect(() => {
    createLoader();
    return () => {
      destroyLoader();
    };
  }, [props.src]);

  const { style, preLoader, failedLoader } = props;
  let wrapperProps = {
    style: {},
    className: getClassName(),
  };

  if (style) {
    wrapperProps.style = style;
  }

  let content;

  switch (status) {
    case Status.LOADED:
      // 加载成功
      content = renderImg();
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
        content = base64Img('failed-img');
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
        content = base64Img('preload-img');
      }
      break;
  }

  return <div {...wrapperProps}>{content}</div>;
};

const ImageLoader = React.forwardRef(InternalImageLoader);

ImageLoader.displayName = 'ImageLoader';

ImageLoader.propTypes = {
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  placeholderSize: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  preLoader: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  failedLoader: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  src: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  imgProps: PropTypes.object,
};

ImageLoader.defaultProps = {
  prefixCls: "fishd-image-loader",
  placeholderSize: "default",
  onLoad: noop,
  onError: noop
};

export default ImageLoader;
