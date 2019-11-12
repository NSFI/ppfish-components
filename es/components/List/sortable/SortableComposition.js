"use strict";

exports.__esModule = true;
exports.SortableComposition = SortableComposition;
exports.HORIZONTAL = exports.VERTICAL = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.number.constructor");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _helpers = require("./helpers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VERTICAL = 'VERTICAL';
exports.VERTICAL = VERTICAL;
var HORIZONTAL = 'HORIZONTAL';
/*** Higher-order component - this component works like a factory for draggable items */

exports.HORIZONTAL = HORIZONTAL;
var draggingIndex = null;

function SortableComposition(Component, flowDirection) {
  var _class, _temp;

  if (flowDirection === void 0) {
    flowDirection = VERTICAL;
  }

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Sortable, _React$Component);

    function Sortable() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_this), "sortEnd", function (e) {
        e.preventDefault();
        draggingIndex = null;
      });

      _defineProperty(_assertThisInitialized(_this), "sortStart", function (e) {
        draggingIndex = e.currentTarget.dataset.id;
        var dt = e.dataTransfer;

        if (dt !== undefined) {
          dt.effectAllowed = 'move';
          e.dataTransfer.setData('text', e.target.innerHTML);

          if (dt.setDragImage && e.currentTarget.tagName.toLowerCase() === 'a') {
            dt.setDragImage(e.target, 0, 0);
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "dragOver", function (e) {
        e.preventDefault();
        var _this$props = _this.props,
            moveInMiddle = _this$props.moveInMiddle,
            sortId = _this$props.sortId;
        var overEl = e.currentTarget; //underlying element

        var indexDragged = Number(overEl.dataset.id); //index of underlying element in the set DOM elements

        var indexFrom = Number(draggingIndex);
        var height = overEl.getBoundingClientRect().height;
        var width = overEl.getBoundingClientRect().width;
        var positionX = e.clientX;
        var positionY = e.clientY;
        var topOffset = overEl.getBoundingClientRect().top;
        var leftOffset = overEl.getBoundingClientRect().left;
        var mouseBeyond;
        var items = _this.props.items;

        if (flowDirection === VERTICAL) {
          mouseBeyond = (0, _helpers.isMouseBeyond)(positionY, topOffset, height, moveInMiddle);
        }

        if (flowDirection === HORIZONTAL) {
          mouseBeyond = (0, _helpers.isMouseBeyond)(positionX, leftOffset, width, moveInMiddle);
        }

        if (indexDragged !== indexFrom && mouseBeyond) {
          items = (0, _helpers.swapArrayElements)(items, indexFrom, indexDragged);
          draggingIndex = indexDragged;

          _this.props.onSortItems(items);
        }
      });

      return _this;
    }

    var _proto = Sortable.prototype;

    _proto.render = function render() {
      var newProps = Object.assign({}, this.props);
      delete newProps.onSortItems;

      var sortId = newProps.sortId,
          moveInMiddle = newProps.moveInMiddle,
          items = newProps.items,
          props = _objectWithoutPropertiesLoose(newProps, ["sortId", "moveInMiddle", "items"]);

      return _react.default.createElement(Component, _extends({
        draggable: true,
        onDragOver: this.dragOver,
        onDragStart: this.sortStart,
        onDragEnd: this.sortEnd,
        onTouchStart: this.sortStart,
        onTouchMove: this.dragOver,
        onTouchEnd: this.sortEnd,
        "data-id": sortId
      }, props));
    };

    return Sortable;
  }(_react.default.Component), _defineProperty(_class, "propTypes", {
    items: _propTypes.default.array.isRequired,
    onSortItems: _propTypes.default.func.isRequired,
    sortId: _propTypes.default.number,
    moveInMiddle: _propTypes.default.bool
  }), _defineProperty(_class, "defaultProps", {
    moveInMiddle: false
  }), _temp;
}