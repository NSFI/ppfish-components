"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _index = _interopRequireDefault(require("../Icon/index.js"));

var _utils = require("../../utils");

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var conMaxWidth = 1024,
    conMaxHeight = 768;
var CON_MAX_WIDTH = conMaxWidth > window.innerWidth ? window.innerWidth : conMaxWidth,
    //容器最大宽度
CON_MIN_WIDTH = 360,
    //容器最小宽度
CON_MAX_HEIGHT = conMaxHeight > window.innerHeight ? window.innerHeight : conMaxHeight,
    //容器最大高度
CON_MIN_HEIGHT = 360,
    //容器最小高度
MAX_RATIO = 2,
    //最大的图片显示比例
MIN_RATIO = 0.1,
    //最小的图片显示比例
STEP_RATIO = 0.1,
    //图片缩放比例步长
DEFAULT_RATIO = 0.8; //默认的图片显示比例

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

var setStyle = function setStyle(el, css) {
  for (var key in css) {
    el.style[key] = css[key];
  }
};

var getImageSize = function getImageSize(image, callback, scope) {
  var newImage;

  if (!image.src) {
    callback.call(scope, 0, 0);
  } else if (image.naturalWidth) {
    // 现代浏览器
    callback.call(scope, image.naturalWidth, image.naturalHeight);
  } else {
    // 低版本浏览器
    newImage = document.createElement('img');

    newImage.onload = function () {
      callback.call(scope, this.width, this.height);
    };

    newImage.src = image.src;
  }
};

var PicturePreview =
/*#__PURE__*/
function (_Component) {
  _inherits(PicturePreview, _Component);

  _createClass(PicturePreview, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var current = prevState.current,
          imgs = prevState.imgs,
          lastActiveIndex = prevState.lastActiveIndex,
          lastVisible = prevState.lastVisible;
      var activeIndex = nextProps.activeIndex,
          visible = nextProps.visible,
          source = nextProps.source,
          children = nextProps.children;
      var newState = {};

      if (visible !== lastVisible) {
        newState['show'] = newState['lastVisible'] = visible;
      }

      if (activeIndex !== lastActiveIndex) {
        newState['current'] = newState['lastActiveIndex'] = activeIndex;
      } else {
        newState['current'] = current;
      }

      if (source && source.length) {
        var sourceStr = JSON.stringify(source);

        if (sourceStr !== JSON.stringify(imgs)) {
          newState['imgs'] = JSON.parse(sourceStr);
        }
      } else if (children) {
        var imgList = [];
        imgList = _react["default"].Children.map(children, function (child) {
          var img = {};

          if (child.type === 'img') {
            img.name = child.props.name || child.props.alt;
            img.src = child.props.src;
          }

          return img;
        }).filter(function (item) {
          return item;
        });
        newState['imgs'] = imgList;
      }

      return newState;
    }
  }]);

  function PicturePreview(props) {
    var _this;

    _classCallCheck(this, PicturePreview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PicturePreview).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "setContainerStyle", function () {
      if (!_this.imgEl) return;
      getImageSize(_this.imgEl, function (naturalWidth, naturalHeight) {
        var width, height, imgRatio;

        if (naturalWidth == 0 || naturalHeight == 0) {
          width = CON_MIN_WIDTH;
          height = CON_MIN_HEIGHT;
          imgRatio = 0;
        } else {
          //计算容器的宽度
          width = naturalWidth * DEFAULT_RATIO; //默认0.8倍显示图片

          if (width > CON_MAX_WIDTH) {
            width = CON_MAX_WIDTH;
          } else if (width < CON_MIN_WIDTH) {
            width = CON_MIN_WIDTH;
          } //计算图片的缩放比例


          imgRatio = naturalWidth && width / naturalWidth || 0; //计算容器的高度

          height = naturalHeight * imgRatio;

          if (height > CON_MAX_HEIGHT) {
            height = CON_MAX_HEIGHT;
          } else if (height < CON_MIN_HEIGHT) {
            height = CON_MIN_HEIGHT;
          }
        }

        var css = '';

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
        } else if (!_this.state.container.isFull) {
          var oriTop = px2num((0, _utils.getStyle)(_this.$el, 'top')),
              oriLeft = px2num((0, _utils.getStyle)(_this.$el, 'left')),
              oriWidth = px2num((0, _utils.getStyle)(_this.$el, 'width')),
              oriHeight = px2num((0, _utils.getStyle)(_this.$el, 'height'));
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
    });

    _defineProperty(_assertThisInitialized(_this), "isFullEnabled", function () {
      return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
    });

    _defineProperty(_assertThisInitialized(_this), "isOne2One", function () {
      return Math.round(_this.state.image.ratio * 100) === 100;
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      var _this$props = _this.props,
          onClose = _this$props.onClose,
          mask = _this$props.mask;
      _this.state.container.isFull && (0, _utils.exitfullscreen)();

      _this.setState({
        show: false,
        lastVisible: false,
        shown: false
      }, function () {
        if (mask) {
          document.body.style.overflow = _this.bodyDefaultOverflow;
        }

        if (onClose && typeof onClose == "function") {
          onClose();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePrev", function () {
      var _this$state = _this.state,
          current = _this$state.current,
          imgs = _this$state.imgs;

      _this.setState({
        current: current <= 0 ? imgs.length - 1 : current - 1,
        shown: true
      }, function () {
        _this.setContainerStyle();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleNext", function () {
      var _this$state2 = _this.state,
          current = _this$state2.current,
          imgs = _this$state2.imgs;

      _this.setState({
        current: current >= imgs.length - 1 ? 0 : current + 1,
        shown: true
      }, function () {
        _this.setContainerStyle();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleZoom", function (ratio) {
      var image = {}; //已经是1:1的情况下，不处理

      if (ratio === 1 && _this.isOne2One()) return; //缩放比例限定范围在0.1和5之间

      ratio = Math.min(ratio, MAX_RATIO);
      ratio = Math.max(ratio, MIN_RATIO);
      image.ratio = ratio;
      var width = _this.state.image.naturalWidth * ratio,
          height = _this.state.image.naturalHeight * ratio;
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
    });

    _defineProperty(_assertThisInitialized(_this), "handleSwitchFull", function () {
      if (!_this.isFullEnabled()) return;
      _this.state.container.isFull ? (0, _utils.exitfullscreen)() : (0, _utils.fullscreen)(_this.$el);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRotate", function () {
      if (!_this.imgEl) return;
      var old = _this.imgEl.rotateValue || 0,
          rotate = old + 90,
          transform = 'rotate(' + rotate + 'deg)';
      _this.imgEl.rotateValue = rotate;
      setStyle(_this.imgEl, {
        '-webkit-ransform': transform,
        '-ms-transform': transform,
        'transform': transform
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSave", function () {
      if (!(_this.imgEl && _this.imgEl.src)) return;

      var getBlobImage = function getBlobImage(img) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
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
      }; // 在URL后添加随机数以避免浏览器缓存，使crossOrigin生效


      img.src = _this.imgEl.src + '?' + +new Date();
    });

    _defineProperty(_assertThisInitialized(_this), "handleFullChange", function (e) {
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
      } else {
        con.style = {
          left: 0,
          top: 0,
          width: '100%',
          height: '100%'
        }; //等视图更新后，再缩放，要用到con的尺寸

        _this.setState({
          container: con
        }, function () {
          return _this.handleZoom(_this.state.image.ratio);
        });
      }

      _this.setState({
        container: {
          style: _this.state.container.style,
          isFull: !con.isFull
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (e) {
      if (!_this.state.show) return;
      e.preventDefault();
      var con = {},
          image = {},
          tar = e.target;

      if (tar === _this.imgEl && (_this.state.container.isFull || isLargger(_this.imgEl, _this.$el))) {
        //点击在图片上，并且是全屏模式或者图片比容器大，此时移动图片
        image.startX = e.pageX;
        image.startY = e.pageY;
        image.marginL = px2num((0, _utils.getStyle)(_this.imgEl, 'margin-left'));
        image.marginT = px2num((0, _utils.getStyle)(_this.imgEl, 'margin-top'));
        _this.moving = 'img';

        _this.setState({
          image: Object.assign({}, _this.state.image, image)
        });
      } else if (!_this.state.container.isFull) {
        //非全屏模式下，移动容器
        var elPos = _this.$el.getBoundingClientRect();

        if (_this.props.mask) {
          con.rect = {
            left: elPos.left,
            top: elPos.top
          };
        } else {
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
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (e) {
      if (!_this.moving || !_this.state.show) return;
      e.preventDefault();

      var con = _this.state.container,
          image = _this.state.image,
          conStyle = _objectSpread({}, con.style);

      if (_this.moving === 'img') {
        setStyle(_this.imgEl, {
          'margin-left': num2px(e.pageX - image.startX + image.marginL),
          'margin-top': num2px(e.pageY - image.startY + image.marginT)
        });
      } else if (_this.moving === 'con') {
        conStyle.left = num2px(e.pageX - con.startX + con.rect.left);
        conStyle.top = num2px(e.pageY - con.startY + con.rect.top);

        _this.setState({
          container: Object.assign({}, _this.state.container, {
            style: conStyle
          })
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function (e) {
      if (!_this.state.show) return;
      e.preventDefault();
      _this.moving = '';
    });

    _defineProperty(_assertThisInitialized(_this), "handleWheel", function (e) {
      if (!_this.state.show) return;
      e.preventDefault();
      var deltaY = e.deltaY,
          wheelDelta = e.wheelDelta,
          detail = e.detail,
          delta = 1;

      if (deltaY) {
        delta = deltaY > 0 ? -1 : 1;
      } else if (wheelDelta) {
        delta = wheelDelta / 120;
      } else if (detail) {
        delta = detail > 0 ? -1 : 1;
      }

      _this.handleZoom(_this.state.image.ratio + (delta > 0 ? STEP_RATIO : -STEP_RATIO));
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      if (!_this.state.show) return;
      var esc = _this.props.esc;

      if (esc && !_this.state.container.isFull && e.keyCode === _utils.KeyCode.ESC) {
        e.preventDefault();

        _this.handleClose();
      } else if (e.keyCode === _utils.KeyCode.LEFT) {
        e.preventDefault();

        _this.handlePrev();
      } else if (e.keyCode === _utils.KeyCode.RIGHT) {
        e.preventDefault();

        _this.handleNext();
      }
    });

    if ('keyboard' in _this.props) {
      throw new Error("API 'keyboard' is deprecated. Use 'esc' instead.");
    }

    _this.imgEl = null;
    _this.downloadImgUrl = null;
    _this.moving = ''; //'img'表示正在移动图片 'con'表示正在移动容器 ''表示没有移动

    _this.state = {
      lastActiveIndex: props.activeIndex || 0,
      // 初始展示的图片的index
      current: props.activeIndex || 0,
      // 当前浏览的图片的index
      lastVisible: props.visible || false,
      // 初始显示/隐藏状态
      show: props.visible || false,
      imgs: props.source || [],
      container: {
        style: null,
        isFull: false //是否全屏

      },
      image: {
        el: null,
        ratio: 0 //图片的缩放比例

      },
      shown: false //标记是否显示过，第一次显示时居中显示

    };
    _this.bodyDefaultOverflow = document.body.style.overflow;
    return _this;
  }

  _createClass(PicturePreview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          draggable = _this$props2.draggable,
          toolbar = _this$props2.toolbar,
          mask = _this$props2.mask,
          el = mask === false ? this.$el : this.$root;
      document.body.appendChild(el);
      this.setContainerStyle();

      if (toolbar && this.$el) {
        // 监听全屏事件
        this.$el.addEventListener("fullscreenchange", this.handleFullChange);
        this.$el.addEventListener("mozfullscreenchange", this.handleFullChange);
        this.$el.addEventListener("webkitfullscreenchange", this.handleFullChange);
      }

      if (draggable) {
        // 监听拖动事件
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
      }

      if (mask) {
        document.addEventListener("keydown", this.handleKeyDown);
      } else {
        this.$el.addEventListener("keydown", this.handleKeyDown);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var _this$state3 = this.state,
          current = _this$state3.current,
          show = _this$state3.show;

      if (snapshot) {
        document.body.style.overflow = snapshot;
      }

      if (prevState.current != current) {
        this.setContainerStyle();
      }

      if (show === true) {
        this.$el.focus();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props3 = this.props,
          draggable = _this$props3.draggable,
          mask = _this$props3.mask,
          el = mask === false ? this.$el : this.$root;

      if (el && el.parentNode === document.body) {
        document.body.removeChild(el);
      }

      if (draggable) {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
      }

      if (mask) {
        document.removeEventListener("keydown", this.handleKeyDown);
      } else {
        this.$el.removeEventListener("keydown", this.handleKeyDown);
      }
    }
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps, prevState) {
      var _this$props4 = this.props,
          mask = _this$props4.mask,
          visible = _this$props4.visible; // 从隐藏状态到展示状态时重新设置容器的样式

      if (visible && !prevProps.visible) {
        this.setContainerStyle();
      }

      if (mask) {
        return visible ? 'hidden' : this.bodyDefaultOverflow;
      }

      return null;
    }
    /**
     * 切换图片时，根据图片大小确定容器的尺寸及位置
     */

  }, {
    key: "render",
    value: function render() {
      var _classNames,
          _classNames5,
          _this2 = this;

      var _this$state4 = this.state,
          show = _this$state4.show,
          current = _this$state4.current,
          imgs = _this$state4.imgs,
          image = _this$state4.image,
          container = _this$state4.container;
      var _this$props5 = this.props,
          className = _this$props5.className,
          style = _this$props5.style,
          prefixCls = _this$props5.prefixCls,
          source = _this$props5.source,
          children = _this$props5.children,
          toolbar = _this$props5.toolbar,
          draggable = _this$props5.draggable,
          mask = _this$props5.mask,
          progress = _this$props5.progress;
      var isFullscreen = container.isFull;
      var ctnerClass = (0, _classnames["default"])(prefixCls, (_classNames = {}, _defineProperty(_classNames, className, className), _defineProperty(_classNames, 'draggable', draggable), _defineProperty(_classNames, "".concat(prefixCls, "-hide"), !show), _classNames));
      var closeBtnClass = (0, _classnames["default"])({
        'close': !isFullscreen,
        'close-fullscreen': isFullscreen
      });
      var isHide = !(source.length > 1 || !!children && children.length > 1);
      var leftBtnClass = (0, _classnames["default"])('prev', _defineProperty({}, "".concat(prefixCls, "-hide"), isHide));
      var rightBtnClass = (0, _classnames["default"])('next', _defineProperty({}, "".concat(prefixCls, "-hide"), isHide));
      var toolbarClass = (0, _classnames["default"])('toolbar', _defineProperty({}, "".concat(prefixCls, "-hide"), !toolbar));
      var one2oneClass = (0, _classnames["default"])('icon', {
        'icon-disabled': image.ratio == 1
      });
      var zoomInClass = (0, _classnames["default"])('icon', {
        'icon-disabled': image.ratio >= MAX_RATIO
      });
      var zoomOutClass = (0, _classnames["default"])('icon', {
        'icon-disabled': image.ratio <= MIN_RATIO
      });
      var screenStatus = isFullscreen ? 'picture-shrink' : 'picture-fullscreen';
      var rootClass = (0, _classnames["default"])((_classNames5 = {}, _defineProperty(_classNames5, "".concat(prefixCls, "-root"), mask), _defineProperty(_classNames5, "".concat(prefixCls, "-hide"), !show), _classNames5));
      var maskClass = (0, _classnames["default"])("".concat(prefixCls, "-mask"), _defineProperty({}, "".concat(prefixCls, "-hide"), !mask));
      var progressClass = (0, _classnames["default"])('toolbarTitle', _defineProperty({}, "".concat(prefixCls, "-hide"), !progress));

      var renderCtner = _react["default"].createElement("div", {
        "data-show": show,
        className: ctnerClass,
        style: _objectSpread({}, container.style, {}, style),
        ref: function ref(node) {
          return _this2.$el = node;
        },
        onDragStart: function onDragStart(e) {
          e.preventDefault();
        },
        onMouseDown: draggable ? this.handleMouseDown : null,
        onWheel: this.handleWheel,
        tabIndex: "-1",
        onClick: function onClick() {
          _this2.$el.focus();
        }
      }, _react["default"].createElement("div", {
        className: "canvas"
      }, imgs.map(function (item, index) {
        if (current === index) {
          return _react["default"].createElement("img", {
            key: 'pic_' + index,
            className: "img",
            src: item.src ? item.src : null,
            alt: item.name ? item.name : null,
            active: "true",
            ref: function ref(node) {
              return _this2.imgEl = node;
            }
          });
        } else {
          return _react["default"].createElement("img", {
            key: 'pic_' + index,
            className: "img",
            src: item.src ? item.src : null,
            alt: item.name ? item.name : null
          });
        }
      })), _react["default"].createElement(_index["default"], {
        type: "picture-close",
        className: closeBtnClass,
        onClick: this.handleClose
      }), _react["default"].createElement(_index["default"], {
        type: "arrow-line-Bold",
        className: leftBtnClass,
        onClick: this.handlePrev
      }), _react["default"].createElement(_index["default"], {
        type: "arrow-line-Bold",
        className: rightBtnClass,
        onClick: this.handleNext
      }), _react["default"].createElement("div", {
        className: toolbarClass,
        style: isFullscreen ? {
          bottom: '20px'
        } : null
      }, _react["default"].createElement("div", {
        className: progressClass
      }, current + 1, "/", imgs.length), _react["default"].createElement("div", {
        className: "toolbarCon"
      }, _react["default"].createElement(_index["default"], {
        type: "picture-equal",
        className: one2oneClass,
        onClick: this.handleZoom.bind(this, 1)
      }), _react["default"].createElement(_index["default"], {
        type: screenStatus,
        className: "icon",
        onClick: this.handleSwitchFull
      }), _react["default"].createElement(_index["default"], {
        type: "picture-enlarge",
        className: zoomInClass,
        onClick: this.handleZoom.bind(this, image.ratio + STEP_RATIO)
      }), _react["default"].createElement(_index["default"], {
        type: "picture-micrify",
        className: zoomOutClass,
        onClick: this.handleZoom.bind(this, image.ratio - STEP_RATIO)
      }), _react["default"].createElement(_index["default"], {
        type: "picture-rotate",
        className: "icon",
        onClick: this.handleRotate
      }), _react["default"].createElement(_index["default"], {
        type: "picture-download",
        className: "icon",
        onClick: this.handleSave
      }))));

      var renderMaskCtner = _react["default"].createElement("div", {
        key: "".concat(prefixCls, "-root"),
        "data-show": show,
        className: rootClass,
        ref: function ref(node) {
          return _this2.$root = node;
        }
      }, _react["default"].createElement("div", {
        className: maskClass
      }), renderCtner);

      return _react["default"].createElement(_rcAnimate["default"], {
        component: "",
        showProp: "data-show",
        transitionName: "zoom",
        transitionAppear: true
      }, mask ? renderMaskCtner : renderCtner);
    }
  }]);

  return PicturePreview;
}(_react.Component);

_defineProperty(PicturePreview, "propTypes", {
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  children: _propTypes["default"].node,
  toolbar: _propTypes["default"].bool,
  source: _propTypes["default"].array,
  draggable: _propTypes["default"].bool,
  esc: _propTypes["default"].bool,
  mask: _propTypes["default"].bool,
  progress: _propTypes["default"].bool,
  visible: _propTypes["default"].bool,
  activeIndex: _propTypes["default"].number,
  onClose: _propTypes["default"].func
});

_defineProperty(PicturePreview, "defaultProps", {
  prefixCls: 'fishd-picturepreview',
  toolbar: false,
  source: [],
  // [{name: '', src: ''}]
  draggable: false,
  esc: true,
  mask: true,
  progress: false,
  visible: false,
  activeIndex: 0,
  onClose: function onClose() {}
});

(0, _reactLifecyclesCompat.polyfill)(PicturePreview);
var _default = PicturePreview;
exports["default"] = _default;