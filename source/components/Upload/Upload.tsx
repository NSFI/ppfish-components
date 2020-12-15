import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import RcUpload from './src/index.js';
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
  UploadListType
} from './interface';
import { T, fileToObject, genPercentAdd, getFileItem, removeFileItem } from './utils';

export { UploadProps };

class Upload extends React.Component<UploadProps, UploadState> {
  static Dragger = Dragger;

  static defaultProps = {
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
    tip: ''
  };

  static getDerivedStateFromProps(nextProps: UploadProps, prevState: UploadState) {
    const newState: any = {};
    // action 受控
    if ('action' in nextProps && prevState.action !== nextProps.action) {
      newState.action = nextProps.action;
    }

    if ('fileList' in nextProps) {
      newState.fileList = nextProps.fileList || [];
    }
    return newState;
  }

  recentUploadStatus: boolean | PromiseLike<any>;
  progressTimer: any;

  private upload: any;

  constructor(props: UploadProps) {
    super(props);

    this.state = {
      fileList: props.fileList || props.defaultFileList || [],
      dragState: 'drop',
      action: props.action || ''
    };
  }

  componentWillUnmount() {
    this.clearProgressTimer();
  }

  onStart = (file: RcFile) => {
    let targetItem;
    let nextFileList = this.state.fileList.concat();
    targetItem = fileToObject(file);
    targetItem.status = 'uploading';
    nextFileList.push(targetItem);
    this.onChange({
      file: targetItem,
      fileList: nextFileList
    });
    // fix ie progress
    if (!(window as any).FormData) {
      this.autoUpdateProgress(0, targetItem);
    }
  };

  autoUpdateProgress(_: any, file: UploadFile) {
    const getPercent = genPercentAdd();
    let curPercent = 0;
    this.clearProgressTimer();
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent);
      this.onProgress(
        {
          percent: curPercent * 100
        },
        file
      );
    }, 200);
  }

  onSuccess = (response: any, file: UploadFile) => {
    this.clearProgressTimer();
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = 'done';
    targetItem.response = response;
    this.onChange({
      file: { ...targetItem },
      fileList
    });
  };

  onProgress = (e: { percent: number }, file: UploadFile) => {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    this.onChange({
      event: e,
      file: { ...targetItem },
      fileList: this.state.fileList
    });
  };

  onError = (error: Error, response: any, file: UploadFile) => {
    this.clearProgressTimer();
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    this.onChange({
      file: { ...targetItem },
      fileList
    });
  };

  handleRemove(file: UploadFile) {
    const { onRemove } = this.props;

    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
      // Prevent removing file
      if (ret === false) {
        return;
      }

      const removedFileList = removeFileItem(file, this.state.fileList);
      if (removedFileList) {
        this.onChange({
          file,
          fileList: removedFileList
        });
      }
    });
  }

  handleDeleteAll = () => {
    this.state.fileList.forEach(file => {
      this.upload.abort(file);
      file.status = 'removed'; // eslint-disable-line
    });

    this.setState({ fileList: [] });

    const { onDeleteAll } = this.props;
    if (onDeleteAll) {
      onDeleteAll();
    }
  };

  handleManualRemove = (file: UploadFile) => {
    this.upload.abort(file);
    file.status = 'removed'; // eslint-disable-line
    this.handleRemove(file);
  };

  onChange = (info: UploadChangeParam) => {
    if (!('fileList' in this.props)) {
      this.setState({ fileList: info.fileList });
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange(info);
    }
  };

  onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    this.setState({
      dragState: e.type
    });
  };

  beforeUpload = (file: RcFile, fileList: RcFile[]) => {
    if (!this.props.beforeUpload) {
      return true;
    }
    const result = this.props.beforeUpload(file, fileList);
    if (result === false) {
      this.onChange({
        file,
        fileList: uniqBy(
          this.state.fileList.concat(fileList.map(fileToObject)),
          (item: UploadFile) => item.uid
        )
      });
      return false;
    } else if (result && (result as PromiseLike<any>).then) {
      return result;
    }
    return true;
  };

  clearProgressTimer() {
    clearInterval(this.progressTimer);
  }

  saveUpload = (node: typeof RcUpload) => {
    this.upload = node;
  };

  renderUploadList = (locale: UploadLocale) => {
    const { showUploadList, listType, onPreview, maxFileCount, showDeleteAll } = this.props;
    const { showRemoveIcon, showPreviewIcon } = showUploadList as any;
    return (
      <UploadList
        listType={listType}
        items={this.state.fileList}
        onPreview={onPreview}
        onRemove={this.handleManualRemove}
        onDeleteAll={this.handleDeleteAll}
        showRemoveIcon={showRemoveIcon}
        showPreviewIcon={showPreviewIcon}
        maxFileCount={maxFileCount}
        showDeleteAll={showDeleteAll}
        locale={{ ...locale, ...this.props.locale }}
      />
    );
  };

  render() {
    const {
      prefixCls = '',
      className,
      style,
      showUploadList,
      listType,
      type,
      disabled,
      children,
      tip
    } = this.props;

    const rcUploadProps = {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      ...this.props,
      beforeUpload: this.beforeUpload
    };

    delete rcUploadProps.className;
    delete rcUploadProps.style;
    delete rcUploadProps.action;

    const uploadList = showUploadList
      ? this.renderUploadList({
          uploading: '上传中',
          removeFile: '移除文件',
          uploadError: '上传错误',
          previewFile: '预览文件'
        })
      : null;

    const uploadTips = tip ? <div className={`${prefixCls}-tip`}>{tip}</div> : null;

    if (type === 'drag') {
      const dragCls = classNames(prefixCls, {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: this.state.fileList.some(
          file => file.status === 'uploading'
        ),
        [`${prefixCls}-drag-hover`]: this.state.dragState === 'dragover',
        [`${prefixCls}-disabled`]: disabled
      });
      return (
        <span className={className} style={style}>
          <div
            className={dragCls}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}
          >
            <RcUpload
              {...rcUploadProps}
              action={this.state.action}
              ref={this.saveUpload}
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
      [`${prefixCls}-disabled`]: disabled
    });

    const uploadButton = (
      <div className={uploadButtonCls} style={{ display: children ? '' : 'none' }}>
        <RcUpload {...rcUploadProps} action={this.state.action} ref={this.saveUpload} />
      </div>
    );

    if (listType === 'picture-card') {
      return (
        <span className={className} style={style}>
          {uploadList}
          {uploadButton}
          {uploadTips}
        </span>
      );
    } else {
      return (
        <span className={className} style={style}>
          {uploadButton}
          {uploadTips}
          {uploadList}
        </span>
      );
    }
  }
}

polyfill(Upload);

export default Upload;
