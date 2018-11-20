import {require_condition} from './assert';
import * as Errors from './errors';

export {require_condition, Errors};

export function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  if (!step) {
    step = stop < start ? -1 : 1;
  }

  let length = Math.max(Math.ceil((stop - start) / step), 0);
  let range = Array(length);

  for (let idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
}
