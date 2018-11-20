import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
const TextLoading = (props) => {
    const { text = '加载中', className = '', prefixCls = 'fishd-spin' } = props;
    const otherProps = omit(props, [
        'className',
        'prefixCls',
    ]);
    const classString = classNames(`${prefixCls}-text-loading`, className);
    return (React.createElement("div", Object.assign({}, otherProps, { className: classString }),
        text,
        React.createElement("span", { className: `${prefixCls}-text-loading-dot` },
            React.createElement("i", null, "."))));
};
export default TextLoading;
