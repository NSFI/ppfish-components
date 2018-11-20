import * as React from 'react';
import classNames from 'classnames';
class Title extends React.Component {
    render() {
        const { prefixCls, className, width, style } = this.props;
        return (React.createElement("h3", { className: classNames(prefixCls, className), style: Object.assign({ width }, style) }));
    }
}
Title.defaultProps = {
    prefixCls: 'fishd-skeleton-title',
};
export default Title;
