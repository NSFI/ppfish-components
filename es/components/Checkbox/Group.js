import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from './Checkbox';
import { shallowEqual } from '../../utils/other.js';
export default class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props);
        this.toggleOption = (option) => {
            const optionIndex = this.state.value.indexOf(option.value);
            const value = [...this.state.value];
            if (optionIndex === -1) {
                value.push(option.value);
            }
            else {
                value.splice(optionIndex, 1);
            }
            if (!('value' in this.props)) {
                this.setState({ value });
            }
            const onChange = this.props.onChange;
            if (onChange) {
                onChange(value);
            }
        };
        this.state = {
            value: props.value || props.defaultValue || [],
        };
    }
    getChildContext() {
        return {
            checkboxGroup: {
                toggleOption: this.toggleOption,
                value: this.state.value,
                disabled: this.props.disabled,
            },
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value || [],
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState);
    }
    getOptions() {
        const { options } = this.props;
        // https://github.com/Microsoft/TypeScript/issues/7960
        return options.map(option => {
            if (typeof option === 'string') {
                return {
                    label: option,
                    value: option,
                };
            }
            return option;
        });
    }
    render() {
        const { props, state } = this;
        const { prefixCls, className, style, options } = props;
        const groupPrefixCls = `${prefixCls}-group`;
        let children = props.children;
        if (options && options.length > 0) {
            children = this.getOptions().map(option => (React.createElement(Checkbox, { prefixCls: prefixCls, key: option.value.toString(), disabled: 'disabled' in option ? option.disabled : props.disabled, value: option.value, checked: state.value.indexOf(option.value) !== -1, onChange: () => this.toggleOption(option), className: `${groupPrefixCls}-item` }, option.label)));
        }
        const classString = classNames(groupPrefixCls, className);
        return (React.createElement("div", { className: classString, style: style }, children));
    }
}
CheckboxGroup.defaultProps = {
    options: [],
    prefixCls: 'fishd-checkbox',
};
CheckboxGroup.propTypes = {
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
};
CheckboxGroup.childContextTypes = {
    checkboxGroup: PropTypes.any,
};
