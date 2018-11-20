import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
export default class AnchorLink extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = (e) => {
            const { scrollTo, onClick } = this.context.fishdAnchor;
            const { href, title } = this.props;
            if (onClick) {
                onClick(e, { title, href });
            }
            scrollTo(href);
        };
    }
    componentDidMount() {
        this.context.fishdAnchor.registerLink(this.props.href);
    }
    componentWillReceiveProps(nextProps) {
        const { href } = nextProps;
        if (this.props.href !== href) {
            this.context.fishdAnchor.unregisterLink(this.props.href);
            this.context.fishdAnchor.registerLink(href);
        }
    }
    componentWillUnmount() {
        this.context.fishdAnchor.unregisterLink(this.props.href);
    }
    render() {
        const { prefixCls, href, title, children, } = this.props;
        const active = this.context.fishdAnchor.activeLink === href;
        const wrapperClassName = classNames(`${prefixCls}-link`, {
            [`${prefixCls}-link-active`]: active,
        });
        const titleClassName = classNames(`${prefixCls}-link-title`, {
            [`${prefixCls}-link-title-active`]: active,
        });
        return (React.createElement("div", { className: wrapperClassName },
            React.createElement("a", { className: titleClassName, href: href, title: typeof title === 'string' ? title : '', onClick: this.handleClick }, title),
            children));
    }
}
AnchorLink.defaultProps = {
    prefixCls: 'fishd-anchor',
    href: '#',
};
AnchorLink.contextTypes = {
    fishdAnchor: PropTypes.object,
};
