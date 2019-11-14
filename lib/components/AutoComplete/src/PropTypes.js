"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function valueType(props, propName, componentName) {
  var basicType = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]);

  var labelInValueShape = _propTypes["default"].shape({
    key: basicType.isRequired,
    label: _propTypes["default"].node
  });

  if (props.labelInValue) {
    var validate = _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(labelInValueShape), labelInValueShape]);

    var error = validate.apply(void 0, arguments);

    if (error) {
      return new Error("Invalid prop `".concat(propName, "` supplied to `").concat(componentName, "`, ") + "when you set `labelInValue` to `true`, `".concat(propName, "` should in ") + "shape of `{ key: string | number, label?: ReactNode }`.");
    }
  } else if ((props.mode === 'multiple' || props.mode === 'tags' || props.multiple || props.tags) && props[propName] === '') {
    return new Error("Invalid prop `".concat(propName, "` of type `string` supplied to `").concat(componentName, "`, ") + "expected `array` when `multiple` or `tags` is `true`.");
  } else {
    var _validate = _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(basicType), basicType]);

    return _validate.apply(void 0, arguments);
  }
}

var SelectPropTypes = {
  id: _propTypes["default"].string,
  defaultActiveFirstOption: _propTypes["default"].bool,
  multiple: _propTypes["default"].bool,
  filterOption: _propTypes["default"].any,
  children: _propTypes["default"].any,
  showSearch: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  allowClear: _propTypes["default"].bool,
  showArrow: _propTypes["default"].bool,
  tags: _propTypes["default"].bool,
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  transitionName: _propTypes["default"].string,
  optionLabelProp: _propTypes["default"].string,
  optionFilterProp: _propTypes["default"].string,
  animation: _propTypes["default"].string,
  choiceTransitionName: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  onSelect: _propTypes["default"].func,
  onSearch: _propTypes["default"].func,
  onPopupScroll: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onInputKeyDown: _propTypes["default"].func,
  placeholder: _propTypes["default"].any,
  onDeselect: _propTypes["default"].func,
  labelInValue: _propTypes["default"].bool,
  value: valueType,
  defaultValue: valueType,
  dropdownStyle: _propTypes["default"].object,
  maxTagTextLength: _propTypes["default"].number,
  maxTagCount: _propTypes["default"].number,
  maxTagPlaceholder: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  tokenSeparators: _propTypes["default"].arrayOf(_propTypes["default"].string),
  getInputElement: _propTypes["default"].func,
  showAction: _propTypes["default"].arrayOf(_propTypes["default"].string),
  clearIcon: _propTypes["default"].node,
  inputIcon: _propTypes["default"].node,
  removeIcon: _propTypes["default"].node
};
exports.SelectPropTypes = SelectPropTypes;