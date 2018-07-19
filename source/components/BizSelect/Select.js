import React from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import {Col, Row, Button, Icon} from 'antd';
import SelectSearch from './SelectSearch';
import {placements} from './placements';

const noop = () => {
};

export default class BizSelect extends React.Component {
  static propTypes = {
    getPopupContainer: PropTypes.func,
    onVisibleChange: PropTypes.func,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
    onPopupScroll: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    showSearch: PropTypes.bool,
    allowClear: PropTypes.bool,
    placeholder: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    maxScrollHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showSelectAll: PropTypes.bool,
    selectAllText: PropTypes.string,
    disabled: PropTypes.bool,
    mode: PropTypes.oneOf(['multiple', 'single']),
    filterOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    notFoundContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    extraOptions: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    searchInputProps: PropTypes.object,
    dropdownClassName: PropTypes.string,
    dropdownStyle: PropTypes.object,
    dropdownMatchSelectWidth: PropTypes.bool,
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    labelInValue: PropTypes.bool,
    showArrow: PropTypes.bool,
    labelClear: PropTypes.bool,
    popupAlign: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topCenter', 'topLeft', 'topRight']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    style: PropTypes.object
  };

  static defaultProps = {
    prefixCls: 'm-biz-select',
    selectAllText: '选择所有',
    placeholder: '请选择',
    searchPlaceholder: '请输入关键词',
    notFoundContent: '无匹配结果',
    maxScrollHeight: 250,
    showSearch: false,
    allowClear: true,
    showSelectAll: false,
    disabled: false,
    onPopupScroll: noop,
    onVisibleChange: noop,
    onChange: noop,
    onSelect: noop,
    onSearch: noop,
    mode: 'single',
    filterOption: true,
    searchInputProps: {},
    style: {},
    dropdownMatchSelectWidth: true,
    labelInValue: false,
    showArrow: true,
    labelClear: false,
    popupAlign: 'bottomLeft',
    size: 'default'
  };

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      selectValue: this.covertSelectValue(this.props.value || this.props.defaultValue, this.props.labelInValue),
      popupVisible: false,
      resetValue: [],
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
    const plainOptionList = this.getPlainOptionList(this.props.children, [], (child) => !child.props.disabled);
    if (this.state.selectValue.length !== plainOptionList.length) {
      this.setState({
        selectValue: this.getPlainOptionList(this.props.children, [], (child) => !child.props.disabled),
      });
    } else {
      this.setState({
        selectValue: [],
      });
    }
  };

  //转换传入的value
  covertSelectValue = (value, labelInValue) => {
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
      const {showSearch, onVisibleChange} = this.props;
      onVisibleChange(visible);
      if (visible && showSearch) {
        this.selectSearch.searchInput.input.focus();
      }
    });
  };

  //处理 label、option的click操作
  onOptionClick = (e, obj, clickInLabel) => {
    e.stopPropagation();
    const {onChange, mode, onSelect, labelInValue} = this.props;
    const selectValue = this.state.selectValue;
    const index = selectValue.findIndex(valueItem => valueItem.key === obj.key);
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
      if (typeof c === 'object' && c.type.displayName === 'SelectOption') {
        const value = c.props.value || c.key;
        return React.cloneElement(c, {
          prefixCls: `${dropDownCls}-option`,
          checked: !!this.state.selectValue.find(obj => obj && obj.key == value),
          value: value,
          onOptionClick: this.onOptionClick,
          children: this.getSelectOptionList(c.props.children, dropDownCls),
        });
      } else if (typeof c === 'object' && c.type.displayName === 'SelectOptionGroup') {
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
      if (child.type.displayName === 'SelectOption') {
        if (typeOfOption === 'function') {
          filterFlag = filterOption(searchValue, child);
        } else if (typeOfOption === 'boolean') {
          filterFlag = filterOption;
        }
        if (filterFlag) {
          ChildrenList.push(child);
        }
      } else if (child.type.displayName === 'SelectOptionGroup') {
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
      if (c.type.displayName === 'SelectOption') {
        if (filter) {
          filter(c) && plainOptionList.push({label: c.props.children, key: c.props.value || c.key});
        } else {
          plainOptionList.push({label: c.props.children, key: c.props.value || c.key});
        }
      } else if (c.type.displayName === 'SelectOptionGroup') {
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

  //下拉框内容
  getDropdownPanel() {
    const {prefixCls, extraOptions, allowClear, onPopupScroll, onMouseLeave, onMouseEnter, searchInputProps, searchPlaceholder, dropdownClassName, dropdownStyle, showSearch, showSelectAll, mode, selectAllText, placeholder, children, maxScrollHeight, notFoundContent} = this.props;
    const {searchValue, selectValue} = this.state;
    const dropDownCls = `${prefixCls}-dropDown`;
    const optionFilteredList = this.getSelectFilteredOptionList(this.getSelectOptionList(children, dropDownCls));
    const showNotFoundContent = !this.getPlainOptionList(optionFilteredList).length;
    return (
      <div className={classNames(dropDownCls, {[dropdownClassName]: !!dropdownClassName})}
           style={dropdownStyle}
           onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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
             style={{maxHeight: maxScrollHeight}}
             onScroll={onPopupScroll}>
          {
            //全选按钮-多选未搜索的情况下存在
            showSelectAll && !searchValue && mode !== 'single' &&
            <li
              className={`${dropDownCls}-option-item ${this.getPlainOptionList(children, [], (child) => !child.props.disabled).length === selectValue.length ? 'checked' : ''}`}
              onClick={this.selectAll}>
              {selectAllText}
            </li>
          }
          {
            //清空选项按钮-单选未搜索的情况下存在
            !searchValue && mode === 'single' &&
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

  getSelectionPanel() {
    const {prefixCls, placeholder, disabled, className, mode, showArrow, labelClear, size, style} = this.props;
    const {selectValue, popupVisible} = this.state;
    const selectionCls = `${prefixCls}-selection`;
    return (
      <div
        className={classNames(`${selectionCls}`, {[className]: !!className}, {[`${selectionCls}-disabled`]: disabled}, `${selectionCls}-${size}`)}
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
                  <div className={`${selectionCls}-option-clearable-option`} key={option.key} title={option.label}>
                    {option.label || option}
                    <span className={`${selectionCls}-option-clearable-option-close`}
                          onClick={(e) => this.onOptionClick(e, option, true)}><Icon type="close"/></span>
                  </div>
                )}
              </div> :
              <div className={`${selectionCls}-option-multiple`}>
                {selectValue.map((option) => option.label).join('、')}
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
