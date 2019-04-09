import * as React from 'react';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import './style/index.less';

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return ({
      media: mediaQuery,
      matches: false,
      addListener() {
      },
      removeListener() {
      },
    } as any) as  MediaQueryList;
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
}

function CustomArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
    />
  );
}

export default class Carousel extends React.Component<CarouselProps, {}> {
  static defaultProps = {
    dots: true,
    arrows: false,
    prefixCls: 'fishd-carousel',
    draggable: false,
    dotsTimer: false,
    autoplaySpeed: 3000,
    dotsPosition: 'bottom',
    centerMode: false,
    centerPadding: '50px',
    slidesToShow: 1
  };

  innerSlider: any;

  private slick: any;
  private slickDOM: any;

  constructor(props: CarouselProps) {
    super(props);
    this.onWindowResized = debounce(this.onWindowResized, 500, {
      leading: false,
    });
  }

  componentDidMount() {
    const { autoplay, autoplaySpeed, dotsPosition, dotsTimer } = this.props;
    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized);
    }
    // https://github.com/ant-design/ant-design/issues/7191
    this.innerSlider = this.slick && this.slick.innerSlider;

    this.slickDOM = findDOMNode(this.slick);
    if (autoplay && dotsTimer) {
      let aniName = (dotsPosition=='left' || dotsPosition=='right') ? 'dotsAniVertical' : 'dotsAni';
      this.slickDOM.querySelector('.timer').style.setProperty("--dots-ani", `${aniName} ${autoplaySpeed/1000}s infinite`);

      this.slickDOM.addEventListener('mouseover', () => {
        this.slickDOM.querySelector('.timer').style.setProperty("--dots-ani", 'none');
      });

      this.slickDOM.addEventListener('mouseout', () => {
        this.slickDOM.querySelector('.timer').style.setProperty("--dots-ani", `${aniName} ${autoplaySpeed/1000}s infinite`);
      });
    }
  }

  componentWillUnmount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.removeEventListener('resize', this.onWindowResized);
      (this.onWindowResized as any).cancel();
    }
  }

  onWindowResized = () => {
    // Fix https://github.com/ant-design/ant-design/issues/2550
    const { autoplay } = this.props;
    if (autoplay && this.slick && this.slick.innerSlider && this.slick.innerSlider.autoPlay) {
      this.slick.innerSlider.autoPlay();
    }
  }

  saveSlick = (node: any) => {
    this.slick = node;
  }

  next() {
    this.slick.slickNext();
  }

  prev() {
    this.slick.slickPrev();
  }

  goTo(slide: number) {
    this.slick.slickGoTo(slide);
  }

  render() {
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
    } = this.props;
    let cls = classNames(
      prefixCls, `${prefixCls}-${dotsPosition}`, className, {
        'center': centerMode
      }
    );
    let dotsCls = classNames('slick-dots', {
      'slick-dots-vertical': dotsPosition=='left' || dotsPosition=='right',
      'timer': restProps.autoplay && dotsTimer
    });

    if (restProps.effect === 'fade') {
      restProps.fade = true;
    }

    return (
      <div className={cls} style={style}>
        <SlickCarousel
          {...restProps}
          ref={this.saveSlick}
          nextArrow={nextArrow ? nextArrow : <CustomArrow className="slick-next" onClick={this.next}/>}
          prevArrow={prevArrow ? prevArrow : <CustomArrow className="slick-prev" onClick={this.prev}/>}
          centerMode={centerMode}
          centerPadding={centerPadding}
          slidesToShow={slidesToShow}
          dotsClass={dotsCls}
        />
      </div>
    );
  }
}
