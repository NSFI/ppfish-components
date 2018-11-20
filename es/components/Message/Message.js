/* global Promise */
import * as React from 'react';
import RcNotification from '../Notification/RcNotification';
import Icon from '../Icon/index';
let defaultDuration = 3;
let defaultTop;
let messageInstance;
let key = 1;
let prefixCls = 'fishd-message';
let transitionName = 'move-up';
let getContainer;
let maxCount;
function getMessageInstance(callback) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }
    RcNotification.newInstance({
        prefixCls,
        transitionName,
        style: { top: defaultTop },
        getContainer,
        maxCount,
    }, (instance) => {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        messageInstance = instance;
        callback(instance);
    });
}
function notice(content, duration = defaultDuration, type, onClose) {
    const iconType = ({
        info: 'hints-notification',
        success: 'hints-success',
        error: 'hints-error',
        warning: 'hints-warning',
        loading: 'load-line',
    })[type];
    if (typeof duration === 'function') {
        onClose = duration;
        duration = defaultDuration;
    }
    const target = key++;
    const closePromise = new Promise((resolve) => {
        const callback = () => {
            if (typeof onClose === 'function') {
                onClose();
            }
            return resolve(true);
        };
        getMessageInstance((instance) => {
            instance.notice({
                key: target,
                duration,
                style: {},
                content: (React.createElement("div", { className: `${prefixCls}-custom-content ${prefixCls}-${type}` },
                    React.createElement(Icon, { type: iconType, spinning: type === 'loading' }),
                    React.createElement("span", null, content))),
                onClose: callback,
            });
        });
    });
    const result = () => {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
    result.then = (filled, rejected) => closePromise.then(filled, rejected);
    result.promise = closePromise;
    return result;
}
export default {
    info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
    success(content, duration, onClose) {
        return notice(content, duration, 'success', onClose);
    },
    error(content, duration, onClose) {
        return notice(content, duration, 'error', onClose);
    },
    // Departed usage, please use warning()
    warn(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    warning(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    loading(content, duration, onClose) {
        return notice(content, duration, 'loading', onClose);
    },
    config(options) {
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
    destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    },
};
