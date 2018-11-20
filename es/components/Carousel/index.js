var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import debounce from 'lodash/debounce';
import './style/index.less';
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery) => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {
            },
            removeListener() {
            },
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
}
// Use require over import (will be lifted up)
// make sure matchMedia polyfill run before require('react-slick')
// Fix https://github.com/ant-design/ant-design/issues/6560
// Fix https://github.com/ant-design/ant-design/issues/3308
const SlickCarousel = require('react-slick').default;
function CustomArrow(props) {
    const { className, style, onClick } = props;
    return (React.createElement("div", { className: className, style: Object.assign({}, style, { display: "flex" }), onClick: onClick }));
}
export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.onWindowResized = () => {
            // Fix https://github.com/ant-design/ant-design/issues/2550
            const { autoplay } = this.props;
            if (autoplay && this.slick && this.slick.innerSlider && this.slick.innerSlider.autoPlay) {
                this.slick.innerSlider.autoPlay();
            }
        };
        this.saveSlick = (node) => {
            this.slick = node;
        };
        this.onWindowResized = debounce(this.onWindowResized, 500, {
            leading: false,
        });
    }
    componentDidMount() {
        const { autoplay } = this.props;
        if (autoplay) {
            window.addEventListener('resize', this.onWindowResized);
        }
        // https://github.com/ant-design/ant-design/issues/7191
        this.innerSlider = this.slick && this.slick.innerSlider;
    }
    componentWillUnmount() {
        const { autoplay } = this.props;
        if (autoplay) {
            window.removeEventListener('resize', this.onWindowResized);
            this.onWindowResized.cancel();
        }
    }
    next() {
        this.slick.slickNext();
    }
    prev() {
        this.slick.slickPrev();
    }
    goTo(slide) {
        this.slick.slickGoTo(slide);
    }
    render() {
        let _a = this.props, { dotsPosition, style, nextArrow, prevArrow } = _a, restProps = __rest(_a, ["dotsPosition", "style", "nextArrow", "prevArrow"]);
        if (restProps.effect === 'fade') {
            restProps.fade = true;
        }
        let className = restProps.prefixCls;
        className = `${className} ${className}-${dotsPosition}`;
        return (React.createElement("div", { className: className, style: style },
            React.createElement(SlickCarousel, Object.assign({ ref: this.saveSlick, nextArrow: nextArrow ? nextArrow : React.createElement(CustomArrow, { className: "slick-next", onClick: this.next }), prevArrow: prevArrow ? prevArrow : React.createElement(CustomArrow, { className: "slick-prev", onClick: this.prev }) }, restProps))));
    }
}
Carousel.defaultProps = {
    dots: true,
    arrows: false,
    prefixCls: 'fishd-carousel',
    draggable: false,
    autoplaySpeed: 3000,
    dotsPosition: 'bottom'
};
