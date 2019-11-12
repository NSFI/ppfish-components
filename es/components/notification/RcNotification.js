"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _utils = require("../../utils");

var _classnames = _interopRequireDefault(require("classnames"));

var _Notice = _interopRequireDefault(require("./Notice"));

require("./styles/RcNotification.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var seed = 0;
var now = Date.now();

function getUuid() {
  return "rcNotification_" + now + "_" + seed++;
}

var RcNotification =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RcNotification, _Component);

  function RcNotification() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      notices: []
    });

    _defineProperty(_assertThisInitialized(_this), "add", function (notice) {
      var key = notice.key = notice.key || getUuid();
      var maxCount = _this.props.maxCount;

      _this.setState(function (previousState) {
        var notices = previousState.notices;
        var noticeIndex = notices.map(function (v) {
          return v.key;
        }).indexOf(key);
        var updatedNotices = notices.concat();

        if (noticeIndex !== -1) {
          updatedNotices.splice(noticeIndex, 1, notice);
        } else {
          if (maxCount && notices.length >= maxCount) {
            // XXX, use key of first item to update new added (let React to move exsiting
            // instead of remove and mount). Same key was used before for both a) external
            // manual control and b) internal react 'key' prop , which is not that good.
            notice.updateKey = updatedNotices[0].updateKey || updatedNotices[0].key;
            updatedNotices.shift();
          }

          updatedNotices.push(notice);
        }

        return {
          notices: updatedNotices
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "remove", function (key) {
      _this.setState(function (previousState) {
        return {
          notices: previousState.notices.filter(function (notice) {
            return notice.key !== key;
          })
        };
      });
    });

    return _this;
  }

  var _proto = RcNotification.prototype;

  _proto.getTransitionName = function getTransitionName() {
    var props = this.props;
    var transitionName = props.transitionName;

    if (!transitionName && props.animation) {
      transitionName = props.prefixCls + "-" + props.animation;
    }

    return transitionName;
  };

  _proto.render = function render() {
    var _this2 = this,
        _className;

    var props = this.props;
    var notices = this.state.notices;
    var noticeNodes = notices.map(function (notice, index) {
      var update = Boolean(index === notices.length - 1 && notice.updateKey);
      var key = notice.updateKey ? notice.updateKey : notice.key;
      var onClose = (0, _utils.createChainedFunction)(_this2.remove.bind(_this2, notice.key), notice.onClose);
      return _react.default.createElement(_Notice.default, _extends({
        prefixCls: props.prefixCls
      }, notice, {
        key: key,
        update: update,
        onClose: onClose,
        closeIcon: props.closeIcon
      }), notice.content);
    });
    var className = (_className = {}, _className[props.prefixCls] = 1, _className[props.className] = !!props.className, _className);
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(className),
      style: props.style
    }, _react.default.createElement(_rcAnimate.default, {
      transitionName: this.getTransitionName()
    }, noticeNodes));
  };

  return RcNotification;
}(_react.Component);

_defineProperty(RcNotification, "propTypes", {
  prefixCls: _propTypes.default.string,
  transitionName: _propTypes.default.string,
  animation: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  style: _propTypes.default.object,
  maxCount: _propTypes.default.number,
  closeIcon: _propTypes.default.node
});

_defineProperty(RcNotification, "defaultProps", {
  prefixCls: 'rc-notification',
  animation: 'fade',
  style: {
    top: 65,
    left: '50%'
  }
});

RcNotification.newInstance = function newNotificationInstance(properties, callback) {
  var _ref = properties || {},
      getContainer = _ref.getContainer,
      props = _objectWithoutPropertiesLoose(_ref, ["getContainer"]);

  var div = document.createElement('div');

  if (getContainer) {
    var root = getContainer();
    root.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  var called = false;

  function ref(notification) {
    if (called) {
      return;
    }

    called = true;
    callback({
      notice: function notice(noticeProps) {
        notification.add(noticeProps);
      },
      removeNotice: function removeNotice(key) {
        notification.remove(key);
      },
      component: notification,
      destroy: function destroy() {
        _reactDom.default.unmountComponentAtNode(div);

        div.parentNode.removeChild(div);
      }
    });
  }

  _reactDom.default.render(_react.default.createElement(RcNotification, _extends({}, props, {
    ref: ref
  })), div);
};

var _default = RcNotification;
exports.default = _default;