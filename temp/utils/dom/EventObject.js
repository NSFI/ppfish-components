import EventBaseObject from './EventBaseObject';
const TRUE = true;
const FALSE = false;
const commonProps = [
  'altKey', 'bubbles', 'cancelable',
  'ctrlKey', 'currentTarget', 'eventPhase',
  'metaKey', 'shiftKey', 'target',
  'timeStamp', 'view', 'type',
];

function isNullOrUndefined(w) {
  return w === null || w === undefined;
}

const eventNormalizers = [
  {
    reg: /^key/,
    props: ['char', 'charCode', 'key', 'keyCode', 'which'],
    fix(event, nativeEvent) {
      if (isNullOrUndefined(event.which)) {
        event.which = !isNullOrUndefined(nativeEvent.charCode) ?
          nativeEvent.charCode : nativeEvent.keyCode;
      }

      // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
      if (event.metaKey === undefined) {
        event.metaKey = event.ctrlKey;
      }
    },
  },
  {
    reg: /^touch/,
    props: ['touches', 'changedTouches', 'targetTouches'],
  },
  {
    reg: /^hashchange$/,
    props: ['newURL', 'oldURL'],
  },
  {
    reg: /^gesturechange$/i,
    props: ['rotation', 'scale'],
  },
  {
    reg: /^(mousewheel|DOMMouseScroll)$/,
    props: [],
    fix(event, nativeEvent) {
      let deltaX;
      let deltaY;
      let delta;
      const wheelDelta = nativeEvent.wheelDelta;
      const axis = nativeEvent.axis;
      const wheelDeltaY = nativeEvent.wheelDeltaY;
      const wheelDeltaX = nativeEvent.wheelDeltaX;
      const detail = nativeEvent.detail;

      // ie/webkit
      if (wheelDelta) {
        delta = wheelDelta / 120;
      }

      // gecko
      if (detail) {
        // press control e.detail == 1 else e.detail == 3
        delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
      }

      // Gecko
      if (axis !== undefined) {
        if (axis === event.HORIZONTAL_AXIS) {
          deltaY = 0;
          deltaX = 0 - delta;
        } else if (axis === event.VERTICAL_AXIS) {
          deltaX = 0;
          deltaY = delta;
        }
      }

      // Webkit
      if (wheelDeltaY !== undefined) {
        deltaY = wheelDeltaY / 120;
      }
      if (wheelDeltaX !== undefined) {
        deltaX = -1 * wheelDeltaX / 120;
      }

      // 默认 deltaY (ie)
      if (!deltaX && !deltaY) {
        deltaY = delta;
      }

      if (deltaX !== undefined) {
        /**
         * deltaX of mousewheel event
         * @property deltaX
         * @member Event.DomEvent.Object
         */
        event.deltaX = deltaX;
      }

      if (deltaY !== undefined) {
        /**
         * deltaY of mousewheel event
         * @property deltaY
         * @member Event.DomEvent.Object
         */
        event.deltaY = deltaY;
      }

      if (delta !== undefined) {
        /**
         * delta of mousewheel event
         * @property delta
         * @member Event.DomEvent.Object
         */
        event.delta = delta;
      }
    },
  },
  {
    reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
    props: [
      'buttons', 'clientX', 'clientY', 'button',
      'offsetX', 'relatedTarget', 'which',
      'fromElement', 'toElement', 'offsetY',
      'pageX', 'pageY', 'screenX', 'screenY',
    ],
    fix(event, nativeEvent) {
      let eventDoc;
      let doc;
      let body;
      const target = event.target;
      const button = nativeEvent.button;

      // Calculate pageX/Y if missing and clientX/Y available
      if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
        eventDoc = target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;
        event.pageX = nativeEvent.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = nativeEvent.clientY +
          (doc && doc.scrollTop || body && body.scrollTop || 0) -
          (doc && doc.clientTop || body && body.clientTop || 0);
      }

      // which for click: 1 === left; 2 === middle; 3 === right
      // do not use button
      if (!event.which && button !== undefined) {
        if (button & 1) {
          event.which = 1;
        } else if (button & 2) {
          event.which = 3;
        } else if (button & 4) {
          event.which = 2;
        } else {
          event.which = 0;
        }
      }

      // add relatedTarget, if necessary
      if (!event.relatedTarget && event.fromElement) {
        event.relatedTarget = (event.fromElement === target) ? event.toElement : event.fromElement;
      }

      return event;
    },
  },
];

function retTrue() {
  return TRUE;
}

function retFalse() {
  return FALSE;
}

function DomEventObject(nativeEvent) {
  const type = nativeEvent.type;

  const isNative = (typeof nativeEvent.stopPropagation === 'function') ||
    (typeof nativeEvent.cancelBubble === 'boolean');

  EventBaseObject.call(this);

  this.nativeEvent = nativeEvent;

  // in case dom event has been mark as default prevented by lower dom node
  let isDefaultPrevented = retFalse;
  if ('defaultPrevented' in nativeEvent) {
    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
  } else if ('getPreventDefault' in nativeEvent) {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
  } else if ('returnValue' in nativeEvent) {
    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
  }

  this.isDefaultPrevented = isDefaultPrevented;

  const fixFns = [];
  let fixFn;
  let l;
  let prop;
  let props = commonProps.concat();

  eventNormalizers.forEach((normalizer) => {
    if (type.match(normalizer.reg)) {
      props = props.concat(normalizer.props);
      if (normalizer.fix) {
        fixFns.push(normalizer.fix);
      }
    }
  });

  l = props.length;

  // clone properties of the original event object
  while (l) {
    prop = props[--l];
    this[prop] = nativeEvent[prop];
  }

  // fix target property, if necessary
  if (!this.target && isNative) {
    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
  }

  // check if target is a text node (safari)
  if (this.target && this.target.nodeType === 3) {
    this.target = this.target.parentNode;
  }

  l = fixFns.length;

  while (l) {
    fixFn = fixFns[--l];
    fixFn(this, nativeEvent);
  }

  this.timeStamp = nativeEvent.timeStamp || Date.now();
}

const EventBaseObjectProto = EventBaseObject.prototype;

Object.assign(DomEventObject.prototype, EventBaseObjectProto, {
  constructor: DomEventObject,

  preventDefault() {
    const e = this.nativeEvent;

    // if preventDefault exists run it on the original event
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      // otherwise set the returnValue property of the original event to FALSE (IE)
      e.returnValue = FALSE;
    }

    EventBaseObjectProto.preventDefault.call(this);
  },

  stopPropagation() {
    const e = this.nativeEvent;

    // if stopPropagation exists run it on the original event
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      // otherwise set the cancelBubble property of the original event to TRUE (IE)
      e.cancelBubble = TRUE;
    }

    EventBaseObjectProto.stopPropagation.call(this);
  },
});

export default DomEventObject;
