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
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import omit from 'omit.js';
import './style/index.less';
// Render indicator
let defaultIndicator = null;
function renderIndicator(props) {
    const { prefixCls, indicator } = props;
    const dotClassName = `${prefixCls}-dot`;
    if (React.isValidElement(indicator)) {
        return React.cloneElement(indicator, {
            className: classNames(indicator.props.className, dotClassName),
        });
    }
    if (React.isValidElement(defaultIndicator)) {
        return React.cloneElement(defaultIndicator, {
            className: classNames(defaultIndicator.props.className, dotClassName),
        });
    }
    return (React.createElement("span", { className: classNames(dotClassName, `${prefixCls}-dot-spin`) },
        React.createElement("i", null),
        React.createElement("i", null),
        React.createElement("i", null),
        React.createElement("i", null)));
}
class Spin extends React.Component {
    constructor(props) {
        super(props);
        const spinning = props.spinning;
        this.state = {
            spinning,
        };
    }
    static setDefaultIndicator(indicator) {
        defaultIndicator = indicator;
    }
    isNestedPattern() {
        return !!(this.props && this.props.children);
    }
    componentDidMount() {
        const { spinning, delay } = this.props;
        if (spinning && delay && !isNaN(Number(delay))) {
            this.setState({ spinning: false });
            this.delayTimeout = window.setTimeout(() => this.setState({ spinning }), delay);
        }
    }
    componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }
    }
    componentWillReceiveProps(nextProps) {
        const currentSpinning = this.props.spinning;
        const spinning = nextProps.spinning;
        const { delay } = this.props;
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (currentSpinning && !spinning) {
            this.debounceTimeout = window.setTimeout(() => this.setState({ spinning }), 200);
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
        }
        else {
            if (spinning && delay && !isNaN(Number(delay))) {
                if (this.delayTimeout) {
                    clearTimeout(this.delayTimeout);
                }
                this.delayTimeout = window.setTimeout(() => this.setState({ spinning }), delay);
            }
            else {
                this.setState({ spinning });
            }
        }
    }
    render() {
        const _a = this.props, { className, size, prefixCls, tip, wrapperClassName } = _a, restProps = __rest(_a, ["className", "size", "prefixCls", "tip", "wrapperClassName"]);
        const { spinning } = this.state;
        const spinClassName = classNames(prefixCls, {
            [`${prefixCls}-sm`]: size === 'small',
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-spinning`]: spinning,
            [`${prefixCls}-show-text`]: !!tip,
        }, className);
        // fix https://fb.me/react-unknown-prop
        const divProps = omit(restProps, [
            'spinning',
            'delay',
            'indicator',
        ]);
        const spinElement = (React.createElement("div", Object.assign({}, divProps, { className: spinClassName }),
            renderIndicator(this.props),
            tip ? React.createElement("span", { className: `${prefixCls}-text` }, tip) : null));
        if (this.isNestedPattern()) {
            let animateClassName = prefixCls + '-nested-loading';
            if (wrapperClassName) {
                animateClassName += ' ' + wrapperClassName;
            }
            const nestedClassName = classNames({
                [`${prefixCls}-nested`]: true,
                [`${prefixCls}-blur`]: spinning,
            });
            return (React.createElement(Animate, Object.assign({}, divProps, { component: "div", className: animateClassName, style: null, transitionName: "fade" }),
                spinning && React.createElement("div", { key: "loading" }, spinElement),
                React.createElement("div", { className: nestedClassName, key: "nested" }, this.props.children)));
        }
        return spinElement;
    }
}
Spin.defaultProps = {
    prefixCls: 'fishd-spin',
    spinning: true,
    size: 'default',
    wrapperClassName: '',
};
Spin.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    wrapperClassName: PropTypes.string,
    indicator: PropTypes.node,
};
export default Spin;
