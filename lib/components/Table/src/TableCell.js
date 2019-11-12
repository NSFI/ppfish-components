"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _get = _interopRequireDefault(require("lodash/get"));

var _Ellipsis = _interopRequireDefault(require("../../Ellipsis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isInvalidRenderCellText(text) {
  return text && !_react.default.isValidElement(text) && Object.prototype.toString.call(text) === '[object Object]';
}

var TableCell =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TableCell, _React$Component);

  function TableCell() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      var _this$props = _this.props,
          record = _this$props.record,
          onCellClick = _this$props.column.onCellClick;

      if (onCellClick) {
        onCellClick(record, e);
      }
    });

    return _this;
  }

  var _proto = TableCell.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        record = _this$props2.record,
        indentSize = _this$props2.indentSize,
        prefixCls = _this$props2.prefixCls,
        indent = _this$props2.indent,
        index = _this$props2.index,
        expandIcon = _this$props2.expandIcon,
        column = _this$props2.column,
        BodyCell = _this$props2.component;
    var dataIndex = column.dataIndex,
        render = column.render,
        _column$className = column.className,
        className = _column$className === void 0 ? '' : _column$className; // We should return undefined if no dataIndex is specified, but in order to
    // be compatible with object-path's behavior, we return the record object instead.

    var text;

    if (typeof dataIndex === 'number') {
      text = (0, _get.default)(record, dataIndex);
    } else if (!dataIndex || dataIndex.length === 0) {
      text = record;
    } else {
      text = (0, _get.default)(record, dataIndex);
    }

    var tdProps = {};
    var colSpan;
    var rowSpan;

    if (render) {
      text = render(text, record, index);

      if (isInvalidRenderCellText(text)) {
        tdProps = text.props || tdProps;
        colSpan = tdProps.colSpan;
        rowSpan = tdProps.rowSpan;
        text = text.children;
      }
    }

    if (column.onCell) {
      tdProps = Object.assign({}, tdProps, {}, column.onCell(record, index));
    } // Fix https://github.com/ant-design/ant-design/issues/1202


    if (isInvalidRenderCellText(text)) {
      text = null;
    }

    var indentText = expandIcon ? _react.default.createElement("span", {
      style: {
        paddingLeft: indentSize * indent + "px"
      },
      className: prefixCls + "-indent indent-level-" + indent
    }) : null;

    if (rowSpan === 0 || colSpan === 0) {
      return null;
    }

    if (column.align) {
      tdProps.style = Object.assign({}, tdProps.style, {
        textAlign: column.align
      });
    }

    if (column.ellipsis) {
      text = _react.default.createElement(_Ellipsis.default, {
        width: '100%',
        style: {
          position: 'relative',
          top: '3px'
        }
      }, text);
    }

    return _react.default.createElement(BodyCell, _extends({
      className: className,
      onClick: this.handleClick
    }, tdProps), indentText, expandIcon, text);
  };

  return TableCell;
}(_react.default.Component);

exports.default = TableCell;

_defineProperty(TableCell, "propTypes", {
  record: _propTypes.default.object,
  prefixCls: _propTypes.default.string,
  index: _propTypes.default.number,
  indent: _propTypes.default.number,
  indentSize: _propTypes.default.number,
  column: _propTypes.default.object,
  expandIcon: _propTypes.default.node,
  component: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node, _propTypes.default.string])
});