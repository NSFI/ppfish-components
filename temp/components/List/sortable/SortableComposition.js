import React from 'react';
import PropTypes from 'prop-types';
import {swapArrayElements, isMouseBeyond} from './helpers.js';

export const VERTICAL = 'VERTICAL';
export const HORIZONTAL = 'HORIZONTAL';


/*** Higher-order component - this component works like a factory for draggable items */

let draggingIndex = null;

export function SortableComposition(Component, flowDirection = VERTICAL) {

  return class Sortable extends React.Component {

    static propTypes = {
      items: PropTypes.array.isRequired,
      onSortItems: PropTypes.func.isRequired,
      sortId: PropTypes.number,
      moveInMiddle: PropTypes.bool,
    };

    static defaultProps = {
      moveInMiddle: false
    };


    sortEnd = (e) => {
      e.preventDefault();
      draggingIndex = null;
    };

    sortStart = (e) => {
      draggingIndex = e.currentTarget.dataset.id;
      let dt = e.dataTransfer;
      if (dt !== undefined) {
        dt.effectAllowed = 'move';
        e.dataTransfer.setData('text', e.target.innerHTML);
        if (dt.setDragImage && e.currentTarget.tagName.toLowerCase() === 'a') {
          dt.setDragImage(e.target, 0, 0);
        }
      }
    };

    dragOver = (e) => {
      e.preventDefault();
      const {moveInMiddle} = this.props;
      const overEl = e.currentTarget; //underlying element
      const indexDragged = Number(overEl.dataset.id);//index of underlying element in the set DOM elements
      const indexFrom = Number(draggingIndex);
      const height = overEl.getBoundingClientRect().height;
      const width = overEl.getBoundingClientRect().width;
      const positionX = e.clientX;
      const positionY = e.clientY;
      const topOffset = overEl.getBoundingClientRect().top;
      const leftOffset = overEl.getBoundingClientRect().left;
      let mouseBeyond;
      let {items} = this.props;

      if (flowDirection === VERTICAL) {
        mouseBeyond = isMouseBeyond(positionY, topOffset, height, moveInMiddle);
      }

      if (flowDirection === HORIZONTAL) {
        mouseBeyond = isMouseBeyond(positionX, leftOffset, width, moveInMiddle);
      }

      if (indexDragged !== indexFrom && mouseBeyond) {
        items = swapArrayElements(items, indexFrom, indexDragged);
        draggingIndex = indexDragged;
        this.props.onSortItems(items);
      }
    };

    render() {
      let newProps = Object.assign({}, this.props);
      delete newProps.onSortItems;
      const {sortId, moveInMiddle, items, ...props} = newProps;
      return (
        <Component
          draggable={true}
          onDragOver={this.dragOver}
          onDragStart={this.sortStart}
          onDragEnd={this.sortEnd}
          onTouchStart={this.sortStart}
          onTouchMove={this.dragOver}
          onTouchEnd={this.sortEnd}
          data-id={sortId}
          {...props}
        />
      );
    }
  };

}
