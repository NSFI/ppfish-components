/**
 * 常规Table
 *
 * 1、固定表头，需要指定 offsetHeight 值
 * 2、添加点击高亮
 * 3、分页定制，页数取常量pageSize
 *
 * @param dataSource        数据源
 * @param rowKey            表格行 key 的取值，可以是字符串或一个函数                              string|Function(record):string
 * @param columns           表格列的配置描述
 * @param totalNum          项数
 * @param offsetHeight      Table的高度与document的差值
 * @param pagination        分页参数
 * @param scroll            横向或纵向支持滚动，也可用于指定滚动区域的宽高度{{ x: true, y: 300 }}  object
 * @param loading           是否加载中                                                       boolean|object
 * @param onChange          分页排序筛选变化时触发                                              Function(pagination, filters, sorter)
 * @param onRowClick        点击行时触发                                                      Function(record, index, event)
 * antd3.0更新 onRow事件，这里暂时保持onRowClick，如需要其他onRow事件，再作添加；直接使用onRow将覆盖原事件；
 * 其余属性与ant-design table 一致
 *
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';
import './index.less';
import {PAGE_SIZE} from '../../constants';
import {setRowActive} from '../../utils';

class CustomTable extends Component {

  static propTypes = {
    dataSource: PropTypes.array,
    rowKey: PropTypes.string,
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeTable);
  }

  resizeTable = () => {
    let tableHeight = document.documentElement.clientHeight - this.props.offsetHeight;
    this.setState({
      tableHeight
    });
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
      ...others
    } = this.props;

    const isShowPagination = typeof pagination === "boolean";
    const paginationSetting = isShowPagination ? pagination : {
      pageSize: PAGE_SIZE,
      total: totalNum,
      showTotal: (total) => {
        return `每页显示${PAGE_SIZE}条，共 ${Math.ceil(total / PAGE_SIZE)} 页`;
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
                   setRowActive(event.target);
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

export default CustomTable;

