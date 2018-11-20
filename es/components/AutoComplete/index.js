import * as React from 'react';
import { Option, OptGroup } from './src/index.js';
import Select from './Select';
import classNames from 'classnames';
import Input from '../Input';
import InputElement from './InputElement';
import './style/index.less';
function isSelectOptionOrSelectOptGroup(child) {
    return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}
export default class AutoComplete extends React.Component {
    constructor() {
        super(...arguments);
        this.getInputElement = () => {
            const { children } = this.props;
            const element = children && React.isValidElement(children) && children.type !== Option ?
                React.Children.only(this.props.children) : React.createElement(Input, null);
            const elementProps = Object.assign({}, element.props);
            // https://github.com/ant-design/ant-design/pull/7742
            delete elementProps.children;
            return (React.createElement(InputElement, Object.assign({}, elementProps), element));
        };
        this.saveSelect = (node) => {
            this.select = node;
        };
    }
    focus() {
        this.select.focus();
    }
    blur() {
        this.select.blur();
    }
    render() {
        let { size, className = '', notFoundContent, prefixCls, optionLabelProp, dataSource, children, } = this.props;
        const cls = classNames({
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-sm`]: size === 'small',
            [className]: !!className,
            [`${prefixCls}-show-search`]: true,
            [`${prefixCls}-auto-complete`]: true,
        });
        let options;
        const childArray = React.Children.toArray(children);
        if (childArray.length &&
            isSelectOptionOrSelectOptGroup(childArray[0])) {
            options = children;
        }
        else {
            options = dataSource ? dataSource.map((item) => {
                if (React.isValidElement(item)) {
                    return item;
                }
                switch (typeof item) {
                    case 'string':
                        return React.createElement(Option, { key: item }, item);
                    case 'object':
                        return (React.createElement(Option, { key: item.value }, item.text));
                    default:
                        throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
                }
            }) : [];
        }
        return (React.createElement(Select, Object.assign({}, this.props, { className: cls, mode: Select.SECRET_COMBOBOX_MODE_DO_NOT_USE, optionLabelProp: optionLabelProp, getInputElement: this.getInputElement, notFoundContent: notFoundContent, ref: this.saveSelect }), options));
    }
}
AutoComplete.Option = Option;
AutoComplete.OptGroup = OptGroup;
AutoComplete.defaultProps = {
    prefixCls: 'fishd-autocomplete-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
    filterOption: false,
};
