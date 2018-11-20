import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import './style/Icon.less';
const Icon = (props) => {
    const { type, className = '', spinning } = props;
    const classString = classNames({
        fishdicon: true,
        'fishdicon-spin': spinning || type === 'loading',
        [`fishdicon-${type}`]: true,
    }, className);
    return React.createElement("i", Object.assign({}, omit(props, ['type', 'spinning']), { className: classString }));
};
export default Icon;
