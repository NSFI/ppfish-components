import React, { Component } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export default class DragAndDrop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        {this.props.children}
      </DndProvider>
    )
  }
}