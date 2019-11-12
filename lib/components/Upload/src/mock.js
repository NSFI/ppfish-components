"use strict";

exports.__esModule = true;
exports.setup = setup;
exports.teardown = void 0;

var _xhrMock = _interopRequireDefault(require("xhr-mock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup() {
  _xhrMock.default.setup();

  _xhrMock.default.post('http://upload.com/', function (req, res) {
    req.headers({
      'content-length': 100
    });
    req.body('thisisbody');
    return res;
  });
}

var teardown = _xhrMock.default.teardown.bind(_xhrMock.default);

exports.teardown = teardown;