"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Color =
/*#__PURE__*/
function () {
  function Color(input) {
    var _this = this;

    _defineProperty(this, "initRgb", function () {
      var _this$color$toRgb = _this.color.toRgb(),
          r = _this$color$toRgb.r,
          g = _this$color$toRgb.g,
          b = _this$color$toRgb.b;

      _this.redValue = r;
      _this.greenValue = g;
      _this.blueValue = b;
    });

    _defineProperty(this, "initHsb", function () {
      var _this$color$toHsv = _this.color.toHsv(),
          h = _this$color$toHsv.h,
          s = _this$color$toHsv.s,
          v = _this$color$toHsv.v;

      _this.hueValue = h;
      _this.saturationValue = s;
      _this.brightnessValue = v;
    });

    _defineProperty(this, "toHexString", function () {
      return _this.color.toHexString();
    });

    _defineProperty(this, "toRgbString", function () {
      return _this.color.toRgbString();
    });

    this.color = (0, _tinycolor.default)(input);
    this.initRgb();
    this.initHsb();
    var initAlpha = input && input.alpha || this.color.toRgb().a;
    this.alphaValue = Math.min(1, initAlpha) * 100;
  }

  Color.isValidHex = function isValidHex(hex) {
    return (0, _tinycolor.default)(hex).isValid();
  };

  _createClass(Color, [{
    key: "hex",
    get: function get() {
      return this.color.toHex();
    } // 色调

  }, {
    key: "hue",
    set: function set(value) {
      this.color = (0, _tinycolor.default)({
        h: value,
        s: this.saturation,
        v: this.brightness
      });
      this.initRgb();
      this.hueValue = value;
    },
    get: function get() {
      return this.hueValue;
    } // 饱和度

  }, {
    key: "saturation",
    set: function set(value) {
      this.color = (0, _tinycolor.default)({
        h: this.hue,
        s: value,
        v: this.brightness
      });
      this.initRgb();
      this.saturationValue = value;
    },
    get: function get() {
      return this.saturationValue;
    } // 亮度

  }, {
    key: "lightness",
    set: function set(value) {
      this.color = (0, _tinycolor.default)({
        h: this.hue,
        s: this.saturation,
        l: value
      });
      this.initRgb();
      this.lightnessValue = value;
    },
    get: function get() {
      return this.lightnessValue;
    }
  }, {
    key: "brightness",
    set: function set(value) {
      this.color = (0, _tinycolor.default)({
        h: this.hue,
        s: this.saturation,
        v: value
      });
      this.initRgb();
      this.brightnessValue = value;
    },
    get: function get() {
      return this.brightnessValue;
    } // red

  }, {
    key: "red",
    set: function set(value) {
      var rgb = this.color.toRgb();
      this.color = (0, _tinycolor.default)(Object.assign({}, rgb, {
        r: value
      }));
      this.initHsb();
      this.redValue = value;
    },
    get: function get() {
      return this.redValue;
    } // green

  }, {
    key: "green",
    set: function set(value) {
      var rgb = this.color.toRgb();
      this.color = (0, _tinycolor.default)(Object.assign({}, rgb, {
        g: value
      }));
      this.initHsb();
      this.greenValue = value;
    },
    get: function get() {
      return this.greenValue;
    } // blue

  }, {
    key: "blue",
    set: function set(value) {
      var rgb = this.color.toRgb();
      this.color = (0, _tinycolor.default)(Object.assign({}, rgb, {
        b: value
      }));
      this.initHsb();
      this.blueValue = value;
    },
    get: function get() {
      return this.blueValue;
    } // alpha

  }, {
    key: "alpha",
    set: function set(value) {
      this.color.setAlpha(value / 100);
    },
    get: function get() {
      return this.color.getAlpha() * 100;
    }
  }, {
    key: "RGB",
    get: function get() {
      return [this.red, this.green, this.blue];
    }
  }, {
    key: "HSB",
    get: function get() {
      return [this.hue, this.saturation, this.brightness];
    }
  }]);

  return Color;
}();

exports.default = Color;