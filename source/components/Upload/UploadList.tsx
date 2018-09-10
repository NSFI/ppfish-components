import * as React from 'react';
import Animate from 'rc-animate';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import Progress from '../Progress';
import classNames from 'classnames';
import { UploadListProps, UploadFile, UploadListType } from './interface';

const fileListItemHeight = 30;

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
  } else if (/^data:/.test(url)) { // other file types of base64
    return false;
  } else if (extension) { // other file types which have extension
    return false;
  }
  return true;
};

export default class UploadList extends React.Component<UploadListProps, any> {
  static defaultProps = {
    listType: 'text' as UploadListType,  // or picture
    progressAttr: {
      strokeWidth: 2,
      showInfo: false,
    },
    prefixCls: 'fishd-upload',
    showRemoveIcon: true,
    showPreviewIcon: true,
    maxFileCount: 5,
    showDeleteAll: true
  };

  handleClose = (file: UploadFile) => {
    const { onRemove } = this.props;
    if (onRemove) {
      onRemove(file);
    }
  }

  handleDeleteAll = () => {
    const { onDeleteAll } = this.props;
    if (onDeleteAll) {
      onDeleteAll();
    }
  }

  handlePreview = (file: UploadFile, e: React.SyntheticEvent<HTMLElement>) => {
    const { onPreview } = this.props;
    if (!onPreview) {
      return;
    }
    e.preventDefault();
    return onPreview(file);
  }

  componentDidUpdate() {
    if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
      return;
    }
    (this.props.items || []).forEach(file => {
      if (typeof document === 'undefined' ||
          typeof window === 'undefined' ||
          !(window as any).FileReader || !(window as any).File ||
          !(file.originFileObj instanceof File) ||
          file.thumbUrl !== undefined) {
        return;
      }
      /*eslint-disable */
      file.thumbUrl = '';
      /*eslint-enable */
      previewFile(file.originFileObj, (previewDataUrl: string) => {
        /*eslint-disable */
        file.thumbUrl = previewDataUrl;
        /*eslint-enable */
        this.forceUpdate();
      });
    });
  }

  render() {
    const { prefixCls, items = [], listType, showPreviewIcon, showRemoveIcon, locale,
            showDeleteAll, maxFileCount } = this.props;
    const list = items.map(file => {
      let progress;
      let icon = <Icon type={file.status === 'uploading' ? 'load-line' : 'clip-line'} spin={file.status === 'uploading' ? true : false} />;

      if (listType === 'picture' || listType === 'picture-card') {
        if (listType === 'picture-card' && file.status === 'uploading') {
          icon = <div className={`${prefixCls}-list-item-uploading-text`}>{locale.uploading}</div>;
        } else if (!file.thumbUrl && !file.url) {
          icon = <Icon type="picture" className={`${prefixCls}-list-item-thumbnail`} />;
        } else {
          let thumbnail = isImageUrl((file.thumbUrl || file.url) as string)
            ? <img src={file.thumbUrl || file.url} alt={file.name} />
            : <Icon type="file" className={`${prefixCls}-list-item-icon`} />;
          icon = (
            <a
              className={`${prefixCls}-list-item-thumbnail`}
              onClick={e => this.handlePreview(file, e)}
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
        const loadingProgress = ('percent' in file) ? (
          <Progress type="line" {...this.props.progressAttr} percent={file.percent} />
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
          onClick={e => this.handlePreview(file, e)}
          title={file.name}
        >
          {file.name}
        </a>
      ) : (
        <span
          className={`${prefixCls}-list-item-name`}
          onClick={e => this.handlePreview(file, e)}
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
          style={(file.url || file.thumbUrl) ? undefined : style}
          onClick={e => this.handlePreview(file, e)}
          title={locale.previewFile}
        >
          <Icon type="watch-line" />
        </a>
      ) : null;
      const removeIcon = showRemoveIcon ? (
        <Icon type="delete-line" title={locale.removeFile} onClick={() => this.handleClose(file)} />
      ) : null;
      const removeIconCross = showRemoveIcon ? (
        <Icon type="hints-alone-error" title={locale.removeFile} onClick={() => this.handleClose(file)} />
      ) : null;
      const actions = (listType === 'picture-card' && file.status !== 'uploading')
        ? <span className={`${prefixCls}-list-item-actions`}>{previewIcon}{removeIcon}</span>
        : removeIconCross;
      let message;
      if (file.response && typeof file.response === 'string') {
        message = file.response;
      } else {
        message = (file.error && file.error.statusText) || locale.uploadError;
      }
      const iconAndPreview = (file.status === 'error')
        ? <Tooltip title={message}>{icon}{preview}</Tooltip>
        : <span>{icon}{preview}</span>;

      return (
        <div className={infoUploadingClass} key={file.uid}>
          <div className={`${prefixCls}-list-item-info`}>
            {iconAndPreview}
          </div>
          {actions}
          <Animate transitionName="fade" component="">
            {progress}
          </Animate>
        </div>
      );
    });
    const showScrollbar = listType==='text' && list.length>=maxFileCount;
    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${listType}`]: true,
      [`${prefixCls}-list-scroll`]: showScrollbar,
    });
    const animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
    const deleteAllCls = classNames(`${prefixCls}-list-scroll-delete-all`, {
      [`${prefixCls}-hide`]: !showDeleteAll
    });

    if (showScrollbar) {
      return (
        <div className={null}>
          <div className={`${prefixCls}-list-scroll-info`}>
            <span>已上传 {list.length} 项</span>
            <span className={deleteAllCls} onClick={() => this.handleDeleteAll()}>全部删除</span>
          </div>
          <Animate
            transitionName={`${prefixCls}-${animationDirection}`}
            component="div"
            className={listClassNames}
            style={{height: fileListItemHeight * maxFileCount}}
          >
            {list}
          </Animate>
        </div>
      );
    } else {
      return (
        <Animate
          transitionName={`${prefixCls}-${animationDirection}`}
          component="div"
          className={listClassNames}
        >
          {list}
        </Animate>
      );
    }
  }
}
