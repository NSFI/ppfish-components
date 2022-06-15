import React, { FC, MutableRefObject, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Animate from 'rc-animate';
import { getStyle, KeyCode, Portal } from '../../utils';
import usePrevious from '../../hooks/usePrevious';
import useSetState from '../../hooks/useSetState';
import useFullscreen from '../../hooks/useFullscreen';
import {
  calculateImg,
  getImageSize,
  getImgByChildren,
  getImgByProps,
  ImageItem,
  isOne2One,
  isSourceChange,
  num2px,
  px2num,
  setStyle,
} from './utils';
import useEventListener from '../../hooks/useEventListener';
import useUpdateEffect from '../../hooks/useUpdatEffect';
import ToolBar from './ToolBar';
import usePictureMouse from './hooks/usePictureMouse';
import usePictureWheel from './hooks/usePictureWheel';
import IconsHandler from './IconsHandler';

/**
 *  图片相关参数 start
 */
const MAX_RATIO = 2; //最大的图片显示比例
const MIN_RATIO = 0.1; //最小的图片显示比例
/**
 *  图片相关参数 end
 */

/**
 * 类型的定义 start
 */

interface PicturePreviewProps {
  activeIndex?: number;
  className?: string;
  draggable?: boolean;
  esc?: boolean;
  mask?: boolean;
  onClose?: () => void;
  progress?: boolean;
  source?: ImageItem[];
  style?: React.CSSProperties;
  toolbar?: boolean;
  visible?: boolean;
  prefixCls?: string;
  children?: React.ReactNode;
  getContainer?: () => HTMLElement;
}

/**
 * 类型的定义 end
 */

/**
 * 部分复杂初始值的定义
 */
const initialState = {
  container: {
    rect: {
      left: 0,
      top: 0,
    },
    startX: 0,
    startY: 0,
    style: null,
  },
  image: {
    el: null,
    ratio: 0, //图片的缩放比例
    startX: 0,
    startY: 0,
    marginL: 0,
    marginT: 0,
    naturalWidth: 0,
    naturalHeight: 0,
  },
};

let bodyDefaultOverflow = document.body.style.overflow;

const AnimateWrapper = props => {
  return (
    <Animate component="" showProp="data-show" transitionName="zoom" transitionAppear={true}>
      {props.children}
    </Animate>
  );
};

const PicturePreview: FC<PicturePreviewProps> = props => {
  const {
    className,
    style,
    prefixCls,
    source,
    children,
    toolbar,
    draggable,
    progress,
    onClose,
    mask,
    visible,
    activeIndex,
    esc,
  } = props;

  const [state, setState] = useSetState({
    show: visible || false,
    imgs: (source && source.length ? source : getImgByChildren(children)) || [],
    container: initialState.container,
    current: activeIndex || 0, // 当前浏览的图片的index
    image: initialState.image,
    shown: false, //标记是否显示过，第一次显示时居中显示
  });

  const { show, image, imgs, container, current, shown } = state;

  const lastActiveIndex = usePrevious(activeIndex);
  const lastCurrent = usePrevious(current);
  const prevImgs = usePrevious(imgs);
  const imgElRef: MutableRefObject<ImageItem & HTMLImageElement> = useRef(); // 代替之前的 this.imgEl
  const elRef: MutableRefObject<HTMLDivElement> = useRef(); // 代替之前的 this.$el
  const rootRef: MutableRefObject<HTMLDivElement> = useRef(); // 代替之前的 this.$root
  const elMountedRef = useRef<boolean>(false);
  const elMounted = elMountedRef.current;

  const handleZoom = useCallback(
    (ratio: number) => {
      let _image: any = {
        ratio: 0,
        marginL: 0,
        marginT: 0,
      };

      //已经是1:1的情况下，不处理
      if (ratio === 1 && isOne2One(image)) return;

      //缩放比例限定范围在0.1和5之间
      ratio = Math.min(ratio, MAX_RATIO);
      ratio = Math.max(ratio, MIN_RATIO);

      _image.ratio = ratio;

      setState(prevState => {
        const prevImage = prevState.image;
        let width = prevImage.naturalWidth * ratio,
          height = prevImage.naturalHeight * ratio;

        _image.marginL = (elRef.current.clientWidth - width) / 2;
        _image.marginT = (elRef.current.clientHeight - height) / 2;
        setStyle(imgElRef.current, {
          'margin-left': num2px(_image.marginL),
          'margin-top': num2px(_image.marginT),
          width: num2px(width),
          height: num2px(height),
        });
        return { image: { ...prevState.image, ..._image } };
      });
    },
    [image],
  );

  const handleWheel = usePictureWheel({ show, handleZoom, image });

  const onFull = () => {
    let con = state.container;
    con.style = {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    };
    //等视图更新后，再缩放，要用到con的尺寸
    setState({
      container: con,
    });
    handleZoom(state.image.ratio);
  };

  const onExitFull = () => {
    //从全屏退出到非全屏时，认为是没有显示过，让图片居中显示
    setState({
      shown: true,
    });
    setContainerStyle({
      shown: false,
    });
  };

  const [isFullscreen, { exitFull, toggleFull }] = useFullscreen(elRef, {
    onFull,
    onExitFull,
  });

  const { handleMouseDown, handleMouseMove, handleMouseUp } = usePictureMouse({
    state,
    setState,
    imgElRef,
    elRef,
    isFullscreen,
    mask,
  });

  const handleKeyDown = e => {
    if (!show) return;
    if (esc && !isFullscreen && e.keyCode === KeyCode.ESC) {
      e.preventDefault();
      handleClose();
    } else if (e.keyCode === KeyCode.LEFT) {
      e.preventDefault();
      handlePrev();
    } else if (e.keyCode === KeyCode.RIGHT) {
      e.preventDefault();
      handleNext();
    }
  };

  const setContainerStyle = (options?) => {
    if (!imgElRef.current) return;

    getImageSize(imgElRef.current, (naturalWidth, naturalHeight) => {
      const { width, height, imgRatio } = calculateImg(naturalWidth, naturalHeight);
      const _shown = options?.shown ?? shown;

      let css = {
        width: num2px(width),
        height: num2px(height),
        left: num2px((window.innerWidth - width) / 2),
        top: num2px((window.innerHeight - height) / 2),
      };

      if (!_shown) {
        css = {
          width: num2px(width),
          height: num2px(height),
          left: num2px((window.innerWidth - width) / 2),
          top: num2px((window.innerHeight - height) / 2),
        };

        if (!mask) {
          css.left = num2px((window.innerWidth - width) / 2 + window.pageXOffset);
          css.top = num2px((window.innerHeight - height) / 2 + window.pageYOffset);
        }

        setState(prevState => ({
          container: {
            ...prevState.container,
            style: css,
          },
        }));
      } else if (!isFullscreen) {
        let oriTop = px2num(getStyle(elRef.current, 'top')),
          oriLeft = px2num(getStyle(elRef.current, 'left')),
          oriWidth = px2num(getStyle(elRef.current, 'width')),
          oriHeight = px2num(getStyle(elRef.current, 'height'));
        css = {
          width: num2px(width),
          height: num2px(height),
          left: num2px(oriLeft + (oriWidth - width) / 2),
          top: num2px(oriTop + Math.trunc((oriHeight - height) / 2)),
        };

        setState(prevState => ({
          container: {
            ...prevState.container,
            style: css,
          },
        }));
      }

      setState({
        image: Object.assign({}, image, {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          ratio: imgRatio,
        }),
      });
      //待视图更新后再缩放，需要用到con的尺寸
      handleZoom(imgRatio);
    });
  };

  useEventListener('mousewheel', handleWheel, { target: elRef, open: elMounted && !!toolbar });
  useEventListener('mousemove', handleMouseMove, { target: elRef, open: elMounted && !!draggable });
  useEventListener('mouseup', handleMouseUp, { target: elRef, open: elMounted && !!draggable });
  useEventListener('mousedown', handleMouseDown, { target: elRef, open: elMounted && !!draggable });
  useEventListener('keydown', handleKeyDown, { target: document, open: elMounted && !!mask });
  useEventListener('keydown', handleKeyDown, { target: elRef, open: elMounted && !mask });

  useEffect(() => {
    // lifecycle
    // mounted
    setTimeout(() => {
      setContainerStyle();
    }, 20);
  }, []);

  useEffect(() => {
    elMountedRef.current = !!elRef.current;
  }, [elRef.current]);

  useUpdateEffect(() => {
    // componentDidUpdate
    const sourceChange = isSourceChange(prevImgs, imgs);

    // 是否需要更新容器样式 切换图片 || 显示状态发生改变 || 资源发生改变
    const shouldUpdate = sourceChange || current !== lastCurrent || show;
    if (shouldUpdate) {
      setContainerStyle();
    }

    if (show === true) {
      elRef.current.focus();
    }
  }, [imgs, current, show]);

  useUpdateEffect(() => {
    if (visible && mask) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = bodyDefaultOverflow;
    }
  }, [show, mask, visible]);

  useUpdateEffect(() => {
    if (visible) {
      setState({ show: true });
    }
  }, [visible]);

  useUpdateEffect(() => {
    if (activeIndex !== lastActiveIndex || visible) {
      setState({
        current: activeIndex,
      });
    }
  }, [activeIndex, visible]);

  useUpdateEffect(() => {
    const _imgs = getImgByProps(source, children, imgs);
    if (_imgs) {
      setState({
        imgs: _imgs,
      });
    }
  }, [source, children]);

  const handleClose = useCallback(() => {
    isFullscreen && exitFull();

    setState({
      shown: false,
      show: false,
    });

    if (mask) {
      document.body.style.overflow = bodyDefaultOverflow;
    }

    if (onClose && typeof onClose == 'function') {
      onClose();
    }
  }, [isFullscreen, mask, onClose]);

  const handlePrev = useCallback(() => {
    setState(prevState => ({
      current: prevState.current <= 0 ? prevState.imgs.length - 1 : prevState.current - 1,
      shown: true,
    }));
  }, []);

  const handleNext = useCallback(() => {
    setState(prevState => ({
      current: prevState.current >= prevState.imgs.length - 1 ? 0 : prevState.current + 1,
      shown: true,
    }));
  }, []);

  let mainClass = classNames(prefixCls, {
    [className]: className,
    draggable: draggable,
    [`${prefixCls}-hide`]: !show,
  });

  let isHide = !(
    source.length > 1 ||
    (!!children && (children as React.ReactNodeArray).length > 1)
  );

  const toolBarProps = {
    current,
    imgs,
    isFullscreen,
    image,
    prefixCls,
    progress,
    handleZoom,
    handleSwitchFull: toggleFull,
    imgElRef,
    toolbar,
  };

  const iconsProps = {
    isFullscreen,
    isHide,
    prefixCls,
    handleClose,
    handlePrev,
    handleNext,
  };

  const renderMain = (
    <div
      data-show={show}
      className={mainClass}
      style={{ ...container.style, ...style }}
      ref={elRef}
      onDragStart={e => {
        e.preventDefault();
      }}
      tabIndex={-1}
      onClick={() => {
        elRef.current.focus();
      }}
    >
      <div className="canvas">
        {imgs.map((item, index) => {
          if (current === index) {
            return (
              <img
                key={'pic_' + index}
                className="img active"
                src={item.src ? item.src : null}
                alt={item.name ? item.name : null}
                ref={imgElRef}
              />
            );
          }
          return (
            <img
              key={'pic_' + index}
              className="img"
              src={item.src ? item.src : null}
              alt={item.name ? item.name : null}
            />
          );
        })}
      </div>
      <IconsHandler {...iconsProps} />
      <ToolBar {...toolBarProps} />
    </div>
  );

  const getContainer = () => {
    const container = document.createElement('div');
    if (props.getContainer) {
      props.getContainer().appendChild(container);
    } else {
      document.body.appendChild(container);
    }
    return container;
  };

  if (mask) {
    const rootClass = classNames({
      [`${prefixCls}-root`]: mask,
      [`${prefixCls}-hide`]: !show,
    });
    const maskClass = classNames(`${prefixCls}-mask`, {
      [`${prefixCls}-hide`]: !mask,
    });
    return (
      <Portal getContainer={getContainer}>
        <AnimateWrapper>
          <div key={`${prefixCls}-root`} ref={rootRef} data-show={show} className={rootClass}>
            <div className={maskClass} />
            {renderMain}
          </div>
        </AnimateWrapper>
      </Portal>
    );
  }

  return (
    <Portal getContainer={getContainer}>
      <AnimateWrapper>{renderMain}</AnimateWrapper>
    </Portal>
  );
};

PicturePreview.defaultProps = {
  prefixCls: 'fishd-picturepreview',
  toolbar: false,
  source: [], // [{name: '', src: ''}]
  draggable: false,
  esc: true,
  mask: true,
  progress: false,
  visible: false,
  activeIndex: 0,
  onClose: () => {},
  getContainer: () => document.body,
};

export default PicturePreview;
