import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createDOMForm from './RcForm/createDOMForm';
import createFormField from './RcForm/createFormField';
import omit from 'omit.js';
import FormItem from './FormItem';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
import './style/index.less';
export default class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    getChildContext() {
        const { layout } = this.props;
        return {
            vertical: layout === 'vertical',
        };
    }
    render() {
        const { prefixCls, hideRequiredMark, className = '', layout, } = this.props;
        const formClassName = classNames(prefixCls, {
            [`${prefixCls}-horizontal`]: layout === 'horizontal',
            [`${prefixCls}-vertical`]: layout === 'vertical',
            [`${prefixCls}-inline`]: layout === 'inline',
            [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
        }, className);
        const formProps = omit(this.props, [
            'prefixCls',
            'className',
            'layout',
            'form',
            'hideRequiredMark',
        ]);
        return React.createElement("form", Object.assign({}, formProps, { className: formClassName }));
    }
}
Form.defaultProps = {
    prefixCls: 'fishd-form',
    layout: 'horizontal',
    hideRequiredMark: false,
    onSubmit(e) {
        e.preventDefault();
    },
};
Form.propTypes = {
    prefixCls: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
    children: PropTypes.any,
    onSubmit: PropTypes.func,
    hideRequiredMark: PropTypes.bool,
};
Form.childContextTypes = {
    vertical: PropTypes.bool,
};
Form.Item = FormItem;
Form.createFormField = createFormField;
Form.create = function (options = {}) {
    return createDOMForm(Object.assign({ fieldNameProp: 'id' }, options, { fieldMetaProp: FIELD_META_PROP, fieldDataProp: FIELD_DATA_PROP }));
};
