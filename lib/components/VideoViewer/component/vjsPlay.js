"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _video = _interopRequireDefault(require("video.js"));

var _Play = _interopRequireDefault(require("./Play"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var vjsComponent = _video.default.getComponent('Component');

var vjsPlay =
/*#__PURE__*/
function (_vjsComponent) {
  _inheritsLoose(vjsPlay, _vjsComponent);

  function vjsPlay(player, options) {
    var _this;

    _this = _vjsComponent.call(this, player, options) || this;
    /* Bind the current class context to the mount method */

    _this.mount = _this.mount.bind(_assertThisInitialized(_this));
    /* When player is ready, call method to mount React component */

    player.ready(function () {
      _this.mount();
    });
    /* Remove React root when component is destroyed */

    _this.on("dispose", function () {
      _reactDom.default.unmountComponentAtNode(_this.el());
    });

    return _this;
  }
  /**
   * We will render out the React EpisodeList component into the DOM element
   * generated automatically by the VideoJS createEl() method.
   *
   * We fetch that generated element using `this.el()`, a method provided by the
   * vjsComponent class that this class is extending.
   */


  var _proto = vjsPlay.prototype;

  _proto.mount = function mount() {
    var el = this.el();
    el.className = "vjs-control vjs-button vjs-customer-button vjs-play";

    _reactDom.default.render(_react.default.createElement(_Play.default, {
      vjsComponent: this
    }), el);
  };

  return vjsPlay;
}(vjsComponent);
/**
 * Make sure to register the vjsComponent so Video JS knows it exists
 */


vjsComponent.registerComponent('vjsPlay', vjsPlay);
var _default = vjsPlay;
exports.default = _default;