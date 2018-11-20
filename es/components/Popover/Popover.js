import * as React from 'react';
import Tooltip from '../Tooltip';
import warning from '../../utils/warning';
import './style/index.less';
export default class Popover extends React.Component {
    constructor() {
        super(...arguments);
        this.saveTooltip = (node) => {
            this.tooltip = node;
        };
    }
    getPopupDomNode() {
        return this.tooltip.getPopupDomNode();
    }
    getOverlay() {
        const { title, prefixCls, content } = this.props;
        warning(!('overlay' in this.props), 'Popover[overlay] is removed, please use Popover[content] instead, ' +
            'see: https://u.ant.design/popover-content');
        return (React.createElement("div", null,
            title && React.createElement("div", { className: `${prefixCls}-title` }, title),
            React.createElement("div", { className: `${prefixCls}-inner-content` }, content)));
    }
    render() {
        const props = Object.assign({}, this.props);
        delete props.title;
        return (React.createElement(Tooltip, Object.assign({}, props, { ref: this.saveTooltip, overlay: this.getOverlay() })));
    }
}
Popover.defaultProps = {
    prefixCls: 'fishd-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {},
};
