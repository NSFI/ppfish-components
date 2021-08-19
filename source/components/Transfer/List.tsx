import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Checkbox from '../Checkbox';
import PureRenderMixin from '../Checkbox/src/PureRenderMixin';
import { TransferItem } from './index';
import Search from './Search';
import Item from './Item';
import Animate from 'rc-animate';
import triggerEvent from '../../utils/triggerEvent';

// case sensitive
function isIEorEDGE() {
  return (document as any).documentMode || /Edge/.test(navigator.userAgent);
}

function noop() {}

function isRenderResultPlainObject(result: any) {
  return (
    result &&
    !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]'
  );
}

export interface TransferListProps {
  mode?: 'single' | 'multiple';
  direction: string;
  prefixCls: string;
  titleText: string;
  dataSource: TransferItem[];
  filter: string;
  filterOption?: (filterText: any, item: any) => boolean;
  style?: React.CSSProperties;
  checkedKeys: string[];
  handleFilter: (e: any) => void;
  handleSelect: (selectedItem: any, checked: boolean) => void;
  handleSelectAll: (dataSource: any[], checkAll: boolean) => void;
  handleClose?: (selectedItem: any) => void;
  handleClear: () => void;
  render?: (item: any) => any;
  showSearch?: boolean;
  searchPlaceholder: string;
  notFoundContent: React.ReactNode;
  itemUnit: string;
  itemsUnit: string;
  body?: (props: any) => any;
  footer?: (props: any) => any;
  lazy?: boolean | {};
  onScroll: Function;
}

export default class TransferList extends React.Component<TransferListProps, any> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    render: noop,
    lazy: {}
  };

  timer: number;
  triggerScrollTimer: number;
  fixIERepaintTimer: number;
  notFoundNode: HTMLDivElement;

  constructor(props: TransferListProps) {
    super(props);
    this.state = {
      mounted: false
    };
  }

  componentDidMount() {
    this.timer = window.setTimeout(() => {
      this.setState({
        mounted: true
      });
    }, 0);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.triggerScrollTimer);
    clearTimeout(this.fixIERepaintTimer);
  }

  shouldComponentUpdate(...args: any[]) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  getCheckStatus(filteredDataSource: TransferItem[]) {
    const { checkedKeys } = this.props;
    if (checkedKeys.length === 0) {
      return 'none';
    } else if (filteredDataSource.every(item => checkedKeys.indexOf(item.key) >= 0)) {
      return 'all';
    }
    return 'part';
  }

  handleSelect = (selectedItem: TransferItem, direction) => {
    const { checkedKeys, mode } = this.props;
    if (mode === 'single') {
      if (direction === 'right') {
        return;
      }
      this.props.handleSelect(selectedItem, true);
    } else {
      const result = checkedKeys.some(key => key === selectedItem.key);
      this.props.handleSelect(selectedItem, !result);
    }
  };

  // single模式下，点击目标列表中的关闭按钮
  handleClose = (selectedItem: TransferItem) => {
    this.props.handleClose(selectedItem);
  };

  handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.handleFilter(e);
    if (!e.target.value) {
      return;
    }
    // Manually trigger scroll event for lazy search bug
    // https://github.com/ant-design/ant-design/issues/5631
    this.triggerScrollTimer = window.setTimeout(() => {
      const transferNode = ReactDOM.findDOMNode(this) as Element;
      const listNode = transferNode.querySelectorAll('.fishd-transfer-list-content')[0];
      if (listNode) {
        triggerEvent(listNode, 'scroll');
      }
    }, 0);
    this.fixIERepaint();
  };

  handleClear = () => {
    this.props.handleClear();
    this.fixIERepaint();
  };

  matchFilter = (text: string, item: TransferItem) => {
    const { filter, filterOption } = this.props;
    if (filterOption) {
      return filterOption(filter, item);
    }
    return text.indexOf(filter) >= 0;
  };

  renderItem = (item: TransferItem) => {
    const { render = noop } = this.props;
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      renderedText: isRenderResultPlain ? renderResult.value : renderResult,
      renderedEl: isRenderResultPlain ? renderResult.label : renderResult
    };
  };

  saveNotFoundRef = (node: HTMLDivElement) => {
    this.notFoundNode = node;
  };

  // Fix IE/Edge repaint
  // https://github.com/ant-design/ant-design/issues/9697
  // https://stackoverflow.com/q/27947912/3040605
  fixIERepaint() {
    if (!isIEorEDGE()) {
      return;
    }
    this.fixIERepaintTimer = window.setTimeout(() => {
      if (this.notFoundNode) {
        // eslint-disable-next-line no-self-assign
        this.notFoundNode.className = this.notFoundNode.className;
      }
    }, 0);
  }

  render() {
    const {
      mode,
      direction,
      prefixCls,
      dataSource,
      titleText,
      checkedKeys,
      lazy,
      body = noop,
      footer = noop,
      showSearch,
      style,
      filter,
      searchPlaceholder,
      notFoundContent,
      itemUnit,
      itemsUnit,
      onScroll
    } = this.props;

    // Custom Layout
    const footerDom = footer({ ...this.props });
    const bodyDom = body({ ...this.props });

    const listCls = classNames(prefixCls, {
      [`${prefixCls}-with-footer`]: !!footerDom
    });

    const filteredDataSource: TransferItem[] = [];
    const totalDataSource: TransferItem[] = [];

    const showItems = dataSource.map(item => {
      const { renderedText, renderedEl } = this.renderItem(item);
      if (filter && filter.trim() && !this.matchFilter(renderedText, item)) {
        return null;
      }

      // all show items
      totalDataSource.push(item);
      if (!item.disabled) {
        // response to checkAll items
        filteredDataSource.push(item);
      }

      const checked = checkedKeys.indexOf(item.key) >= 0;
      return (
        <Item
          mode={mode}
          direction={direction}
          key={item.key}
          item={item}
          lazy={lazy}
          renderedText={renderedText}
          renderedEl={renderedEl}
          checked={checked}
          prefixCls={prefixCls}
          onClick={this.handleSelect}
          onClose={this.handleClose}
        />
      );
    });

    const unit = dataSource.length > 1 ? itemsUnit : itemUnit;

    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={this.handleFilter}
          handleClear={this.handleClear}
          placeholder={searchPlaceholder}
          value={filter}
        />
      </div>
    ) : null;

    const listBody = bodyDom || (
      <div
        className={
          showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`
        }
      >
        {search}
        <Animate
          component="ul"
          componentProps={{ onScroll }}
          className={`${prefixCls}-content`}
          transitionName={this.state.mounted ? `${prefixCls}-content-item-highlight` : ''}
          transitionLeave={false}
        >
          {showItems}
        </Animate>
        <div className={`${prefixCls}-body-not-found`} ref={this.saveNotFoundRef}>
          {notFoundContent}
        </div>
      </div>
    );

    const listFooter = footerDom ? <div className={`${prefixCls}-footer`}>{footerDom}</div> : null;

    const checkStatus = this.getCheckStatus(filteredDataSource);
    const checkedAll = checkStatus === 'all';
    const checkAllCheckbox = (
      <Checkbox
        checked={checkedAll}
        indeterminate={checkStatus === 'part'}
        onChange={() => this.props.handleSelectAll(filteredDataSource, checkedAll)}
      />
    );

    return (
      <div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          {mode === 'multiple' ? checkAllCheckbox : null}
          <span className={`${prefixCls}-header-title`}>{titleText}</span>
          <span className={`${prefixCls}-header-selected`}>
            {mode === 'multiple'
              ? `${checkedKeys.length}/${totalDataSource.length}`
              : `${totalDataSource.length}`}{' '}
            {unit}
          </span>
        </div>
        {listBody}
        {listFooter}
      </div>
    );
  }
}
