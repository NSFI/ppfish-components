"use strict";

exports.__esModule = true;
exports.default = void 0;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var enhancer = function enhancer(WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_WrappedComponent) {
      _inheritsLoose(Progress, _WrappedComponent);

      function Progress() {
        return _WrappedComponent.apply(this, arguments) || this;
      }

      var _proto = Progress.prototype;

      _proto.componentDidUpdate = function componentDidUpdate() {
        if (!this.path) {
          return;
        }

        var pathStyle = this.path.style;
        pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';
        var now = Date.now();

        if (this.prevTimeStamp && now - this.prevTimeStamp < 100) {
          pathStyle.transitionDuration = '0s, 0s';
        }

        this.prevTimeStamp = Date.now();
      };

      _proto.render = function render() {
        return _WrappedComponent.prototype.render.call(this);
      };

      return Progress;
    }(WrappedComponent)
  );
};

var _default = enhancer;
exports.default = _default;