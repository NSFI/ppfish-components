/* eslint react/no-is-mounted:0 react/sort-comp:0 */

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import defaultRequest from './request';
import getUid from './uid';
import attrAccept from './attr-accept';
import traverseFileTree from './traverseFileTree';
import {
  AjaxUploaderInterface,
  AjaxUploaderRef,
  RcFile,
  UploadProgressEvent,
  UploadRequestError,
} from '../interface';

// export type BeforeUploadFileType = File | Blob | boolean | string;

const InternalAjaxUploader: React.ForwardRefRenderFunction<AjaxUploaderRef, AjaxUploaderInterface> =
  (props, ref) => {
    const {
      component: Tag,
      prefixCls,
      className,
      disabled,
      style,
      multiple,
      accept,
      children,
      directory,
    } = props;
    const [uid, setUid] = React.useState(getUid());

    const reqsRef = React.useRef({});
    const inputRef = React.useRef<HTMLInputElement>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = [...e.target.files];
      uploadFiles(files);
      reset();
    };

    const onClick = () => {
      const el = inputRef.current;
      if (!el) {
        return;
      }
      el.click();
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onClick();
      }
    };

    const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (e.type === 'dragover') {
        return;
      }

      if (props.directory) {
        traverseFileTree(e.dataTransfer.items, uploadFiles, (_file: RcFile) =>
          attrAccept(_file, props.accept),
        );
      } else {
        const files = [...e.dataTransfer.files].filter((file: RcFile) =>
          attrAccept(file, props.accept),
        );
        uploadFiles(files);
      }
    };

    const isMountedRef = React.useRef<boolean>(false);
    const abort = (file?: any) => {
      if (file) {
        const uid = file.uid ? file.uid : file;
        if (reqsRef.current[uid]) {
          reqsRef.current[uid].abort();
          delete reqsRef.current[uid];
        }
      } else {
        Object.keys(reqsRef.current).forEach(uid => {
          if (reqsRef.current[uid]) {
            reqsRef.current[uid].abort();
          }

          delete reqsRef.current[uid];
        });
      }
    };
    React.useEffect(() => {
      isMountedRef.current = true;

      return () => {
        isMountedRef.current = false;
        abort();
      };
    }, []);

    const uploadFiles = (files: File[]) => {
      const postFiles = [...files] as RcFile[];
      postFiles.forEach(file => {
        file.uid = getUid();
        upload(file, postFiles);
      });
    };

    const upload = (file: RcFile, fileList: RcFile[]) => {
      if (!props.beforeUpload) {
        // always async in case use react state to keep fileList
        return setTimeout(() => post(file), 0);
      }

      const before = props.beforeUpload(file, fileList);
      if (before instanceof Promise) {
        before
          .then(processedFile => {
            const processedFileType = Object.prototype.toString.call(processedFile);
            if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
              return post(processedFile);
            }
            return post(file);
          })
          .catch(e => {
            console && console.log(e); // eslint-disable-line
          });
      } else if (before !== false) {
        setTimeout(() => post(file), 0);
      }
    };

    const post = (file: RcFile) => {
      if (!isMountedRef.current) {
        return;
      }

      const { data } = props;
      const { onStart, onProgress } = props;

      const mergedData = typeof data === 'function' ? data(file) : data;

      new Promise(resolve => {
        const { action } = props;
        if (typeof action === 'function') {
          return resolve(action(file));
        }
        resolve(action);
      }).then((action: string) => {
        const { uid } = file;
        const request = props.customRequest || defaultRequest;
        reqsRef.current[uid] = request({
          action,
          filename: props.name,
          file,
          data: mergedData,
          headers: props.headers,
          withCredentials: props.withCredentials,
          onProgress: onProgress
            ? (e: UploadProgressEvent) => {
                onProgress(e, file);
              }
            : null,
          onSuccess: (ret: any, xhr: XMLHttpRequest) => {
            delete reqsRef.current[uid];
            props.onSuccess(ret, file, xhr);
          },
          onError: (err: UploadRequestError, ret: any) => {
            delete reqsRef.current[uid];
            props.onError(err, ret, file);
          },
        });
        onStart(file);
      });
    };

    const reset = () => {
      setUid(getUid());
    };

    React.useImperativeHandle(ref, () => ({
      fileInput: inputRef.current,
      abort,
    }));

    // Render
    const cls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: disabled,
      [className]: className,
    });

    const events = disabled
      ? {}
      : {
          onClick: onClick,
          onKeyDown: onKeyDown,
          onDrop: onFileDrop,
          onDragOver: onFileDrop,
          tabIndex: '0',
        };

    const accpetProps = typeof accept === 'string' ? accept : accept.join('');

    const dirProps: any = directory
      ? { directory: 'directory', webkitdirectory: 'webkitdirectory' }
      : {};

    return (
      <Tag {...events} className={cls} role="button" style={style}>
        <input
          type="file"
          ref={inputRef}
          key={uid}
          style={{ display: 'none' }}
          accept={accpetProps}
          {...dirProps}
          multiple={multiple}
          onChange={onChange}
        />
        {children}
      </Tag>
    );
  };

const AjaxUploader = React.forwardRef(InternalAjaxUploader);

export default AjaxUploader;
