"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.number.constructor");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _Track = _interopRequireDefault(require("./common/Track"));

var _createSlider = _interopRequireDefault(require("./common/createSlider"));

var utils = _interopRequireWildcard(require("./utils"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Range =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Range, _React$Component);

  Range.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return null;
    var bounds = prevState.bounds;
    var value = nextProps.value || bounds;
    var allowCross = nextProps.allowCross,
        thershold = nextProps.pushable;
    var nextBounds = value.map(function (val, handle) {
      var valInRange = utils.ensureValueInRange(val, nextProps);
      var valNotConflict = valInRange; // = this.ensureValueNotConflict(i, valInRange, nextProps);
      // this.ensureValueNotConflict

      handle = handle === undefined ? prevState.handle : handle;
      thershold = Number(thershold);
      /* eslint-disable eqeqeq */

      if (!allowCross && handle != null && bounds !== undefined) {
        if (handle > 0 && valInRange <= bounds[handle - 1] + thershold) {
          valNotConflict = bounds[handle - 1] + thershold;
        }

        if (handle < bounds.length - 1 && valInRange >= bounds[handle + 1] - thershold) {
          valNotConflict = bounds[handle + 1] - thershold;
        }
      }
      /* eslint-enable eqeqeq */


      return utils.ensureValuePrecision(valNotConflict, nextProps);
    });

    if (nextBounds.length === bounds.length && nextBounds.every(function (v, i) {
      return v === bounds[i];
    })) {
      return null;
    } else {
      return {
        bounds: nextBounds
      };
    }
  };

  function Range(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onEnd", function () {
      _this.removeDocumentEvents();

      _this.props.onAfterChange(_this.getValue()); // RcHandle被点击后，鼠标移开后还原到初始状态


      _this.setState({
        handle: null
      });
    });

    var count = props.count,
        min = props.min,
        max = props.max;
    var initialValue = Array.apply(null, Array(count + 1)).map(function () {
      return min;
    });
    var defaultValue = 'defaultValue' in props ? props.defaultValue : initialValue;
    var value = props.value !== undefined ? props.value : defaultValue;
    var bounds = value.map(function (v, i) {
      return _this.trimAlignValue(v, i);
    });
    var recent = bounds[0] === max ? 0 : bounds.length - 1;
    _this.state = {
      handle: null,
      recent: recent,
      bounds: bounds
    };
    return _this;
  }

  var _proto = Range.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this2 = this;

    var prevBounds = prevState.bounds;
    var nextBounds = this.state.bounds;

    if (prevBounds.length === nextBounds.length && nextBounds.every(function (v, i) {
      return v === prevBounds[i];
    })) {
      return;
    }

    var onChange = this.props.onChange;

    if (onChange && nextBounds.some(function (v) {
      return utils.isValueOutOfRange(v, _this2.props);
    })) {
      var newValues = nextBounds.map(function (v) {
        return utils.ensureValueInRange(v, _this2.props);
      });
      onChange(newValues);
    }
  };

  _proto.onChange = function onChange(state) {
    var props = this.props;
    var isNotControlled = !('value' in props);

    if (isNotControlled) {
      this.setState(state);
    } else if (state.handle !== undefined) {
      this.setState({
        handle: state.handle
      });
    }

    var data = Object.assign({}, this.state, {}, state);
    var changedValue = data.bounds;
    props.onChange(changedValue);
  };

  _proto.onStart = function onStart(position) {
    var props = this.props;
    var state = this.state;
    var bounds = this.getValue();
    props.onBeforeChange(bounds);
    var value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;
    var closestBound = this.getClosestBound(value);
    this.prevMovedHandleIndex = this.getBoundNeedMoving(value, closestBound);
    this.setState({
      handle: this.prevMovedHandleIndex,
      recent: this.prevMovedHandleIndex
    });
    var prevValue = bounds[this.prevMovedHandleIndex];
    if (value === prevValue) return;
    var nextBounds = [].concat(state.bounds);
    nextBounds[this.prevMovedHandleIndex] = value;
    this.onChange({
      bounds: nextBounds
    });
  };

  _proto.onMove = function onMove(e, position) {
    utils.pauseEvent(e);
    var state = this.state;
    var value = this.calcValueByPos(position);
    var oldValue = state.bounds[state.handle];
    if (value === oldValue) return;
    this.moveTo(value);
  };

  _proto.onKeyboard = function onKeyboard(e) {
    var valueMutator = utils.getKeyboardValueMutator(e);

    if (valueMutator) {
      utils.pauseEvent(e);
      var state = this.state,
          props = this.props;
      var bounds = state.bounds,
          handle = state.handle;
      var oldValue = bounds[handle];
      var mutatedValue = valueMutator(oldValue, props);
      var value = this.trimAlignValue(mutatedValue);
      if (value === oldValue) return;
      var isFromKeyboardEvent = true;
      this.moveTo(value, isFromKeyboardEvent);
    }
  };

  _proto.getValue = function getValue() {
    return this.state.bounds;
  };

  _proto.getClosestBound = function getClosestBound(value) {
    var bounds = this.state.bounds;
    var closestBound = 0;

    for (var i = 1; i < bounds.length - 1; ++i) {
      if (value > bounds[i]) {
        closestBound = i;
      }
    }

    if (Math.abs(bounds[closestBound + 1] - value) < Math.abs(bounds[closestBound] - value)) {
      closestBound = closestBound + 1;
    }

    return closestBound;
  };

  _proto.getBoundNeedMoving = function getBoundNeedMoving(value, closestBound) {
    var _this$state = this.state,
        bounds = _this$state.bounds,
        recent = _this$state.recent;
    var boundNeedMoving = closestBound;
    var isAtTheSamePoint = bounds[closestBound + 1] === bounds[closestBound];

    if (isAtTheSamePoint && bounds[recent] === bounds[closestBound]) {
      boundNeedMoving = recent;
    }

    if (isAtTheSamePoint && value !== bounds[closestBound + 1]) {
      boundNeedMoving = value < bounds[closestBound + 1] ? closestBound : closestBound + 1;
    }

    return boundNeedMoving;
  };

  _proto.getLowerBound = function getLowerBound() {
    return this.state.bounds[0];
  };

  _proto.getUpperBound = function getUpperBound() {
    var bounds = this.state.bounds;
    return bounds[bounds.length - 1];
  }
  /**
   * Returns an array of possible slider points, taking into account both
   * `marks` and `step`. The result is cached.
   */
  ;

  _proto.getPoints = function getPoints() {
    var _this$props = this.props,
        marks = _this$props.marks,
        step = _this$props.step,
        min = _this$props.min,
        max = _this$props.max;
    var cache = this._getPointsCache;

    if (!cache || cache.marks !== marks || cache.step !== step) {
      var pointsObject = Object.assign({}, marks);

      if (step !== null) {
        for (var point = min; point <= max; point += step) {
          pointsObject[point] = point;
        }
      }

      var points = Object.keys(pointsObject).map(parseFloat);
      points.sort(function (a, b) {
        return a - b;
      });
      this._getPointsCache = {
        marks: marks,
        step: step,
        points: points
      };
    }

    return this._getPointsCache.points;
  };

  _proto.moveTo = function moveTo(value, isFromKeyboardEvent) {
    var _this3 = this;

    var state = this.state,
        props = this.props;
    var nextBounds = [].concat(state.bounds);
    nextBounds[state.handle] = value;
    var nextHandle = state.handle;

    if (props.pushable !== false) {
      this.pushSurroundingHandles(nextBounds, nextHandle);
    } else if (props.allowCross) {
      nextBounds.sort(function (a, b) {
        return a - b;
      });
      nextHandle = nextBounds.indexOf(value);
    }

    this.onChange({
      handle: nextHandle,
      bounds: nextBounds
    });

    if (isFromKeyboardEvent) {
      // known problem: because setState is async,
      // so trigger focus will invoke handler's onEnd and another handler's onStart too early,
      // cause onBeforeChange and onAfterChange receive wrong value.
      // here use setState callback to hack，but not elegant
      this.setState({}, function () {
        _this3.handlesRefs[nextHandle].focus();
      });
    }
  };

  _proto.pushSurroundingHandles = function pushSurroundingHandles(bounds, handle) {
    var value = bounds[handle];
    var threshold = this.props.pushable;
    threshold = Number(threshold);
    var direction = 0;

    if (bounds[handle + 1] - value < threshold) {
      direction = +1; // push to right
    }

    if (value - bounds[handle - 1] < threshold) {
      direction = -1; // push to left
    }

    if (direction === 0) {
      return;
    }

    var nextHandle = handle + direction;
    var diffToNext = direction * (bounds[nextHandle] - value);

    if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
      // revert to original value if pushing is impossible
      bounds[handle] = bounds[nextHandle] - direction * threshold;
    }
  };

  _proto.pushHandle = function pushHandle(bounds, handle, direction, amount) {
    var originalValue = bounds[handle];
    var currentValue = bounds[handle];

    while (direction * (currentValue - originalValue) < amount) {
      if (!this.pushHandleOnePoint(bounds, handle, direction)) {
        // can't push handle enough to create the needed `amount` gap, so we
        // revert its position to the original value
        bounds[handle] = originalValue;
        return false;
      }

      currentValue = bounds[handle];
    } // the handle was pushed enough to create the needed `amount` gap


    return true;
  };

  _proto.pushHandleOnePoint = function pushHandleOnePoint(bounds, handle, direction) {
    var points = this.getPoints();
    var pointIndex = points.indexOf(bounds[handle]);
    var nextPointIndex = pointIndex + direction;

    if (nextPointIndex >= points.length || nextPointIndex < 0) {
      // reached the minimum or maximum available point, can't push anymore
      return false;
    }

    var nextHandle = handle + direction;
    var nextValue = points[nextPointIndex];
    var threshold = this.props.pushable;
    var diffToNext = direction * (bounds[nextHandle] - nextValue);

    if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
      // couldn't push next handle, so we won't push this one either
      return false;
    } // push the handle


    bounds[handle] = nextValue;
    return true;
  };

  _proto.trimAlignValue = function trimAlignValue(v, handle, nextProps) {
    if (nextProps === void 0) {
      nextProps = {};
    }

    var mergedProps = Object.assign({}, this.props, {}, nextProps);
    var valInRange = utils.ensureValueInRange(v, mergedProps);
    var valNotConflict = this.ensureValueNotConflict(handle, valInRange, mergedProps);
    return utils.ensureValuePrecision(valNotConflict, mergedProps);
  };

  _proto.ensureValueNotConflict = function ensureValueNotConflict(handle, val, _ref) {
    var allowCross = _ref.allowCross,
        thershold = _ref.pushable;
    var state = this.state || {};
    var bounds = state.bounds;
    handle = handle === undefined ? state.handle : handle;
    thershold = Number(thershold);
    /* eslint-disable eqeqeq */

    if (!allowCross && handle != null && bounds !== undefined) {
      if (handle > 0 && val <= bounds[handle - 1] + thershold) {
        return bounds[handle - 1] + thershold;
      }

      if (handle < bounds.length - 1 && val >= bounds[handle + 1] - thershold) {
        return bounds[handle + 1] - thershold;
      }
    }
    /* eslint-enable eqeqeq */


    return val;
  };

  _proto.render = function render() {
    var _this4 = this;

    var _this$state2 = this.state,
        handle = _this$state2.handle,
        bounds = _this$state2.bounds;
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        vertical = _this$props2.vertical,
        included = _this$props2.included,
        disabled = _this$props2.disabled,
        min = _this$props2.min,
        max = _this$props2.max,
        handleGenerator = _this$props2.handle,
        trackStyle = _this$props2.trackStyle,
        handleStyle = _this$props2.handleStyle,
        tabIndex = _this$props2.tabIndex;
    var offsets = bounds.map(function (v) {
      return _this4.calcOffset(v);
    });
    var handleClassName = prefixCls + "-handle";
    var handles = bounds.map(function (v, i) {
      var _classNames;

      return handleGenerator({
        className: (0, _classnames.default)((_classNames = {}, _classNames[handleClassName] = true, _classNames[handleClassName + "-" + (i + 1)] = true, _classNames)),
        prefixCls: prefixCls,
        vertical: vertical,
        offset: offsets[i],
        value: v,
        dragging: handle === i,
        index: i,
        tabIndex: tabIndex[i] || 0,
        min: min,
        max: max,
        disabled: disabled,
        style: handleStyle[i],
        ref: function ref(h) {
          return _this4.saveHandle(i, h);
        }
      });
    });
    var tracks = bounds.slice(0, -1).map(function (_, index) {
      var _classNames2;

      var i = index + 1;
      var trackClassName = (0, _classnames.default)((_classNames2 = {}, _classNames2[prefixCls + "-track"] = true, _classNames2[prefixCls + "-track-" + i] = true, _classNames2));
      return _react.default.createElement(_Track.default, {
        className: trackClassName,
        vertical: vertical,
        included: included,
        offset: offsets[i - 1],
        length: offsets[i] - offsets[i - 1],
        style: trackStyle[index],
        key: i
      });
    });
    return {
      tracks: tracks,
      handles: handles
    };
  };

  return Range;
}(_react.default.Component);

_defineProperty(Range, "displayName", 'Range');

_defineProperty(Range, "propTypes", {
  defaultValue: _propTypes.default.arrayOf(_propTypes.default.number),
  value: _propTypes.default.arrayOf(_propTypes.default.number),
  count: _propTypes.default.number,
  pushable: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number]),
  allowCross: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  tabIndex: _propTypes.default.arrayOf(_propTypes.default.number)
});

_defineProperty(Range, "defaultProps", {
  count: 1,
  allowCross: true,
  pushable: false,
  tabIndex: []
});

(0, _reactLifecyclesCompat.polyfill)(Range);

var _default = (0, _createSlider.default)(Range);

exports.default = _default;