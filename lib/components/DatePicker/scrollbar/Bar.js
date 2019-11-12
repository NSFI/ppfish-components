"use strict";

exports.__esModule = true;
exports.Bar = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("./util");

var _dom = require("../libs/utils/dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Bar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Bar, _React$Component);

  function Bar(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.clickTrackHandler = _this.clickTrackHandler.bind(_assertThisInitialized(_this));
    _this.clickThumbHandler = _this.clickThumbHandler.bind(_assertThisInitialized(_this));
    _this.mouseMoveDocumentHandler = _this.mouseMoveDocumentHandler.bind(_assertThisInitialized(_this));
    _this.mouseUpDocumentHandler = _this.mouseUpDocumentHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Bar.prototype;

  _proto.clickThumbHandler = function clickThumbHandler(e) {
    this.startDrag(e);
    this[this.bar.axis] = e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]);
  };

  _proto.clickTrackHandler = function clickTrackHandler(e) {
    var offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
    var thumbHalf = this.thumbRef[this.bar.offset] / 2;
    var thumbPositionPercentage = (offset - thumbHalf) * 100 / this.rootRef[this.bar.offset];
    this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
  };

  _proto.startDrag = function startDrag(e) {
    e.nativeEvent.stopImmediatePropagation;
    this.cursorDown = true;
    (0, _dom.on)(document, 'mousemove', this.mouseMoveDocumentHandler);
    (0, _dom.on)(document, 'mouseup', this.mouseUpDocumentHandler);

    document.onselectstart = function () {
      return false;
    };
  };

  _proto.mouseMoveDocumentHandler = function mouseMoveDocumentHandler(e) {
    if (this.cursorDown === false) return;
    var prevPage = this[this.bar.axis];
    if (!prevPage) return;
    var offset = e[this.bar.client] - this.rootRef.getBoundingClientRect()[this.bar.direction];
    var thumbClickPosition = this.thumbRef[this.bar.offset] - prevPage;
    var thumbPositionPercentage = (offset - thumbClickPosition) * 100 / this.rootRef[this.bar.offset];
    this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
  };

  _proto.mouseUpDocumentHandler = function mouseUpDocumentHandler() {
    this.cursorDown = false;
    this[this.bar.axis] = 0;
    (0, _dom.off)(document, 'mousemove', this.mouseMoveDocumentHandler);
    document.onselectstart = null;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        size = _this$props.size,
        move = _this$props.move,
        prefixCls = _this$props.prefixCls;
    return _react.default.createElement("div", {
      ref: function ref(root) {
        return _this2.rootRef = root;
      },
      className: (0, _classnames.default)(prefixCls + "-scrollbar__bar", "is-" + this.bar.key),
      onMouseDown: this.clickTrackHandler
    }, _react.default.createElement("div", {
      ref: function ref(thumb) {
        return _this2.thumbRef = thumb;
      },
      className: prefixCls + "-scrollbar__thumb",
      onMouseDown: this.clickThumbHandler,
      style: (0, _util.renderThumbStyle)({
        size: size,
        move: move,
        bar: this.bar
      })
    }));
  };

  _createClass(Bar, [{
    key: "bar",
    get: function get() {
      return _util.BAR_MAP[this.props.vertical ? 'vertical' : 'horizontal'];
    }
  }, {
    key: "wrap",
    get: function get() {
      return this.props.getParentWrap();
    }
  }]);

  return Bar;
}(_react.default.Component);

exports.Bar = Bar;
Bar.propTypes = {
  vertical: _propTypes.default.bool,
  size: _propTypes.default.string,
  move: _propTypes.default.number,
  getParentWrap: _propTypes.default.func.isRequired,
  prefixCls: _propTypes.default.string
};
Bar.defaultProps = {
  prefixCls: 'fishd'
};