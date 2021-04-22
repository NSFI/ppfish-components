var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import RcUpload from './src/index.js';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import Dragger from './Dragger';
import UploadList from './UploadList';
import { T, fileToObject, genPercentAdd, getFileItem, removeFileItem, } from './utils';
import ConfigConsumer from '../Config/Locale/Consumer';
var Upload = /** @class */ (function (_super) {
    __extends(Upload, _super);
    function Upload(props) {
        var _this = _super.call(this, props) || this;
        _this.onStart = function (file) {
            var targetItem;
            var nextFileList = _this.state.fileList.concat();
            targetItem = fileToObject(file);
            targetItem.status = 'uploading';
            nextFileList.push(targetItem);
            _this.onChange({
                file: targetItem,
                fileList: nextFileList,
            });
            // fix ie progress
            if (!window.FormData) {
                _this.autoUpdateProgress(0, targetItem);
            }
        };
        _this.onSuccess = function (response, file) {
            _this.clearProgressTimer();
            try {
                if (typeof response === 'string') {
                    response = JSON.parse(response);
                }
            }
            catch (e) {
                /* do nothing */
            }
            var fileList = _this.state.fileList;
            var targetItem = getFileItem(file, fileList);
            // removed
            if (!targetItem) {
                return;
            }
            targetItem.status = 'done';
            targetItem.response = response;
            _this.onChange({
                file: __assign({}, targetItem),
                fileList: fileList,
            });
        };
        _this.onProgress = function (e, file) {
            var fileList = _this.state.fileList;
            var targetItem = getFileItem(file, fileList);
            // removed
            if (!targetItem) {
                return;
            }
            targetItem.percent = e.percent;
            _this.onChange({
                event: e,
                file: __assign({}, targetItem),
                fileList: _this.state.fileList,
            });
        };
        _this.onError = function (error, response, file) {
            _this.clearProgressTimer();
            var fileList = _this.state.fileList;
            var targetItem = getFileItem(file, fileList);
            // removed
            if (!targetItem) {
                return;
            }
            targetItem.error = error;
            targetItem.response = response;
            targetItem.status = 'error';
            _this.onChange({
                file: __assign({}, targetItem),
                fileList: fileList,
            });
        };
        _this.handleDeleteAll = function () {
            _this.state.fileList.forEach(function (file) {
                _this.upload.abort(file);
                file.status = 'removed'; // eslint-disable-line
            });
            _this.setState({ fileList: [] });
            var onDeleteAll = _this.props.onDeleteAll;
            if (onDeleteAll) {
                onDeleteAll();
            }
        };
        _this.handleManualRemove = function (file) {
            _this.upload.abort(file);
            file.status = 'removed'; // eslint-disable-line
            _this.handleRemove(file);
        };
        _this.onChange = function (info) {
            if (!('fileList' in _this.props)) {
                _this.setState({ fileList: info.fileList });
            }
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(info);
            }
        };
        _this.onFileDrop = function (e) {
            _this.setState({
                dragState: e.type,
            });
        };
        _this.beforeUpload = function (file, fileList) {
            if (!_this.props.beforeUpload) {
                return true;
            }
            var result = _this.props.beforeUpload(file, fileList);
            if (result === false) {
                _this.onChange({
                    file: file,
                    fileList: uniqBy(_this.state.fileList.concat(fileList.map(fileToObject)), function (item) { return item.uid; }),
                });
                return false;
            }
            else if (result && result.then) {
                return result;
            }
            return true;
        };
        _this.saveUpload = function (node) {
            _this.upload = node;
        };
        _this.renderUploadList = function (locale) {
            var _a = _this.props, showUploadList = _a.showUploadList, listType = _a.listType, onPreview = _a.onPreview, maxFileCount = _a.maxFileCount, showDeleteAll = _a.showDeleteAll;
            var _b = showUploadList, showRemoveIcon = _b.showRemoveIcon, showPreviewIcon = _b.showPreviewIcon;
            return (React.createElement(UploadList, { listType: listType, items: _this.state.fileList, onPreview: onPreview, onRemove: _this.handleManualRemove, onDeleteAll: _this.handleDeleteAll, showRemoveIcon: showRemoveIcon, showPreviewIcon: showPreviewIcon, maxFileCount: maxFileCount, showDeleteAll: showDeleteAll, locale: __assign(__assign({}, locale), _this.props.locale) }));
        };
        _this.state = {
            fileList: props.fileList || props.defaultFileList || [],
            dragState: 'drop',
            action: props.action || '',
        };
        return _this;
    }
    Upload.getDerivedStateFromProps = function (nextProps, prevState) {
        var newState = {};
        // action 受控
        if ('action' in nextProps && prevState.action !== nextProps.action) {
            newState.action = nextProps.action;
        }
        if ('fileList' in nextProps) {
            newState.fileList = nextProps.fileList || [];
        }
        return newState;
    };
    Upload.prototype.componentWillUnmount = function () {
        this.clearProgressTimer();
    };
    Upload.prototype.autoUpdateProgress = function (_, file) {
        var _this = this;
        var getPercent = genPercentAdd();
        var curPercent = 0;
        this.clearProgressTimer();
        this.progressTimer = setInterval(function () {
            curPercent = getPercent(curPercent);
            _this.onProgress({
                percent: curPercent * 100,
            }, file);
        }, 200);
    };
    Upload.prototype.handleRemove = function (file) {
        var _this = this;
        var onRemove = this.props.onRemove;
        Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(function (ret) {
            // Prevent removing file
            if (ret === false) {
                return;
            }
            var removedFileList = removeFileItem(file, _this.state.fileList);
            if (removedFileList) {
                _this.onChange({
                    file: file,
                    fileList: removedFileList,
                });
            }
        });
    };
    Upload.prototype.clearProgressTimer = function () {
        clearInterval(this.progressTimer);
    };
    Upload.prototype.renderUpload = function (Locale) {
        var _a, _b;
        var _c = this.props, _d = _c.prefixCls, prefixCls = _d === void 0 ? '' : _d, className = _c.className, style = _c.style, showUploadList = _c.showUploadList, listType = _c.listType, type = _c.type, disabled = _c.disabled, children = _c.children, tip = _c.tip;
        var rcUploadProps = __assign(__assign({ onStart: this.onStart, onError: this.onError, onProgress: this.onProgress, onSuccess: this.onSuccess }, this.props), { beforeUpload: this.beforeUpload });
        delete rcUploadProps.className;
        delete rcUploadProps.style;
        delete rcUploadProps.action;
        var uploadList = showUploadList
            ? this.renderUploadList({
                uploading: Locale.uploading,
                removeFile: Locale.removeFile,
                uploadError: Locale.uploadError,
                previewFile: Locale.previewFile,
            })
            : null;
        var uploadTips = tip ? (React.createElement("div", { className: prefixCls + "-tip" }, tip)) : null;
        if (type === 'drag') {
            var dragCls = classNames(prefixCls, (_a = {},
                _a[prefixCls + "-drag"] = true,
                _a[prefixCls + "-drag-uploading"] = this.state.fileList.some(function (file) { return file.status === 'uploading'; }),
                _a[prefixCls + "-drag-hover"] = this.state.dragState === 'dragover',
                _a[prefixCls + "-disabled"] = disabled,
                _a));
            return (React.createElement("span", { className: className, style: style },
                React.createElement("div", { className: dragCls, onDrop: this.onFileDrop, onDragOver: this.onFileDrop, onDragLeave: this.onFileDrop },
                    React.createElement(RcUpload, __assign({}, rcUploadProps, { action: this.state.action, ref: this.saveUpload, className: prefixCls + "-btn" }),
                        React.createElement("div", { className: prefixCls + "-drag-container" }, children))),
                uploadTips,
                uploadList));
        }
        var uploadButtonCls = classNames(prefixCls, (_b = {},
            _b[prefixCls + "-select"] = true,
            _b[prefixCls + "-select-" + listType] = true,
            _b[prefixCls + "-disabled"] = disabled,
            _b));
        var uploadButton = (React.createElement("div", { className: uploadButtonCls, style: { display: children ? '' : 'none' } },
            React.createElement(RcUpload, __assign({}, rcUploadProps, { action: this.state.action, ref: this.saveUpload }))));
        var renderNode = null;
        if (listType === 'picture-card') {
            renderNode = (React.createElement("span", { className: className, style: style },
                uploadList,
                uploadButton,
                uploadTips));
        }
        else {
            renderNode = (React.createElement("span", { className: className, style: style },
                uploadButton,
                uploadTips,
                uploadList));
        }
        return renderNode;
    };
    Upload.prototype.render = function () {
        var _this = this;
        return (React.createElement(ConfigConsumer, { componentName: "Upload" }, function (Locale) {
            return _this.renderUpload(Locale);
        }));
    };
    Upload.Dragger = Dragger;
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
        tip: '',
    };
    return Upload;
}(React.Component));
polyfill(Upload);
export default Upload;
