"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _uid = _interopRequireDefault(require("./uid"));

var _warning = _interopRequireDefault(require("warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
  _inherits(IframeUploader, _Component);

  function IframeUploader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, IframeUploader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(IframeUploader)).call.apply(_getPrototypeOf2, [this].concat(args)));

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
        (0, _warning["default"])(false, "Cross domain error for Upload. Maybe server should return document.domain script.\n        See Note from https://github.com/react-component/upload");
        response = 'cross-domain';
        props.onError(err, null, file);
      }

      _this.endUpload();
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function () {
      var target = _this.getFormInputNode(); // ie8/9 don't support FileList Object
      // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files


      var file = _this.file = {
        uid: (0, _uid["default"])(),
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

  _createClass(IframeUploader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateIframeWH();
      this.initIframe();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateIframeWH();
    }
  }, {
    key: "getIframeNode",
    value: function getIframeNode() {
      return this.iframe;
    }
  }, {
    key: "getIframeDocument",
    value: function getIframeDocument() {
      return this.getIframeNode().contentDocument;
    }
  }, {
    key: "getFormNode",
    value: function getFormNode() {
      return this.getIframeDocument().getElementById('form');
    }
  }, {
    key: "getFormInputNode",
    value: function getFormInputNode() {
      return this.getIframeDocument().getElementById('input');
    }
  }, {
    key: "getFormDataNode",
    value: function getFormDataNode() {
      return this.getIframeDocument().getElementById('data');
    }
  }, {
    key: "getFileForMultiple",
    value: function getFileForMultiple(file) {
      return this.props.multiple ? [file] : file;
    }
  }, {
    key: "getIframeHTML",
    value: function getIframeHTML(domain) {
      var domainScript = '';
      var domainInput = '';

      if (domain) {
        var script = 'script';
        domainScript = "<".concat(script, ">document.domain=\"").concat(domain, "\";</").concat(script, ">");
        domainInput = "<input name=\"_documentDomain\" value=\"".concat(domain, "\" />");
      }

      return "\n    <!DOCTYPE html>\n    <html>\n    <head>\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <style>\n    body,html {padding:0;margin:0;border:0;overflow:hidden;}\n    </style>\n    ".concat(domainScript, "\n    </head>\n    <body>\n    <form method=\"post\"\n    encType=\"multipart/form-data\"\n    action=\"\" id=\"form\"\n    style=\"display:block;height:9999px;position:relative;overflow:hidden;\">\n    <input id=\"input\" type=\"file\"\n     name=\"").concat(this.props.name, "\"\n     style=\"position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;\"/>\n    ").concat(domainInput, "\n    <span id=\"data\"></span>\n    </form>\n    </body>\n    </html>\n    ");
    }
  }, {
    key: "initIframeSrc",
    value: function initIframeSrc() {
      if (this.domain) {
        this.getIframeNode().src = "javascript:void((function(){\n        var d = document;\n        d.open();\n        d.domain='".concat(this.domain, "';\n        d.write('');\n        d.close();\n      })())");
      }
    }
  }, {
    key: "initIframe",
    value: function initIframe() {
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
    }
  }, {
    key: "endUpload",
    value: function endUpload() {
      if (this.state.uploading) {
        this.file = {}; // hack avoid batch

        this.state.uploading = false; // eslint-disable-line react/no-direct-mutation-state

        this.setState({
          uploading: false
        });
        this.initIframe();
      }
    }
  }, {
    key: "startUpload",
    value: function startUpload() {
      if (!this.state.uploading) {
        this.state.uploading = true; // eslint-disable-line react/no-direct-mutation-state

        this.setState({
          uploading: true
        });
      }
    }
  }, {
    key: "updateIframeWH",
    value: function updateIframeWH() {
      var rootNode = _reactDom["default"].findDOMNode(this);

      var iframeNode = this.getIframeNode();
      iframeNode.style.height = "".concat(rootNode.offsetHeight, "px");
      iframeNode.style.width = "".concat(rootNode.offsetWidth, "px");
    }
  }, {
    key: "abort",
    value: function abort(file) {
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
    }
  }, {
    key: "post",
    value: function post(file) {
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
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          Tag = _this$props.component,
          disabled = _this$props.disabled,
          className = _this$props.className,
          prefixCls = _this$props.prefixCls,
          children = _this$props.children,
          style = _this$props.style;

      var iframeStyle = _objectSpread({}, IFRAME_STYLE, {
        display: this.state.uploading || disabled ? 'none' : ''
      });

      var cls = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames, className, className), _classNames));
      return _react["default"].createElement(Tag, {
        className: cls,
        style: _objectSpread({
          position: 'relative',
          zIndex: 0
        }, style)
      }, _react["default"].createElement("iframe", {
        ref: this.saveIframe,
        onLoad: this.onLoad,
        style: iframeStyle
      }), children);
    }
  }]);

  return IframeUploader;
}(_react.Component);

_defineProperty(IframeUploader, "propTypes", {
  component: _propTypes["default"].string,
  style: _propTypes["default"].object,
  disabled: _propTypes["default"].bool,
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  accept: _propTypes["default"].string,
  onStart: _propTypes["default"].func,
  multiple: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  data: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
  action: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  name: _propTypes["default"].string
});

var _default = IframeUploader;
exports["default"] = _default;