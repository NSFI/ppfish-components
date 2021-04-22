import * as React from 'react';
import RcNotification from '../notification/RcNotification';
import Icon from '../Icon/index';
var defaultDuration = 3;
var defaultTop;
var messageInstance;
var key = 1;
var prefixCls = 'fishd-message';
var transitionName = 'move-up';
var getContainer;
var maxCount;
function getMessageInstance(callback) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }
    RcNotification.newInstance({
        prefixCls: prefixCls,
        transitionName: transitionName,
        style: { top: defaultTop },
        getContainer: getContainer,
        maxCount: maxCount
    }, function (instance) {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        messageInstance = instance;
        callback(instance);
    });
}
function notice(content, duration, type, onClose) {
    if (duration === void 0) { duration = defaultDuration; }
    var iconType = {
        info: 'hints-notification',
        success: 'hints-success',
        error: 'hints-error',
        warning: 'hints-warning',
        loading: 'load-line'
    }[type];
    if (typeof duration === 'function') {
        onClose = duration;
        duration = defaultDuration;
    }
    var target = key++;
    var closePromise = new Promise(function (resolve) {
        var callback = function () {
            if (typeof onClose === 'function') {
                onClose();
            }
            return resolve(true);
        };
        getMessageInstance(function (instance) {
            instance.notice({
                key: target,
                duration: duration,
                style: {},
                content: (React.createElement("div", { className: prefixCls + "-custom-content " + prefixCls + "-" + type },
                    React.createElement(Icon, { type: iconType, spinning: type === 'loading' }),
                    React.createElement("span", null, content))),
                onClose: callback
            });
        });
    });
    var result = function () {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
    result.then = function (filled, rejected) {
        return closePromise.then(filled, rejected);
    };
    result.promise = closePromise;
    return result;
}
export default {
    info: function (content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
    success: function (content, duration, onClose) {
        return notice(content, duration, 'success', onClose);
    },
    error: function (content, duration, onClose) {
        return notice(content, duration, 'error', onClose);
    },
    // Departed usage, please use warning()
    warn: function (content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    warning: function (content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    loading: function (content, duration, onClose) {
        return notice(content, duration, 'loading', onClose);
    },
    config: function (options) {
        if (options.top !== undefined) {
            defaultTop = options.top;
            messageInstance = null; // delete messageInstance for new defaultTop
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.prefixCls !== undefined) {
            prefixCls = options.prefixCls;
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer;
        }
        if (options.transitionName !== undefined) {
            transitionName = options.transitionName;
            messageInstance = null; // delete messageInstance for new transitionName
        }
        if (options.maxCount !== undefined) {
            maxCount = options.maxCount;
            messageInstance = null;
        }
    },
    destroy: function () {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    }
};
