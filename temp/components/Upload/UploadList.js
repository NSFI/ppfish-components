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
import Animate from 'rc-animate';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import Progress from '../Progress';
import classNames from 'classnames';
import ConfigConsumer from '../Config/Locale/Consumer';
var fileListItemHeight = 24;
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
var previewFile = function (file, callback) {
    var reader = new FileReader();
    reader.onloadend = function () { return callback(reader.result); };
    reader.readAsDataURL(file);
};
var extname = function (url) {
    if (!url) {
        return '';
    }
    var temp = url.split('/');
    var filename = temp[temp.length - 1];
    var filenameWithoutSuffix = filename.split(/#|\?/)[0];
    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};
var isImageUrl = function (url) {
    var extension = extname(url);
    if (/^data:image\//.test(url) ||
        /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)) {
        return true;
    }
    else if (/^data:/.test(url)) {
        // other file types of base64
        return false;
    }
    else if (extension) {
        // other file types which have extension
        return false;
    }
    return true;
};
var UploadList = /** @class */ (function (_super) {
    __extends(UploadList, _super);
    function UploadList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClose = function (file) {
            var onRemove = _this.props.onRemove;
            if (onRemove) {
                onRemove(file);
            }
        };
        _this.handleDeleteAll = function () {
            var onDeleteAll = _this.props.onDeleteAll;
            if (onDeleteAll) {
                onDeleteAll();
            }
        };
        _this.handlePreview = function (file, e) {
            var onPreview = _this.props.onPreview;
            if (!onPreview) {
                return;
            }
            e.preventDefault();
            return onPreview(file);
        };
        return _this;
    }
    UploadList.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.props.listType !== 'picture' &&
            this.props.listType !== 'picture-card') {
            return;
        }
        (this.props.items || []).forEach(function (file) {
            if (typeof document === 'undefined' ||
                typeof window === 'undefined' ||
                !window.FileReader ||
                !window.File ||
                !(file.originFileObj instanceof File) ||
                file.thumbUrl !== undefined) {
                return;
            }
            /*eslint-disable */
            file.thumbUrl = '';
            /*eslint-enable */
            previewFile(file.originFileObj, function (previewDataUrl) {
                /*eslint-disable */
                file.thumbUrl = previewDataUrl;
                /*eslint-enable */
                _this.forceUpdate();
            });
        });
    };
    UploadList.prototype.renderUploadList = function (Locale) {
        var _a, _b;
        var _this = this;
        var _c = this.props, prefixCls = _c.prefixCls, _d = _c.items, items = _d === void 0 ? [] : _d, listType = _c.listType, showPreviewIcon = _c.showPreviewIcon, showRemoveIcon = _c.showRemoveIcon, locale = _c.locale, showDeleteAll = _c.showDeleteAll, maxFileCount = _c.maxFileCount;
        var list = items.map(function (file) {
            var _a;
            var progress;
            var icon = (React.createElement(Icon, { type: file.status === 'uploading' ? 'load-line' : 'clip-line', spinning: file.status === 'uploading' ? true : false }));
            if (listType === 'picture' || listType === 'picture-card') {
                if (listType === 'picture-card' && file.status === 'uploading') {
                    icon = (React.createElement("div", { className: prefixCls + "-list-item-uploading-text" }, locale.uploading));
                }
                else if (!file.thumbUrl && !file.url) {
                    icon = (React.createElement(Icon, { type: "image-line", className: prefixCls + "-list-item-thumbnail" }));
                }
                else {
                    var thumbnail = isImageUrl((file.thumbUrl || file.url)) ? (React.createElement("img", { src: file.thumbUrl || file.url, alt: file.name })) : (React.createElement(Icon, { type: "file-line", className: prefixCls + "-list-item-icon" }));
                    icon = (React.createElement("a", { className: prefixCls + "-list-item-thumbnail", onClick: function (e) { return _this.handlePreview(file, e); }, href: file.url || file.thumbUrl, target: "_blank", rel: "noopener noreferrer" }, thumbnail));
                }
            }
            if (file.status === 'uploading') {
                // show loading icon if upload progress listener is disabled
                var loadingProgress = 'percent' in file ? (React.createElement(Progress, __assign({ type: "line" }, _this.props.progressAttr, { percent: file.percent, operation: React.createElement("div", { className: prefixCls + "-action-cancel", onClick: function () { return _this.handleClose(file); } }, Locale.cancelText) }))) : null;
                progress = (React.createElement("div", { className: prefixCls + "-list-item-progress", key: "progress" }, loadingProgress));
            }
            var infoUploadingClass = classNames((_a = {},
                _a[prefixCls + "-list-item"] = true,
                _a[prefixCls + "-list-item-" + file.status] = true,
                _a));
            var preview = file.url ? (React.createElement("a", __assign({}, file.linkProps, { href: file.url, target: "_blank", rel: "noopener noreferrer", className: prefixCls + "-list-item-name", onClick: function (e) { return _this.handlePreview(file, e); }, title: file.name }), file.name)) : (React.createElement("span", { className: prefixCls + "-list-item-name", onClick: function (e) { return _this.handlePreview(file, e); }, title: file.name }, file.name));
            var style = {
                pointerEvents: 'none',
                opacity: 0.5,
            };
            var previewIcon = showPreviewIcon ? (React.createElement("a", { href: file.url || file.thumbUrl, target: "_blank", rel: "noopener noreferrer", style: file.url || file.thumbUrl ? undefined : style, onClick: function (e) { return _this.handlePreview(file, e); }, title: locale.previewFile },
                React.createElement(Icon, { type: "watch-line" }))) : null;
            var removeIcon = showRemoveIcon ? (React.createElement(Icon, { type: "delete-line", title: locale.removeFile, onClick: function () { return _this.handleClose(file); } })) : null;
            var removeIconCross = showRemoveIcon ? (React.createElement(Icon, { type: "hints-alone-error", title: locale.removeFile, onClick: function () { return _this.handleClose(file); } })) : null;
            var actions = listType === 'picture-card' && file.status !== 'uploading' ? (React.createElement("span", { className: prefixCls + "-list-item-actions" },
                previewIcon,
                removeIcon)) : (removeIconCross);
            var message;
            if (file.response && typeof file.response === 'string') {
                message = file.response;
            }
            else {
                message = (file.error && file.error.statusText) || locale.uploadError;
            }
            var iconAndPreview = file.status === 'error' ? (React.createElement(Tooltip, { title: message },
                icon,
                preview)) : (React.createElement("span", null,
                icon,
                preview));
            return (React.createElement("div", { className: infoUploadingClass, key: file.uid },
                React.createElement("div", { className: prefixCls + "-list-item-info" }, iconAndPreview),
                actions,
                React.createElement(Animate, { transitionName: "fade", component: "" }, progress)));
        });
        var showScrollbar = listType === 'text' && list.length > maxFileCount;
        var listClassNames = classNames((_a = {},
            _a[prefixCls + "-list"] = true,
            _a[prefixCls + "-list-" + listType] = true,
            _a[prefixCls + "-list-scroll"] = showScrollbar,
            _a));
        var animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
        var deleteAllCls = classNames(prefixCls + "-list-scroll-delete-all", (_b = {},
            _b[prefixCls + "-hide"] = !showDeleteAll,
            _b));
        var renderNode = null;
        if (showScrollbar) {
            renderNode = (React.createElement("div", { className: null },
                React.createElement("div", { className: prefixCls + "-list-scroll-info" },
                    React.createElement("span", null, Locale.uploadedTip.replace('${length}', String(list.length))),
                    React.createElement("span", { className: deleteAllCls, onClick: function () { return _this.handleDeleteAll(); } }, Locale.deleteText)),
                React.createElement(Animate, { transitionName: prefixCls + "-" + animationDirection, component: "div", className: listClassNames, style: {
                        height: fileListItemHeight * maxFileCount + fileListItemHeight / 2,
                    } }, list)));
        }
        else {
            renderNode = (React.createElement(Animate, { transitionName: prefixCls + "-" + animationDirection, component: "div", className: listClassNames }, list));
        }
        return renderNode;
    };
    UploadList.prototype.render = function () {
        var _this = this;
        return (React.createElement(ConfigConsumer, { componentName: "Upload" }, function (Locale) {
            return _this.renderUploadList(Locale);
        }));
    };
    UploadList.defaultProps = {
        listType: 'text',
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
    return UploadList;
}(React.Component));
export default UploadList;
