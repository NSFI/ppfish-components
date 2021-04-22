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
import DatePanel from './panel/DatePanel';
import TimeSelectPanel from './panel/TimeSelectPanel';
import TimePanel from './panel/TimePanel';
import { converSelectRange } from './TimePicker';
import { SELECTION_MODES } from '../../utils/date';
import DateRangePicker from './DateRangePicker';
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker(props) {
        var _this = this;
        var type = props.showTime ? 'datetime' : 'date';
        switch (props.mode) {
            // case SELECTION_MODES.YEAR:
            //   type = 'year'; break;
            // case SELECTION_MODES.MONTH:
            //   type = 'month'; break;
            case SELECTION_MODES.WEEK:
                type = 'week';
                break;
        }
        _this = _super.call(this, props, type, {}) || this;
        return _this;
    }
    Object.defineProperty(DatePicker, "propTypes", {
        get: function () {
            return Object.assign({}, {
                placeholder: PropTypes.string,
                value: PropTypes.instanceOf(Date),
                mode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(function (e) { return SELECTION_MODES[e]; }))
            }, BasePicker.propTypes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePicker, "defaultProps", {
        get: function () {
            return Object.assign({}, DatePanel.defaultProps, BasePicker.defaultProps);
        },
        enumerable: true,
        configurable: true
    });
    DatePicker.prototype.isDateValid = function (value) {
        // 带时间的日期面板，需要检查时间的合法性
        var dateValid = _super.prototype.isDateValid.call(this, value) && DatePanel.isValid(value, this.props.disabledDate);
        if (this.props.showTime) {
            var timeSelectValid = this.props.timeSelectMode === 'TimeSelect' &&
                TimeSelectPanel.isValid(this.dateToStr(value).split(' ')[1], this.props.timeSelectModeProps);
            var timePickerValid = this.props.timeSelectMode === 'TimePicker' &&
                TimePanel.isValid(value, converSelectRange({
                    selectableRange: this.props.timeSelectableRange
                }));
            return dateValid && (timeSelectValid || timePickerValid);
        }
        else {
            return dateValid;
        }
    };
    DatePicker.prototype.pickerPanel = function (state) {
        var value = state.value && this.isDateValid(state.value) ? state.value : null;
        return (React.createElement(DatePanel, __assign({}, this.props, { value: value, onPick: this.onPicked, onCancelPicked: this.onCancelPicked })));
    };
    DatePicker.DateRangePicker = DateRangePicker;
    return DatePicker;
}(BasePicker));
export default DatePicker;
