"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _uid = _interopRequireDefault(require("./uid"));

var _warning = _interopRequireDefault(require("warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IFRAME_STYLE = {
  position: 'absolute',
  top: 0,
  opacity: 0,
  filter: 'alpha(opacity=0)',
  left: 0,
  zIndex: 9999
}; // diferent from AjaxUpload, can only upload on at one time, serial seriously

var IframeUploader =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(IframeUploader, _Component);

  function IframeUploader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      uploading: false
    });

    _defineProperty(_assertThisInitialized(_this), "file", {});

    _defineProperty(_assertThisInitialized(_this), "onLoad", function () {
      if (!_this.state.uploading) {
        return;
      }

      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props,
          file = _assertThisInitialize.file;

      var response;

      try {
        var doc = _this.getIframeDocument();

        var script = doc.getElementsByTagName('script')[0];

        if (script && script.parentNode === doc.body) {
          doc.body.removeChild(script);
        }

        response = doc.body.innerHTML;
        props.onSuccess(response, file);
      } catch (err) {
        (0, _warning.default)(false, "Cross domain error for Upload. Maybe server should return document.domain script.\n        See Note from https://github.com/react-component/upload");
        response = 'cross-domain';
        props.onError(err, null, file);
      }

      _this.endUpload();
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function () {
      var target = _this.getFormInputNode(); // ie8/9 don't support FileList Object
      // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files


      var file = _this.file = {
        uid: (0, _uid.default)(),
        name: target.value
      };

      _this.startUpload();

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          props = _assertThisInitialize2.props;

      if (!props.beforeUpload) {
        return _this.post(file);
      }

      var before = props.beforeUpload(file);

      if (before && before.then) {
        before.then(function () {
          _this.post(file);
        }, function () {
          _this.endUpload();
        });
      } else if (before !== false) {
        _this.post(file);
      } else {
        _this.endUpload();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveIframe", function (node) {
      _this.iframe = node;
    });

    return _this;
  }

  var _proto = IframeUploader.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateIframeWH();
    this.initIframe();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.updateIframeWH();
  };

  _proto.getIframeNode = function getIframeNode() {
    return this.iframe;
  };

  _proto.getIframeDocument = function getIframeDocument() {
    return this.getIframeNode().contentDocument;
  };

  _proto.getFormNode = function getFormNode() {
    return this.getIframeDocument().getElementById('form');
  };

  _proto.getFormInputNode = function getFormInputNode() {
    return this.getIframeDocument().getElementById('input');
  };

  _proto.getFormDataNode = function getFormDataNode() {
    return this.getIframeDocument().getElementById('data');
  };

  _proto.getFileForMultiple = function getFileForMultiple(file) {
    return this.props.multiple ? [file] : file;
  };

  _proto.getIframeHTML = function getIframeHTML(domain) {
    var domainScript = '';
    var domainInput = '';

    if (domain) {
      var script = 'script';
      domainScript = "<" + script + ">document.domain=\"" + domain + "\";</" + script + ">";
      domainInput = "<input name=\"_documentDomain\" value=\"" + domain + "\" />";
    }

    return "\n    <!DOCTYPE html>\n    <html>\n    <head>\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <style>\n    body,html {padding:0;margin:0;border:0;overflow:hidden;}\n    </style>\n    " + domainScript + "\n    </head>\n    <body>\n    <form method=\"post\"\n    encType=\"multipart/form-data\"\n    action=\"\" id=\"form\"\n    style=\"display:block;height:9999px;position:relative;overflow:hidden;\">\n    <input id=\"input\" type=\"file\"\n     name=\"" + this.props.name + "\"\n     style=\"position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;\"/>\n    " + domainInput + "\n    <span id=\"data\"></span>\n    </form>\n    </body>\n    </html>\n    ";
  };

  _proto.initIframeSrc = function initIframeSrc() {
    if (this.domain) {
      this.getIframeNode().src = "javascript:void((function(){\n        var d = document;\n        d.open();\n        d.domain='" + this.domain + "';\n        d.write('');\n        d.close();\n      })())";
    }
  };

  _proto.initIframe = function initIframe() {
    var iframeNode = this.getIframeNode();
    var win = iframeNode.contentWindow;
    var doc;
    this.domain = this.domain || '';
    this.initIframeSrc();

    try {
      doc = win.document;
    } catch (e) {
      this.domain = document.domain;
      this.initIframeSrc();
      win = iframeNode.contentWindow;
      doc = win.document;
    }

    doc.open('text/html', 'replace');
    doc.write(this.getIframeHTML(this.domain));
    doc.close();
    this.getFormInputNode().onchange = this.onChange;
  };

  _proto.endUpload = function endUpload() {
    if (this.state.uploading) {
      this.file = {}; // hack avoid batch

      this.state.uploading = false; // eslint-disable-line react/no-direct-mutation-state

      this.setState({
        uploading: false
      });
      this.initIframe();
    }
  };

  _proto.startUpload = function startUpload() {
    if (!this.state.uploading) {
      this.state.uploading = true; // eslint-disable-line react/no-direct-mutation-state

      this.setState({
        uploading: true
      });
    }
  };

  _proto.updateIframeWH = function updateIframeWH() {
    var rootNode = _reactDom.default.findDOMNode(this);

    var iframeNode = this.getIframeNode();
    iframeNode.style.height = rootNode.offsetHeight + "px";
    iframeNode.style.width = rootNode.offsetWidth + "px";
  };

  _proto.abort = function abort(file) {
    if (file) {
      var uid = file;

      if (file && file.uid) {
        uid = file.uid;
      }

      if (uid === this.file.uid) {
        this.endUpload();
      }
    } else {
      this.endUpload();
    }
  };

  _proto.post = function post(file) {
    var _this2 = this;

    var formNode = this.getFormNode();
    var dataSpan = this.getFormDataNode();
    var data = this.props.data;
    var onStart = this.props.onStart;

    if (typeof data === 'function') {
      data = data(file);
    }

    var inputs = document.createDocumentFragment();

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var input = document.createElement('input');
        input.setAttribute('name', key);
        input.value = data[key];
        inputs.appendChild(input);
      }
    }

    dataSpan.appendChild(inputs);
    new Promise(function (resolve) {
      var action = _this2.props.action;

      if (typeof action === 'function') {
        return resolve(action(file));
      }

      resolve(action);
    }).then(function (action) {
      formNode.setAttribute('action', action);
      formNode.submit();
      dataSpan.innerHTML = '';
      onStart(file);
    });
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        Tag = _this$props.component,
        disabled = _this$props.disabled,
        className = _this$props.className,
        prefixCls = _this$props.prefixCls,
        children = _this$props.children,
        style = _this$props.style;
    var iframeStyle = Object.assign({}, IFRAME_STYLE, {
      display: this.state.uploading || disabled ? 'none' : ''
    });
    var cls = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls] = true, _classNames[prefixCls + "-disabled"] = disabled, _classNames[className] = className, _classNames));
    return _react.default.createElement(Tag, {
      className: cls,
      style: Object.assign({
        position: 'relative',
        zIndex: 0
      }, style)
    }, _react.default.createElement("iframe", {
      ref: this.saveIframe,
      onLoad: this.onLoad,
      style: iframeStyle
    }), children);
  };

  return IframeUploader;
}(_react.Component);

_defineProperty(IframeUploader, "propTypes", {
  component: _propTypes.default.string,
  style: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  accept: _propTypes.default.string,
  onStart: _propTypes.default.func,
  multiple: _propTypes.default.bool,
  children: _propTypes.default.node,
  data: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  action: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  name: _propTypes.default.string
});

var _default = IframeUploader;
exports.default = _default;