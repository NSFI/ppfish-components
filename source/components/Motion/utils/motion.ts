import canUseDOM from 'rc-util/lib/Dom/canUseDom';
import { MotionName } from '../CSSMotion';

// ================= Transition =================
// Event wrapper. Copy from react source code
function makePrefixMap(styleProp: string, eventName: string) {
  const prefixes: Record<string, string> = {};

  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes[`Webkit${styleProp}`] = `webkit${eventName}`;
  prefixes[`Moz${styleProp}`] = `moz${eventName}`;
  prefixes[`ms${styleProp}`] = `MS${eventName}`;
  prefixes[`O${styleProp}`] = `o${eventName.toLowerCase()}`;

  return prefixes;
}

export function getVendorPrefixes(domSupport: boolean, win: object) {
  const prefixes: {
    animationend: Record<string, string>;
    transitionend: Record<string, string>;
  } = {
    animationend: makePrefixMap('Animation', 'AnimationEnd'),
    transitionend: makePrefixMap('Transition', 'TransitionEnd'),
  };

  if (domSupport) {
    if (!('AnimationEvent' in win)) {
      delete prefixes.animationend.animation;
    }

    if (!('TransitionEvent' in win)) {
      delete prefixes.transitionend.transition;
    }
  }

  return prefixes;
}

const vendorPrefixes = getVendorPrefixes(
  canUseDOM(),
  typeof window !== 'undefined' ? window : {},
);

let style = {};

if (canUseDOM()) {
  ({ style } = document.createElement('div'));
}

const prefixedEventNames = {};

export function getVendorPrefixedEventName(eventName: string) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  }

  const prefixMap = vendorPrefixes[eventName];

  if (prefixMap) {
    const stylePropList = Object.keys(prefixMap);
    const len = stylePropList.length;
    for (let i = 0; i < len; i += 1) {
      const styleProp = stylePropList[i];
      if (
        Object.prototype.hasOwnProperty.call(prefixMap, styleProp) &&
        styleProp in style
      ) {
        prefixedEventNames[eventName] = prefixMap[styleProp];
        return prefixedEventNames[eventName];
      }
    }
  }

  return '';
}

const internalAnimationEndName = getVendorPrefixedEventName('animationend');
const internalTransitionEndName = getVendorPrefixedEventName('transitionend');
export const supportTransition = !!(
  internalAnimationEndName && internalTransitionEndName
);

export const animationEndName = internalAnimationEndName || 'animationend';
export const transitionEndName = internalTransitionEndName || 'transitionend';

export function getTransitionName(
  transitionName: MotionName,
  transitionType: string,
) {
  if (!transitionName) return null;

  if (typeof transitionName === 'object') {
    const type = transitionType.replace(/-\w/g, match =>
      match[1].toUpperCase(),
    );
    return transitionName[type];
  }

  return `${transitionName}-${transitionType}`;
}