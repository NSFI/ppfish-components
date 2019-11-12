"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _Progress = _interopRequireDefault(require("../Progress"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var fileListItemHeight = 24; // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL

var previewFile = function previewFile(file, callback) {
  var reader = new FileReader();

  reader.onloadend = function () {
    return callback(reader.result);
  };

  reader.readAsDataURL(file);
};

var extname = function extname(url) {
  if (!url) {
    return '';
  }

  var temp = url.split('/');
  var filename = temp[temp.length - 1];
  var filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

var isImageUrl = function isImageUrl(url) {
  var extension = extname(url);

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

var UploadList =
/** @class */
function (_super) {
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

    if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
      return;
    }

    (this.props.items || []).forEach(function (file) {
      if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File) || file.thumbUrl !== undefined) {
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

  UploadList.prototype.render = function () {
    var _a, _b;

    var _this = this;

    var _c = this.props,
        prefixCls = _c.prefixCls,
        _d = _c.items,
        items = _d === void 0 ? [] : _d,
        listType = _c.listType,
        showPreviewIcon = _c.showPreviewIcon,
        showRemoveIcon = _c.showRemoveIcon,
        locale = _c.locale,
        showDeleteAll = _c.showDeleteAll,
        maxFileCount = _c.maxFileCount;
    var list = items.map(function (file) {
      var _a;

      var progress;
      var icon = React.createElement(_Icon.default, {
        type: file.status === 'uploading' ? 'load-line' : 'clip-line',
        spinning: file.status === 'uploading' ? true : false
      });

      if (listType === 'picture' || listType === 'picture-card') {
        if (listType === 'picture-card' && file.status === 'uploading') {
          icon = React.createElement("div", {
            className: prefixCls + "-list-item-uploading-text"
          }, locale.uploading);
        } else if (!file.thumbUrl && !file.url) {
          icon = React.createElement(_Icon.default, {
            type: "image-line",
            className: prefixCls + "-list-item-thumbnail"
          });
        } else {
          var thumbnail = isImageUrl(file.thumbUrl || file.url) ? React.createElement("img", {
            src: file.thumbUrl || file.url,
            alt: file.name
          }) : React.createElement(_Icon.default, {
            type: "file-line",
            className: prefixCls + "-list-item-icon"
          });
          icon = React.createElement("a", {
            className: prefixCls + "-list-item-thumbnail",
            onClick: function onClick(e) {
              return _this.handlePreview(file, e);
            },
            href: file.url || file.thumbUrl,
            target: "_blank",
            rel: "noopener noreferrer"
          }, thumbnail);
        }
      }

      if (file.status === 'uploading') {
        // show loading icon if upload progress listener is disabled
        var loadingProgress = 'percent' in file ? React.createElement(_Progress.default, __assign({
          type: "line"
        }, _this.props.progressAttr, {
          percent: file.percent,
          operation: React.createElement("div", {
            className: prefixCls + "-action-cancel",
            onClick: function onClick() {
              return _this.handleClose(file);
            }
          }, "\u53D6\u6D88")
        })) : null;
        progress = React.createElement("div", {
          className: prefixCls + "-list-item-progress",
          key: "progress"
        }, loadingProgress);
      }

      var infoUploadingClass = (0, _classnames.default)((_a = {}, _a[prefixCls + "-list-item"] = true, _a[prefixCls + "-list-item-" + file.status] = true, _a));
      var preview = file.url ? React.createElement("a", __assign({}, file.linkProps, {
        href: file.url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: prefixCls + "-list-item-name",
        onClick: function onClick(e) {
          return _this.handlePreview(file, e);
        },
        title: file.name
      }), file.name) : React.createElement("span", {
        className: prefixCls + "-list-item-name",
        onClick: function onClick(e) {
          return _this.handlePreview(file, e);
        },
        title: file.name
      }, file.name);
      var style = {
        pointerEvents: 'none',
        opacity: 0.5
      };
      var previewIcon = showPreviewIcon ? React.createElement("a", {
        href: file.url || file.thumbUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: file.url || file.thumbUrl ? undefined : style,
        onClick: function onClick(e) {
          return _this.handlePreview(file, e);
        },
        title: locale.previewFile
      }, React.createElement(_Icon.default, {
        type: "watch-line"
      })) : null;
      var removeIcon = showRemoveIcon ? React.createElement(_Icon.default, {
        type: "delete-line",
        title: locale.removeFile,
        onClick: function onClick() {
          return _this.handleClose(file);
        }
      }) : null;
      var removeIconCross = showRemoveIcon ? React.createElement(_Icon.default, {
        type: "hints-alone-error",
        title: locale.removeFile,
        onClick: function onClick() {
          return _this.handleClose(file);
        }
      }) : null;
      var actions = listType === 'picture-card' && file.status !== 'uploading' ? React.createElement("span", {
        className: prefixCls + "-list-item-actions"
      }, previewIcon, removeIcon) : removeIconCross;
      var message;

      if (file.response && typeof file.response === 'string') {
        message = file.response;
      } else {
        message = file.error && file.error.statusText || locale.uploadError;
      }

      var iconAndPreview = file.status === 'error' ? React.createElement(_Tooltip.default, {
        title: message
      }, icon, preview) : React.createElement("span", null, icon, preview);
      return React.createElement("div", {
        className: infoUploadingClass,
        key: file.uid
      }, React.createElement("div", {
        className: prefixCls + "-list-item-info"
      }, iconAndPreview), actions, React.createElement(_rcAnimate.default, {
        transitionName: "fade",
        component: ""
      }, progress));
    });
    var showScrollbar = listType === 'text' && list.length > maxFileCount;
    var listClassNames = (0, _classnames.default)((_a = {}, _a[prefixCls + "-list"] = true, _a[prefixCls + "-list-" + listType] = true, _a[prefixCls + "-list-scroll"] = showScrollbar, _a));
    var animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
    var deleteAllCls = (0, _classnames.default)(prefixCls + "-list-scroll-delete-all", (_b = {}, _b[prefixCls + "-hide"] = !showDeleteAll, _b));

    if (showScrollbar) {
      return React.createElement("div", {
        className: null
      }, React.createElement("div", {
        className: prefixCls + "-list-scroll-info"
      }, React.createElement("span", null, "\u5DF2\u4E0A\u4F20 ", list.length, " \u9879"), React.createElement("span", {
        className: deleteAllCls,
        onClick: function onClick() {
          return _this.handleDeleteAll();
        }
      }, "\u5168\u90E8\u5220\u9664")), React.createElement(_rcAnimate.default, {
        transitionName: prefixCls + "-" + animationDirection,
        component: "div",
        className: listClassNames,
        style: {
          height: fileListItemHeight * maxFileCount + fileListItemHeight / 2
        }
      }, list));
    } else {
      return React.createElement(_rcAnimate.default, {
        transitionName: prefixCls + "-" + animationDirection,
        component: "div",
        className: listClassNames
      }, list);
    }
  };

  UploadList.defaultProps = {
    listType: 'text',
    progressAttr: {
      strokeWidth: 2,
      showInfo: false
    },
    prefixCls: 'fishd-upload',
    showRemoveIcon: true,
    showPreviewIcon: true,
    maxFileCount: 5,
    showDeleteAll: true
  };
  return UploadList;
}(React.Component);

var _default = UploadList;
exports.default = _default;