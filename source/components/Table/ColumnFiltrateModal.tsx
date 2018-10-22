import React from 'react';
import Modal from '../Modal';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import ToolTip from '../Tooltip';
import {ColumnFiltrateProps, ColumnFiltrateState} from "./interface";

const CheckboxGroup = Checkbox.Group;

const getColumnKey = (column) => {
  if ('colSpan' in column) {
    return column.title;
  } else {
    return column.key || column.dataIndex || column.title;
  }
};

const flatten = (arr) => {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
};

export default class ColumnFiltrateModal<T> extends React.Component<ColumnFiltrateProps<T>, ColumnFiltrateState> {

  colSpanOption: { key: string | React.ReactNode, value: React.ReactText[] | string[] }[];

  static defaultProps = {
    defaultColumns: [],
    hideColumns: [],
  };

  constructor(props: ColumnFiltrateProps<T>) {
    super(props);
    const {columns, hideColumns} = this.props;
    const option = this.getCheckedOptions(columns, hideColumns);
    this.state = {
      visible: false,
      checkedOption: option,
      checkedOptionConfirm: option,
    };
  }

  componentWillReceiveProps(nextProps) {
    //监听column个数变化，重新初始化checkedOption
    if ('columns' in nextProps && nextProps.columns.length !== this.props.columns.length) {
      const {columns, hideColumns} = nextProps;
      const option = this.getCheckedOptions(columns, hideColumns);
      this.setState({
        checkedOption: option,
        checkedOptionConfirm: option,
      })
    }
  }

  getCheckedOptions = (columns, hideColumns) => {
    const option = columns
    // 去除表头合并不显示的列
      .filter(column => column.colSpan !== 0)
      // 去除初始化就被隐藏的列
      .filter(column => hideColumns.findIndex(key => key === getColumnKey(column)) === -1)
      // 只留uniqueId
      .map(column => getColumnKey(column));

    this.colSpanOption = [];
    columns.forEach((column, index) => {
      if ('colSpan' in column && column.colSpan !== 0) {
        this.colSpanOption.push({
          key: column.title,
          value: columns.slice(index, index + column.colSpan).map(column => column.key || column.dataIndex)
        })
      }
    });
    return option;
  };


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
      checkedOptionConfirm: this.state.checkedOption
    }, () => {
      // 被隐藏的列表key
      this.props.onChange(flatten(
        this.getOptions()
          .filter(column => this.state.checkedOptionConfirm.indexOf(column.value) === -1)
          .map(column => {
            const indexOfColSpan = this.colSpanOption.findIndex(option => option.key === column.value);
            if (indexOfColSpan !== -1) {
              return this.colSpanOption[indexOfColSpan].value;
            } else {
              return column.value;
            }
          })
      ));
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      checkedOption: this.state.checkedOptionConfirm
    });
  };

  onChange = (checkedOption) => {
    this.setState({checkedOption});
  };

  getOptions = () => {
    const {columns, defaultColumns} = this.props;
    return columns
    // 去除表头合并的不显示的
      .filter(column => column.colSpan !== 0)
      // 获取他们的label、value、disabled
      .map((column) => {
        const uniqKey = getColumnKey(column);
        //fixed /分组不能控制显示隐藏
        const disabled = !!column.fixed || !!column.children;
        return {
          label: <ToolTip title={column.title}>{column.title}</ToolTip>,
          value: uniqKey,
          disabled: disabled
        };
      })
      // 去除默认展示数据项
      .filter(column => defaultColumns.findIndex(key => key === column.value) === -1)
  };

  //默认一直显示的选项
  getDefaultOption = () => {
    const {columns, defaultColumns = []} = this.props;
    return columns
      .filter(column => defaultColumns.findIndex(key => key === getColumnKey(column)) !== -1)
      .map(column => ({
        label: <ToolTip title={column.title}>{column.title}</ToolTip>,
        value: getColumnKey(column),
        disabled: true
      }));
  };

  render() {
    const {prefixCls} = this.props;
    const {visible, checkedOption} = this.state;
    const options = this.getOptions();
    const defaultOption = this.getDefaultOption();
    return (
      <div>
        <Icon className={`${prefixCls}-filtrate-icon`} type="Settingx" onClick={this.showModal}/>
        <Modal
          title="选择需要展示的数据项"
          wrapClassName={`${prefixCls}-filtrate-modal`}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className={`${prefixCls}-filtrate-modal-enable-list`}>
            <CheckboxGroup value={checkedOption} options={options} onChange={this.onChange}/>
          </div>
          {
            defaultOption && !!defaultOption.length &&
            <div className={`${prefixCls}-filtrate-modal-disabled-list`}>
              <p className="title">默认展示数据项</p>
              <CheckboxGroup options={defaultOption} defaultValue={defaultOption.map(option => option.value)}/>
            </div>
          }
        </Modal>
      </div>
    )
  }
}
