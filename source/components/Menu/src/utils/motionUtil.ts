import type { CSSMotionProps } from '../../../Motion';

export function getMotion(
  mode: string,
  motion?: CSSMotionProps,
  defaultMotions?: Record<string, CSSMotionProps>,
) {
  if (motion) {
    return motion;
  }

  if (defaultMotions) {
    return defaultMotions[mode] || defaultMotions.other;
  }

  return undefined;
}
