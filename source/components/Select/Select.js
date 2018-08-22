import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';
import Animate from 'rc-animate';
import scrollIntoView from 'dom-scroll-into-view';
import classNames from 'classnames';
import Button from '../Button/index.tsx';
import Spin from '../Spin/index.tsx';
import Icon from '../Icon/index.tsx';
import SelectSearch from './SelectSearch';
import placements from './placements';
import {KeyCode} from "../../utils";

const noop = () => {
};

export default class Select extends React.Component {
  static propTypes = {
    allowClear: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    clearableOptionWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultActiveFirstOption: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
    disabled: PropTypes.bool,
    dropdownClassName: PropTypes.string,
    dropdownMatchSelectWidth: PropTypes.bool,
    dropdownStyle: PropTypes.object,
    extraOptions: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    filterOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    getPopupContainer: PropTypes.func,
    labelClear: PropTypes.bool,
    labelInValue: PropTypes.bool,
    loading: PropTypes.bool,
    maxCount: PropTypes.number,
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    maxScrollHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mode: PropTypes.oneOf(['multiple', 'single']),
    notFoundContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onPopupScroll: PropTypes.func,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
    onVisibleChange: PropTypes.func,
    placeholder: PropTypes.string,
    popupAlign: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']),
    prefixCls: PropTypes.string,
    searchInputProps: PropTypes.object,
    searchPlaceholder: PropTypes.string,
    selectAllText: PropTypes.string,
    showArrow: PropTypes.bool,
    showOptionCheckedIcon: PropTypes.bool,
    showSingleClear: PropTypes.bool,
    showSearch: PropTypes.bool,
    showSelectAll: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small', 'large']),
    style: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  };

  static defaultProps = {
    allowClear: true,
    clearableOptionWidth: 100,
    defaultActiveFirstOption: false,
    disabled: false,
    dropdownMatchSelectWidth: true,
    filterOption: true,
    labelClear: false,
    labelInValue: false,
    loading: false,
    maxScrollHeight: 250,
    errorMessage: '超过选项上限',
    mode: 'single',
    notFoundContent: '无匹配结果',
    onChange: noop,
    onPopupScroll: noop,
    onSearch: noop,
    onSelect: noop,
    onVisibleChange: noop,
    placeholder: '请选择',
    popupAlign: 'bottomLeft',
    prefixCls: 'fishd-select',
    searchInputProps: {},
    searchPlaceholder: '请输入关键词',
    selectAllText: '选择所有',
    showArrow: true,
    showOptionCheckedIcon: true,
    showSearch: false,
    showSingleClear: false,
    showSelectAll: false,
    size: 'default',
    style: {},
  };

  //获取所有option的[{label,key,title}]
  static getOptionFromChildren = (children, plainOptionList = [], filter) => {
    React.Children.forEach(children, (child) => {
      if (child && child.type && child.type.isSelectOption) {
        if (filter) {
          filter(child) && plainOptionList.push({
            label: child.props.children,
            key: child.props.value || child.key,
            title: child.props.title
          });
        } else {
          plainOptionList.push({
            label: child.props.children,
            key: child.props.value || child.key,
            title: child.props.title
          });
        }
      } else if (child && child.type && child.type.isSelectOptGroup) {
        Select.getOptionFromChildren(child.props.children, plainOptionList, filter);
      } else {
        //  其余暂时不做处理
      }
    });
    return plainOptionList;
  };

  //转换传入的value
  static getValueFromProps = (value, labelInValue, children) => {
    const valueType = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    const optionList = Select.getOptionFromChildren(children, []);
    if (labelInValue) {
      //labelInValue数据从传入数据中取
      if (valueType === 'array') {
        return value && value.map(obj => {
          const option = optionList.find(option => option.key === obj.key) || {};
          const label = obj.label || option.label || obj.key;
          const title = obj.title || option.title;
          return {
            key: obj.key,
            label,
            title,
          };
        }) || [];
      } else if (valueType === 'object') {
        const option = optionList.find(option => option.key === value.key) || {};
        const label = value.label || option.label || value.key;
        const title = value.title || option.title;
        return [{
          key: value.key,
          label,
          title,
        }];
      } else {
        // 其余就给空状态
        return [];
      }
    } else {
      // 非labelInValue数据从option里取
      if (valueType === 'string' || valueType === 'number') value = [value];
      return value && value.map(key => {
        const option = optionList.find(option => option.key === key) || {};
        const label = option.label || key;
        const title = option.title;
        return {
          key,
          label,
          title,
        };
      }) || [];
    }
  };

  constructor(props) {
    super(props);
    const {value, defaultValue, labelInValue, children} = this.props;
    const initialSelectValue = Select.getValueFromProps(value || defaultValue || [], labelInValue, children);
    this.state = {
      searchValue: '',
      selectValue: initialSelectValue,
      selectValueForMultiplePanel: initialSelectValue,
      popupVisible: false,
      activeKey: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const {value, labelInValue, children} = nextProps;
      const changedValue = Select.getValueFromProps(value, labelInValue, children);
      this.setState({
        selectValue: changedValue,
        selectValueForMultiplePanel: changedValue,
      });
    }
  }

  //搜索键入
  updateSearchValue = (e) => {
    this.setState({
      searchValue: e.target.value
    }, () => {
      this.props.onSearch(this.state.searchValue);
    });
  };

  //清空搜索
  emptySearchValue = () => {
    this.setState({
      searchValue: ''
    }, () => {
      this.props.onSearch(this.state.searchValue);
    });
  };

  //全选操作
  selectAllOption = () => {
    this.setState({
      selectValue: this.isSelectAll() ? [] : Select.getOptionFromChildren(this.props.children, [], (child) => !child.props.disabled),
    });
  };

  //清空数据项,mode='single'
  emptySelectValue = () => {
    this.setState({
      selectValue: [],
      popupVisible: false,
    }, () => {
      this.props.onChange();
    });
  };

  //popup显示隐藏
  onVisibleChange = (visible) => {
    this.setState({
      popupVisible: visible
    }, () => {
      const {onVisibleChange, defaultActiveFirstOption, mode} = this.props;
      const {selectValue, selectValueForMultiplePanel} = this.state;
      onVisibleChange(visible);
      if (visible) {
        // 没有选中任何选项、默认开启激活第一个选项
        if (defaultActiveFirstOption && !selectValue.length) {
          const firstOption = Select.getOptionFromChildren(this.props.children, [], (child) => !child.props.disabled)[0] || {};
          this.setState({
            activeKey: firstOption.key
          });
        }
        this.focus();
      } else {
        // 多选就还原状态-同handleCancel
        if (mode === 'multiple') {
          this.setState({
            selectValue: selectValueForMultiplePanel
          });
        }
      }
    });
  };

  // 焦点操作
  focusEvent = (event) => {
    const {showSearch, loading} = this.props;
    if (loading) return;
    const targetElement = showSearch ? this.selectSearch && this.selectSearch.searchInput.input : this.selection;
    if (targetElement) {
      targetElement[event]();
    } else {
      setTimeout(() => {
        const targetElement = showSearch ? this.selectSearch.searchInput.input : this.selection;
        targetElement[event]();
      });
    }
  };

  // 聚焦
  focus() {
    this.focusEvent('focus');
  }

  // 失焦
  blur() {
    this.focusEvent('blur');
  }

  //处理 label、option的click操作
  onOptionClick = (e, obj, clickInLabel) => {
    e && e.stopPropagation();
    const {onChange, mode, onSelect, labelInValue} = this.props;
    const selectValue = this.state.selectValue;
    const index = selectValue.findIndex(selected => selected.key === obj.key);
    if (mode === 'single') {
      this.setState({
        selectValue: [obj],
        popupVisible: false,
      }, () => {
        // 值改变了才触发onChange
        if (index === -1) {
          if (labelInValue) {
            onChange(obj);
          } else {
            onChange(obj.key);
          }
        }
      });
    } else if (mode === 'multiple') {
      let changedValue, changedObj = {};
      //label 点击
      if (clickInLabel) {
        const selectValueForMultiplePanel = this.state.selectValueForMultiplePanel;
        const indexInMultiple = selectValueForMultiplePanel.findIndex(selected => selected.key === obj.key);
        changedValue = [...selectValueForMultiplePanel.slice(0, indexInMultiple), ...selectValueForMultiplePanel.slice(indexInMultiple + 1)];
        changedObj = {
          selectValue: changedValue,
          selectValueForMultiplePanel: changedValue
        };
      } else {
        //option 点击
        changedValue = index === -1 ? [...selectValue, obj] : [...selectValue.slice(0, index), ...selectValue.slice(index + 1)];
        changedObj = {
          selectValue: changedValue,
        };
      }
      this.setState(changedObj, () => {
        if (clickInLabel) {
          //Clicking on label will trigger the onchange event.
          if (labelInValue) {
            onChange(this.state.selectValue);
          } else {
            onChange(this.state.selectValue.map(selected => selected.key));
          }
        }
      });
    }
    //fire onSelect event => option/label click
    onSelect(obj);
  };

  //获取加料后的children
  getProcessedChildren = (children, dropdownCls) => {
    return React.Children.map(children, (child) => {
      const typeOfChildren = Object.prototype.toString.call(child).slice(8, -1).toLowerCase();
      if (!!child && typeOfChildren === 'object' && child.type.isSelectOption) {
        const {selectValue, activeKey} = this.state;
        const {showOptionCheckedIcon} = this.props;
        const value = child.props.value || child.key;
        //对children中的Option 进行事件绑定、参数补充
        return React.cloneElement(child, {
          prefixCls: `${dropdownCls}-option`,
          checked: !!selectValue.find(obj => obj && obj.key === value),
          value: value,
          activeKey: activeKey,
          showOptionCheckedIcon: showOptionCheckedIcon,
          onOptionClick: this.onOptionClick,
          onOptionMouseEnter: this.onOptionMouseEnter,
          onOptionMouseLeave: this.onOptionMouseLeave,
          ref: value,
          children: this.getProcessedChildren(child.props.children, dropdownCls),
        });
      } else if (!!child && typeOfChildren === 'object' && child.type.isSelectOptGroup) {
        return React.cloneElement(child, {
          prefixCls: `${dropdownCls}-option-group`,
          children: this.getProcessedChildren(child.props.children, dropdownCls),
        });
      } else {
        return child;
      }
    });
  };

  //获取筛选后children
  getFilteredChildren = (children, ChildrenList = []) => {
    const {filterOption} = this.props;
    const {searchValue} = this.state;
    const typeOfOption = Object.prototype.toString.call(filterOption).slice(8, -1).toLowerCase();
    React.Children.forEach(children, child => {
      let filterFlag = false;
      if (child && child.type && child.type.isSelectOption) {
        if (typeOfOption === 'function') {
          filterFlag = filterOption(searchValue, child);
        } else if (typeOfOption === 'boolean') {
          filterFlag = filterOption;
        }
        if (filterFlag) {
          ChildrenList.push(child);
        }
      } else if (child && child.type && child.type.isSelectOptGroup) {
        const children = this.getFilteredChildren(child.props.children);
        ChildrenList.push(React.cloneElement(child, {
          children: children,
          _isShow: !!(children && children.length) //搜索后分组下没有东西就隐藏该分组
        }));
      }
    });

    return ChildrenList;
  };

  //多选-取消
  handleCancelSelect = () => {
    this.setState({
      popupVisible: false,
      selectValue: this.state.selectValueForMultiplePanel
    });
  };

  //多选-确定
  handleConfirmSelect = () => {
    const {onChange, labelInValue} = this.props;
    const {selectValue} = this.state;
    this.setState({
      popupVisible: false,
      selectValueForMultiplePanel: selectValue,
    }, () => {
      if (labelInValue) {
        onChange(selectValue);
      } else {
        onChange(selectValue.map(selected => selected.key));
      }
    });
  };

  //判断是否全选
  isSelectAll = () => {
    const optionList = Select.getOptionFromChildren(this.props.children, [], (child) => !child.props.disabled);
    const selectedList = this.state.selectValue;
    //全选判断逻辑：option中每一项都能在seleced中找到（兼容后端搜索的全选判断）
    return optionList.every(selected => {
      return !!selectedList.find(option => option.key === selected.key);
    });
  };

  //处理tab上下active切换功能
  handleActiveTabChange = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === KeyCode.ENTER || keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
      e.preventDefault();
      const {children, mode, labelInValue, onChange} = this.props;
      const {activeKey, selectValue} = this.state;
      const optionList = Select.getOptionFromChildren(children, [], (child) => !child.props.disabled);
      const optionListLen = optionList.length;
      if (!optionListLen) return;
      //enter
      if (keyCode === KeyCode.ENTER) {
        const activeTabIndex = optionList.findIndex(option => option.key === activeKey);
        // activeKey不在列表中
        if (activeTabIndex !== -1) {
          if (!selectValue.find((selected) => selected.key === activeKey)) {
            if (mode === 'single') {
              this.setState({
                selectValue: [optionList[activeTabIndex]],
                popupVisible: false,
                activeKey: undefined,
              }, () => {
                if (labelInValue) {
                  onChange(this.state.selectValue[0]);
                } else {
                  onChange(this.state.selectValue.map(selected => selected.key)[0]);
                }
              });
            } else if (mode === 'multiple') {
              this.setState({
                selectValue: [...selectValue, optionList[activeTabIndex]]
              });
            }
          }
        }
      }
      //38 up 40 down
      if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
        // 有activeKey
        if (activeKey) {
          const activeTabIndex = optionList.findIndex(option => option.key === activeKey);
          // activeKey不在列表中
          if (activeTabIndex === -1) {
            this.setState({
              activeKey: optionList[0].key
            }, () => {
              this.setActiveOptionIntoView(optionList[0].key);
            });
            return;
          }
          // 上按钮
          let nextActiveKey = undefined;
          if (keyCode === KeyCode.UP) {
            //超出到最后一个
            if (activeTabIndex === 0) {
              nextActiveKey = optionList[optionListLen - 1].key;
            } else {
              nextActiveKey = optionList[activeTabIndex - 1].key;
            }
          } else if (keyCode === KeyCode.DOWN) {
            if (activeTabIndex + 1 === optionListLen) {
              nextActiveKey = optionList[0].key;
            } else {
              nextActiveKey = optionList[activeTabIndex + 1].key;
            }
          }
          this.setState({
            activeKey: nextActiveKey
          }, () => {
            this.setActiveOptionIntoView(nextActiveKey);
          });
        } else {
          this.setState({
            activeKey: optionList[0].key
          }, () => {
            this.setActiveOptionIntoView(optionList[0].key);
          });
        }
      }
    }
  };

  //处理option的激活态
  setActiveOptionIntoView = (activeKey) => {
    scrollIntoView(ReactDOM.findDOMNode(this.refs[activeKey]), ReactDOM.findDOMNode(this.dropdownList), {
      onlyScrollIfNeeded: true
    });
  };

  //处理option激活态-> mouseEnter
  onOptionMouseEnter = (activeKey) => {
    this.setState({activeKey});
  };

  //处理option激活态-> mouseLeave
  onOptionMouseLeave = () => {
    this.setState({activeKey: undefined});
  };

  // selectionChange后重新定位trigger
  resizeTrigger = () => {
    if (this.trigger &&
      this.trigger._component &&
      this.trigger._component.alignInstance) {
      this.trigger._component.alignInstance.forceAlign();
    }
  };

  //下拉框内容
  getDropdownPanel() {
    const {
      allowClear,
      children,
      dropdownClassName,
      dropdownStyle,
      extraOptions,
      loading,
      maxCount,
      errorMessage,
      maxScrollHeight,
      mode,
      notFoundContent,
      onPopupScroll,
      placeholder,
      prefixCls,
      searchInputProps,
      searchPlaceholder,
      selectAllText,
      showSearch,
      showSelectAll,
      showSingleClear,
    } = this.props;
    const {searchValue, selectValue} = this.state;
    const dropdownCls = `${prefixCls}-dropdown`;
    const optionFilteredList = this.getFilteredChildren(this.getProcessedChildren(children, dropdownCls)); //获取筛选后的children
    const showNotFoundContent = !Select.getOptionFromChildren(optionFilteredList).length; // optionList为空判断
    const maxCountError = maxCount && selectValue.length > maxCount;
    return (
      <div className={classNames(dropdownCls, {[dropdownClassName]: !!dropdownClassName})}
           onKeyDown={this.handleActiveTabChange}
           ref={selection => this.selection = selection}
           style={dropdownStyle}
           tabIndex="0">
        {
          loading ?
            <div className={`${dropdownCls}-loading`}>
              <div><Spin size="small" style={{marginRight: 5}}/>加载中...</div>
            </div> :
            <div className={`${dropdownCls}-content`}>
              {
                //搜索框
                showSearch &&
                <SelectSearch
                  allowClear={allowClear}
                  emitEmpty={this.emptySearchValue}
                  prefixCls={`${dropdownCls}-search`}
                  ref={(selectSearch => this.selectSearch = selectSearch)}
                  searchInputProps={searchInputProps}
                  searchPlaceholder={searchPlaceholder}
                  searchValue={searchValue}
                  updateSearchValue={this.updateSearchValue}
                />
              }
              <div className={`${dropdownCls}-list`}
                   onScroll={onPopupScroll}
                   ref={dropdownList => this.dropdownList = dropdownList}
                   style={{maxHeight: maxScrollHeight}}>
                {
                  //全选按钮-多选的情况下存在
                  showSelectAll && mode === 'multiple' &&
                  <li
                    className={classNames({[`${dropdownCls}-option-item`]: true}, {['checked']: this.isSelectAll()})}
                    onClick={this.selectAllOption}>
                    {selectAllText}
                  </li>
                }
                {
                  //清空选项按钮-单选未搜索的情况下存在
                  !searchValue && showSingleClear && mode === 'single' &&
                  <li
                    className={`${dropdownCls}-option-item clear`}
                    onClick={this.emptySelectValue}>
                    {placeholder}
                  </li>
                }
                {
                  //预留置顶项
                  extraOptions
                }
                {
                  //列表及空状态框
                  showNotFoundContent ?
                    <div className={`${dropdownCls}-not-found`}>{notFoundContent}</div> :
                    <div className={`${dropdownCls}-filtered-list`}>{optionFilteredList}</div>
                }
              </div>
              {
                //多选的点击取消、确定按钮组
                mode === 'multiple' &&
                <div>
                  {
                    maxCountError &&
                    (
                      <div className={`${dropdownCls}-error-panel`}>
                        <p className={`${dropdownCls}-error-panel-msg`}>{errorMessage}</p>
                      </div>
                    )
                  }
                  <div className={`${dropdownCls}-footer`}>
                    <Button className={`${dropdownCls}-footer-btn`} onClick={this.handleCancelSelect}>取消</Button>
                    <Button className={`${dropdownCls}-footer-btn`} onClick={this.handleConfirmSelect}
                            disabled={maxCountError} type="primary">确定</Button>
                  </div>
                </div>
              }
            </div>
        }
      </div>
    );
  }

  // 获取面板内容
  getSelectionPanel() {
    const {
      className,
      clearableOptionWidth,
      disabled,
      labelClear,
      loading,
      mode,
      onMouseEnter,
      onMouseLeave,
      placeholder,
      prefixCls,
      showArrow,
      size,
      style,
    } = this.props;
    const {selectValue, selectValueForMultiplePanel, popupVisible} = this.state;
    const selectionCls = `${prefixCls}`;
    const selectionPanelCls =
      classNames(
        {[`${selectionCls}`]: true},
        {[className]: !!className},
        {[`${selectionCls}-disabled`]: disabled},
        {[`open`]: popupVisible},
        {[`${selectionCls}-large`]: size === 'large'},
        {[`${selectionCls}-small`]: size === 'small'},
      );
    const panelStyle = {
      ...style
    };
    if (labelClear) {
      panelStyle.paddingRight = 0;
    }
    return (
      <div
        className={selectionPanelCls}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={panelStyle}>
        {
          loading ?
            <div className={`${selectionCls}-loading`}>
              <div><Spin size="small" style={{marginRight: 5}}/>加载中...</div>
            </div> :
            <div className={`${selectionCls}-content`}>
              {
                // showArrow并且不是可删除label模式下出现箭头
                showArrow && !labelClear &&
                <div className={`${selectionCls}-caret`}>
                  <Icon type="down-fill" className={classNames({['open']: popupVisible})}/>
                </div>
              }
              {
                // 没有值的情况下显示placeholder
                ((!selectValue.length && mode === 'single') || (!selectValueForMultiplePanel.length && mode === 'multiple')) &&
                <div unselectable="on" className={`${selectionCls}-placeholder`}>{placeholder}</div>
              }
              {
                // 单选模式下有值显示值的label
                mode === 'single' && !!selectValue.length &&
                <span className={`${selectionCls}-option-single`}
                      title={selectValue[0].title}>{selectValue[0].label}</span>
              }
              {
                // 多选模式下区分labelClear
                // selectValueForMultiplePanel的更新时机：
                // 1.初始化value、defaultValue
                // 2.props.value 更改
                // 3.多选取消、确定按钮点击
                // 4.label.click事件
                mode === 'multiple' && (
                  labelClear ?
                    (
                      //仅在有选中数据时渲染，fix空状态面板上方高度问题
                      selectValueForMultiplePanel && selectValueForMultiplePanel.length ?
                        <Animate onEnd={this.resizeTrigger} component="div" transitionName="zoom"
                                 className={`${selectionCls}-option-clearable-list`}>
                          {
                            selectValueForMultiplePanel.map(option =>
                              <div className={`${selectionCls}-option-clearable-option`}
                                   style={{width: clearableOptionWidth}}
                                   key={option.key}
                                   title={option.title}
                              >
                                <span
                                  className={`${selectionCls}-option-clearable-option-content`}>{option.label}</span>
                                <span className={`${selectionCls}-option-clearable-option-close`}
                                      onClick={(e) => this.onOptionClick(e, option, true)}>
                                    <Icon type="close-modal-line"/>
                                  </span>
                              </div>
                            )
                          }
                        </Animate> : null
                    ) :
                    <div className={`${selectionCls}-option-multiple`}>
                      {
                        selectValueForMultiplePanel.map((option, index) =>
                          <span key={option.key} className={`${selectionCls}-option-multiple-option`}>
                              <span>{option.label}</span>
                            {index + 1 !== selectValueForMultiplePanel.length && '、'}</span>
                        )
                      }
                    </div>
                )
              }
            </div>
        }
      </div>
    );
  }

  render() {
    const {
      disabled,
      dropdownMatchSelectWidth,
      getPopupContainer,
      popupAlign,
      prefixCls,
    } = this.props;
    return (
      <Trigger
        action={disabled ? [] : ['click']}
        builtinPlacements={placements}
        ref={node => this.trigger = node}
        getPopupContainer={getPopupContainer}
        onPopupVisibleChange={this.onVisibleChange}
        popup={this.getDropdownPanel()}
        popupPlacement={popupAlign}
        popupVisible={this.state.popupVisible}
        prefixCls={`${prefixCls}-popup`}
        stretch={dropdownMatchSelectWidth ? 'width' : ''}
      >
        {this.getSelectionPanel()}
      </Trigger>
    );
  }
}
