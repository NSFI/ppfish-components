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
import RcSlider from './RcSlider';
import RcRange from './RcRange';
import RcHandle from './RcHandle';
import Tooltip from '../Tooltip';
import './style/index.less';
export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.toggleTooltipVisible = (index, visible) => {
            this.setState(({ visibles }) => ({
                visibles: Object.assign({}, visibles, { [index]: visible }),
            }));
        };
        this.handleWithTooltip = (_a) => {
            var { value, dragging, index } = _a, restProps = __rest(_a, ["value", "dragging", "index"]);
            const { tooltipPrefixCls, tipFormatter } = this.props;
            const { visibles } = this.state;
            const visible = tipFormatter ? (visibles[index] || dragging) : false;
            return (React.createElement(Tooltip, { prefixCls: tooltipPrefixCls, title: tipFormatter ? tipFormatter(value) : '', visible: visible, placement: "top", transitionName: "zoom-down", key: index, stretch: "minWidth" },
                React.createElement(RcHandle, Object.assign({}, restProps, { value: value, onMouseEnter: () => this.toggleTooltipVisible(index, true), onMouseLeave: () => this.toggleTooltipVisible(index, false) }))));
        };
        this.saveSlider = (node) => {
            this.rcSlider = node;
        };
        this.state = {
            visibles: {},
        };
    }
    focus() {
        this.rcSlider.focus();
    }
    blur() {
        this.rcSlider.focus();
    }
    render() {
        const _a = this.props, { range } = _a, restProps = __rest(_a, ["range"]);
        if (range) {
            return React.createElement(RcRange, Object.assign({}, restProps, { ref: this.saveSlider, handle: this.handleWithTooltip }));
        }
        return React.createElement(RcSlider, Object.assign({}, restProps, { ref: this.saveSlider, handle: this.handleWithTooltip }));
    }
}
Slider.defaultProps = {
    prefixCls: 'fishd-slider',
    tooltipPrefixCls: 'fishd-tooltip',
    tipFormatter(value) {
        return value.toString();
    },
};
