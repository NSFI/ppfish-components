export const STATUS_NONE = 'none' as const;
export const STATUS_APPEAR = 'appear' as const;
export const STATUS_ENTER = 'enter' as const;
export const STATUS_LEAVE = 'leave' as const;

export type MotionStatus =
  | typeof STATUS_NONE
  | typeof STATUS_APPEAR
  | typeof STATUS_ENTER
  | typeof STATUS_LEAVE;

export const STEP_NONE = 'none' as const;
export const STEP_PREPARE = 'prepare' as const;
export const STEP_START = 'start' as const;
export const STEP_ACTIVE = 'active' as const;
export const STEP_ACTIVATED = 'end' as const;

export type StepStatus =
  | typeof STEP_NONE
  | typeof STEP_PREPARE
  | typeof STEP_START
  | typeof STEP_ACTIVE
  | typeof STEP_ACTIVATED;

export type MotionEvent = (TransitionEvent | AnimationEvent) & {
  deadline?: boolean;
};

export type MotionPrepareEventHandler = (
  element: HTMLElement,
) => Promise<any> | void;

export type MotionEventHandler = (
  element: HTMLElement,
  event: MotionEvent,
) => React.CSSProperties | void;

export type MotionEndEventHandler = (
  element: HTMLElement,
  event: MotionEvent,
) => boolean | void;