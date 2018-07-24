import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/index.tsx';

/**
 * Prophet常规Table
 * - 固定表头，需要指定 offsetHeight 值;
 */
class BizTable extends Component {
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
    loading: PropTypes.bool
  };

  static defaultProps = {
    pageSize: 50
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
             loading={loading}
             rowKey={rowKey}
             pagination={paginationSetting}
             scroll={{
               y: this.state.tableHeight,
               ...scroll
             }}
             {...others}/>
    );
  }
}

export default BizTable;

