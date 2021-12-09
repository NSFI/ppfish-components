import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import Modal from '../Modal';
import Icon from '../Icon';
import ToolTip from '../Tooltip';
import Table from '../Table';
import TableDraggableHOC from './TableDraggableHOC';
import { ColumnFiltrateProps, ColumnFiltrateState } from './interface';
import ConfigConsumer from '../Config/Consumer';

const getColumnKey = column => {
  if ('colSpan' in column) {
    return column.filtrateTitle || column.title;
  } else {
    return column.key || column.dataIndex || column.filtrateTitle || column.title;
  }
};

const flatten = arr => {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
};

const getCheckedOptions = (columns, hideColumns, defaultColumns) => {
  return (
      columns
      // 去除默认列
      .filter(column => defaultColumns.findIndex(key => key === getColumnKey(column)) === -1)
      // 去除表头合并不显示的列
      .filter(column => column.colSpan !== 0)
      // 去除初始化就被隐藏的列
      .filter(column => hideColumns.findIndex(key => key === getColumnKey(column)) === -1)
      // 只留uniqueId
      .map(column => getColumnKey(column))
  );
};

const getColSpanOption = columns => {
  const colSpanOption = [];
  columns.forEach((column, index) => {
    if ('colSpan' in column && column.colSpan !== 0) {
      colSpanOption.push({
        key: column.filtrateTitle || column.title,
        value: columns
          .slice(index, index + column.colSpan)
          .map(column => column.key || column.dataIndex),
      });
    }
  });
  return colSpanOption;
};

class ColumnFiltrateDraggableModal<T> extends React.Component<ColumnFiltrateProps<T>, ColumnFiltrateState> {
  static defaultProps = {
    columns: [],
    defaultColumns: [],
    hideColumns: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps = {} } = prevState;
    const newState: any = { prevProps: nextProps };
    //监听column个数变化，重新初始化checkedOption
    if ('columns' in nextProps && nextProps.columns.length !== prevProps.columns.length) {
      const { columns, hideColumns, defaultColumns } = nextProps;
      const option = getCheckedOptions(columns, hideColumns, defaultColumns);
      newState.checkedOption = option;
      newState.checkedOptionConfirm = option;
      newState.colSpanOption = getColSpanOption(columns);
    }
    return newState;
  }

  constructor(props: ColumnFiltrateProps<T>) {
    super(props);
    const { columns, hideColumns, defaultColumns } = this.props;
    const option = getCheckedOptions(columns, hideColumns, defaultColumns);
    this.state = {
      visible: false,
      checkedOption: option,
      checkedOptionConfirm: option,
      okButtonDisabled: true,
      prevProps: props,
      colSpanOption: getColSpanOption(columns)
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState(
      {
        visible: false,
        checkedOptionConfirm: this.state.checkedOption,
        okButtonDisabled: true,
      },
      () => {
        // 被隐藏的列表key
        this.props.onChange(
          flatten(
            this.getOptions()
              .filter(column => this.state.checkedOptionConfirm.indexOf(column.value) === -1)
              .map(column => {
                const indexOfColSpan = this.state.colSpanOption.findIndex(
                  option => option.key === column.value,
                );
                if (indexOfColSpan !== -1) {
                  return this.state.colSpanOption[indexOfColSpan].value;
                } else {
                  return column.value;
                }
              }),
          ),
          this.props.defaultColumns.concat(this.state.checkedOption)
        );
      },
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      checkedOption: this.state.checkedOptionConfirm,
      okButtonDisabled: true,
    });
  };

  onChange = checkedOption => {
    this.setState({
      checkedOption,
      okButtonDisabled: false
    });
  };

  getOptions = () => {
    const { columns, defaultColumns } = this.props;
    return (
      columns
        // 去除表头合并的不显示的
        .filter(column => column.colSpan !== 0)
        // 获取他们的label、value、disabled
        .map(column => {
          const uniqKey = getColumnKey(column);
          //fixed /分组不能控制显示隐藏
          const disabled = !!column.fixed || !!column.children || !!column.filtrateDefault;
          const title = column.filtrateTitle || column.title;
          return {
            label: <ToolTip title={title}>{title}</ToolTip>,
            value: uniqKey,
            disabled: disabled,
          };
        })
        // 去除默认展示数据项
        .filter(column => defaultColumns.findIndex(key => key === column.value) === -1)
    );
  };

  getDataSource = () => {
    const { columns, defaultColumns } = this.props;
    const { checkedOption } = this.state;
    let selectRows = columns.filter(column => defaultColumns.findIndex(key => key === getColumnKey(column)) != -1);
    let unSelectRows = [];
    for (let key of checkedOption) {
      selectRows = selectRows.concat(columns.filter(each => each.key == key));
    }

    for (let each of columns.filter(column => defaultColumns.findIndex(key => key === getColumnKey(column)) === -1)) {
      if (checkedOption.includes(each.key)) {
        each.selected = true;
      } else {
        each.selected = false;
        unSelectRows.push(each);
      }
    }
    return selectRows.concat(unSelectRows);
  }

  render() {
    const { prefixCls, defaultColumns } = this.props;
    const { visible, checkedOption, okButtonDisabled } = this.state;
    const DraggableTable = TableDraggableHOC(Table, {
      dnd: true,
      renderBodyRow(props) {
        const { index, ...restProps } = props;
        return <tr {...restProps} />;
      },
      dndRow(props) {
        if (props.record.selected) {
          return true;
        } else {
          return false;
        }
      }
    });
    const draggableTableColumns = [
      {
        title: '字段',
        dataIndex: 'title',
        render: (val, row) => {
          return (
            <span>
              {val}
            </span>
          );
        }
      },
      {
        title: '拖拽排序',
        dataIndex: 'operate',
        render: (val, row) => {
          let isDefault = defaultColumns.findIndex(key => key === getColumnKey(row)) != -1;
          if (checkedOption.findIndex(key => key === getColumnKey(row)) != -1 && !isDefault) {
            return <Icon type="sound-drag" />
          } else {
            return null
          }
        }
      },
    ];
    return (
      <ConfigConsumer componentName="Table">
        {Locale => {
          return (
            <div>
              <Icon
                className={`${prefixCls}-filtrate-icon`}
                type="Settingx"
                onClick={this.showModal}
              />
              <Modal
                title={Locale.modalTitle}
                wrapClassName={`${prefixCls}-filtrate-modal`}
                visible={visible}
                width={680}
                okButtonDisabled={okButtonDisabled}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={Locale.okText}
                cancelText={Locale.cancelText}
              >
                <DraggableTable
                  rowKey='key'
                  columns={draggableTableColumns}
                  dataSource={this.getDataSource()}
                  pagination={false}
                  rowSelection={{
                    selectedRowKeys: checkedOption,
                    hideDefaultSelections: true,
                    showSelectAll: true,
                    type: 'checkbox',
                    onChange: this.onChange,
                    getCheckboxProps: (record) => {
                      let isDefault = defaultColumns.findIndex(key => key === getColumnKey(record)) != -1;
                      return ({
                        disabled: isDefault,
                        name: record.title,
                        checked: isDefault || checkedOption.findIndex(key => key === getColumnKey(record)) != -1
                      })
                    }
                  }}
                  onRowMoved={(fields) => {
                    const checkedOption = fields.filter(each => each.selected).map(column => getColumnKey(column));
                    this.onChange(checkedOption);
                  }}
                />
              </Modal>
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}

polyfill(ColumnFiltrateDraggableModal);

export default ColumnFiltrateDraggableModal;