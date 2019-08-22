export const OVERLAY_OPACITY = 0.7;
export const OVERLAY_PADDING = 10;

export const SHOULD_ANIMATE_OVERLAY = true;
export const SHOULD_SHOW_COUNTER = true;
export const SHOULD_OUTSIDE_CLICK_CLOSE = true;
export const ALLOW_KEYBOARD_CONTROL = true;
export const SHOULD_OUTSIDE_CLICK_NEXT = false;

export const ESC_KEY_CODE = 27;
export const LEFT_KEY_CODE = 37;
export const RIGHT_KEY_CODE = 39;

const prefix = 'fishd-guide';
export const ID_OVERLAY = `${prefix}-driver-page-overlay`;
export const ID_STAGE = `${prefix}-driver-highlighted-element-stage`;
export const ID_POPOVER = `${prefix}-driver-popover-item`;

export const CLASS_DRIVER_HIGHLIGHTED_ELEMENT = `${prefix}-driver-highlighted-element`;
export const CLASS_POSITION_RELATIVE = `${prefix}-driver-position-relative`;
export const CLASS_FIX_STACKING_CONTEXT = `${prefix}-driver-fix-stacking`;

export const CLASS_STAGE_NO_ANIMATION = `${prefix}-driver-stage-no-animation`;
export const CLASS_POPOVER_TIP = `${prefix}-driver-popover-tip`;
export const CLASS_POPOVER_TITLE = `${prefix}-driver-popover-title`;
export const CLASS_POPOVER_DESCRIPTION = `${prefix}-driver-popover-description`;
export const CLASS_POPOVER_FOOTER = `${prefix}-driver-popover-footer`;
export const CLASS_CLOSE_BTN = `${prefix}-driver-close-btn`;
export const CLASS_SKIP_BTN = `${prefix}-driver-skip-btn`;
export const CLASS_NEXT_STEP_BTN = `${prefix}-driver-next-btn`;
export const CLASS_PREV_STEP_BTN = `${prefix}-driver-prev-btn`;
export const CLASS_BTN_DISABLED = `${prefix}-driver-disabled`;
export const CLASS_NAVIGATION_BTNS = `${prefix}-driver-navigation-btns`;
export const CLASS_STAGE_INDEX = `${prefix}-driver-stage-index`;

// NOTE: It must match the one set in the animations in CSS file
export const ANIMATION_DURATION_MS = 500;

// language=HTML
export const POPOVER_HTML = (className = '') => `
  <div id="${ID_POPOVER}" class="${className}">
    <div class="${CLASS_POPOVER_TIP}"></div>
    <div class="${CLASS_POPOVER_TITLE}">Popover Title</div>
    <div class="${CLASS_POPOVER_DESCRIPTION}">Popover Description</div>
    <i class="${CLASS_CLOSE_BTN} fishdicon fishdicon-close-modal-line"></i>
    <div class="driver-clearfix ${CLASS_POPOVER_FOOTER}">
      <div class="${CLASS_SKIP_BTN}">跳过</div>
      <span class="driver-btn-group ${CLASS_NAVIGATION_BTNS}">
        <button class="${CLASS_PREV_STEP_BTN}">上一步</button>
        <button class="${CLASS_NEXT_STEP_BTN} btn-primary">下一步</button>
      </span>
    </div>
  </div>`;

export const OVERLAY_HTML = `<div id="${ID_OVERLAY}"></div>`;
export const STAGE_HTML = () => `
  <div id="${ID_STAGE}">
    <div class="${CLASS_STAGE_INDEX}"></div>
  </div>`;
