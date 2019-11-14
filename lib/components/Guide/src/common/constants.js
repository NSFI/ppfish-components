"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STAGE_HTML = exports.OVERLAY_HTML = exports.POPOVER_HTML = exports.ANIMATION_DURATION_MS = exports.CLASS_STAGE_INDEX = exports.CLASS_NAVIGATION_BTNS = exports.CLASS_BTN_DISABLED = exports.CLASS_PREV_STEP_BTN = exports.CLASS_NEXT_STEP_BTN = exports.CLASS_SKIP_BTN = exports.CLASS_CLOSE_BTN = exports.CLASS_POPOVER_FOOTER = exports.CLASS_POPOVER_DESCRIPTION = exports.CLASS_POPOVER_TITLE = exports.CLASS_POPOVER_TIP = exports.CLASS_STAGE_NO_ANIMATION = exports.CLASS_FIX_STACKING_CONTEXT = exports.CLASS_POSITION_RELATIVE = exports.CLASS_DRIVER_HIGHLIGHTED_ELEMENT = exports.ID_POPOVER = exports.ID_STAGE = exports.ID_OVERLAY = exports.RIGHT_KEY_CODE = exports.LEFT_KEY_CODE = exports.ESC_KEY_CODE = exports.SHOULD_OUTSIDE_CLICK_NEXT = exports.ALLOW_KEYBOARD_CONTROL = exports.SHOULD_OUTSIDE_CLICK_CLOSE = exports.SHOULD_SHOW_COUNTER = exports.SHOULD_ANIMATE_OVERLAY = exports.OVERLAY_PADDING = exports.OVERLAY_OPACITY = void 0;
var OVERLAY_OPACITY = 0.7;
exports.OVERLAY_OPACITY = OVERLAY_OPACITY;
var OVERLAY_PADDING = 10;
exports.OVERLAY_PADDING = OVERLAY_PADDING;
var SHOULD_ANIMATE_OVERLAY = true;
exports.SHOULD_ANIMATE_OVERLAY = SHOULD_ANIMATE_OVERLAY;
var SHOULD_SHOW_COUNTER = true;
exports.SHOULD_SHOW_COUNTER = SHOULD_SHOW_COUNTER;
var SHOULD_OUTSIDE_CLICK_CLOSE = true;
exports.SHOULD_OUTSIDE_CLICK_CLOSE = SHOULD_OUTSIDE_CLICK_CLOSE;
var ALLOW_KEYBOARD_CONTROL = true;
exports.ALLOW_KEYBOARD_CONTROL = ALLOW_KEYBOARD_CONTROL;
var SHOULD_OUTSIDE_CLICK_NEXT = false;
exports.SHOULD_OUTSIDE_CLICK_NEXT = SHOULD_OUTSIDE_CLICK_NEXT;
var ESC_KEY_CODE = 27;
exports.ESC_KEY_CODE = ESC_KEY_CODE;
var LEFT_KEY_CODE = 37;
exports.LEFT_KEY_CODE = LEFT_KEY_CODE;
var RIGHT_KEY_CODE = 39;
exports.RIGHT_KEY_CODE = RIGHT_KEY_CODE;
var prefix = 'fishd-guide';
var ID_OVERLAY = "".concat(prefix, "-driver-page-overlay");
exports.ID_OVERLAY = ID_OVERLAY;
var ID_STAGE = "".concat(prefix, "-driver-highlighted-element-stage");
exports.ID_STAGE = ID_STAGE;
var ID_POPOVER = "".concat(prefix, "-driver-popover-item");
exports.ID_POPOVER = ID_POPOVER;
var CLASS_DRIVER_HIGHLIGHTED_ELEMENT = "".concat(prefix, "-driver-highlighted-element");
exports.CLASS_DRIVER_HIGHLIGHTED_ELEMENT = CLASS_DRIVER_HIGHLIGHTED_ELEMENT;
var CLASS_POSITION_RELATIVE = "".concat(prefix, "-driver-position-relative");
exports.CLASS_POSITION_RELATIVE = CLASS_POSITION_RELATIVE;
var CLASS_FIX_STACKING_CONTEXT = "".concat(prefix, "-driver-fix-stacking");
exports.CLASS_FIX_STACKING_CONTEXT = CLASS_FIX_STACKING_CONTEXT;
var CLASS_STAGE_NO_ANIMATION = "".concat(prefix, "-driver-stage-no-animation");
exports.CLASS_STAGE_NO_ANIMATION = CLASS_STAGE_NO_ANIMATION;
var CLASS_POPOVER_TIP = "".concat(prefix, "-driver-popover-tip");
exports.CLASS_POPOVER_TIP = CLASS_POPOVER_TIP;
var CLASS_POPOVER_TITLE = "".concat(prefix, "-driver-popover-title");
exports.CLASS_POPOVER_TITLE = CLASS_POPOVER_TITLE;
var CLASS_POPOVER_DESCRIPTION = "".concat(prefix, "-driver-popover-description");
exports.CLASS_POPOVER_DESCRIPTION = CLASS_POPOVER_DESCRIPTION;
var CLASS_POPOVER_FOOTER = "".concat(prefix, "-driver-popover-footer");
exports.CLASS_POPOVER_FOOTER = CLASS_POPOVER_FOOTER;
var CLASS_CLOSE_BTN = "".concat(prefix, "-driver-close-btn");
exports.CLASS_CLOSE_BTN = CLASS_CLOSE_BTN;
var CLASS_SKIP_BTN = "".concat(prefix, "-driver-skip-btn");
exports.CLASS_SKIP_BTN = CLASS_SKIP_BTN;
var CLASS_NEXT_STEP_BTN = "".concat(prefix, "-driver-next-btn");
exports.CLASS_NEXT_STEP_BTN = CLASS_NEXT_STEP_BTN;
var CLASS_PREV_STEP_BTN = "".concat(prefix, "-driver-prev-btn");
exports.CLASS_PREV_STEP_BTN = CLASS_PREV_STEP_BTN;
var CLASS_BTN_DISABLED = "".concat(prefix, "-driver-disabled");
exports.CLASS_BTN_DISABLED = CLASS_BTN_DISABLED;
var CLASS_NAVIGATION_BTNS = "".concat(prefix, "-driver-navigation-btns");
exports.CLASS_NAVIGATION_BTNS = CLASS_NAVIGATION_BTNS;
var CLASS_STAGE_INDEX = "".concat(prefix, "-driver-stage-index"); // NOTE: It must match the one set in the animations in CSS file

exports.CLASS_STAGE_INDEX = CLASS_STAGE_INDEX;
var ANIMATION_DURATION_MS = 500; // language=HTML

exports.ANIMATION_DURATION_MS = ANIMATION_DURATION_MS;

var POPOVER_HTML = function POPOVER_HTML() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "\n  <div id=\"".concat(ID_POPOVER, "\" class=\"").concat(className, "\">\n    <div class=\"").concat(CLASS_POPOVER_TIP, "\"></div>\n    <div class=\"").concat(CLASS_POPOVER_TITLE, "\">Popover Title</div>\n    <div class=\"").concat(CLASS_POPOVER_DESCRIPTION, "\">Popover Description</div>\n    <i class=\"").concat(CLASS_CLOSE_BTN, " fishdicon fishdicon-close-modal-line\"></i>\n    <div class=\"driver-clearfix ").concat(CLASS_POPOVER_FOOTER, "\">\n      <div class=\"").concat(CLASS_SKIP_BTN, "\">\u8DF3\u8FC7</div>\n      <span class=\"driver-btn-group ").concat(CLASS_NAVIGATION_BTNS, "\">\n        <button class=\"").concat(CLASS_PREV_STEP_BTN, "\">\u4E0A\u4E00\u6B65</button>\n        <button class=\"").concat(CLASS_NEXT_STEP_BTN, " btn-primary\">\u4E0B\u4E00\u6B65</button>\n      </span>\n    </div>\n  </div>");
};

exports.POPOVER_HTML = POPOVER_HTML;
var OVERLAY_HTML = "<div id=\"".concat(ID_OVERLAY, "\"></div>");
exports.OVERLAY_HTML = OVERLAY_HTML;

var STAGE_HTML = function STAGE_HTML() {
  return "\n  <div id=\"".concat(ID_STAGE, "\">\n    <div class=\"").concat(CLASS_STAGE_INDEX, "\"></div>\n  </div>");
};

exports.STAGE_HTML = STAGE_HTML;