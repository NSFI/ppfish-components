import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import DragAndDrop from './DragAndDrop';
import './index.less';

const modulePrefix = 'TableDraggable';
let dragingIndex = -1;

/**
 * @param {*} WrappedTable
 * @param {*} config
 *                - dnd 是否启用 Drag&Drop
 *                - renderBodyRow 自定义渲染 row
 */
const TableDraggableHOC = (WrappedTable, config) => {
  class BodyRow extends Component {
    render() {
      const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
      const style = { ...restProps.style, cursor: 'move' };
      const style2 = { ...restProps.style, cursor: 'auto' };

      let { className } = restProps;

      if (isOver) {
        if (restProps.index > dragingIndex) {
          className += ' drop-over-downward';
        }
        if (restProps.index < dragingIndex) {
          className += ' drop-over-upward';
        }
      }

      if (config.renderBodyRow) {
        let rendered = config.renderBodyRow({ ...restProps, className, style });
        let renderedNoMove = config.renderBodyRow({ ...restProps, className, style2 });

        // 自定义渲染 TableRow 时是否开启拖拽功能
        if (config.dndRow) {
          let isRowDnd = config.dndRow({ ...restProps });
          return isRowDnd ? connectDragSource(connectDropTarget(rendered)) : renderedNoMove;
        } else {
          return renderedNoMove
            ? config.dnd
              ? connectDragSource(connectDropTarget(rendered))
              : renderedNoMove
            : null;
        }
      }

      return connectDragSource(connectDropTarget(<tr {...restProps} style={style} />));
    }
  }

  const rowSource = {
    beginDrag(props) {
      dragingIndex = props.index;

      return {
        record: props.record,
        index: props.index
      };
    }
  };

  const rowTarget = config.rowTarget || {
    drop(props, monitor) {
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Time to actually perform the action
      // 非自定义渲染 Row 时才进行移动
      props.moveRow(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  };

  const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }))(
    DragSource('row', rowSource, (connect) => ({
      connectDragSource: connect.dragSource()
    }))(BodyRow)
  );

  return class TableWrapper extends Component {
    static propTypes = {
      onRowMoved: PropTypes.func
    };

    state = {
      dataSource: []
    };

    components = {
      body: {
        row: DragableBodyRow
      }
    };

    componentDidMount() {
      this.setState({ dataSource: this.props.dataSource });
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.dataSource !== prevProps.dataSource &&
        this.props.dataSource !== this.state.dataSource
      ) {
        this.setState({ dataSource: this.props.dataSource });
      }
    }

    moveRow = (dragIndex, hoverIndex) => {
      const dataSource = this.state.dataSource.slice();

      // 自定义渲染 Row 时指定该项，不修改 Table 的 dataSource
      if (config.rowTarget) {
        this.props.onRowMoved && this.props.onRowMoved(dragIndex, hoverIndex);
      } else {
        // 默认逻辑：拖动 & 排序
        const dragged = dataSource.splice(dragIndex, 1)[0];
        dataSource.splice(hoverIndex, 0, dragged);
        this.setState({ dataSource });

        this.props.onRowMoved && this.props.onRowMoved(dataSource);
      }
    };

    render() {
      const { dataSource, onRow = () => { }, ...otherProps } = this.props;
      return (
        <DragAndDrop>
          <WrappedTable
            dataSource={this.state.dataSource}
            components={this.components}
            onRow={(record, index) => {
              return {
                record,
                index,
                moveRow: this.moveRow,
                ...onRow(record, index)
              };
            }}
            {...otherProps}
          />
        </DragAndDrop>
      );
    }
  };
};

export default TableDraggableHOC;
