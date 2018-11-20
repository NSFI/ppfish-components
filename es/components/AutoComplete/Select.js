var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import PropTypes from 'prop-types';
import RcSelect, { Option, OptGroup } from './src/index.js';
import classNames from 'classnames';
import warning from 'warning';
const SelectPropTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    notFoundContent: PropTypes.any,
    showSearch: PropTypes.bool,
    optionLabelProp: PropTypes.string,
    transitionName: PropTypes.string,
    choiceTransitionName: PropTypes.string,
    id: PropTypes.string,
};
// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };
export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.saveSelect = (node) => {
            this.rcSelect = node;
        };
        this.renderSelect = (locale) => {
            const _a = this.props, { prefixCls, className = '', size, mode } = _a, restProps = __rest(_a, ["prefixCls", "className", "size", "mode"]);
            const cls = classNames({
                [`${prefixCls}-lg`]: size === 'large',
                [`${prefixCls}-sm`]: size === 'small',
            }, className);
            let { optionLabelProp } = this.props;
            if (this.isCombobox()) {
                // children 带 dom 结构时，无法填入输入框
                optionLabelProp = optionLabelProp || 'value';
            }
            const modeConfig = {
                multiple: mode === 'multiple',
                tags: mode === 'tags',
                combobox: this.isCombobox(),
            };
            return (React.createElement(RcSelect, Object.assign({}, restProps, modeConfig, { prefixCls: prefixCls, className: cls, optionLabelProp: optionLabelProp || 'children', notFoundContent: this.getNotFoundContent(locale), ref: this.saveSelect })));
        };
        warning(props.mode !== 'combobox', 'The combobox mode of Select is deprecated,' +
            'it will be removed in next major version,' +
            'please use AutoComplete instead');
    }
    focus() {
        this.rcSelect.focus();
    }
    blur() {
        this.rcSelect.blur();
    }
    getNotFoundContent(locale) {
        const { notFoundContent } = this.props;
        if (this.isCombobox()) {
            // AutoComplete don't have notFoundContent defaultly
            return notFoundContent === undefined ? null : notFoundContent;
        }
        return notFoundContent === undefined ? locale.notFoundContent : notFoundContent;
    }
    isCombobox() {
        const { mode } = this.props;
        return mode === 'combobox' || mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;
    }
    render() {
        return (this.renderSelect({
            notFoundContent: 'Not Found',
        }));
    }
}
Select.Option = Option;
Select.OptGroup = OptGroup;
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
Select.defaultProps = {
    prefixCls: 'fishd-autocomplete-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
};
Select.propTypes = SelectPropTypes;
