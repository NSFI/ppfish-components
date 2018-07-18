import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';
import './index.less';
import {PAGE_SIZE} from '../../constants';
import {getSiblings} from '../../utils';
import BizTableSorter from './BizTableSorter';

/**
 * 设置Table列表激活样式
 * @description 策划要求：被点击的列表加载active样式
 * @param {object} node - 所需要添加样式的节点或子节点
 */
const setRowActive = (node) => {
  node.classList.add('row-active');
  getSiblings(node).map((i) => i.classList.remove('row-active'));
};

/**
 * Prophet常规Table
 * - 固定表头，需要指定 offsetHeight 值;
 * - 添加点击高亮;
 * - 分页定制，页数取常量pageSize;
 * - 其余属性与ant-design table 一致
 * - [ant-design-table详情](https://ant.design/components/table-cn)
 * @prop dataSource      {array}  数据源
 * @prop rowKey          {string|Function(record):string}  表格行 key 的取值，可以是字符串或一个函数
 * @prop columns         {object}  表格列的配置描述
 * @prop totalNum        {number}  项数
 * @prop offsetHeight    {number}  Table的高度与document的差值
 * @prop pagination      {object|boolean} 分页参数
 * @prop scroll          {object}  横向或纵向支持滚动，也可用于指定滚动区域的宽高度{{ x: true, y: 300 }}
 * @prop loading         {boolean|object}  是否加载中
 * @prop onChange        {function}  分页排序筛选变化时触发 Function(pagination, filters, sorter)
 * @prop onRowClick      {function}  点击行时触发 Function(record, index, event)
 * @prop pageSize        {number}  分页数
 */
class BizTable extends Component {
  static BizTableSorter = BizTableSorter;
  static propTypes = {
    dataSource: PropTypes.array,
    pageSize: PropTypes.number,
    rowKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    columns: PropTypes.array,
    totalNum: PropTypes.number,
    offsetHeight: PropTypes.number,
    pagination: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    scroll: PropTypes.object,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    onRowClick: PropTypes.func
  };

  static defaultProps = {
    pageSize: PAGE_SIZE
  };

  constructor(props) {
    super(props);
    this.state = {
      tableHeight: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeTable);
    this.resizeTable();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.offsetHeight !== this.props.offsetHeight && nextProps.offsetHeight) {
      this.setState({tableHeight: document.documentElement.clientHeight - nextProps.offsetHeight});
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeTable);
  }

  resizeTable = () => {
    let tableHeight = document.documentElement.clientHeight - this.props.offsetHeight;
    this.setState({tableHeight});
  };

  render() {
    const {
      dataSource,
      loading,
      totalNum,
      columns,
      onRowClick,
      onChange,
      rowKey,
      pagination,
      scroll,
      pageSize,
      ...others
    } = this.props;

    const isShowPagination = typeof pagination === "boolean";
    const paginationSetting = isShowPagination ? pagination : {
      pageSize: pageSize,
      total: totalNum,
      showTotal: (total) => {
        return `每页显示${pageSize}条，共 ${Math.ceil(total / pageSize)} 页`;
      },
      ...pagination
    };

    return (
      <Table columns={columns}
             dataSource={dataSource}
             onChange={onChange}
             loading={loading}
             rowKey={rowKey}
             pagination={paginationSetting}
             onRow={
               (record, index) => ({
                 onClick: (event) => {
                   setRowActive(event.currentTarget);
                   onRowClick && onRowClick(record, index, event);
                 }
               })
             }
             scroll={{
               y: this.state.tableHeight,
               ...scroll
             }}
             {...others}/>
    );
  }
}

export default BizTable;

