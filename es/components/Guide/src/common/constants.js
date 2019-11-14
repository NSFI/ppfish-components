export var OVERLAY_OPACITY = 0.7;
export var OVERLAY_PADDING = 10;
export var SHOULD_ANIMATE_OVERLAY = true;
export var SHOULD_SHOW_COUNTER = true;
export var SHOULD_OUTSIDE_CLICK_CLOSE = true;
export var ALLOW_KEYBOARD_CONTROL = true;
export var SHOULD_OUTSIDE_CLICK_NEXT = false;
export var ESC_KEY_CODE = 27;
export var LEFT_KEY_CODE = 37;
export var RIGHT_KEY_CODE = 39;
var prefix = 'fishd-guide';
export var ID_OVERLAY = "".concat(prefix, "-driver-page-overlay");
export var ID_STAGE = "".concat(prefix, "-driver-highlighted-element-stage");
export var ID_POPOVER = "".concat(prefix, "-driver-popover-item");
export var CLASS_DRIVER_HIGHLIGHTED_ELEMENT = "".concat(prefix, "-driver-highlighted-element");
export var CLASS_POSITION_RELATIVE = "".concat(prefix, "-driver-position-relative");
export var CLASS_FIX_STACKING_CONTEXT = "".concat(prefix, "-driver-fix-stacking");
export var CLASS_STAGE_NO_ANIMATION = "".concat(prefix, "-driver-stage-no-animation");
export var CLASS_POPOVER_TIP = "".concat(prefix, "-driver-popover-tip");
export var CLASS_POPOVER_TITLE = "".concat(prefix, "-driver-popover-title");
export var CLASS_POPOVER_DESCRIPTION = "".concat(prefix, "-driver-popover-description");
export var CLASS_POPOVER_FOOTER = "".concat(prefix, "-driver-popover-footer");
export var CLASS_CLOSE_BTN = "".concat(prefix, "-driver-close-btn");
export var CLASS_SKIP_BTN = "".concat(prefix, "-driver-skip-btn");
export var CLASS_NEXT_STEP_BTN = "".concat(prefix, "-driver-next-btn");
export var CLASS_PREV_STEP_BTN = "".concat(prefix, "-driver-prev-btn");
export var CLASS_BTN_DISABLED = "".concat(prefix, "-driver-disabled");
export var CLASS_NAVIGATION_BTNS = "".concat(prefix, "-driver-navigation-btns");
export var CLASS_STAGE_INDEX = "".concat(prefix, "-driver-stage-index"); // NOTE: It must match the one set in the animations in CSS file

export var ANIMATION_DURATION_MS = 500; // language=HTML

export var POPOVER_HTML = function POPOVER_HTML() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "\n  <div id=\"".concat(ID_POPOVER, "\" class=\"").concat(className, "\">\n    <div class=\"").concat(CLASS_POPOVER_TIP, "\"></div>\n    <div class=\"").concat(CLASS_POPOVER_TITLE, "\">Popover Title</div>\n    <div class=\"").concat(CLASS_POPOVER_DESCRIPTION, "\">Popover Description</div>\n    <i class=\"").concat(CLASS_CLOSE_BTN, " fishdicon fishdicon-close-modal-line\"></i>\n    <div class=\"driver-clearfix ").concat(CLASS_POPOVER_FOOTER, "\">\n      <div class=\"").concat(CLASS_SKIP_BTN, "\">\u8DF3\u8FC7</div>\n      <span class=\"driver-btn-group ").concat(CLASS_NAVIGATION_BTNS, "\">\n        <button class=\"").concat(CLASS_PREV_STEP_BTN, "\">\u4E0A\u4E00\u6B65</button>\n        <button class=\"").concat(CLASS_NEXT_STEP_BTN, " btn-primary\">\u4E0B\u4E00\u6B65</button>\n      </span>\n    </div>\n  </div>");
};
export var OVERLAY_HTML = "<div id=\"".concat(ID_OVERLAY, "\"></div>");
export var STAGE_HTML = function STAGE_HTML() {
  return "\n  <div id=\"".concat(ID_STAGE, "\">\n    <div class=\"").concat(CLASS_STAGE_INDEX, "\"></div>\n  </div>");
};