"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _utils = require("../../../utils");

var _utils2 = require("./utils");

require("./Drawer.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var IS_REACT_16 = 'createPortal' in _reactDom["default"];
var currentDrawer = {};
var windowIsUndefined = typeof window === 'undefined';

var Drawer =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Drawer, _React$PureComponent);

  _createClass(Drawer, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var _prevState$prevProps = prevState.prevProps,
          prevProps = _prevState$prevProps === void 0 ? {} : _prevState$prevProps;
      var newState = {
        prevProps: nextProps
      };

      if (nextProps.open !== undefined && nextProps.open !== prevProps.open) {
        return _objectSpread({}, newState, {
          open: nextProps.open
        });
      }

      return newState;
    }
  }]);

  function Drawer(_props) {
    var _this;

    _classCallCheck(this, Drawer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Drawer).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "onMaskTouchEnd", function (e) {
      _this.props.onMaskClick(e);

      _this.onTouchEnd(e, true);
    });

    _defineProperty(_assertThisInitialized(_this), "onIconTouchEnd", function (e) {
      _this.props.onHandleClick(e);

      _this.onTouchEnd(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchEnd", function (e, close) {
      if (_this.props.open !== undefined) {
        return;
      }

      var open = close || _this.state.open;
      _this.isOpenChange = true;

      _this.setState({
        open: !open
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnClosed", function (e) {
      _this.props.onCloseClick(e);

      _this.onTouchEnd(e, true);
    });

    _defineProperty(_assertThisInitialized(_this), "onWrapperTransitionEnd", function (e) {
      if (e.target === _this.contentWrapper) {
        _this.dom.style.transition = '';

        if (!_this.state.open && _this.getCrrentDrawerSome()) {
          document.body.style.overflowX = '';

          if (_this.maskDom) {
            _this.maskDom.style.left = '';
            _this.maskDom.style.width = '';
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getDefault", function (props) {
      _this.getParentAndLevelDom(props);

      if (props.getContainer || props.parent) {
        _this.container = _this.defaultGetContainer();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getCrrentDrawerSome", function () {
      return !Object.keys(currentDrawer).some(function (key) {
        return currentDrawer[key];
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getContainer", function () {
      return _this.container;
    });

    _defineProperty(_assertThisInitialized(_this), "getParentAndLevelDom", function (props) {
      if (windowIsUndefined) {
        return;
      }

      var level = props.level,
          getContainer = props.getContainer;
      _this.levelDom = [];

      if (getContainer) {
        if (typeof getContainer === 'string') {
          var dom = document.querySelectorAll(getContainer)[0];
          _this.parent = dom;
        }

        if (typeof getContainer === 'function') {
          _this.parent = getContainer();
        }

        if (_typeof(getContainer) === 'object' && getContainer instanceof window.HTMLElement) {
          _this.parent = getContainer;
        }
      }

      if (!getContainer && _this.container) {
        _this.parent = _this.container.parentNode;
      }

      if (level === 'all') {
        var children = Array.prototype.slice.call(_this.parent.children);
        children.forEach(function (child) {
          if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE' && child.nodeName !== 'LINK' && child !== _this.container) {
            _this.levelDom.push(child);
          }
        });
      } else if (level) {
        (0, _utils2.dataToArray)(level).forEach(function (key) {
          document.querySelectorAll(key).forEach(function (item) {
            _this.levelDom.push(item);
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setLevelDomTransform", function (open, openTransition, placementName, value) {
      var _this$props = _this.props,
          placement = _this$props.placement,
          levelMove = _this$props.levelMove,
          duration = _this$props.duration,
          ease = _this$props.ease,
          onChange = _this$props.onChange,
          getContainer = _this$props.getContainer;

      if (!windowIsUndefined) {
        _this.levelDom.forEach(function (dom) {
          if (_this.isOpenChange || openTransition) {
            /* eslint no-param-reassign: "error" */
            dom.style.transition = "transform ".concat(duration, " ").concat(ease);
            (0, _utils2.addEventListener)(dom, _utils2.transitionEnd, _this.trnasitionEnd);
            var levelValue = open ? value : 0;

            if (levelMove) {
              var $levelMove = (0, _utils2.transformArguments)(levelMove, {
                target: dom,
                open: open
              });
              levelValue = open ? $levelMove[0] : $levelMove[1] || 0;
            }

            var $value = typeof levelValue === 'number' ? "".concat(levelValue, "px") : levelValue;
            var placementPos = placement === 'left' || placement === 'top' ? $value : "-".concat($value);
            dom.style.transform = levelValue ? "".concat(placementName, "(").concat(placementPos, ")") : '';
            dom.style.msTransform = levelValue ? "".concat(placementName, "(").concat(placementPos, ")") : '';
          }
        }); // 处理 body 滚动


        if (getContainer === 'body') {
          var eventArray = ['touchstart'];
          var domArray = [document.body, _this.maskDom, _this.handlerdom, _this.contentDom];
          var right = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth ? (0, _utils.getScrollBarSize)(1) : 0;
          var widthTransition = "width ".concat(duration, " ").concat(ease);
          var trannsformTransition = "transform ".concat(duration, " ").concat(ease);

          if (open && document.body.style.overflow !== 'hidden') {
            document.body.style.overflow = 'hidden';

            if (right) {
              document.body.style.position = 'relative';
              document.body.style.width = "calc(100% - ".concat(right, "px)");
              _this.dom.style.transition = 'none';

              switch (placement) {
                case 'right':
                  _this.dom.style.transform = "translateX(-".concat(right, "px)");
                  _this.dom.style.msTransform = "translateX(-".concat(right, "px)");
                  break;

                case 'top':
                case 'bottom':
                  _this.dom.style.width = "calc(100% - ".concat(right, "px)");
                  _this.dom.style.transform = 'translateZ(0)';
                  break;

                default:
                  break;
              }

              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function () {
                _this.dom.style.transition = "".concat(trannsformTransition, ",").concat(widthTransition);
                _this.dom.style.width = '';
                _this.dom.style.transform = '';
                _this.dom.style.msTransform = '';
              });
            } // 手机禁滚


            domArray.forEach(function (item, i) {
              if (!item) {
                return;
              }

              (0, _utils2.addEventListener)(item, eventArray[i] || 'touchmove', i ? _this.removeMoveHandler : _this.removeStartHandler, _this.passive);
            });
          } else if (_this.getCrrentDrawerSome()) {
            document.body.style.overflow = '';

            if ((_this.isOpenChange || openTransition) && right) {
              document.body.style.position = '';
              document.body.style.width = '';

              if (_utils2.trnasitionStr) {
                document.body.style.overflowX = 'hidden';
              }

              _this.dom.style.transition = 'none';
              var heightTransition;

              switch (placement) {
                case 'right':
                  {
                    _this.dom.style.transform = "translateX(".concat(right, "px)");
                    _this.dom.style.msTransform = "translateX(".concat(right, "px)");
                    _this.dom.style.width = '100%';
                    widthTransition = "width 0s ".concat(ease, " ").concat(duration);

                    if (_this.maskDom) {
                      _this.maskDom.style.left = "-".concat(right, "px");
                      _this.maskDom.style.width = "calc(100% + ".concat(right, "px)");
                    }

                    break;
                  }

                case 'top':
                case 'bottom':
                  {
                    _this.dom.style.width = "calc(100% + ".concat(right, "px)");
                    _this.dom.style.height = '100%';
                    _this.dom.style.transform = 'translateZ(0)';
                    heightTransition = "height 0s ".concat(ease, " ").concat(duration);
                    break;
                  }

                default:
                  break;
              }

              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function () {
                _this.dom.style.transition = "".concat(trannsformTransition, ",").concat(heightTransition ? "".concat(heightTransition, ",") : '').concat(widthTransition);
                _this.dom.style.transform = '';
                _this.dom.style.msTransform = '';
                _this.dom.style.width = '';
                _this.dom.style.height = '';
              });
            }

            domArray.forEach(function (item, i) {
              if (!item) {
                return;
              }

              (0, _utils2.removeEventListener)(item, eventArray[i] || 'touchmove', i ? _this.removeMoveHandler : _this.removeStartHandler, _this.passive);
            });
          }
        }
      }

      if (onChange && _this.isOpenChange && _this.firstEnter) {
        onChange(open);
        _this.isOpenChange = false;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getChildToRender", function (open) {
      var _classnames;

      var _this$props2 = _this.props,
          className = _this$props2.className,
          prefixCls = _this$props2.prefixCls,
          style = _this$props2.style,
          placement = _this$props2.placement,
          children = _this$props2.children,
          handler = _this$props2.handler,
          showMask = _this$props2.showMask,
          maskStyle = _this$props2.maskStyle,
          width = _this$props2.width,
          height = _this$props2.height,
          closed = _this$props2.closed;
      var wrapperClassname = (0, _classnames2["default"])(prefixCls, (_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-").concat(placement), true), _defineProperty(_classnames, "".concat(prefixCls, "-open"), open), _defineProperty(_classnames, className, !!className), _classnames));
      var isOpenChange = _this.isOpenChange;
      var isHorizontal = placement === 'left' || placement === 'right';
      var placementName = "translate".concat(isHorizontal ? 'X' : 'Y'); // 百分比与像素动画不同步，第一次打用后全用像素动画。
      // const defaultValue = !this.contentDom || !level ? '100%' : `${value}px`;

      var placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';
      var transform = open ? '' : "".concat(placementName, "(").concat(placementPos, ")");

      if (isOpenChange === undefined || isOpenChange) {
        var contentValue = _this.contentDom ? _this.contentDom.getBoundingClientRect()[isHorizontal ? 'width' : 'height'] : 0;
        var value = (isHorizontal ? width : height) || contentValue;

        _this.setLevelDomTransform(open, false, placementName, value);
      }

      var handlerCildren = handler && _react["default"].cloneElement(handler, {
        onClick: function onClick(e) {
          if (handler.props.onClick) {
            handler.props.onClick();
          }

          _this.onIconTouchEnd(e);
        },
        ref: function ref(c) {
          _this.handlerdom = c;
        }
      });

      var closedElement = function closedElement() {
        return _react["default"].createElement("div", {
          className: "drawer-close"
        }, _react["default"].createElement("i", {
          className: "drawer-close-icon"
        }));
      };

      var closedChildren = closed && _this.state.open && _react["default"].cloneElement(closedElement(), {
        onClick: function onClick(e) {
          _this.handleOnClosed(e);
        }
      }); // 当没有遮罩时，抽屉下面的内容需要可点击


      var noMaskWidth = function noMaskWidth() {
        if (!showMask && open) {
          return {
            width: "0%"
          };
        }

        return {};
      };

      return _react["default"].createElement("div", {
        className: wrapperClassname,
        style: Object.assign({}, style, noMaskWidth()),
        ref: function ref(c) {
          _this.dom = c;
        },
        onTransitionEnd: _this.onWrapperTransitionEnd
      }, showMask && _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-mask"),
        onClick: _this.onMaskTouchEnd,
        style: maskStyle,
        ref: function ref(c) {
          _this.maskDom = c;
        }
      }), _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-content-wrapper"),
        style: {
          transform: transform,
          msTransform: transform,
          width: (0, _utils2.isNumeric)(width) ? "".concat(width, "px") : width,
          height: (0, _utils2.isNumeric)(height) ? "".concat(height, "px") : height
        },
        ref: function ref(c) {
          _this.contentWrapper = c;
        }
      }, _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-content"),
        ref: function ref(c) {
          _this.contentDom = c;
        },
        onTouchStart: open ? _this.removeStartHandler : null // 跑用例用
        ,
        onTouchMove: open ? _this.removeMoveHandler : null // 跑用例用

      }, children), handlerCildren, closedChildren));
    });

    _defineProperty(_assertThisInitialized(_this), "getOpen", function () {
      return _this.props.open !== undefined ? _this.props.open : _this.state.open;
    });

    _defineProperty(_assertThisInitialized(_this), "getTouchParentScroll", function (root, currentTarget, differX, differY) {
      /**
       * 增加 rect。
       * 当父级 dom 的 overflow 未开启滚动时，scrollLeft 或 scrollTop 为 0, 而 scrollWidth 增加了，
       * 父级是跟随子级的 rect, 直到父级设定了滚动.
       */
      var rect = currentTarget.getBoundingClientRect();

      if (!currentTarget) {
        return false;
      } else if ((currentTarget.scrollTop + currentTarget.offsetHeight + currentTarget.offsetTop >= currentTarget.scrollHeight + rect.top && differY < 0 || currentTarget.scrollTop <= 0 && differY > 0) && Math.max(Math.abs(differX), Math.abs(differY)) === Math.abs(differY) || (currentTarget.scrollLeft + currentTarget.offsetWidth + currentTarget.offsetLeft >= currentTarget.scrollWidth + rect.left && differX < 0 || currentTarget.scrollLeft <= 0 && differX > 0) && Math.max(Math.abs(differX), Math.abs(differY)) === Math.abs(differX)) {
        return root === currentTarget || _this.getTouchParentScroll(root, currentTarget.parentNode, differX, differY);
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "removeStartHandler", function (e) {
      if (e.touches.length > 1) {
        return;
      }

      _this.startPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    });

    _defineProperty(_assertThisInitialized(_this), "removeMoveHandler", function (e) {
      if (e.changedTouches.length > 1) {
        return;
      }

      var currentTarget = e.currentTarget;
      var differX = e.changedTouches[0].clientX - _this.startPos.x;
      var differY = e.changedTouches[0].clientY - _this.startPos.y;

      if (currentTarget === _this.maskDom || currentTarget === _this.handlerdom || currentTarget === _this.contentDom && _this.getTouchParentScroll(currentTarget, e.target, differX, differY)) {
        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "trnasitionEnd", function (e) {
      (0, _utils2.removeEventListener)(e.target, _utils2.transitionEnd, _this.trnasitionEnd);
      e.target.style.transition = '';
    });

    _defineProperty(_assertThisInitialized(_this), "defaultGetContainer", function () {
      if (windowIsUndefined) {
        return null;
      }

      var container = document.createElement('div');

      _this.parent.appendChild(container);

      if (_this.props.wrapperClassName) {
        container.className = _this.props.wrapperClassName;
      }

      return container;
    });

    _this.levelDom = [];
    _this.contentDom = null;
    _this.maskDom = null;
    _this.handlerdom = null;
    _this.mousePos = null;
    _this.firstEnter = _props.firstEnter; // 记录首次进入.

    _this.timeout = null;
    _this.drawerId = Number((Date.now() + Math.random()).toString().replace('.', Math.round(Math.random() * 9))).toString(16);

    var _open = _props.open !== undefined ? _props.open : !!_props.defaultOpen;

    currentDrawer[_this.drawerId] = _open;
    _this.state = {
      open: _open,
      prevProps: _props
    };
    return _this;
  }

  _createClass(Drawer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!windowIsUndefined) {
        var passiveSupported = false;
        window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
          get: function get() {
            passiveSupported = true;
            return null;
          }
        }));
        this.passive = passiveSupported ? {
          passive: false
        } : false;
      }

      var open = this.getOpen();

      if (this.props.handler || open || this.firstEnter) {
        this.getDefault(this.props);

        if (open) {
          this.isOpenChange = true;
        }

        this.forceUpdate();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.open !== undefined && this.props.open !== prevProps.open) {
        this.isOpenChange = true; // 没渲染 dom 时，获取默认数据;

        if (!this.container) {
          this.getDefault(this.props);
        }
      } // dom 没渲染时，重走一遍。


      if (!this.firstEnter && this.container) {
        this.forceUpdate();
        this.firstEnter = true;
      }

      if (prevProps.placement !== this.props.placement) {
        // test 的 bug, 有动画过场，删除 dom
        this.contentDom = null;
      }

      if (this.props.level !== prevProps.level) {
        this.getParentAndLevelDom(this.props.level);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      delete currentDrawer[this.drawerId];
      delete this.isOpenChange;

      if (this.container) {
        if (this.state.open) {
          this.setLevelDomTransform(false, true);
        }

        document.body.style.overflow = ''; // 拦不住。。直接删除；

        if (this.props.getContainer) {
          this.container.parentNode.removeChild(this.container);
        }
      }

      this.firstEnter = false;
      clearTimeout(this.timeout); // suppport react15
      // 需要 didmount 后也会渲染，直接 unmount 将不会渲染，加上判断.

      if (this.renderComponent && !IS_REACT_16) {
        this.renderComponent({
          afterClose: this.removeContainer,
          onClose: function onClose() {},
          visible: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          getContainer = _this$props3.getContainer,
          wrapperClassName = _this$props3.wrapperClassName;
      var open = this.getOpen();
      currentDrawer[this.drawerId] = open ? this.container : open;
      var children = this.getChildToRender(this.firstEnter ? open : false);

      if (!getContainer) {
        return _react["default"].createElement("div", {
          className: wrapperClassName,
          ref: function ref(c) {
            _this2.container = c;
          }
        }, children);
      }

      if (!this.container || !open && !this.firstEnter) {
        return null;
      } // suppport react15


      if (!IS_REACT_16) {
        return _react["default"].createElement(_utils.ContainerRender, {
          parent: this,
          visible: true,
          autoMount: true,
          autoDestroy: false,
          getComponent: function getComponent() {
            return children;
          },
          getContainer: this.getContainer
        }, function (_ref) {
          var renderComponent = _ref.renderComponent,
              removeContainer = _ref.removeContainer;
          _this2.renderComponent = renderComponent;
          _this2.removeContainer = removeContainer;
          return null;
        });
      }

      return _reactDom["default"].createPortal(children, this.container);
    }
  }]);

  return Drawer;
}(_react["default"].PureComponent);

_defineProperty(Drawer, "defaultProps", {
  prefixCls: 'drawer',
  placement: 'left',
  getContainer: 'body',
  level: 'all',
  duration: '.3s',
  ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  onChange: function onChange() {},
  onMaskClick: function onMaskClick() {},
  onHandleClick: function onHandleClick() {},
  onCloseClick: function onCloseClick() {},
  handler: _react["default"].createElement("div", {
    className: "drawer-handle"
  }, _react["default"].createElement("i", {
    className: "drawer-handle-icon"
  })),
  closed: false,
  firstEnter: false,
  showMask: true,
  maskStyle: {},
  wrapperClassName: '',
  className: ''
});

Drawer.propTypes = {
  wrapperClassName: _propTypes["default"].string,
  className: _propTypes["default"].string,
  children: _propTypes["default"].node,
  style: _propTypes["default"].object,
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  defaultOpen: _propTypes["default"].bool,
  firstEnter: _propTypes["default"].bool,
  open: _propTypes["default"].bool,
  prefixCls: _propTypes["default"].string,
  placement: _propTypes["default"].string,
  level: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array]),
  levelMove: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].func, _propTypes["default"].array]),
  ease: _propTypes["default"].string,
  duration: _propTypes["default"].string,
  getContainer: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func, _propTypes["default"].object, _propTypes["default"].bool]),
  handler: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].node]),
  onChange: _propTypes["default"].func,
  onMaskClick: _propTypes["default"].func,
  onHandleClick: _propTypes["default"].func,
  onCloseClick: _propTypes["default"].func,
  showMask: _propTypes["default"].bool,
  maskStyle: _propTypes["default"].object,
  closed: _propTypes["default"].bool
};
(0, _reactLifecyclesCompat.polyfill)(Drawer);
var _default = Drawer;
exports["default"] = _default;