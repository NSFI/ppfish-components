import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './index.less';

/**
 * 表格 TableSorter 自定义筛选组件
 *
 * iconUp             升序图标
 * iconDown           降序图标
 * sortBy             以~排序
 * sortKey            排序key
 * order              升序还是降序
 * handleChangeSorter 改变排序规则
 * customMode         判断是自定义sorter还是普通类型sorter
 */
class TableSorter extends React.Component {
  static propTypes = {
    iconUp: PropTypes.node,
    iconDown: PropTypes.node,
    sortBy: PropTypes.string,
    order: PropTypes.string,
    sortKey: PropTypes.string,
    handleChangeSorter: PropTypes.func,
    customMode: PropTypes.bool
  };

  static defaultProps = {
    iconUp: <i className="anticon anticon-caret-up"/>,
    iconDown: <i className="anticon anticon-caret-down"/>,
    customMode: false
  };

  constructor(props) {
    super(props);
  }

  /**
   * sorter改变回调
   * @param order
   */
  handleChangeSorter = (order) => {
    const {sortBy, sortKey, handleChangeSorter} = this.props;
    if (sortBy === sortKey && order === this.props.order) {
      handleChangeSorter('', '');
    } else {
      handleChangeSorter(sortKey, order);
    }
  };

  render() {
    const {customMode, iconUp, iconDown, sortBy, order, sortKey} = this.props;
    const sorterUpClass = ClassNames('u-customize-sorter-up', {'active': sortBy === sortKey && order === 'ascend'});
    const sorterDownClass = ClassNames('u-customize-sorter-down', {'active': sortBy === sortKey && order === 'descend'});
    //是否是自定义sorter
    if (customMode) {
      let CustomIcon;
      if (sortBy === sortKey && order === 'descend') {
        CustomIcon =
          <span className={sorterDownClass} onClick={() => this.handleChangeSorter('ascend')}>{iconDown}</span>;
      } else if (sortBy === sortKey && order === 'ascend') {
        CustomIcon =
          <span className={sorterUpClass} onClick={() => this.handleChangeSorter('descend')}>{iconUp}</span>;
      } else {
        CustomIcon =
          <span className={sorterUpClass} onClick={() => this.handleChangeSorter('ascend')}>{iconUp}</span>;
      }
      return (
        <div className="u-customize-sorter-custom">
          {CustomIcon}
        </div>
      );
    } else {
      return (
        <div className="u-customize-sorter-normal">
          <span className={sorterUpClass} onClick={() => this.handleChangeSorter('ascend')}>{iconUp}</span>
          <span className={sorterDownClass} onClick={() => this.handleChangeSorter('descend')}>{iconDown}</span>
        </div>
      );
    }
  }
}

export default TableSorter;
