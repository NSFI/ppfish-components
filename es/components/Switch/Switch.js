import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import RcSwitch from './src/Switch';
import omit from 'omit.js';
import Wave from '../../utils/wave';
import './style/Switch.less';
export default class Switch extends React.Component {
    constructor() {
        super(...arguments);
        this.saveSwitch = (node) => {
            this.rcSwitch = node;
        };
    }
    focus() {
        this.rcSwitch.focus();
    }
    blur() {
        this.rcSwitch.blur();
    }
    render() {
        const { prefixCls, size, loading, className = '' } = this.props;
        const classes = classNames(className, {
            [`${prefixCls}-small`]: size === 'small',
            [`${prefixCls}-large`]: size === 'large',
            [`${prefixCls}-loading`]: loading,
        });
        return (React.createElement(Wave, { insertExtraNode: true },
            React.createElement(RcSwitch, Object.assign({}, omit(this.props, ['loading']), { className: classes, ref: this.saveSwitch }))));
    }
}
Switch.defaultProps = {
    prefixCls: 'fishd-switch',
};
Switch.propTypes = {
    prefixCls: PropTypes.string,
    // HACK: https://github.com/ant-design/ant-design/issues/5368
    // size=default and size=large are the same
    size: PropTypes.oneOf(['small', 'default', 'large']),
    className: PropTypes.string,
};
