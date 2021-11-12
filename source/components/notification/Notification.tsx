import * as React from 'react';
import Notification from './src';
import { NotificationInstance as RCNotificationInstance } from './src/Notification';
import classNames from 'classnames';
import Icon from '../Icon';
import createUseNotification from './hooks/useNotification';

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type IconType = 'success' | 'info' | 'error' | 'warning';

const notificationInstance: {
  [key: string]: Promise<RCNotificationInstance>;
} = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPrefixCls = '';
let defaultPlacement: NotificationPlacement = 'topRight';
let defaultGetContainer: () => HTMLElement;
let defaultCloseIcon: React.ReactNode;
let maxCount: number;

export interface ConfigProps {
  top?: number;
  bottom?: number;
  duration?: number;
  prefixCls?: string;
  placement?: NotificationPlacement;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
  maxCount?: number;
}

function setNotificationConfig(options: ConfigProps) {
  const { duration, placement, bottom, top, getContainer, closeIcon, prefixCls } = options;

  if (prefixCls !== undefined) {
    defaultPrefixCls = prefixCls;
  }

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
  if (closeIcon !== undefined) {
    defaultCloseIcon = closeIcon;
  }

  if (options.maxCount !== undefined) {
    maxCount = options.maxCount;
  }
}

function getPlacementStyle(
  placement: NotificationPlacement,
  top: number = defaultTop,
  bottom: number = defaultBottom,
) {
  let style;
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top,
        bottom: 'auto',
      };
      break;
    case 'topRight':
      style = {
        right: 0,
        top,
        bottom: 'auto',
      };
      break;
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom,
      };
      break;
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom,
      };
      break;
  }
  return style;
}

function getNotificationInstance(
  args: ArgsProps,
  callback: (info: { prefixCls: string; instance: RCNotificationInstance }) => void,
) {
  const {
    placement = defaultPlacement,
    top,
    bottom,
    getContainer = defaultGetContainer,
    closeIcon = defaultCloseIcon,
    prefixCls: customizePrefixCls,
  } = args;
  const prefixCls = customizePrefixCls || defaultPrefixCls || 'fishd-notification';
  const cacheKey = `${prefixCls}-${placement}`;
  const cacheInstance = notificationInstance[cacheKey];
  if (cacheInstance) {
    Promise.resolve(cacheInstance).then(instance => {
      callback({ prefixCls: `${prefixCls}-notice`, instance });
    });

    return;
  }

  const closeIconToRender = (
    <span className={`${prefixCls}-close-x`}>{closeIcon || <Icon type="close-modal-line" />}</span>
  );

  const notificationClass = classNames(`${prefixCls}-${placement}`);

  notificationInstance[cacheKey] = new Promise(resolve => {
    Notification.newInstance(
      {
        prefixCls,
        className: notificationClass,
        style: getPlacementStyle(placement, top, bottom),
        getContainer,
        closeIcon: closeIconToRender,
        maxCount,
      },
      notification => {
        resolve(notification);
        callback({
          prefixCls: `${prefixCls}-notice`,
          instance: notification,
        });
      },
    );
  });
}

const typeToIcon = {
  success: 'hints-success-o',
  info: 'hints-notification-o',
  error: 'hints-error-o',
  warning: 'hints-warning-o',
};
export interface ArgsProps {
  message?: React.ReactNode;
  description?: React.ReactNode;
  btn?: React.ReactNode;
  key?: string;
  onClose?: () => void;
  duration?: number | null;
  icon?: React.ReactNode;
  placement?: NotificationPlacement;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  readonly type?: IconType;
  onClick?: () => void;
  top?: number;
  bottom?: number;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
}

function getRCNoticeProps(args: ArgsProps, prefixCls: string) {
  const {
    duration: durationArg,
    icon,
    type,
    description,
    message,
    btn,
    onClose,
    onClick,
    key,
    style,
    className,
  } = args;

  const duration = durationArg === undefined ? defaultDuration : durationArg;

  let iconNode: React.ReactNode = null;
  if (icon) {
    iconNode = <span className={`${prefixCls}-icon`}>{args.icon}</span>;
  } else if (type) {
    const iconType = typeToIcon[args.type];
    iconNode = (
      <Icon className={`${prefixCls}-icon ${prefixCls}-icon-${args.type}`} type={iconType} />
    );
  }

  const autoMarginTag =
    !description && iconNode ? (
      <span className={`${prefixCls}-message-single-line-auto-margin`} />
    ) : null;

  return {
    content: (
      <div className={iconNode ? `${prefixCls}-with-icon` : ''} role="alert">
        {iconNode}
        <div className={`${prefixCls}-message`}>
          {autoMarginTag}
          {message}
        </div>
        <div className={`${prefixCls}-description`}>{description}</div>
        {btn ? <span className={`${prefixCls}-btn`}>{btn}</span> : null}
      </div>
    ),
    duration,
    closable: true,
    onClose,
    onClick,
    key,
    style: style || {},
    className: classNames(className, {
      [`${prefixCls}-${type}`]: !!type,
    }),
  };
}

function notice(args: ArgsProps) {
  getNotificationInstance(args, ({ prefixCls, instance }) => {
    instance.notice(getRCNoticeProps(args, prefixCls));
  });
}

const api: any = {
  open: notice,
  close(key: string) {
    Object.keys(notificationInstance).forEach(cacheKey =>
      Promise.resolve(notificationInstance[cacheKey]).then(instance => {
        instance.removeNotice(key);
      }),
    );
  },
  config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach(cacheKey => {
      Promise.resolve(notificationInstance[cacheKey]).then(instance => {
        instance.destroy();
      });
      delete notificationInstance[cacheKey]; // lgtm[js/missing-await]
    });
  },
};

['success', 'info', 'warning', 'error'].forEach(type => {
  api[type] = (args: ArgsProps) =>
    api.open({
      ...args,
      type,
    });
});

api.warn = api.warning;
api.useNotification = createUseNotification(getNotificationInstance, getRCNoticeProps);

export interface NotificationInstance {
  success(args: ArgsProps): void;
  error(args: ArgsProps): void;
  info(args: ArgsProps): void;
  warning(args: ArgsProps): void;
  open(args: ArgsProps): void;
}

export interface NotificationApi extends NotificationInstance {
  warn(args: ArgsProps): void;
  close(key: string): void;
  config(options: ConfigProps): void;
  destroy(): void;

  // Hooks
  useNotification: () => [NotificationInstance, React.ReactElement];
}

/** @private test Only function. Not work on production */
export const getInstance = async (cacheKey: string) =>
  process.env.NODE_ENV === 'test' ? notificationInstance[cacheKey] : null;

export default api as NotificationApi;
