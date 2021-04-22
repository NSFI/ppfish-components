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
import TimeSelectPanel from './panel/TimeSelectPanel';
import ConfigConsumer from '../Config/Consumer';
var TimeSelect = /** @class */ (function (_super) {
    __extends(TimeSelect, _super);
    function TimeSelect(props) {
        //props, type, state
        return _super.call(this, props, 'timeselect', {}) || this;
    }
    Object.defineProperty(TimeSelect, "propTypes", {
        get: function () {
            return Object.assign({}, {
                start: PropTypes.string,
                end: PropTypes.string,
                step: PropTypes.string,
                minTime: PropTypes.string,
                maxTime: PropTypes.string
            }, BasePicker.propTypes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSelect, "defaultProps", {
        get: function () {
            return Object.assign({}, BasePicker.defaultProps);
        },
        enumerable: true,
        configurable: true
    });
    TimeSelect.prototype.isDateValid = function (value) {
        return (_super.prototype.isDateValid.call(this, value) &&
            // @ts-ignore
            TimeSelectPanel.isValid(this.dateToStr(value), this.props));
    };
    TimeSelect.prototype.pickerPanel = function (state) {
        var _this = this;
        var value = state.value && this.isDateValid(state.value) ? this.dateToStr(state.value) : null;
        return (React.createElement(ConfigConsumer, { componentName: "DatePicker" }, function (Locales) { return (React.createElement(TimeSelectPanel, __assign({}, _this.props, { value: value, onPicked: _this.onPicked, dateParser: function (str) {
                return str ? _this.parseDate(str) : null;
            } }))); }));
    };
    return TimeSelect;
}(BasePicker));
export default TimeSelect;
