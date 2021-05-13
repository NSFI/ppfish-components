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
import * as React from 'react';
import PropTypes from 'prop-types';
import BasePicker from './BasePicker';
import TimePanel from './panel/TimePanel';
import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';
import debounce from 'lodash/debounce';
import TimeSelect from './TimeSelect';
import ConfigConsumer from '../Config/Consumer';
export var converSelectRange = function (props) {
    var selectableRange = [];
    if (props.selectableRange) {
        var ranges = props.selectableRange;
        var parser_1 = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
        var format_1 = DEFAULT_FORMATS.timerange;
        ranges = Array.isArray(ranges) ? ranges : [ranges];
        selectableRange = ranges.map(function (range) { return parser_1(range, format_1); });
    }
    return selectableRange;
};
var TimePicker = /** @class */ (function (_super) {
    __extends(TimePicker, _super);
    function TimePicker(props) {
        var _this = 
        //props, type, state
        _super.call(this, props, 'time', {}) || this;
        _this.onSelectionChange = function (start, end) {
            _this.refInputRoot.input && _this.refInputRoot.input.setSelectionRange(start, end);
            _this.refInputRoot.input && _this.refInputRoot.input.focus();
        };
        _this._onSelectionChange = debounce(_this.onSelectionChange, 200);
        return _this;
    }
    Object.defineProperty(TimePicker, "propTypes", {
        get: function () {
            return Object.assign({}, {
                // '18:30:00 - 20:30:00' or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
                selectableRange: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.arrayOf(PropTypes.string)
                ]),
                isShowCurrent: PropTypes.bool,
                footer: PropTypes.func,
                onValueChange: PropTypes.func
            }, BasePicker.propTypes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePicker, "defaultProps", {
        get: function () {
            return Object.assign({}, { isShowCurrent: false }, BasePicker.defaultProps);
        },
        enumerable: true,
        configurable: true
    });
    TimePicker.prototype.isDateValid = function (value) {
        return _super.prototype.isDateValid.call(this, value) && TimePanel.isValid(value, converSelectRange(this.props));
    };
    TimePicker.prototype.pickerPanel = function (state) {
        var _this = this;
        var value = state.value && this.isDateValid(state.value) ? state.value : null;
        return (React.createElement(ConfigConsumer, { componentName: "DatePicker" }, function (Locales) { return (React.createElement(TimePanel, __assign({}, _this.props, { selectableRange: converSelectRange(_this.props), ONSELECTRANGECHANGE: _this._onSelectionChange, value: value, onPicked: _this.onPicked, onCancelPicked: _this.onCancelPicked, Locales: Locales }))); }));
    };
    TimePicker.TimeSelect = TimeSelect;
    return TimePicker;
}(BasePicker));
export default TimePicker;
