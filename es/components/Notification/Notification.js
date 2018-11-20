import * as React from 'react';
import RcNotification from './RcNotification';
import Icon from '../Icon';
import './styles/Notification.less';
const notificationInstance = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPlacement = 'topRight';
let defaultGetContainer;
function setNotificationConfig(options) {
    const { duration, placement, bottom, top, getContainer } = options;
    if (duration !== undefined) {
        defaultDuration = duration;
    }
    if (placement !== undefined) {
        defaultPlacement = placement;
    }
    if (bottom !== undefined) {
        defaultBottom = bottom;
    }
    if (top !== undefined) {
        defaultTop = top;
    }
    if (getContainer !== undefined) {
        defaultGetContainer = getContainer;
    }
}
function getPlacementStyle(placement) {
    let style;
    switch (placement) {
        case 'topLeft':
            style = {
                left: 0,
                top: defaultTop,
                bottom: 'auto',
            };
            break;
        case 'topRight':
            style = {
                right: 0,
                top: defaultTop,
                bottom: 'auto',
            };
            break;
        case 'bottomLeft':
            style = {
                left: 0,
                top: 'auto',
                bottom: defaultBottom,
            };
            break;
        default:
            style = {
                right: 0,
                top: 'auto',
                bottom: defaultBottom,
            };
            break;
    }
    return style;
}
function getNotificationInstance(prefixCls, placement, callback) {
    const cacheKey = `${prefixCls}-${placement}`;
    if (notificationInstance[cacheKey]) {
        callback(notificationInstance[cacheKey]);
        return;
    }
    RcNotification.newInstance({
        prefixCls,
        className: `${prefixCls}-${placement}`,
        style: getPlacementStyle(placement),
        getContainer: defaultGetContainer,
    }, (notification) => {
        notificationInstance[cacheKey] = notification;
        callback(notification);
    });
}
const typeToIcon = {
    success: 'hints-success-o',
    info: 'hints-notification-o',
    error: 'hints-error-o',
    warning: 'hints-warning-o',
};
function notice(args) {
    const outerPrefixCls = args.prefixCls || 'fishd-notification';
    const prefixCls = `${outerPrefixCls}-notice`;
    const duration = args.duration === undefined ? defaultDuration : args.duration;
    let iconNode = null;
    if (args.icon) {
        iconNode = (React.createElement("span", { className: `${prefixCls}-icon` }, args.icon));
    }
    else if (args.type) {
        const iconType = typeToIcon[args.type];
        iconNode = (React.createElement(Icon, { className: `${prefixCls}-icon ${prefixCls}-icon-${args.type}`, type: iconType }));
    }
    const autoMarginTag = (!args.description && iconNode)
        ? React.createElement("span", { className: `${prefixCls}-message-single-line-auto-margin` })
        : null;
    getNotificationInstance(outerPrefixCls, args.placement || defaultPlacement, (notification) => {
        notification.notice({
            content: (React.createElement("div", { className: iconNode ? `${prefixCls}-with-icon` : '' },
                iconNode,
                React.createElement("div", { className: `${prefixCls}-message` },
                    autoMarginTag,
                    args.message),
                React.createElement("div", { className: `${prefixCls}-description` }, args.description),
                args.btn ? React.createElement("span", { className: `${prefixCls}-btn` }, args.btn) : null)),
            duration,
            closable: true,
            onClose: args.onClose,
            key: args.key,
            style: args.style || {},
            className: args.className,
        });
    });
}
const api = {
    open: notice,
    close(key) {
        Object.keys(notificationInstance)
            .forEach(cacheKey => notificationInstance[cacheKey].removeNotice(key));
    },
    config: setNotificationConfig,
    destroy() {
        Object.keys(notificationInstance).forEach(cacheKey => {
            notificationInstance[cacheKey].destroy();
            delete notificationInstance[cacheKey];
        });
    },
};
['success', 'info', 'warning', 'error'].forEach((type) => {
    api[type] = (args) => api.open(Object.assign({}, args, { type }));
});
api.warn = api.warning;
export default api;
