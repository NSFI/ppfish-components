import React from 'react';
import { SortableComposition as _Sortable } from './SortableComposition';

export { HORIZONTAL } from './SortableComposition';
export { VERTICAL } from './SortableComposition';

function SortableItem(props: any) {
  return (
    <div {...props} className="fishd-list-sortable-item">
      {props.children}
    </div>
  );
}

const Sortable = _Sortable(SortableItem);

export default Sortable;
