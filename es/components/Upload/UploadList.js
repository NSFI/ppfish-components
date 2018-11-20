import * as React from 'react';
import Animate from 'rc-animate';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import Progress from '../Progress';
import classNames from 'classnames';
const fileListItemHeight = 24;
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
const previewFile = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
};
const extname = (url) => {
    if (!url) {
        return '';
    }
    const temp = url.split('/');
    const filename = temp[temp.length - 1];
    const filenameWithoutSuffix = filename.split(/#|\?/)[0];
    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};
const isImageUrl = (url) => {
    const extension = extname(url);
    if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)) {
        return true;
    }
    else if (/^data:/.test(url)) { // other file types of base64
        return false;
    }
    else if (extension) { // other file types which have extension
        return false;
    }
    return true;
};
export default class UploadList extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClose = (file) => {
            const { onRemove } = this.props;
            if (onRemove) {
                onRemove(file);
            }
        };
        this.handleDeleteAll = () => {
            const { onDeleteAll } = this.props;
            if (onDeleteAll) {
                onDeleteAll();
            }
        };
        this.handlePreview = (file, e) => {
            const { onPreview } = this.props;
            if (!onPreview) {
                return;
            }
            e.preventDefault();
            return onPreview(file);
        };
    }
    componentDidUpdate() {
        if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
            return;
        }
        (this.props.items || []).forEach(file => {
            if (typeof document === 'undefined' ||
                typeof window === 'undefined' ||
                !window.FileReader || !window.File ||
                !(file.originFileObj instanceof File) ||
                file.thumbUrl !== undefined) {
                return;
            }
            /*eslint-disable */
            file.thumbUrl = '';
            /*eslint-enable */
            previewFile(file.originFileObj, (previewDataUrl) => {
                /*eslint-disable */
                file.thumbUrl = previewDataUrl;
                /*eslint-enable */
                this.forceUpdate();
            });
        });
    }
    render() {
        const { prefixCls, items = [], listType, showPreviewIcon, showRemoveIcon, locale, showDeleteAll, maxFileCount } = this.props;
        const list = items.map(file => {
            let progress;
            let icon = React.createElement(Icon, { type: file.status === 'uploading' ? 'load-line' : 'clip-line', spinning: file.status === 'uploading' ? true : false });
            if (listType === 'picture' || listType === 'picture-card') {
                if (listType === 'picture-card' && file.status === 'uploading') {
                    icon = React.createElement("div", { className: `${prefixCls}-list-item-uploading-text` }, locale.uploading);
                }
                else if (!file.thumbUrl && !file.url) {
                    icon = React.createElement(Icon, { type: "image-line", className: `${prefixCls}-list-item-thumbnail` });
                }
                else {
                    let thumbnail = isImageUrl((file.thumbUrl || file.url))
                        ? React.createElement("img", { src: file.thumbUrl || file.url, alt: file.name })
                        : React.createElement(Icon, { type: "file-line", className: `${prefixCls}-list-item-icon` });
                    icon = (React.createElement("a", { className: `${prefixCls}-list-item-thumbnail`, onClick: e => this.handlePreview(file, e), href: file.url || file.thumbUrl, target: "_blank", rel: "noopener noreferrer" }, thumbnail));
                }
            }
            if (file.status === 'uploading') {
                // show loading icon if upload progress listener is disabled
                const loadingProgress = ('percent' in file) ? (React.createElement(Progress, Object.assign({ type: "line" }, this.props.progressAttr, { percent: file.percent, operation: React.createElement("div", { className: `${prefixCls}-action-cancel`, onClick: () => this.handleClose(file) }, "\u53D6\u6D88") }))) : null;
                progress = (React.createElement("div", { className: `${prefixCls}-list-item-progress`, key: "progress" }, loadingProgress));
            }
            const infoUploadingClass = classNames({
                [`${prefixCls}-list-item`]: true,
                [`${prefixCls}-list-item-${file.status}`]: true,
            });
            const preview = file.url ? (React.createElement("a", Object.assign({}, file.linkProps, { href: file.url, target: "_blank", rel: "noopener noreferrer", className: `${prefixCls}-list-item-name`, onClick: e => this.handlePreview(file, e), title: file.name }), file.name)) : (React.createElement("span", { className: `${prefixCls}-list-item-name`, onClick: e => this.handlePreview(file, e), title: file.name }, file.name));
            const style = {
                pointerEvents: 'none',
                opacity: 0.5,
            };
            const previewIcon = showPreviewIcon ? (React.createElement("a", { href: file.url || file.thumbUrl, target: "_blank", rel: "noopener noreferrer", style: (file.url || file.thumbUrl) ? undefined : style, onClick: e => this.handlePreview(file, e), title: locale.previewFile },
                React.createElement(Icon, { type: "watch-line" }))) : null;
            const removeIcon = showRemoveIcon ? (React.createElement(Icon, { type: "delete-line", title: locale.removeFile, onClick: () => this.handleClose(file) })) : null;
            const removeIconCross = showRemoveIcon ? (React.createElement(Icon, { type: "hints-alone-error", title: locale.removeFile, onClick: () => this.handleClose(file) })) : null;
            const actions = (listType === 'picture-card' && file.status !== 'uploading')
                ? React.createElement("span", { className: `${prefixCls}-list-item-actions` },
                    previewIcon,
                    removeIcon)
                : removeIconCross;
            let message;
            if (file.response && typeof file.response === 'string') {
                message = file.response;
            }
            else {
                message = (file.error && file.error.statusText) || locale.uploadError;
            }
            const iconAndPreview = (file.status === 'error')
                ? React.createElement(Tooltip, { title: message },
                    icon,
                    preview)
                : React.createElement("span", null,
                    icon,
                    preview);
            return (React.createElement("div", { className: infoUploadingClass, key: file.uid },
                React.createElement("div", { className: `${prefixCls}-list-item-info` }, iconAndPreview),
                actions,
                React.createElement(Animate, { transitionName: "fade", component: "" }, progress)));
        });
        const showScrollbar = listType === 'text' && list.length > maxFileCount;
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
            return (React.createElement("div", { className: null },
                React.createElement("div", { className: `${prefixCls}-list-scroll-info` },
                    React.createElement("span", null,
                        "\u5DF2\u4E0A\u4F20 ",
                        list.length,
                        " \u9879"),
                    React.createElement("span", { className: deleteAllCls, onClick: () => this.handleDeleteAll() }, "\u5168\u90E8\u5220\u9664")),
                React.createElement(Animate, { transitionName: `${prefixCls}-${animationDirection}`, component: "div", className: listClassNames, style: { height: fileListItemHeight * maxFileCount + fileListItemHeight / 2 } }, list)));
        }
        else {
            return (React.createElement(Animate, { transitionName: `${prefixCls}-${animationDirection}`, component: "div", className: listClassNames }, list));
        }
    }
}
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
    showDeleteAll: true
};
