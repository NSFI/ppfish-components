import React from 'react';
import {polyfill} from 'react-lifecycles-compat';

import Modal from '../Modal';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import ToolTip from '../Tooltip';
import {ColumnFiltrateProps, ColumnFiltrateState} from "./interface";

const CheckboxGroup = Checkbox.Group;

const getColumnKey = (column) => {
  if ('colSpan' in column) {
    return column.filtrateTitle || column.title;
  } else {
    return column.key || column.dataIndex || column.filtrateTitle || column.title;
  }
};

const flatten = (arr) => {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
};

const getCheckedOptions = (columns, hideColumns) => {
  return columns
  // 去除表头合并不显示的列
    .filter(column => column.colSpan !== 0)
    // 去除初始化就被隐藏的列
    .filter(column => hideColumns.findIndex(key => key === getColumnKey(column)) === -1)
    // 只留uniqueId
    .map(column => getColumnKey(column));
};

const getColSpanOption = (columns) => {
  const colSpanOption = [];
  columns.forEach((column, index) => {
    if ('colSpan' in column && column.colSpan !== 0) {
      colSpanOption.push({
        key: column.filtrateTitle || column.title,
        value: columns.slice(index, index + column.colSpan).map(column => column.key || column.dataIndex)
      });
    }
  });
  return colSpanOption;
};

class ColumnFiltrateModal<T> extends React.Component<ColumnFiltrateProps<T>, ColumnFiltrateState> {

  static defaultProps = {
    defaultColumns: [],
    hideColumns: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {prevProps = {}} = prevState;
    const newState: any = {prevProps: nextProps};
    //监听column个数变化，重新初始化checkedOption
    if ('columns' in nextProps && nextProps.columns.length !== prevProps.columns.length) {
      const {columns, hideColumns} = nextProps;
      const option = getCheckedOptions(columns, hideColumns);
      newState.checkedOption = option;
      newState.checkedOptionConfirm = option;
      newState.colSpanOption = getColSpanOption(columns);
    }
    return newState;
  }

  constructor(props: ColumnFiltrateProps<T>) {
    super(props);
    const {columns, hideColumns} = this.props;
    const option = getCheckedOptions(columns, hideColumns);
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
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
      checkedOptionConfirm: this.state.checkedOption,
      okButtonDisabled: true
    }, () => {
      // 被隐藏的列表key
      this.props.onChange(flatten(
        this.getOptions()
          .filter(column => this.state.checkedOptionConfirm.indexOf(column.value) === -1)
          .map(column => {
            const indexOfColSpan = this.state.colSpanOption.findIndex(option => option.key === column.value);
            if (indexOfColSpan !== -1) {
              return this.state.colSpanOption[indexOfColSpan].value;
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
      checkedOption: this.state.checkedOptionConfirm,
      okButtonDisabled: true
    });
  };

  onChange = (checkedOption) => {
    let { checkedOptionConfirm } = this.state;
    this.setState({
      checkedOption,
      okButtonDisabled: (
        JSON.stringify(checkedOption && checkedOption.sort()) == 
        JSON.stringify(checkedOptionConfirm && checkedOptionConfirm.sort())
      )
    });
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
        const title = column.filtrateTitle || column.title;
        return {
          label: <ToolTip title={title}>{title}</ToolTip>,
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
        label: <ToolTip title={column.filtrateTitle || column.title}>{column.filtrateTitle || column.title}</ToolTip>,
        value: getColumnKey(column),
        disabled: true
      }));
  };

  render() {
    const {prefixCls} = this.props;
    const {visible, checkedOption, okButtonDisabled} = this.state;
    const options = this.getOptions();
    const defaultOption = this.getDefaultOption();
    return (
      <div>
        <Icon className={`${prefixCls}-filtrate-icon`} type="Settingx" onClick={this.showModal}/>
        <Modal
          title="选择需要展示的数据项"
          wrapClassName={`${prefixCls}-filtrate-modal`}
          visible={visible}
          width={680}
          okButtonDisabled={okButtonDisabled}
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
    );
  }
}

polyfill(ColumnFiltrateModal);

export default ColumnFiltrateModal;
