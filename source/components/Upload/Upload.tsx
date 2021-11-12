import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import RcUpload from './src/index';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import Dragger from './Dragger';
import UploadList from './UploadList';
import {
  RcFile,
  UploadProps,
  UploadState,
  UploadFile,
  UploadLocale,
  UploadChangeParam,
  UploadType,
  UploadListType,
} from './interface';
import { T, fileToObject, genPercentAdd, getFileItem, removeFileItem } from './utils';

import ConfigConsumer from '../Config/Locale/Consumer';
import { LocaleProperties } from '../Locale';
import { RcUploadRef } from './src/Upload';
import useControlledState from '../../hooks/useControlledState';

export { UploadProps };

export type InternalUploadRef = {
  upload: RcUploadRef;
};

function useFreshFn<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = React.useRef<T>();
  fnRef.current = fn;

  return (...args: Parameters<T>) => fnRef.current(...args);
}

const InternalUpload: React.ForwardRefRenderFunction<InternalUploadRef, UploadProps> = (
  props,
  ref,
) => {
  const {
    action,
    onRemove,
    onDeleteAll,
    showUploadList,
    listType,
    onPreview,
    disabled,
    maxFileCount,
    showDeleteAll,
  } = props;

  const [fileList, setFileList] = useControlledState([], {
    value: props.fileList,
    defaultValue: props.defaultFileList,
  });
  const [dragState, setDragState] = React.useState('drop');

  const uploadRef = React.useRef<RcUploadRef>();
  React.useImperativeHandle(ref, () => ({
    upload: uploadRef.current,
  }));

  React.useEffect(() => {
    return () => {
      clearProgressTimer();
    };
  }, []);

  const onStart = useFreshFn((file: RcFile) => {
    const targetItem = fileToObject(file);
    targetItem.status = 'uploading';

    const nextFileList = fileList.concat();
    nextFileList.push(targetItem);

    onChange({
      file: targetItem,
      fileList: nextFileList,
    });
    // fix ie progress
    if (!(window as any).FormData) {
      autoUpdateProgress(0, targetItem);
    }
  });

  const progressTimerRef = React.useRef<number>();
  const autoUpdateProgress = (_: any, file: UploadFile) => {
    const getPercent = genPercentAdd();
    let curPercent = 0;
    clearProgressTimer();
    progressTimerRef.current = window.setInterval(() => {
      curPercent = getPercent(curPercent);
      onProgress({ percent: curPercent * 100 }, file);
    }, 200);
  };

  const onSuccess = useFreshFn((response: any, file: UploadFile) => {
    clearProgressTimer();
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = 'done';
    targetItem.response = response;
    onChange({
      file: { ...targetItem },
      fileList,
    });
  });

  const onProgress = useFreshFn((e: { percent: number }, file: UploadFile) => {
    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    onChange({
      event: e,
      file: { ...targetItem },
      fileList: fileList,
    });
  });

  const onError = useFreshFn((error: Error, response: any, file: UploadFile) => {
    clearProgressTimer();

    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    onChange({
      file: { ...targetItem },
      fileList,
    });
  });

  const handleRemove = (file: UploadFile) => {
    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
      // Prevent removing file
      if (ret === false) {
        return;
      }

      const removedFileList = removeFileItem(file, fileList);
      if (removedFileList) {
        onChange({
          file,
          fileList: removedFileList,
        });
      }
    });
  };

  const handleDeleteAll = () => {
    fileList.forEach(file => {
      uploadRef.current.abort(file);
      file.status = 'removed'; // eslint-disable-line
    });

    setFileList([]);

    if (onDeleteAll) {
      onDeleteAll();
    }
  };

  const handleManualRemove = (file: UploadFile) => {
    uploadRef.current.abort(file);
    file.status = 'removed'; // eslint-disable-line
    handleRemove(file);
  };

  const onChange = (info: UploadChangeParam) => {
    if (!('fileList' in props)) {
      setFileList([...info.fileList]);
    }

    if (props.onChange) {
      props.onChange(info);
    }
  };

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setDragState(e.type);
  };

  const beforeUpload = (file: RcFile, innerFileList: RcFile[]) => {
    if (!props.beforeUpload) {
      return true;
    }
    const result = props.beforeUpload(file, innerFileList);
    if (result === false) {
      onChange({
        file,
        fileList: uniqBy(
          fileList.concat(innerFileList.map(fileToObject)),
          (item: UploadFile) => item.uid,
        ),
      });
      return false;
    } else if (result && (result as PromiseLike<any>).then) {
      return result;
    }
    return true;
  };

  const clearProgressTimer = () => {
    clearInterval(progressTimerRef.current);
  };

  const renderUploadList = (locale: UploadLocale) => {
    const { showRemoveIcon, showPreviewIcon } = showUploadList as any;
    return (
      <UploadList
        listType={listType}
        items={fileList}
        onPreview={onPreview}
        onRemove={handleManualRemove}
        onDeleteAll={handleDeleteAll}
        showRemoveIcon={!disabled && showRemoveIcon}
        showPreviewIcon={showPreviewIcon}
        maxFileCount={maxFileCount}
        showDeleteAll={showDeleteAll}
        locale={{ ...locale, ...props.locale }}
      />
    );
  };

  const renderUpload = Locale => {
    const {
      prefixCls = '',
      className,
      style,
      showUploadList,
      listType,
      type,
      disabled,
      children,
      tip,
    } = props;

    const rcUploadProps = {
      onStart: onStart,
      onError: onError,
      onProgress: onProgress,
      onSuccess: onSuccess,
      ...props,
      beforeUpload: beforeUpload,
    };

    delete rcUploadProps.className;
    delete rcUploadProps.style;
    delete rcUploadProps.action;

    const uploadList = showUploadList
      ? renderUploadList({
          uploading: Locale.uploading as string,
          removeFile: Locale.removeFile as string,
          uploadError: Locale.uploadError as string,
          previewFile: Locale.previewFile as string,
        })
      : null;

    const uploadTips = tip ? <div className={`${prefixCls}-tip`}>{tip}</div> : null;

    if (type === 'drag') {
      const dragCls = classNames(prefixCls, {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: fileList.some(file => file.status === 'uploading'),
        [`${prefixCls}-drag-hover`]: dragState === 'dragover',
        [`${prefixCls}-disabled`]: disabled,
      });
      return (
        <span className={className} style={style}>
          <div
            className={dragCls}
            onDrop={onFileDrop}
            onDragOver={onFileDrop}
            onDragLeave={onFileDrop}
          >
            <RcUpload
              {...rcUploadProps}
              action={action}
              ref={uploadRef}
              className={`${prefixCls}-btn`}
            >
              <div className={`${prefixCls}-drag-container`}>{children}</div>
            </RcUpload>
          </div>
          {uploadTips}
          {uploadList}
        </span>
      );
    }

    const uploadButtonCls = classNames(prefixCls, {
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${listType}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    });

    const uploadButton = (
      <div className={uploadButtonCls} style={{ display: children ? '' : 'none' }}>
        <RcUpload {...rcUploadProps} action={action} ref={uploadRef} />
      </div>
    );

    let renderNode = null;

    if (listType === 'picture-card') {
      renderNode = (
        <span className={className} style={style}>
          {uploadList}
          {uploadButton}
          {uploadTips}
        </span>
      );
    } else {
      renderNode = (
        <span className={className} style={style}>
          {uploadButton}
          {uploadTips}
          {uploadList}
        </span>
      );
    }

    return renderNode;
  };

  return (
    <ConfigConsumer componentName="Upload">
      {(Locale: LocaleProperties['Upload']) => {
        return renderUpload(Locale);
      }}
    </ConfigConsumer>
  );
};

interface UploadInterface
  extends React.ForwardRefExoticComponent<UploadProps & React.RefAttributes<InternalUploadRef>> {
  Dragger: typeof Dragger;
}

const Upload = React.forwardRef(InternalUpload) as UploadInterface;

Upload.defaultProps = {
  prefixCls: 'fishd-upload',
  type: 'select' as UploadType,
  multiple: false,
  action: '',
  data: {},
  accept: '',
  beforeUpload: T,
  showUploadList: true,
  listType: 'text' as UploadListType, // or pictrue
  className: '',
  disabled: false,
  supportServerRender: true,
  tip: '',
};

Upload.Dragger = Dragger;

export default Upload;
