import React from 'react';
import {SortableComposition as Sortable} from './SortableComposition';
import PropTypes from 'prop-types';

export {HORIZONTAL} from './SortableComposition';
export {VERTICAL} from './SortableComposition';


class SortableItem extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    )
  }
}

export default Sortable(SortableItem);
