"use strict";

exports.__esModule = true;
exports.default = createSliderWithTooltip;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("../Tooltip/index.js"));

var _RcHandle = _interopRequireDefault(require("./RcHandle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createSliderWithTooltip(Component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(ComponentWrapper, _React$Component);

    function ComponentWrapper(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;

      _defineProperty(_assertThisInitialized(_this), "handleTooltipVisibleChange", function (index, visible) {
        _this.setState(function (prevState) {
          var _Object$assign;

          return {
            visibles: Object.assign({}, prevState.visibles, (_Object$assign = {}, _Object$assign[index] = visible, _Object$assign))
          };
        });
      });

      _defineProperty(_assertThisInitialized(_this), "handleWithTooltip", function (_ref) {
        var value = _ref.value,
            dragging = _ref.dragging,
            index = _ref.index,
            disabled = _ref.disabled,
            restProps = _objectWithoutPropertiesLoose(_ref, ["value", "dragging", "index", "disabled"]);

        var _this$props = _this.props,
            tipProps = _this$props.tipProps,
            handleStyle = _this$props.handleStyle;

        var _tipProps$prefixCls = tipProps.prefixCls,
            prefixCls = _tipProps$prefixCls === void 0 ? 'rc-slider-tooltip' : _tipProps$prefixCls,
            _tipProps$placement = tipProps.placement,
            placement = _tipProps$placement === void 0 ? 'top' : _tipProps$placement,
            _tipProps$visible = tipProps.visible,
            visible = _tipProps$visible === void 0 ? visible || false : _tipProps$visible,
            restTooltipProps = _objectWithoutPropertiesLoose(tipProps, ["prefixCls", "placement", "visible"]);

        var handleStyleWithIndex;

        if (Array.isArray(handleStyle)) {
          handleStyleWithIndex = handleStyle[index] || handleStyle[0];
        } else {
          handleStyleWithIndex = handleStyle;
        }

        return _react.default.createElement(_index.default, _extends({}, restTooltipProps, {
          prefixCls: prefixCls,
          placement: placement,
          visible: !disabled && (_this.state.visibles[index] || dragging) || visible,
          key: index
        }), _react.default.createElement(_RcHandle.default, _extends({}, restProps, {
          style: Object.assign({}, handleStyleWithIndex),
          value: value,
          onMouseEnter: function onMouseEnter() {
            return _this.handleTooltipVisibleChange(index, true);
          },
          onMouseLeave: function onMouseLeave() {
            return _this.handleTooltipVisibleChange(index, false);
          }
        })));
      });

      _this.state = {
        visibles: {}
      };
      return _this;
    }

    var _proto = ComponentWrapper.prototype;

    _proto.render = function render() {
      return _react.default.createElement(Component, _extends({}, this.props, {
        handle: this.handleWithTooltip
      }));
    };

    return ComponentWrapper;
  }(_react.default.Component), _defineProperty(_class, "propTypes", {
    handleStyle: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.arrayOf(_propTypes.default.object)]),
    tipProps: _propTypes.default.object
  }), _defineProperty(_class, "defaultProps", {
    handleStyle: [{}],
    tipProps: {}
  }), _temp;
}