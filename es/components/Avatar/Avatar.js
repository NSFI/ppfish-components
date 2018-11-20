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
import * as ReactDOM from 'react-dom';
import Icon from '../Icon';
import classNames from 'classnames';
import './style/Avatar.less';
export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.setScale = () => {
            const childrenNode = this.avatarChildren;
            if (childrenNode) {
                const childrenWidth = childrenNode.offsetWidth;
                const avatarNode = ReactDOM.findDOMNode(this);
                const avatarWidth = avatarNode.getBoundingClientRect().width;
                // add 4px gap for each side to get better performance
                if (avatarWidth - 8 < childrenWidth) {
                    this.setState({
                        scale: (avatarWidth - 8) / childrenWidth,
                    });
                }
                else {
                    this.setState({
                        scale: 1,
                    });
                }
            }
        };
        this.handleImgLoadError = () => {
            const { onError } = this.props;
            const errorFlag = onError ? onError() : undefined;
            if (errorFlag !== false) {
                this.setState({ isImgExist: false });
            }
        };
        this.state = {
            scale: 1,
            isImgExist: true,
        };
    }
    componentDidMount() {
        this.setScale();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.children !== this.props.children
            || (prevState.scale !== this.state.scale && this.state.scale === 1)
            || (prevState.isImgExist !== this.state.isImgExist)) {
            this.setScale();
        }
    }
    render() {
        const _a = this.props, { prefixCls, shape, size, src, icon, className, alt } = _a, others = __rest(_a, ["prefixCls", "shape", "size", "src", "icon", "className", "alt"]);
        const { isImgExist, scale } = this.state;
        const sizeCls = classNames({
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-sm`]: size === 'small',
        });
        const classString = classNames(prefixCls, className, sizeCls, {
            [`${prefixCls}-${shape}`]: shape,
            [`${prefixCls}-image`]: src && isImgExist,
            [`${prefixCls}-icon`]: icon,
        });
        const sizeStyle = typeof size === 'number' ? {
            width: size,
            height: size,
            lineHeight: `${size}px`,
            fontSize: icon ? size / 2 : 18,
        } : {};
        let children = this.props.children;
        if (src && isImgExist) {
            children = (React.createElement("img", { src: src, onError: this.handleImgLoadError, alt: alt }));
        }
        else if (icon) {
            children = React.createElement(Icon, { type: icon });
        }
        else {
            const childrenNode = this.avatarChildren;
            if (childrenNode || scale !== 1) {
                const childrenStyle = {
                    msTransform: `scale(${scale})`,
                    WebkitTransform: `scale(${scale})`,
                    transform: `scale(${scale})`,
                    position: 'absolute',
                    display: 'inline-block',
                    left: `calc(50% - ${Math.round(childrenNode.offsetWidth / 2)}px)`,
                };
                const sizeChildrenStyle = typeof size === 'number' ? {
                    lineHeight: `${size}px`,
                } : {};
                children = (React.createElement("span", { className: `${prefixCls}-string`, ref: span => this.avatarChildren = span, style: Object.assign({}, sizeChildrenStyle, childrenStyle) }, children));
            }
            else {
                children = (React.createElement("span", { className: `${prefixCls}-string`, ref: span => this.avatarChildren = span }, children));
            }
        }
        return (React.createElement("span", Object.assign({}, others, { style: Object.assign({}, sizeStyle, others.style), className: classString }), children));
    }
}
Avatar.defaultProps = {
    prefixCls: 'fishd-avatar',
    shape: 'circle',
    size: 'default',
};
