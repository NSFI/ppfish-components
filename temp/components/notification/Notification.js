var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import RcNotification from './RcNotification';
import Icon from '../Icon';
var notificationInstance = {};
var defaultDuration = 4.5;
var defaultTop = 24;
var defaultBottom = 24;
var defaultPlacement = 'topRight';
var defaultGetContainer;
function setNotificationConfig(options) {
    var duration = options.duration, placement = options.placement, bottom = options.bottom, top = options.top, getContainer = options.getContainer;
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
    var style;
    switch (placement) {
        case 'topLeft':
            style = {
                left: 0,
                top: defaultTop,
                bottom: 'auto'
            };
            break;
        case 'topRight':
            style = {
                right: 0,
                top: defaultTop,
                bottom: 'auto'
            };
            break;
        case 'bottomLeft':
            style = {
                left: 0,
                top: 'auto',
                bottom: defaultBottom
            };
            break;
        default:
            style = {
                right: 0,
                top: 'auto',
                bottom: defaultBottom
            };
            break;
    }
    return style;
}
function getNotificationInstance(prefixCls, placement, callback) {
    var cacheKey = prefixCls + "-" + placement;
    if (notificationInstance[cacheKey]) {
        callback(notificationInstance[cacheKey]);
        return;
    }
    RcNotification.newInstance({
        prefixCls: prefixCls,
        className: prefixCls + "-" + placement,
        style: getPlacementStyle(placement),
        getContainer: defaultGetContainer
    }, function (notification) {
        notificationInstance[cacheKey] = notification;
        callback(notification);
    });
}
var typeToIcon = {
    success: 'hints-success-o',
    info: 'hints-notification-o',
    error: 'hints-error-o',
    warning: 'hints-warning-o'
};
function notice(args) {
    var outerPrefixCls = args.prefixCls || 'fishd-notification';
    var prefixCls = outerPrefixCls + "-notice";
    var duration = args.duration === undefined ? defaultDuration : args.duration;
    var iconNode = null;
    if (args.icon) {
        iconNode = React.createElement("span", { className: prefixCls + "-icon" }, args.icon);
    }
    else if (args.type) {
        var iconType = typeToIcon[args.type];
        iconNode = (React.createElement(Icon, { className: prefixCls + "-icon " + prefixCls + "-icon-" + args.type, type: iconType }));
    }
    var autoMarginTag = !args.description && iconNode ? (React.createElement("span", { className: prefixCls + "-message-single-line-auto-margin" })) : null;
    getNotificationInstance(outerPrefixCls, args.placement || defaultPlacement, function (notification) {
        notification.notice({
            content: (React.createElement("div", { className: iconNode ? prefixCls + "-with-icon" : '' },
                iconNode,
                React.createElement("div", { className: prefixCls + "-message" },
                    autoMarginTag,
                    args.message),
                React.createElement("div", { className: prefixCls + "-description" }, args.description),
                args.btn ? React.createElement("span", { className: prefixCls + "-btn" }, args.btn) : null)),
            duration: duration,
            closable: true,
            onClose: args.onClose,
            key: args.key,
            style: args.style || {},
            className: args.className
        });
    });
}
var api = {
    open: notice,
    close: function (key) {
        Object.keys(notificationInstance).forEach(function (cacheKey) {
            return notificationInstance[cacheKey].removeNotice(key);
        });
    },
    config: setNotificationConfig,
    destroy: function () {
        Object.keys(notificationInstance).forEach(function (cacheKey) {
            notificationInstance[cacheKey].destroy();
            delete notificationInstance[cacheKey];
        });
    }
};
['success', 'info', 'warning', 'error'].forEach(function (type) {
    api[type] = function (args) {
        return api.open(__assign(__assign({}, args), { type: type }));
    };
});
api.warn = api.warning;
export default api;
