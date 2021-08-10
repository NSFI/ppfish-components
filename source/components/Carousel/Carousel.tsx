import * as React from 'react';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash/debounce';
import classNames from 'classnames';

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {},
    } as any as MediaQueryList;
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}
// Use require over import (will be lifted up)
// make sure matchMedia polyfill run before require('react-slick')
// Fix https://github.com/ant-design/ant-design/issues/6560
// Fix https://github.com/ant-design/ant-design/issues/3308
const SlickCarousel = require('react-slick').default;

export type CarouselEffect = 'scrollx' | 'fade';
export type DotsPosition = 'top' | 'right' | 'bottom' | 'left';

// Carousel
export interface CarouselProps {
  effect?: CarouselEffect;
  dots?: boolean;
  autoplay?: boolean;
  easing?: string;
  beforeChange?: (from: number, to: number) => void;
  afterChange?: (current: number) => void;
  style?: React.CSSProperties;
  prefixCls?: string;
  accessibility?: boolean;
  dotsTimer?: boolean;
  dotsPosition?: DotsPosition;
  nextArrow?: HTMLElement | any;
  prevArrow?: HTMLElement | any;
  pauseOnHover?: boolean;
  className?: string;
  adaptiveHeight?: boolean;
  arrows?: boolean;
  autoplaySpeed?: number;
  centerMode?: boolean;
  centerPadding?: string | any;
  cssEase?: string | any;
  dotsClass?: string;
  draggable?: boolean;
  fade?: boolean;
  focusOnSelect?: boolean;
  infinite?: boolean;
  initialSlide?: number;
  lazyLoad?: boolean;
  rtl?: boolean;
  slide?: string;
  slidesToShow?: number;
  slidesToScroll?: number;
  speed?: number;
  swipe?: boolean;
  swipeToSlide?: boolean;
  touchMove?: boolean;
  touchThreshold?: number;
  variableWidth?: boolean;
  useCSS?: boolean;
  slickGoTo?: number;
  children?: React.ReactNode;
}

function CustomArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'flex' }} onClick={onClick} />;
}

export interface CarouselRef {
  goTo: (slide: number, dontAnimate?: boolean) => void;
  next: () => void;
  prev: () => void;
  autoPlay: boolean;
  innerSlider: any;
}

const InternalCarousel: React.ForwardRefRenderFunction<CarouselRef, CarouselProps> = (
  props,
  ref,
) => {
  const slickRef = React.useRef<any>();
  React.useImperativeHandle(
    ref,
    () => ({
      goTo,
      autoPlay: slickRef.current.innerSlider.autoPlay,
      innerSlider: slickRef.current.innerSlider,
      prev,
      next,
    }),
    [slickRef.current],
  );

  const goTo = (slide: number, dontAnimate = false) => {
    slickRef.current.slickGoTo(slide, dontAnimate);
  };

  const prev = () => {
    slickRef.current.slickPrev();
  };

  const next = () => {
    slickRef.current.slickNext();
  };

  React.useEffect(() => {
    const { autoplay, autoplaySpeed, dotsPosition, dotsTimer } = props;
    const innerSlider = slickRef.current && slickRef.current.innerSlider;

    let fn = () => {
      const { autoplay } = props;
      if (autoplay && innerSlider && slickRef.current.innerSlider.autoPlay) {
        slickRef.current.innerSlider.autoPlay();
      }
    };

    const slickDOM = findDOMNode(slickRef.current) as HTMLElement;
    if (autoplay && dotsTimer) {
      let aniName =
          dotsPosition == 'left' || dotsPosition == 'right' ? 'dotsAniVertical' : 'dotsAni',
        timerEl = slickDOM.querySelector('.timer') as HTMLElement;
      !!timerEl &&
        timerEl.style.setProperty('--dots-ani', `${aniName} ${autoplaySpeed / 1000}s infinite`);

      slickDOM.addEventListener('mouseover', () => {
        let timerEl = slickDOM.querySelector('.timer') as HTMLElement;
        !!timerEl && timerEl.style.setProperty('--dots-ani', 'none');
      });

      slickDOM.addEventListener('mouseout', () => {
        let timerEl = slickDOM.querySelector('.timer') as HTMLElement;
        !!timerEl &&
          timerEl.style.setProperty('--dots-ani', `${aniName} ${autoplaySpeed / 1000}s infinite`);
      });
    }
    if (autoplay) {
      const onWindowResized = debounce(fn, 500, {
        leading: false,
      });
      window.addEventListener('resize', onWindowResized);

      return () => {
        window.removeEventListener('resize', onWindowResized);
        (onWindowResized as any).cancel();
      };
    }
  }, [slickRef.current, props.autoplay]);

  let {
    prefixCls,
    className,
    style,
    dotsPosition,
    dotsTimer,
    nextArrow,
    prevArrow,
    centerMode,
    centerPadding,
    slidesToShow,
    ...restProps
  } = props;
  let cls = classNames(prefixCls, `${prefixCls}-${dotsPosition}`, className);
  let dotsCls = classNames('slick-dots', {
    'slick-dots-vertical': dotsPosition == 'left' || dotsPosition == 'right',
    timer: restProps.autoplay && dotsTimer,
  });

  if (restProps.effect === 'fade') {
    restProps.fade = true;
  }

  return (
    <div className={cls} style={style}>
      <SlickCarousel
        {...restProps}
        ref={slickRef}
        nextArrow={nextArrow ? nextArrow : <CustomArrow className="slick-next" onClick={next} />}
        prevArrow={prevArrow ? prevArrow : <CustomArrow className="slick-prev" onClick={prev} />}
        centerMode={centerMode}
        centerPadding={centerPadding}
        slidesToShow={slidesToShow}
        dotsClass={dotsCls}
      />
    </div>
  );
};

const Carousel = React.forwardRef<CarouselRef, CarouselProps>(InternalCarousel);

Carousel.displayName = 'Carousel';

Carousel.defaultProps = {
  dots: true,
  arrows: false,
  prefixCls: 'fishd-carousel',
  draggable: false,
  dotsTimer: false,
  autoplaySpeed: 3000,
  dotsPosition: 'bottom',
  centerMode: false,
  centerPadding: '50px',
  slidesToShow: 1,
};

export default Carousel;
