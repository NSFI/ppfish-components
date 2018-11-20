import * as React from 'react';
import classNames from 'classnames';
import PureRenderMixin from '../Checkbox/src/PureRenderMixin';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
import Lazyload from 'react-lazy-load';
export default class Item extends React.Component {
    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }
    render() {
        const { mode, direction, renderedText, renderedEl, item, lazy, checked, prefixCls, onClick, onClose } = this.props;
        const className = classNames({
            [`${prefixCls}-content-item`]: true,
            [`${prefixCls}-content-item-disabled`]: item.disabled,
        });
        const listItem = (React.createElement("li", { className: className, title: renderedText },
            React.createElement("span", { className: `${prefixCls}-content-item-text`, onClick: item.disabled ? undefined : () => onClick(item, direction) },
                mode === 'multiple' ? React.createElement(Checkbox, { checked: checked, disabled: item.disabled }) : null,
                React.createElement("span", null, renderedEl)),
            mode === 'single' && direction === 'right' ?
                React.createElement("span", { className: `${prefixCls}-content-item-close`, onClick: item.disabled ? undefined : () => onClose(item) },
                    React.createElement(Icon, { type: "close-modal-line" }))
                : null));
        let children = null;
        if (lazy) {
            const lazyProps = Object.assign({ height: 32, offset: 500, throttle: 0, debounce: false }, lazy);
            children = React.createElement(Lazyload, Object.assign({}, lazyProps), listItem);
        }
        else {
            children = listItem;
        }
        return children;
    }
}
