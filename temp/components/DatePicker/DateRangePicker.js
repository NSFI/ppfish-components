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
import DateRangeBasePicker from './DateRangeBasePicker';
import DateRangePanel from './panel/DateRangePanel';
import TimeSelectPanel from './panel/TimeSelectPanel';
import TimePanel from './panel/TimePanel';
import { converSelectRange } from './TimePicker';
import ConfigConsumer from '../Config/Consumer';
var DateRangePicker = /** @class */ (function (_super) {
    __extends(DateRangePicker, _super);
    // FIXME: props typing
    function DateRangePicker(props) {
        var _this = _super.call(this, props, props.showTime ? 'datetimerange' : 'daterange', {}) || this;
        _this.getFormatSeparator = function () {
            return _this.props.separator;
        };
        _this.onError = function (value) {
            return _this.props.onError && typeof _this.props.onError === 'function'
                ? _this.props.onError(value)
                : undefined;
        };
        return _this;
    }
    Object.defineProperty(DateRangePicker, "propTypes", {
        get: function () {
            return Object.assign({}, {
                separator: PropTypes.string,
                yearCount: PropTypes.number,
                shortcuts: PropTypes.arrayOf(PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    onClick: PropTypes.func.isRequired,
                })),
                disabledDate: PropTypes.func,
                firstDayOfWeek: PropTypes.number,
                footer: PropTypes.func,
                onError: PropTypes.func,
            }, DateRangeBasePicker.propTypes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker, "defaultProps", {
        get: function () {
            return Object.assign({}, DateRangePanel.defaultProps, DateRangeBasePicker.defaultProps);
        },
        enumerable: true,
        configurable: true
    });
    DateRangePicker.prototype.isDateValid = function (value) {
        var dateValid = _super.prototype.isDateValid.call(this, value) &&
            DateRangePanel.isValid(value, this.props.disabledDate);
        // 带时间的日期范围面板，需要检查时间的合法性
        if (this.props.showTime) {
            var startTime = value && value.length >= 2 ? value[0] : null;
            var endTime = value && value.length >= 2 ? value[1] : null;
            var startTimeSelectValid = startTime &&
                this.props.startTimeSelectMode === 'TimeSelect' &&
                TimeSelectPanel.isValid(this.dateToStr(startTime).split(' ')[1], this.props.startTimeSelectModeProps);
            var startTimePickerValid = startTime &&
                this.props.startTimeSelectMode === 'TimePicker' &&
                TimePanel.isValid(startTime, converSelectRange({
                    selectableRange: this.props.startTimeSelectableRange,
                }));
            var endTimeSelectValid = endTime &&
                this.props.endTimeSelectMode === 'TimeSelect' &&
                TimeSelectPanel.isValid(this.dateToStr(endTime).split(' ')[1], this.props.endTimeSelectModeProps);
            var endTimePickerValid = endTime &&
                this.props.endTimeSelectMode === 'TimePicker' &&
                TimePanel.isValid(endTime, converSelectRange({
                    selectableRange: this.props.endTimeSelectableRange,
                }));
            return (dateValid &&
                (startTimeSelectValid || startTimePickerValid) &&
                (endTimeSelectValid || endTimePickerValid));
        }
        else {
            return dateValid;
        }
    };
    DateRangePicker.prototype.pickerPanel = function (state) {
        var _this = this;
        var value = state.value && this.isDateValid(state.value) ? state.value : null;
        return (React.createElement(ConfigConsumer, { componentName: "DatePicker" }, function (Locales) { return (
        // @ts-ignore to much unmatched props
        React.createElement(DateRangePanel, __assign({}, _this.props, { value: value, onPick: _this.onPicked, onCancelPicked: _this.onCancelPicked, dateToStr: _this.dateToStr }))); }));
    };
    return DateRangePicker;
}(DateRangeBasePicker));
export default DateRangePicker;
