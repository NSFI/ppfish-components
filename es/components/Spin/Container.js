import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
const Container = (props) => {
    const { children, className = '', prefixCls = 'fishd-spin' } = props;
    const otherProps = omit(props, [
        'className',
        'prefixCls',
    ]);
    const classString = classNames(`${prefixCls}-container`, className);
    return (React.createElement("div", Object.assign({}, otherProps, { className: classString }), children));
};
export default Container;
