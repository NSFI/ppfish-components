import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import {Col, Row, Button, Icon} from 'antd';
import SelectSearch from './SelectSearch';
import {placements} from './placements';
import {KeyCode} from "../../utils";

const noop = () => {
};

export default class Select extends React.Component {
  static propTypes = {
    allowClear: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    defaultActiveFirstOption: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    disabled: PropTypes.bool,
    dropdownClassName: PropTypes.string,
    dropdownMatchSelectWidth: PropTypes.bool,
    dropdownStyle: PropTypes.object,
    extraOptions: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    filterOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    getPopupContainer: PropTypes.func,
    labelClear: PropTypes.bool,
    labelInValue: PropTypes.bool,
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
    popupAlign: PropTypes.oneOf(['bottomLeft', 'bottom', 'bottomRight']),
    prefixCls: PropTypes.string,
    searchInputProps: PropTypes.object,
    searchPlaceholder: PropTypes.string,
    selectAllText: PropTypes.string,
    showArrow: PropTypes.bool,
    showSingleClear: PropTypes.bool,
    showSearch: PropTypes.bool,
    showSelectAll: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small', 'large']),
    style: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    allowClear: true,
    defaultActiveFirstOption: true,
    disabled: false,
    dropdownMatchSelectWidth: true,
    filterOption: true,
    labelClear: false,
    labelInValue: false,
    maxScrollHeight: 250,
    mode: 'single',
    notFoundContent: '无匹配结果',
    onChange: noop,
    onPopupScroll: noop,
    onSearch: noop,
    onSelect: noop,
    onVisibleChange: noop,
    placeholder: '请选择',
    popupAlign: 'bottomLeft',
    prefixCls: 'ant-select',
    searchInputProps: {},
    searchPlaceholder: '请输入关键词',
    selectAllText: '选择所有',
    showArrow: true,
    showSearch: false,
    showSingleClear: false,
    showSelectAll: false,
    size: 'default',
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      selectValue: this.covertSelectValue(this.props.value || this.props.defaultValue, this.props.labelInValue),
      popupVisible: false,
      resetValue: [],
      activeKey: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        selectValue: this.covertSelectValue(nextProps.value, nextProps.labelInValue)
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
  selectAll = () => {
    if (this.isSelectAll()) {
      this.setState({
        selectValue: [],
      });
    } else {
      this.setState({
        selectValue: this.getPlainOptionList(this.props.children, [], (child) => !child.props.disabled),
      });
    }
  };

  //转换传入的value
  covertSelectValue = (value, labelInValue) => {
    if (typeof value === 'string' || typeof  value === 'number') value = [value];
    if (labelInValue) {
      return value;
    } else {
      const optionList = this.getPlainOptionList(this.props.children, []);
      return value && value.map(key => {
        const label = (optionList.find(option => option.key == key) || {}).label || key;
        return {
          key: key,
          label: label
        };
      }) || [];
    }
  };

  //清空搜索项
  emptySelectValue = () => {
    this.setState({
      selectValue: [],
      popupVisible: false,
    }, () => {
      const {labelInValue, onChange} = this.props;
      if (labelInValue) {
        onChange(this.state.selectValue);
      } else {
        onChange(this.state.selectValue.map(selected => selected.key));
      }
    });
  };

  //popup显示隐藏
  onVisibleChange = (visible) => {
    this.setState({
      popupVisible: visible
    }, () => {
      const {onVisibleChange, defaultActiveFirstOption} = this.props;
      onVisibleChange(visible);
      if (visible) {
        // 没有选中任何选项、默认开启激活第一个选项
        if (defaultActiveFirstOption && !this.state.selectValue.length) {
          this.setState({
            activeKey: this.getPlainOptionList(this.props.children, [], (child) => !child.props.disabled)[0].key
          });
        }
        //使框focus()
        this.focus();
      }
    });
  };

  //聚焦操作
  focus() {
    if (this.props.showSearch) {
      this.selectSearch.searchInput.input.focus();
    } else {
      this.selection.focus();
    }
  }

  //失焦操作
  blur() {
    if (this.props.showSearch) {
      this.selectSearch.searchInput.input.blur();
    } else {
      this.selection.blur();
    }
  }

  //处理 label、option的click操作
  onOptionClick = (e, obj, clickInLabel) => {
    e.stopPropagation();
    const {onChange, mode, onSelect, labelInValue} = this.props;
    const selectValue = this.state.selectValue;
    const index = selectValue.findIndex(valueItem => valueItem.key == obj.key);
    if (mode === 'single') {
      this.setState({
        selectValue: index === -1 ? [obj] : [],
        popupVisible: false,
      }, () => {
        if (labelInValue) {
          onChange(this.state.selectValue);
        } else {
          onChange([obj.key]);
        }
      });
    } else if (mode === 'multiple') {
      if (index === -1) {
        this.setState({
          selectValue: [...selectValue, obj]
        });
      } else {
        this.setState({
          selectValue: [...selectValue.slice(0, index), ...selectValue.slice(index + 1)]
        }, () => {
          if (clickInLabel) {
            //click label fire onChange event
            if (labelInValue) {
              onChange(this.state.selectValue);
            } else {
              onChange(this.state.selectValue.map(selected => selected.key));
            }
          }
        });
      }
    }
    //fire onSelect event => option/label click
    onSelect(obj);
  };

  //获取列表待筛选操作
  getSelectOptionList = (children, dropDownCls) => {
    return React.Children.map(children, (c) => {
      if (typeof c === 'object' && c.type.isSelectOption) {
        const value = c.props.value || c.key;
        //对children中的Option 进行事件绑定、参数补充
        return React.cloneElement(c, {
          prefixCls: `${dropDownCls}-option`,
          checked: !!this.state.selectValue.find(obj => obj && obj.key == value),
          value: value,
          activeKey: this.state.activeKey,
          onOptionClick: this.onOptionClick,
          onOptionMouseEnter: this.onOptionMouseEnter,
          onOptionMouseLeave: this.onOptionMouseLeave,
          ref: value,
          children: this.getSelectOptionList(c.props.children, dropDownCls),
        });
      } else if (typeof c === 'object' && c.type.isSelectOptGroup) {
        return React.cloneElement(c, {
          prefixCls: `${dropDownCls}-option`,
          children: this.getSelectOptionList(c.props.children, dropDownCls),
        });
      } else {
        return children;
      }
    });
  };

  //获取筛选后列表
  getSelectFilteredOptionList = (children, ChildrenList = []) => {
    const {filterOption} = this.props;
    const {searchValue} = this.state;
    const typeOfOption = typeof filterOption;
    React.Children.forEach(children, child => {
      let filterFlag = false;
      if (child.type.isSelectOption) {
        if (typeOfOption === 'function') {
          filterFlag = filterOption(searchValue, child);
        } else if (typeOfOption === 'boolean') {
          filterFlag = filterOption;
        }
        if (filterFlag) {
          ChildrenList.push(child);
        }
      } else if (child.type.isSelectOptGroup) {
        const children = this.getSelectFilteredOptionList(child.props.children);
        ChildrenList.push(React.cloneElement(child, {
          children: children,
          _isShow: !!(children && children.length)
        }));
      }
    });

    return ChildrenList;
  };

  //获取所有option的[{label,key}]
  getPlainOptionList = (children, plainOptionList = [], filter) => {
    React.Children.forEach(children, (c) => {
      if (c.type.isSelectOption) {
        if (filter) {
          filter(c) && plainOptionList.push({label: c.props.children, key: c.props.value || c.key});
        } else {
          plainOptionList.push({label: c.props.children, key: c.props.value || c.key});
        }
      } else if (c.type.isSelectOptGroup) {
        this.getPlainOptionList(c.props.children, plainOptionList, filter);
      } else {
        //  其余暂时不做处理
      }
    });
    return plainOptionList;
  };

  //多选取消
  handleCancelSelect = () => {
    const {defaultValue, value, labelInValue} = this.props;
    this.setState({
      popupVisible: false,
      selectValue: this.covertSelectValue(value || defaultValue || [], labelInValue)
    });
  };

  //多选确定
  handleConfirmSelect = () => {
    const {onChange, labelInValue} = this.props;
    this.setState({
      popupVisible: false,
    }, () => {
      if (labelInValue) {
        onChange(this.state.selectValue);
      } else {
        onChange(this.state.selectValue.map(selected => selected.key));
      }
    });
  };

  //判断是否全选
  isSelectAll = () => {
    const optionlist = this.getPlainOptionList(this.props.children, [], (child) => !child.props.disabled);
    const selectedlist = this.state.selectValue;
    return optionlist.every(selected => {
      return !!selectedlist.find(option => option.key == selected.key);
    });
  };

  //处理tab上下active切换功能
  handleActiveTabChange = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === KeyCode.ENTER || keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
      e.preventDefault();
      const {children, mode, labelInValue, onChange} = this.props;
      const {activeKey, selectValue} = this.state;
      const optionList = this.getPlainOptionList(children, [], (child) => !child.props.disabled);
      const optionListLen = optionList.length;
      if (!optionListLen) return;
      //enter
      if (keyCode === KeyCode.ENTER) {
        const activeTabIndex = optionList.findIndex(option => option.key == activeKey);
        // activeKey不在列表中
        if (activeTabIndex !== -1) {
          if (!selectValue.find((selected) => selected.key == activeKey)) {
            if (mode === 'single') {
              this.setState({
                selectValue: [optionList[activeTabIndex]],
                popupVisible: false,
                activeKey: undefined,
              }, () => {
                if (labelInValue) {
                  onChange(this.state.selectValue);
                } else {
                  onChange(this.state.selectValue.map(selected => selected.key));
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
          const activeTabIndex = optionList.findIndex(option => option.key == activeKey);
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
          let nextActiveKEY = undefined;
          if (keyCode === KeyCode.UP) {
            //超出到最后一个
            if (activeTabIndex === 0) {
              nextActiveKEY = optionList[optionListLen - 1].key;
            } else {
              nextActiveKEY = optionList[activeTabIndex - 1].key;
            }
          } else if (keyCode === KeyCode.DOWN) {
            if (activeTabIndex + 1 === optionListLen) {
              nextActiveKEY = optionList[0].key;
            } else {
              nextActiveKEY = optionList[activeTabIndex + 1].key;
            }
          }
          this.setState({
            activeKey: nextActiveKEY
          }, () => {
            this.setActiveOptionIntoView(nextActiveKEY);
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
    const activeOption = ReactDOM.findDOMNode(this.refs[activeKey]);
    const dropdownList = this.dropdownList;

    const optionOffsetTop = activeOption.offsetTop;
    const listScrollTop = this.dropdownList.scrollTop;
    const listHeight = this.dropdownList.clientHeight;

    if (optionOffsetTop < listScrollTop) {
      this.dropdownList.scrollTop = optionOffsetTop;
    } else if (optionOffsetTop > listScrollTop + listHeight) {
      this.dropdownList.scrollTop = optionOffsetTop;
    }
  };

  //处理option激活态-> mouseEnter
  onOptionMouseEnter = (activeKey) => {
    this.setState({activeKey});
  };

  //处理option激活态-> mouseLeave
  onOptionMouseLeave = () => {
    this.setState({activeKey: undefined});
  };

  //下拉框内容
  getDropdownPanel() {
    const {prefixCls, extraOptions, allowClear, showSingleClear, onPopupScroll, searchInputProps, searchPlaceholder, dropdownClassName, dropdownStyle, showSearch, showSelectAll, mode, selectAllText, placeholder, children, maxScrollHeight, notFoundContent} = this.props;
    const {searchValue} = this.state;
    const dropDownCls = `${prefixCls}-dropDown`;
    const optionFilteredList = this.getSelectFilteredOptionList(this.getSelectOptionList(children, dropDownCls));
    const showNotFoundContent = !this.getPlainOptionList(optionFilteredList).length;
    return (
      <div className={classNames(dropDownCls, {[dropdownClassName]: !!dropdownClassName})}
           ref={selection => this.selection = selection}
           tabIndex="0"
           onKeyDown={this.handleActiveTabChange}
           style={dropdownStyle}>
        {
          //搜索框
          showSearch &&
          <SelectSearch
            searchPlaceholder={searchPlaceholder}
            prefixCls={`${dropDownCls}-search`}
            ref={(selectSearch => this.selectSearch = selectSearch)}
            searchValue={searchValue}
            allowClear={allowClear}
            updateSearchValue={this.updateSearchValue}
            searchInputProps={searchInputProps}
            emitEmpty={this.emptySearchValue}/>
        }
        <div className={`${dropDownCls}-list`}
             ref={dropdownList => this.dropdownList = dropdownList}
             style={{maxHeight: maxScrollHeight}}
             onScroll={onPopupScroll}>
          {
            //全选按钮-多选的情况下存在
            showSelectAll && mode !== 'single' &&
            <li
              className={`${dropDownCls}-option-item ${this.isSelectAll() ? 'checked' : ''}`}
              onClick={this.selectAll}>
              {selectAllText}
            </li>
          }
          {
            //清空选项按钮-单选未搜索的情况下存在
            !searchValue && showSingleClear && mode === 'single' &&
            <li
              className={`${dropDownCls}-option-item`}
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
              <div className={`${dropDownCls}-not-found`}>{notFoundContent}</div> :
              <div className={`${dropDownCls}-filtered-list`}>{optionFilteredList}</div>
          }
        </div>
        {
          //多选的点击取消、确定按钮组
          mode === 'multiple' &&
          <div className={`${dropDownCls}-footer`}>
            <Row gutter={10}>
              <Col span={12}>
                <Button size="large" className={`${dropDownCls}-footer-btn`}
                        onClick={this.handleCancelSelect}>取消</Button>
              </Col>
              <Col span={12}>
                <Button size="large" className={`${dropDownCls}-footer-btn`} onClick={this.handleConfirmSelect}
                        type="primary">确定</Button>
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }

  // 获取面板内容
  getSelectionPanel() {
    const {prefixCls, placeholder, disabled, className, onMouseEnter, onMouseLeave, mode, showArrow, labelClear, size, style} = this.props;
    const {selectValue, popupVisible} = this.state;
    const selectionCls = `${prefixCls}-selection-panel`;
    const selectionPanelCls = classNames(`${selectionCls}`, {[className]: !!className}, {[`${selectionCls}-disabled`]: disabled}, `${size === 'default' ? '' : `${selectionCls}-${size}`}`);
    return (
      <div
        className={selectionPanelCls}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}>
        {
          //showArrow并且不是可删除label模式下出现箭头
          showArrow && !labelClear &&
          <div className={`${selectionCls}-caret`}>
            <Icon type="caret-down" style={{transform: popupVisible && 'rotate(180deg)'}}/>
          </div>
        }
        {
          //没有值的情况下显示placeholder
          !selectValue.length &&
          <div unselectable="on" className={`${selectionCls}-placeholder`}>{placeholder}</div>
        }
        {
          //单选模式下有值显示值的label
          mode === 'single' && !!selectValue.length &&
          <span className={`${selectionCls}-option-single`}>{selectValue[0].label}</span>
        }
        {
          //多选模式下区分labelClear
          mode === 'multiple' && (
            labelClear ?
              <div className={`${selectionCls}-option-clearable-list`}>
                {selectValue.map(option =>
                  <div className={`${selectionCls}-option-clearable-option`} key={option.key}>
                    {option.label || option}
                    <span className={`${selectionCls}-option-clearable-option-close`}
                          onClick={(e) => this.onOptionClick(e, option, true)}><Icon type="close"/></span>
                  </div>
                )}
              </div> :
              <div className={`${selectionCls}-option-multiple`}>
                {
                  selectValue.map((option, index) =>
                    <span key={option.key} className={`${selectionCls}-option-multiple-option`}>
                      <span>{option.label}</span>
                      <span>{index + 1 !== selectValue.length && '、'}</span>
                    </span>
                  )
                }
              </div>
          )
        }
      </div>
    );
  }

  render() {
    const {getPopupContainer, prefixCls, disabled, dropdownMatchSelectWidth, popupAlign} = this.props;
    return (
      <Trigger
        forceRender
        action={disabled ? [] : ['click']}
        popup={this.getDropdownPanel()}
        prefixCls={`${prefixCls}-popup`}
        popupVisible={this.state.popupVisible}
        onPopupVisibleChange={this.onVisibleChange}
        getPopupContainer={getPopupContainer}
        stretch={dropdownMatchSelectWidth ? 'width height' : 'height'}
        popupPlacement={popupAlign}
        builtinPlacements={placements}
      >
        {this.getSelectionPanel()}
      </Trigger>
    );
  }
}
