var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import { polyfill } from 'react-lifecycles-compat';
import Icon from '../Icon';
import { fullscreen, exitfullscreen, KeyCode, getStyle } from '../../utils';
import './style/index.less';
var conMaxWidth = 1024;
var conMaxHeight = 768;
var CON_MAX_WIDTH = conMaxWidth > window.innerWidth ? window.innerWidth : conMaxWidth; //容器最大宽度
var CON_MIN_WIDTH = 360; //容器最小宽度
var CON_MAX_HEIGHT = conMaxHeight > window.innerHeight ? window.innerHeight : conMaxHeight; //容器最大高度
var CON_MIN_HEIGHT = 360; //容器最小高度
var MAX_RATIO = 2; //最大的图片显示比例
var MIN_RATIO = 0.1; //最小的图片显示比例
var STEP_RATIO = 0.1; //图片缩放比例步长
var DEFAULT_RATIO = 0.8; //默认的图片显示比例
function num2px(num) {
    return parseInt(num, 10) + 'px';
}
function px2num(str) {
    return Number(str.replace('px', '')) || 0;
}
/**
 * el1元素的区域是否超过el2元素
 * @param  {[type]}  el1 [description]
 * @param  {[type]}  el2 [description]
 * @return {Boolean}     [description]
 */
function isLargger(el1, el2) {
    return el1.clientHeight > el2.clientHeight || el1.clientWidth > el2.clientWidth;
}
var setStyle = function (el, css) {
    for (var key in css) {
        el.style[key] = css[key];
    }
};
var getImageSize = function (image, callback, scope) {
    var newImage;
    if (!image.src) {
        callback.call(scope, 0, 0);
    }
    else if (image.naturalWidth) {
        // 现代浏览器
        callback.call(scope, image.naturalWidth, image.naturalHeight);
    }
    else {
        // 低版本浏览器
        newImage = document.createElement('img');
        newImage.onload = function () {
            callback.call(scope, this.width, this.height);
        };
        newImage.src = image.src;
    }
};
var PicturePreview = /** @class */ (function (_super) {
    __extends(PicturePreview, _super);
    function PicturePreview(props) {
        var _this = _super.call(this, props) || this;
        _this.imgEl = null;
        _this.downloadImgUrl = null;
        _this.moving = ''; //'img'表示正在移动图片 'con'表示正在移动容器 ''表示没有移动
        /**
         * 切换图片时，根据图片大小确定容器的尺寸及位置
         */
        _this.setContainerStyle = function () {
            if (!_this.imgEl)
                return;
            getImageSize(_this.imgEl, function (naturalWidth, naturalHeight) {
                var width, height, imgRatio;
                if (naturalWidth == 0 || naturalHeight == 0) {
                    width = CON_MIN_WIDTH;
                    height = CON_MIN_HEIGHT;
                    imgRatio = 0;
                }
                else {
                    //计算容器的宽度
                    width = naturalWidth * DEFAULT_RATIO; //默认0.8倍显示图片
                    if (width > CON_MAX_WIDTH) {
                        width = CON_MAX_WIDTH;
                    }
                    else if (width < CON_MIN_WIDTH) {
                        width = CON_MIN_WIDTH;
                    }
                    //计算图片的缩放比例
                    imgRatio = (naturalWidth && width / naturalWidth) || 0;
                    //计算容器的高度
                    height = naturalHeight * imgRatio;
                    if (height > CON_MAX_HEIGHT) {
                        height = CON_MAX_HEIGHT;
                    }
                    else if (height < CON_MIN_HEIGHT) {
                        height = CON_MIN_HEIGHT;
                    }
                }
                var css = {
                    width: num2px(width),
                    height: num2px(height),
                    left: num2px((window.innerWidth - width) / 2),
                    top: num2px((window.innerHeight - height) / 2)
                };
                if (!_this.state.shown) {
                    css = {
                        width: num2px(width),
                        height: num2px(height),
                        left: num2px((window.innerWidth - width) / 2),
                        top: num2px((window.innerHeight - height) / 2)
                    };
                    if (!_this.props.mask) {
                        css.left = num2px((window.innerWidth - width) / 2 + window.pageXOffset);
                        css.top = num2px((window.innerHeight - height) / 2 + window.pageYOffset);
                    }
                    _this.setState({
                        container: {
                            style: css,
                            isFull: _this.state.container.isFull
                        }
                    });
                }
                else if (!_this.state.container.isFull) {
                    var oriTop = px2num(getStyle(_this.$el, 'top')), oriLeft = px2num(getStyle(_this.$el, 'left')), oriWidth = px2num(getStyle(_this.$el, 'width')), oriHeight = px2num(getStyle(_this.$el, 'height'));
                    css = {
                        width: num2px(width),
                        height: num2px(height),
                        left: num2px(oriLeft + (oriWidth - width) / 2),
                        top: num2px(oriTop + (oriHeight - height) / 2)
                    };
                    _this.setState({
                        container: {
                            style: css,
                            isFull: _this.state.container.isFull
                        }
                    });
                }
                _this.setState({
                    image: Object.assign({}, _this.state.image, {
                        naturalWidth: naturalWidth,
                        naturalHeight: naturalHeight,
                        ratio: imgRatio
                    })
                }, function () {
                    //待视图更新后再缩放，需要用到con的尺寸
                    _this.handleZoom(imgRatio);
                });
            });
        };
        _this.isFullEnabled = function () {
            return (document.fullscreenEnabled ||
                document['mozFullScreenEnabled'] ||
                document['webkitFullscreenEnabled'] ||
                document['msFullscreenEnabled']);
        };
        _this.isOne2One = function () {
            return Math.round(_this.state.image.ratio * 100) === 100;
        };
        _this.handleClose = function () {
            var _a = _this.props, onClose = _a.onClose, mask = _a.mask;
            _this.state.container.isFull && exitfullscreen();
            _this.setState({
                show: false,
                lastVisible: false,
                shown: false
            }, function () {
                if (mask) {
                    document.body.style.overflow = _this.bodyDefaultOverflow;
                }
                if (onClose && typeof onClose == 'function') {
                    onClose();
                }
            });
        };
        _this.handlePrev = function () {
            var _a = _this.state, current = _a.current, imgs = _a.imgs;
            _this.setState({
                current: current <= 0 ? imgs.length - 1 : current - 1,
                shown: true
            }, function () {
                _this.setContainerStyle();
            });
        };
        _this.handleNext = function () {
            var _a = _this.state, current = _a.current, imgs = _a.imgs;
            _this.setState({
                current: current >= imgs.length - 1 ? 0 : current + 1,
                shown: true
            }, function () {
                _this.setContainerStyle();
            });
        };
        _this.handleZoom = function (ratio) {
            var image = {
                ratio: 0,
                marginL: 0,
                marginT: 0
            };
            //已经是1:1的情况下，不处理
            if (ratio === 1 && _this.isOne2One())
                return;
            //缩放比例限定范围在0.1和5之间
            ratio = Math.min(ratio, MAX_RATIO);
            ratio = Math.max(ratio, MIN_RATIO);
            image.ratio = ratio;
            var width = _this.state.image.naturalWidth * ratio, height = _this.state.image.naturalHeight * ratio;
            image.marginL = (_this.$el.clientWidth - width) / 2;
            image.marginT = (_this.$el.clientHeight - height) / 2;
            _this.setState({
                image: Object.assign({}, _this.state.image, image)
            }, function () {
                setStyle(_this.imgEl, {
                    'margin-left': num2px(image.marginL),
                    'margin-top': num2px(image.marginT),
                    width: num2px(width),
                    height: num2px(height)
                });
            });
        };
        _this.handleSwitchFull = function () {
            if (!_this.isFullEnabled())
                return;
            _this.state.container.isFull ? exitfullscreen() : fullscreen(_this.$el);
        };
        _this.handleRotate = function () {
            if (!_this.imgEl)
                return;
            var old = _this.imgEl.rotateValue || 0, rotate = old + 90, transform = 'rotate(' + rotate + 'deg)';
            _this.imgEl.rotateValue = rotate;
            setStyle(_this.imgEl, {
                '-webkit-ransform': transform,
                '-ms-transform': transform,
                transform: transform
            });
        };
        _this.handleSave = function () {
            if (!(_this.imgEl && _this.imgEl.src))
                return;
            var getBlobImage = function (img) {
                var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                return new Promise(function (resolve) {
                    canvas.toBlob(function (blob) {
                        resolve(blob);
                    });
                });
            };
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function () {
                var promise = getBlobImage(img);
                promise.then(function (blob) {
                    var dLink = document.createElement('a');
                    dLink.download = _this.imgEl.alt || '';
                    _this.downloadImgUrl = window.URL.createObjectURL(blob);
                    dLink.href = _this.downloadImgUrl;
                    dLink.onclick = function () {
                        window.requestAnimationFrame(function () {
                            window.URL.revokeObjectURL(_this.downloadImgUrl);
                            _this.downloadImgUrl = null;
                        });
                    };
                    dLink.click();
                });
            };
            // 在URL后添加随机数以避免浏览器缓存，使crossOrigin生效
            img.src = _this.imgEl.src + '?' + +new Date();
        };
        _this.handleFullChange = function (e) {
            var con = _this.state.container;
            if (con.isFull) {
                //从全屏退出到非全屏时，认为是没有显示过，让图片居中显示
                _this.setState({
                    shown: false
                }, function () {
                    _this.setContainerStyle();
                    _this.setState({
                        shown: true
                    });
                });
            }
            else {
                con.style = {
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%'
                };
                //等视图更新后，再缩放，要用到con的尺寸
                _this.setState({
                    container: con
                }, function () { return _this.handleZoom(_this.state.image.ratio); });
            }
            _this.setState({
                container: {
                    style: _this.state.container.style,
                    isFull: !con.isFull
                }
            });
        };
        _this.handleMouseDown = function (e) {
            if (!_this.state.show)
                return;
            e.preventDefault();
            var tar = e.target;
            var con = {
                rect: {
                    left: 0,
                    top: 0
                },
                startX: 0,
                startY: 0
            };
            var image = {
                startX: 0,
                startY: 0,
                marginL: 0,
                marginT: 0
            };
            if (tar === _this.imgEl && (_this.state.container.isFull || isLargger(_this.imgEl, _this.$el))) {
                //点击在图片上，并且是全屏模式或者图片比容器大，此时移动图片
                image.startX = e.pageX;
                image.startY = e.pageY;
                image.marginL = px2num(getStyle(_this.imgEl, 'margin-left'));
                image.marginT = px2num(getStyle(_this.imgEl, 'margin-top'));
                _this.moving = 'img';
                _this.setState({
                    image: Object.assign({}, _this.state.image, image)
                });
            }
            else if (!_this.state.container.isFull) {
                //非全屏模式下，移动容器
                var elPos = _this.$el.getBoundingClientRect();
                if (_this.props.mask) {
                    con.rect = {
                        left: elPos.left,
                        top: elPos.top
                    };
                }
                else {
                    con.rect = {
                        left: elPos.left + window.pageXOffset,
                        top: elPos.top + window.pageYOffset
                    };
                }
                con.startX = e.pageX;
                con.startY = e.pageY;
                _this.moving = 'con';
                _this.setState({
                    container: Object.assign({}, _this.state.container, con)
                });
            }
        };
        _this.handleMouseMove = function (e) {
            if (!_this.moving || !_this.state.show)
                return;
            e.preventDefault();
            var con = _this.state.container, image = _this.state.image, conStyle = __assign({}, con.style);
            if (_this.moving === 'img') {
                setStyle(_this.imgEl, {
                    'margin-left': num2px(e.pageX - image.startX + image.marginL),
                    'margin-top': num2px(e.pageY - image.startY + image.marginT)
                });
            }
            else if (_this.moving === 'con' && con && con.rect) {
                conStyle.left = num2px(e.pageX - con.startX + con.rect.left);
                conStyle.top = num2px(e.pageY - con.startY + con.rect.top);
                _this.setState({
                    container: Object.assign({}, _this.state.container, { style: conStyle })
                });
            }
        };
        _this.handleMouseUp = function (e) {
            if (!_this.state.show)
                return;
            e.preventDefault();
            _this.moving = '';
        };
        _this.handleWheel = function (e) {
            if (!_this.state.show)
                return;
            e.preventDefault();
            var deltaY = e.deltaY, wheelDelta = e.wheelDelta, detail = e.detail, delta = 1;
            if (deltaY) {
                delta = deltaY > 0 ? -1 : 1;
            }
            else if (wheelDelta) {
                delta = wheelDelta / 120;
            }
            else if (detail) {
                delta = detail > 0 ? -1 : 1;
            }
            _this.handleZoom(_this.state.image.ratio + (delta > 0 ? STEP_RATIO : -STEP_RATIO));
        };
        _this.handleKeyDown = function (e) {
            if (!_this.state.show)
                return;
            var esc = _this.props.esc;
            if (esc && !_this.state.container.isFull && e.keyCode === KeyCode.ESC) {
                e.preventDefault();
                _this.handleClose();
            }
            else if (e.keyCode === KeyCode.LEFT) {
                e.preventDefault();
                _this.handlePrev();
            }
            else if (e.keyCode === KeyCode.RIGHT) {
                e.preventDefault();
                _this.handleNext();
            }
        };
        if ('keyboard' in _this.props) {
            throw new Error("API 'keyboard' is deprecated. Use 'esc' instead.");
        }
        _this.state = {
            lastActiveIndex: props.activeIndex || 0,
            current: props.activeIndex || 0,
            lastVisible: props.visible || false,
            show: props.visible || false,
            imgs: props.source || [],
            container: {
                rect: {
                    left: 0,
                    top: 0
                },
                startX: 0,
                startY: 0,
                style: null,
                isFull: false //是否全屏
            },
            image: {
                el: null,
                ratio: 0,
                startX: 0,
                startY: 0,
                marginL: 0,
                marginT: 0,
                naturalWidth: 0,
                naturalHeight: 0
            },
            shown: false //标记是否显示过，第一次显示时居中显示
        };
        _this.bodyDefaultOverflow = document.body.style.overflow;
        return _this;
    }
    PicturePreview.prototype.componentDidMount = function () {
        var _a = this.props, draggable = _a.draggable, toolbar = _a.toolbar, mask = _a.mask;
        var el = mask === false ? this.$el : this.$root;
        document.body.appendChild(el);
        this.setContainerStyle();
        if (toolbar && this.$el) {
            // 监听全屏事件
            this.$el.addEventListener('fullscreenchange', this.handleFullChange);
            this.$el.addEventListener('mozfullscreenchange', this.handleFullChange);
            this.$el.addEventListener('webkitfullscreenchange', this.handleFullChange);
        }
        if (draggable) {
            // 监听拖动事件
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
        }
        if (mask) {
            document.addEventListener('keydown', this.handleKeyDown);
        }
        else {
            this.$el.addEventListener('keydown', this.handleKeyDown);
        }
    };
    PicturePreview.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        var _a = this.state, current = _a.current, show = _a.show;
        if (snapshot) {
            document.body.style.overflow = snapshot;
        }
        if (prevState.current != current) {
            this.setContainerStyle();
        }
        if (show === true) {
            this.$el.focus();
        }
    };
    PicturePreview.prototype.componentWillUnmount = function () {
        var _a = this.props, draggable = _a.draggable, mask = _a.mask, el = mask === false ? this.$el : this.$root;
        if (el && el.parentNode === document.body) {
            document.body.removeChild(el);
        }
        if (draggable) {
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
        }
        if (mask) {
            document.removeEventListener('keydown', this.handleKeyDown);
        }
        else {
            this.$el.removeEventListener('keydown', this.handleKeyDown);
        }
    };
    PicturePreview.prototype.getSnapshotBeforeUpdate = function (prevProps, prevState) {
        var _a = this.props, mask = _a.mask, visible = _a.visible;
        // 从隐藏状态到展示状态时重新设置容器的样式
        if (visible && !prevProps.visible) {
            this.setContainerStyle();
        }
        if (mask) {
            return visible ? 'hidden' : this.bodyDefaultOverflow;
        }
        return null;
    };
    PicturePreview.prototype.render = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var _this = this;
        var _h = this.state, show = _h.show, current = _h.current, imgs = _h.imgs, image = _h.image, container = _h.container;
        var _j = this.props, className = _j.className, style = _j.style, prefixCls = _j.prefixCls, source = _j.source, children = _j.children, toolbar = _j.toolbar, draggable = _j.draggable, mask = _j.mask, progress = _j.progress;
        var isFullscreen = container.isFull;
        var ctnerClass = classNames(prefixCls, (_a = {},
            _a[className] = className,
            _a.draggable = draggable,
            _a[prefixCls + "-hide"] = !show,
            _a));
        var closeBtnClass = classNames({
            close: !isFullscreen,
            'close-fullscreen': isFullscreen
        });
        var isHide = !(source.length > 1 ||
            (!!children && children.length > 1));
        var leftBtnClass = classNames('prev', (_b = {},
            _b[prefixCls + "-hide"] = isHide,
            _b));
        var rightBtnClass = classNames('next', (_c = {},
            _c[prefixCls + "-hide"] = isHide,
            _c));
        var toolbarClass = classNames('toolbar', (_d = {},
            _d[prefixCls + "-hide"] = !toolbar,
            _d));
        var one2oneClass = classNames('icon', {
            'icon-disabled': image.ratio == 1
        });
        var zoomInClass = classNames('icon', {
            'icon-disabled': image.ratio >= MAX_RATIO
        });
        var zoomOutClass = classNames('icon', {
            'icon-disabled': image.ratio <= MIN_RATIO
        });
        var screenStatus = isFullscreen ? 'picture-shrink' : 'picture-fullscreen';
        var rootClass = classNames((_e = {},
            _e[prefixCls + "-root"] = mask,
            _e[prefixCls + "-hide"] = !show,
            _e));
        var maskClass = classNames(prefixCls + "-mask", (_f = {},
            _f[prefixCls + "-hide"] = !mask,
            _f));
        var progressClass = classNames('toolbarTitle', (_g = {},
            _g[prefixCls + "-hide"] = !progress,
            _g));
        var renderCtner = (React.createElement("div", { "data-show": show, className: ctnerClass, style: __assign(__assign({}, container.style), style), ref: function (node) { return (_this.$el = node); }, onDragStart: function (e) {
                e.preventDefault();
            }, onMouseDown: draggable ? this.handleMouseDown : null, onWheel: this.handleWheel, tabIndex: -1, onClick: function () {
                _this.$el.focus();
            } },
            React.createElement("div", { className: "canvas" }, imgs.map(function (item, index) {
                if (current === index) {
                    return (React.createElement("img", { key: 'pic_' + index, className: "img active", src: item.src ? item.src : null, alt: item.name ? item.name : null, 
                        // FIXME: active is not a valid property of <img />
                        // active={true}
                        ref: function (node) { return (_this.imgEl = node); } }));
                }
                else {
                    return (React.createElement("img", { key: 'pic_' + index, className: "img", src: item.src ? item.src : null, alt: item.name ? item.name : null }));
                }
            })),
            React.createElement(Icon, { type: "picture-close", className: closeBtnClass, onClick: this.handleClose }),
            React.createElement(Icon, { type: "arrow-line-Bold", className: leftBtnClass, onClick: this.handlePrev }),
            React.createElement(Icon, { type: "arrow-line-Bold", className: rightBtnClass, onClick: this.handleNext }),
            React.createElement("div", { className: toolbarClass, style: isFullscreen ? { bottom: '20px' } : null },
                React.createElement("div", { className: progressClass },
                    current + 1,
                    "/",
                    imgs.length),
                React.createElement("div", { className: "toolbarCon" },
                    React.createElement(Icon, { type: "picture-equal", className: one2oneClass, onClick: this.handleZoom.bind(this, 1) }),
                    React.createElement(Icon, { type: screenStatus, className: "icon", onClick: this.handleSwitchFull }),
                    React.createElement(Icon, { type: "picture-enlarge", className: zoomInClass, onClick: this.handleZoom.bind(this, image.ratio + STEP_RATIO) }),
                    React.createElement(Icon, { type: "picture-micrify", className: zoomOutClass, onClick: this.handleZoom.bind(this, image.ratio - STEP_RATIO) }),
                    React.createElement(Icon, { type: "picture-rotate", className: "icon", onClick: this.handleRotate }),
                    React.createElement(Icon, { type: "picture-download", className: "icon", onClick: this.handleSave })))));
        var renderMaskCtner = (React.createElement("div", { key: prefixCls + "-root", "data-show": show, className: rootClass, ref: function (node) { return (_this.$root = node); } },
            React.createElement("div", { className: maskClass }),
            renderCtner));
        return (React.createElement(Animate, { component: "", showProp: "data-show", transitionName: "zoom", transitionAppear: true }, mask ? renderMaskCtner : renderCtner));
    };
    PicturePreview.propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        children: PropTypes.node,
        toolbar: PropTypes.bool,
        source: PropTypes.array,
        draggable: PropTypes.bool,
        esc: PropTypes.bool,
        mask: PropTypes.bool,
        progress: PropTypes.bool,
        visible: PropTypes.bool,
        activeIndex: PropTypes.number,
        onClose: PropTypes.func
    };
    PicturePreview.defaultProps = {
        prefixCls: 'fishd-picturepreview',
        toolbar: false,
        source: [],
        draggable: false,
        esc: true,
        mask: true,
        progress: false,
        visible: false,
        activeIndex: 0,
        onClose: function () { }
    };
    PicturePreview.getDerivedStateFromProps = function (nextProps, prevState) {
        var current = prevState.current, imgs = prevState.imgs, lastActiveIndex = prevState.lastActiveIndex, lastVisible = prevState.lastVisible;
        var activeIndex = nextProps.activeIndex, visible = nextProps.visible, source = nextProps.source, children = nextProps.children;
        var newState = {};
        if (visible !== lastVisible) {
            newState['show'] = newState['lastVisible'] = visible;
        }
        if (activeIndex !== lastActiveIndex) {
            newState['current'] = newState['lastActiveIndex'] = activeIndex;
        }
        else {
            newState['current'] = current;
        }
        if (source && source.length) {
            var sourceStr = JSON.stringify(source);
            if (sourceStr !== JSON.stringify(imgs)) {
                newState['imgs'] = JSON.parse(sourceStr);
            }
        }
        else if (children) {
            var imgList = [];
            imgList = React.Children.map(children, function (child) {
                var img = {
                    name: '',
                    src: ''
                };
                if (child.type === 'img') {
                    img.name = child.props.name || child.props.alt;
                    img.src = child.props.src;
                }
                return img;
            }).filter(function (item) { return item; });
            newState['imgs'] = imgList;
        }
        return newState;
    };
    return PicturePreview;
}(Component));
polyfill(PicturePreview);
export default PicturePreview;
