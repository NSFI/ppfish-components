import * as React from 'react';
import Animate from 'rc-animate';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import Progress from '../Progress';
import classNames from 'classnames';
import { UploadListProps, UploadFile, UploadListType } from './interface';

import ConfigConsumer from '../Config/Locale/Consumer';
import { LocaleProperties } from '../Locale';

const fileListItemHeight = 24;

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
const previewFile = (file: File, callback: Function) => {
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
};

const extname = (url: string) => {
  if (!url) {
    return '';
  }
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

const isImageUrl = (url: string): boolean => {
  const extension = extname(url);
  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)) {
    return true;
  } else if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  } else if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
};

const UploadList: React.FC<UploadListProps> = props => {
  const {
    listType,
    items = [],
    prefixCls,
    showPreviewIcon,
    showRemoveIcon,
    showDeleteAll,

    locale,
    maxFileCount,
    progressAttr,

    onRemove,
    onDeleteAll,
    onPreview,
  } = props;

  const [, forceRender] = React.useReducer(s => s + 1, 0);

  React.useEffect(() => {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }
    items.forEach(file => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !(window as any).FileReader ||
        !(window as any).File ||
        !(file.originFileObj instanceof File) ||
        file.thumbUrl !== undefined
      ) {
        return;
      }

      file.thumbUrl = '';

      previewFile(file.originFileObj, (previewDataUrl: string) => {
        file.thumbUrl = previewDataUrl;

        forceRender();
      });
    });
  });

  const handleClose = (file: UploadFile) => {
    if (onRemove) {
      onRemove(file);
    }
  };

  const handleDeleteAll = () => {
    if (onDeleteAll) {
      onDeleteAll();
    }
  };

  const handlePreview = (file: UploadFile, e: React.SyntheticEvent<HTMLElement>) => {
    if (!onPreview) {
      return;
    }
    e.preventDefault();
    return onPreview(file);
  };

  const renderUploadList = Locale => {
    const list = items.map(file => {
      let progress;
      let icon = (
        <Icon
          type={file.status === 'uploading' ? 'load-line' : 'clip-line'}
          spinning={file.status === 'uploading' ? true : false}
        />
      );

      if (listType === 'picture' || listType === 'picture-card') {
        if (listType === 'picture-card' && file.status === 'uploading') {
          icon = <div className={`${prefixCls}-list-item-uploading-text`}>{locale.uploading}</div>;
        } else if (!file.thumbUrl && !file.url) {
          icon = <Icon type="image-line" className={`${prefixCls}-list-item-thumbnail`} />;
        } else {
          let thumbnail = isImageUrl((file.thumbUrl || file.url) as string) ? (
            <img src={file.thumbUrl || file.url} alt={file.name} />
          ) : (
            <Icon type="file-line" className={`${prefixCls}-list-item-icon`} />
          );
          icon = (
            <a
              className={`${prefixCls}-list-item-thumbnail`}
              onClick={e => handlePreview(file, e)}
              href={file.url || file.thumbUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {thumbnail}
            </a>
          );
        }
      }

      if (file.status === 'uploading') {
        // show loading icon if upload progress listener is disabled
        const loadingProgress =
          'percent' in file ? (
            <Progress
              type="line"
              {...progressAttr}
              percent={file.percent}
              operation={
                <div className={`${prefixCls}-action-cancel`} onClick={() => handleClose(file)}>
                  {Locale.cancelText}
                </div>
              }
            />
          ) : null;

        progress = (
          <div className={`${prefixCls}-list-item-progress`} key="progress">
            {loadingProgress}
          </div>
        );
      }
      const infoUploadingClass = classNames({
        [`${prefixCls}-list-item`]: true,
        [`${prefixCls}-list-item-${file.status}`]: true,
      });
      const preview = file.url ? (
        <a
          {...file.linkProps}
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${prefixCls}-list-item-name`}
          onClick={e => handlePreview(file, e)}
          title={file.name}
        >
          {file.name}
        </a>
      ) : (
        <span
          className={`${prefixCls}-list-item-name`}
          onClick={e => handlePreview(file, e)}
          title={file.name}
        >
          {file.name}
        </span>
      );
      const style: React.CSSProperties = {
        pointerEvents: 'none',
        opacity: 0.5,
      };
      const previewIcon = showPreviewIcon ? (
        <a
          href={file.url || file.thumbUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={file.url || file.thumbUrl ? undefined : style}
          onClick={e => handlePreview(file, e)}
          title={locale.previewFile}
        >
          <Icon type="watch-line" />
        </a>
      ) : null;
      const removeIcon = showRemoveIcon ? (
        <Icon type="delete-line" title={locale.removeFile} onClick={() => handleClose(file)} />
      ) : null;
      const removeIconCross = showRemoveIcon ? (
        <Icon
          type="hints-alone-error"
          title={locale.removeFile}
          onClick={() => handleClose(file)}
        />
      ) : null;
      const actions =
        listType === 'picture-card' && file.status !== 'uploading' ? (
          <span className={`${prefixCls}-list-item-actions`}>
            {previewIcon}
            {removeIcon}
          </span>
        ) : (
          removeIconCross
        );
      let message;
      if (file.response && typeof file.response === 'string') {
        message = file.response;
      } else {
        message = (file.error && file.error.statusText) || locale.uploadError;
      }
      const iconAndPreview =
        file.status === 'error' ? (
          <Tooltip title={message}>
            {icon}
            {preview}
          </Tooltip>
        ) : (
          <span>
            {icon}
            {preview}
          </span>
        );

      return (
        <div className={infoUploadingClass} key={file.uid}>
          <div className={`${prefixCls}-list-item-info`}>{iconAndPreview}</div>
          {actions}
          <Animate transitionName="fade" component="">
            {progress}
          </Animate>
        </div>
      );
    });
    const showScrollbar = listType === 'text' && list.length > maxFileCount;
    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${listType}`]: true,
      [`${prefixCls}-list-scroll`]: showScrollbar,
    });
    const animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
    const deleteAllCls = classNames(`${prefixCls}-list-scroll-delete-all`, {
      [`${prefixCls}-hide`]: !showDeleteAll,
    });

    let renderNode = null;

    if (showScrollbar) {
      renderNode = (
        <div className={null}>
          <div className={`${prefixCls}-list-scroll-info`}>
            <span>{(Locale.uploadedTip as string).replace('${length}', String(list.length))}</span>
            <span className={deleteAllCls} onClick={() => handleDeleteAll()}>
              {Locale.deleteText}
            </span>
          </div>
          <Animate
            transitionName={`${prefixCls}-${animationDirection}`}
            component="div"
            className={listClassNames}
            style={{
              height: fileListItemHeight * maxFileCount + fileListItemHeight / 2,
            }}
          >
            {list}
          </Animate>
        </div>
      );
    } else {
      renderNode = (
        <Animate
          transitionName={`${prefixCls}-${animationDirection}`}
          component="div"
          className={listClassNames}
        >
          {list}
        </Animate>
      );
    }

    return renderNode;
  };

  return (
    <ConfigConsumer componentName="Upload">
      {(Locale: LocaleProperties['Upload']) => {
        return renderUploadList(Locale);
      }}
    </ConfigConsumer>
  );
};

UploadList.defaultProps = {
  listType: 'text' as UploadListType, // or picture
  progressAttr: {
    strokeWidth: 2,
    showInfo: false,
  },
  prefixCls: 'fishd-upload',
  showRemoveIcon: true,
  showPreviewIcon: true,
  maxFileCount: 5,
  showDeleteAll: true,
};

export default UploadList;
