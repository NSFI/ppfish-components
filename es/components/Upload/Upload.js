import * as React from 'react';
import RcUpload from './src/index.js';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import UploadList from './UploadList';
import { T, fileToObject, genPercentAdd, getFileItem, removeFileItem } from './utils';
export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.onStart = (file) => {
            let targetItem;
            let nextFileList = this.state.fileList.concat();
            targetItem = fileToObject(file);
            targetItem.status = 'uploading';
            nextFileList.push(targetItem);
            this.onChange({
                file: targetItem,
                fileList: nextFileList,
            });
            // fix ie progress
            if (!window.FormData) {
                this.autoUpdateProgress(0, targetItem);
            }
        };
        this.onSuccess = (response, file) => {
            this.clearProgressTimer();
            try {
                if (typeof response === 'string') {
                    response = JSON.parse(response);
                }
            }
            catch (e) { /* do nothing */
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
                file: Object.assign({}, targetItem),
                fileList,
            });
        };
        this.onProgress = (e, file) => {
            let fileList = this.state.fileList;
            let targetItem = getFileItem(file, fileList);
            // removed
            if (!targetItem) {
                return;
            }
            targetItem.percent = e.percent;
            this.onChange({
                event: e,
                file: Object.assign({}, targetItem),
                fileList: this.state.fileList,
            });
        };
        this.onError = (error, response, file) => {
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
                file: Object.assign({}, targetItem),
                fileList,
            });
        };
        this.handleDeleteAll = () => {
            this.state.fileList.forEach((file) => {
                this.upload.abort(file);
                file.status = 'removed'; // eslint-disable-line
            });
            this.setState({ fileList: [] });
            const { onDeleteAll } = this.props;
            if (onDeleteAll) {
                onDeleteAll();
            }
        };
        this.handleManualRemove = (file) => {
            this.upload.abort(file);
            file.status = 'removed'; // eslint-disable-line
            this.handleRemove(file);
        };
        this.onChange = (info) => {
            if (!('fileList' in this.props)) {
                this.setState({ fileList: info.fileList });
            }
            const { onChange } = this.props;
            if (onChange) {
                onChange(info);
            }
        };
        this.onFileDrop = (e) => {
            this.setState({
                dragState: e.type,
            });
        };
        this.beforeUpload = (file, fileList) => {
            if (!this.props.beforeUpload) {
                return true;
            }
            const result = this.props.beforeUpload(file, fileList);
            if (result === false) {
                this.onChange({
                    file,
                    fileList: uniqBy(this.state.fileList.concat(fileList.map(fileToObject)), (item) => item.uid),
                });
                return false;
            }
            else if (result && result.then) {
                return result;
            }
            return true;
        };
        this.saveUpload = (node) => {
            this.upload = node;
        };
        this.renderUploadList = (locale) => {
            const { showUploadList, listType, onPreview, maxFileCount, showDeleteAll } = this.props;
            const { showRemoveIcon, showPreviewIcon } = showUploadList;
            return (React.createElement(UploadList, { listType: listType, items: this.state.fileList, onPreview: onPreview, onRemove: this.handleManualRemove, onDeleteAll: this.handleDeleteAll, showRemoveIcon: showRemoveIcon, showPreviewIcon: showPreviewIcon, maxFileCount: maxFileCount, showDeleteAll: showDeleteAll, locale: Object.assign({}, locale, this.props.locale) }));
        };
        this.state = {
            fileList: props.fileList || props.defaultFileList || [],
            dragState: 'drop',
            action: props.action || '',
        };
    }
    componentWillReceiveProps(nextProps) {
        // action 受控
        if ('action' in nextProps && this.state.action !== nextProps.action) {
            this.setState({
                action: nextProps.action
            });
        }
        if ('fileList' in nextProps) {
            this.setState({
                fileList: nextProps.fileList || [],
            });
        }
    }
    componentWillUnmount() {
        this.clearProgressTimer();
    }
    autoUpdateProgress(_, file) {
        const getPercent = genPercentAdd();
        let curPercent = 0;
        this.clearProgressTimer();
        this.progressTimer = setInterval(() => {
            curPercent = getPercent(curPercent);
            this.onProgress({
                percent: curPercent * 100,
            }, file);
        }, 200);
    }
    handleRemove(file) {
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
                    fileList: removedFileList,
                });
            }
        });
    }
    clearProgressTimer() {
        clearInterval(this.progressTimer);
    }
    render() {
        const { prefixCls = '', className, style, showUploadList, listType, type, disabled, children, tip } = this.props;
        const rcUploadProps = Object.assign({ onStart: this.onStart, onError: this.onError, onProgress: this.onProgress, onSuccess: this.onSuccess }, this.props, { beforeUpload: this.beforeUpload });
        delete rcUploadProps.className;
        delete rcUploadProps.style;
        delete rcUploadProps.action;
        const uploadList = showUploadList ? this.renderUploadList({
            uploading: '上传中',
            removeFile: '移除文件',
            uploadError: '上传错误',
            previewFile: '预览文件',
        }) : null;
        const uploadTips = tip ? (React.createElement("div", { className: `${prefixCls}-tip` }, tip)) : null;
        if (type === 'drag') {
            const dragCls = classNames(prefixCls, {
                [`${prefixCls}-drag`]: true,
                [`${prefixCls}-drag-uploading`]: this.state.fileList.some(file => file.status === 'uploading'),
                [`${prefixCls}-drag-hover`]: this.state.dragState === 'dragover',
                [`${prefixCls}-disabled`]: disabled,
            });
            return (React.createElement("span", { className: className, style: style },
                React.createElement("div", { className: dragCls, onDrop: this.onFileDrop, onDragOver: this.onFileDrop, onDragLeave: this.onFileDrop },
                    React.createElement(RcUpload, Object.assign({}, rcUploadProps, { action: this.state.action, ref: this.saveUpload, className: `${prefixCls}-btn` }),
                        React.createElement("div", { className: `${prefixCls}-drag-container` }, children))),
                uploadTips,
                uploadList));
        }
        const uploadButtonCls = classNames(prefixCls, {
            [`${prefixCls}-select`]: true,
            [`${prefixCls}-select-${listType}`]: true,
            [`${prefixCls}-disabled`]: disabled,
        });
        const uploadButton = (React.createElement("div", { className: uploadButtonCls, style: { display: children ? '' : 'none' } },
            React.createElement(RcUpload, Object.assign({}, rcUploadProps, { action: this.state.action, ref: this.saveUpload }))));
        if (listType === 'picture-card') {
            return (React.createElement("span", { className: className, style: style },
                uploadList,
                uploadButton,
                uploadTips));
        }
        else {
            return (React.createElement("span", { className: className, style: style },
                uploadButton,
                uploadTips,
                uploadList));
        }
    }
}
Upload.defaultProps = {
    prefixCls: 'fishd-upload',
    type: 'select',
    multiple: false,
    action: '',
    data: {},
    accept: '',
    beforeUpload: T,
    showUploadList: true,
    listType: 'text',
    className: '',
    disabled: false,
    supportServerRender: true,
    tip: ''
};
