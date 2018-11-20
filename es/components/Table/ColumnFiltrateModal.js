import React from 'react';
import Modal from '../Modal';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import ToolTip from '../Tooltip';
const CheckboxGroup = Checkbox.Group;
const getColumnKey = (column) => {
    if ('colSpan' in column) {
        return column.filtrateTitle || column.title;
    }
    else {
        return column.key || column.dataIndex || column.filtrateTitle || column.title;
    }
};
const flatten = (arr) => {
    return arr.reduce(function (prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(next) : next);
    }, []);
};
export default class ColumnFiltrateModal extends React.Component {
    constructor(props) {
        super(props);
        this.getCheckedOptions = (columns, hideColumns) => {
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
                        key: column.filtrateTitle || column.title,
                        value: columns.slice(index, index + column.colSpan).map(column => column.key || column.dataIndex)
                    });
                }
            });
            return option;
        };
        this.showModal = () => {
            this.setState({
                visible: true,
            });
        };
        this.handleOk = () => {
            this.setState({
                visible: false,
                checkedOptionConfirm: this.state.checkedOption
            }, () => {
                // 被隐藏的列表key
                this.props.onChange(flatten(this.getOptions()
                    .filter(column => this.state.checkedOptionConfirm.indexOf(column.value) === -1)
                    .map(column => {
                    const indexOfColSpan = this.colSpanOption.findIndex(option => option.key === column.value);
                    if (indexOfColSpan !== -1) {
                        return this.colSpanOption[indexOfColSpan].value;
                    }
                    else {
                        return column.value;
                    }
                })));
            });
        };
        this.handleCancel = () => {
            this.setState({
                visible: false,
                checkedOption: this.state.checkedOptionConfirm
            });
        };
        this.onChange = (checkedOption) => {
            this.setState({ checkedOption });
        };
        this.getOptions = () => {
            const { columns, defaultColumns } = this.props;
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
                    label: React.createElement(ToolTip, { title: title }, title),
                    value: uniqKey,
                    disabled: disabled
                };
            })
                // 去除默认展示数据项
                .filter(column => defaultColumns.findIndex(key => key === column.value) === -1);
        };
        //默认一直显示的选项
        this.getDefaultOption = () => {
            const { columns, defaultColumns = [] } = this.props;
            return columns
                .filter(column => defaultColumns.findIndex(key => key === getColumnKey(column)) !== -1)
                .map(column => ({
                label: React.createElement(ToolTip, { title: column.filtrateTitle || column.title }, column.filtrateTitle || column.title),
                value: getColumnKey(column),
                disabled: true
            }));
        };
        const { columns, hideColumns } = this.props;
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
            const { columns, hideColumns } = nextProps;
            const option = this.getCheckedOptions(columns, hideColumns);
            this.setState({
                checkedOption: option,
                checkedOptionConfirm: option,
            });
        }
    }
    render() {
        const { prefixCls } = this.props;
        const { visible, checkedOption } = this.state;
        const options = this.getOptions();
        const defaultOption = this.getDefaultOption();
        return (React.createElement("div", null,
            React.createElement(Icon, { className: `${prefixCls}-filtrate-icon`, type: "Settingx", onClick: this.showModal }),
            React.createElement(Modal, { title: "\u9009\u62E9\u9700\u8981\u5C55\u793A\u7684\u6570\u636E\u9879", wrapClassName: `${prefixCls}-filtrate-modal`, visible: visible, onOk: this.handleOk, onCancel: this.handleCancel },
                React.createElement("div", { className: `${prefixCls}-filtrate-modal-enable-list` },
                    React.createElement(CheckboxGroup, { value: checkedOption, options: options, onChange: this.onChange })),
                defaultOption && !!defaultOption.length &&
                    React.createElement("div", { className: `${prefixCls}-filtrate-modal-disabled-list` },
                        React.createElement("p", { className: "title" }, "\u9ED8\u8BA4\u5C55\u793A\u6570\u636E\u9879"),
                        React.createElement(CheckboxGroup, { options: defaultOption, defaultValue: defaultOption.map(option => option.value) })))));
    }
}
ColumnFiltrateModal.defaultProps = {
    defaultColumns: [],
    hideColumns: [],
};
