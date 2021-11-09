import * as React from 'react';
import useRCNotification from '../../notification/src/useNotification';
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent as RCNoticeContent,
  HolderReadyCallback as RCHolderReadyCallback,
} from '../../notification/src/Notification';
import {
  MessageInstance,
  ArgsProps,
  attachTypeApi,
  ThenableArgument,
  getKeyThenIncreaseKey,
} from '../Message';

export default function createUseMessage(
  getRcNotificationInstance: (
    args: ArgsProps,
    callback: (info: { prefixCls: string; instance: RCNotificationInstance }) => void,
  ) => void,
  getRCNoticeProps: (args: ArgsProps, prefixCls: string) => RCNoticeContent,
) {
  const useMessage = (): [MessageInstance, React.ReactElement] => {
    // We create a proxy to handle delay created instance
    let innerInstance: RCNotificationInstance | null = null;
    const proxy = {
      add: (noticeProps: RCNoticeContent, holderCallback?: RCHolderReadyCallback) => {
        innerInstance?.component.add(noticeProps, holderCallback);
      },
    } as any;

    const [hookNotify, holder] = useRCNotification(proxy);

    function notify(args: ArgsProps) {
      const { prefixCls: customizePrefixCls } = args;
      const mergedPrefixCls = customizePrefixCls || 'fishd-message';
      const target = args.key || getKeyThenIncreaseKey();
      const closePromise = new Promise(resolve => {
        const callback = () => {
          if (typeof args.onClose === 'function') {
            args.onClose();
          }
          return resolve(true);
        };
        getRcNotificationInstance(
          {
            ...args,
            prefixCls: mergedPrefixCls,
          },
          ({ prefixCls, instance }) => {
            innerInstance = instance;
            hookNotify(getRCNoticeProps({ ...args, key: target, onClose: callback }, prefixCls));
          },
        );
      });
      const result: any = () => {
        if (innerInstance) {
          innerInstance.removeNotice(target);
        }
      };
      result.then = (filled: ThenableArgument, rejected: ThenableArgument) =>
        closePromise.then(filled, rejected);
      result.promise = closePromise;
      return result;
    }

    // Fill functions
    const hookApiRef = React.useRef<any>({});

    hookApiRef.current.open = notify;

    ['success', 'info', 'warning', 'error', 'loading'].forEach(type =>
      attachTypeApi(hookApiRef.current, type),
    );

    return [hookApiRef.current, holder];
  };

  return useMessage;
}
