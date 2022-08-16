import * as React from 'react';
import RcCascader from './src';
import arrayTreeFilter from 'array-tree-filter';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import omit from 'omit.js';
import warning from 'warning';
import { KeyCode } from '../../utils';
import Input from '../Input';
import Icon from '../Icon';
import ConfigConsumer from '../Config/Consumer';
import { LocaleProperties } from '../Locale';

export interface CascaderOptionType {
  value?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Array<CascaderOptionType>;

  [key: string]: any;
}

export interface FieldNamesType {
  value?: string;
  label?: string;
  children?: string;
}

export interface FilledFieldNamesType {
  value: string;
  label: string;
  children: string;
}

export type CascaderExpandTrigger = 'click' | 'hover';

export interface ShowSearchType {
  filter?: (inputValue: string, path: CascaderOptionType[], names: FilledFieldNamesType) => boolean;
  render?: (
    inputValue: string,
    path: CascaderOptionType[],
    prefixCls: string | undefined,
    names: FilledFieldNamesType,
  ) => React.ReactNode;
  sort?: (
    a: CascaderOptionType[],
    b: CascaderOptionType[],
    inputValue: string,
    names: FilledFieldNamesType,
  ) => number;
  matchInputWidth?: boolean;
  limit?: number | false;
}

export interface CascaderProps {
  /** 可选项数据源 */
  options: CascaderOptionType[];
  /** 默认的选中项 */
  defaultValue?: string[];
  /** 指定选中项 */
  value?: string[];
  /** 选择完成后的回调 */
  onChange?: (value: string[], selectedOptions?: CascaderOptionType[]) => void;
  /** 选择后展示的渲染函数 */
  displayRender?: (label: string[], selectedOptions?: CascaderOptionType[]) => React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义浮层类名 */
  popupClassName?: string;
  /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
  popupPlacement?: string;
  /** 输入框占位文本*/
  placeholder?: string;
  /** 输入框大小，可选 `large` `default` `small` */
  size?: string;
  /** 禁用*/
  disabled?: boolean;
  /** 是否支持清除*/
  allowClear?: boolean;
  showSearch?: boolean | ShowSearchType;
  notFoundContent?: React.ReactNode;
  loadData?: (selectedOptions?: CascaderOptionType[]) => void;
  /** 次级菜单的展开方式，可选 'click' 和 'hover' */
  expandTrigger?: CascaderExpandTrigger;
  /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
  changeOnSelect?: boolean;
  /** 浮层可见变化时回调 */
  onVisibleChange?: (popupVisible: boolean) => void;
  prefixCls?: string;
  inputPrefixCls?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  popupVisible?: boolean;
  fieldNames?: FieldNamesType;
  esc?: boolean;
}

export interface CascaderState {
  inputFocused: boolean;
  inputValue: string;
  value: string[];
  popupVisible: boolean | undefined;
  flattenOptions: CascaderOptionType[][] | undefined;
  prevProps: CascaderProps;
}

// We limit the filtered item count by default
const defaultLimit = 50;

//搜索项高亮-String类型支持
function highlightKeyword(str: string, keyword: string, prefixCls: string | undefined) {
  return str.split(keyword).map((node: string, index: number) =>
    index === 0
      ? node
      : [
          <span className={`${prefixCls}-menu-item-keyword`} key="seperator">
            {keyword}
          </span>,
          node,
        ],
  );
}

//默认filterOption
function defaultFilterOption(
  inputValue: string,
  path: CascaderOptionType[],
  names: FilledFieldNamesType,
) {
  return path.some(option => (option[names.label] as string).indexOf(inputValue) > -1);
}

//默认的搜索后的option渲染方法
function defaultRenderFilteredOption(
  inputValue: string,
  path: CascaderOptionType[],
  prefixCls: string | undefined,
  names: FilledFieldNamesType,
) {
  return path.map((option, index) => {
    const label = option[names.label];
    const node =
      (label as string).indexOf(inputValue) > -1
        ? highlightKeyword(label as string, inputValue, prefixCls)
        : label;
    return index === 0 ? node : [' / ', node];
  });
}

//默认搜索后的option排序方案
function defaultSortFilteredOption(
  a: CascaderOptionType[],
  b: CascaderOptionType[],
  inputValue: string,
  names: FilledFieldNamesType,
) {
  function callback(elem: CascaderOptionType) {
    return (elem[names.label] as string).indexOf(inputValue) > -1;
  }

  return a.findIndex(callback) - b.findIndex(callback);
}

//自定义option参数的名字
function getFilledFieldNames(props: CascaderProps) {
  const fieldNames = props.fieldNames || {};
  const names: FilledFieldNamesType = {
    children: fieldNames.children || 'children',
    label: fieldNames.label || 'label',
    value: fieldNames.value || 'value',
  };
  return names;
}

function flattenTree(
  options: CascaderOptionType[],
  props: CascaderProps,
  ancestor: CascaderOptionType[] = [],
) {
  const names: FilledFieldNamesType = getFilledFieldNames(props);
  let flattenOptions = [] as CascaderOptionType[][];
  const childrenName = names.children;
  options.forEach(option => {
    const path = ancestor.concat(option);
    if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
      flattenOptions.push(path);
    }
    if (option[childrenName]) {
      flattenOptions = flattenOptions.concat(flattenTree(option[childrenName], props, path));
    }
  });
  return flattenOptions;
}

const defaultDisplayRender = (label: string[]) => label.join(' / ');

class Cascader extends React.Component<CascaderProps, CascaderState> {
  static defaultProps = {
    prefixCls: 'fishd-cascader',
    inputPrefixCls: 'fishd-input',
    transitionName: 'slide-up',
    popupPlacement: 'bottomLeft',
    options: [],
    disabled: false,
    allowClear: true,
  };

  static getDerivedStateFromProps(nextProps: CascaderProps, { prevProps }: CascaderState) {
    const newState: Partial<CascaderState> = {
      prevProps: nextProps,
    };

    if ('value' in nextProps) {
      newState.value = nextProps.value || [];
    }
    if ('popupVisible' in nextProps) {
      newState.popupVisible = nextProps.popupVisible;
    }
    if (nextProps.showSearch && prevProps.options !== nextProps.options) {
      newState.flattenOptions = flattenTree(nextProps.options, nextProps);
    }

    return newState;
  }

  cachedOptions: CascaderOptionType[];

  private input: Input;

  constructor(props: CascaderProps) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || [],
      inputValue: '',
      inputFocused: false,
      popupVisible: props.popupVisible,
      flattenOptions: props.showSearch ? flattenTree(props.options, props) : undefined,
      prevProps: props,
    };
  }

  handleChange = (value: any, selectedOptions: CascaderOptionType[]) => {
    this.setState({ inputValue: '' });
    if (selectedOptions[0].__IS_FILTERED_OPTION) {
      const unwrappedValue = value[0];
      const unwrappedSelectedOptions = selectedOptions[0].path;
      this.setValue(unwrappedValue, unwrappedSelectedOptions);
      return;
    }
    this.setValue(value, selectedOptions);
  };

  handlePopupVisibleChange = (popupVisible: boolean) => {
    if (!('popupVisible' in this.props)) {
      this.setState({
        popupVisible,
        inputFocused: popupVisible,
        inputValue: popupVisible ? this.state.inputValue : '',
      });
    }

    const onVisibleChange = this.props.onVisibleChange;
    if (onVisibleChange) {
      onVisibleChange(popupVisible);
    }
  };

  handleInputBlur = () => {
    this.setState({
      inputFocused: false,
    });
  };

  handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { inputFocused, popupVisible } = this.state;
    // Prevent `Trigger` behaviour.
    if (inputFocused || popupVisible) {
      e.stopPropagation();
      if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
      }
    }
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === KeyCode.BACKSPACE) {
      e.stopPropagation();
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    this.setState({ inputValue });
  };

  setValue = (value: string[], selectedOptions: CascaderOptionType[] = []) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value, selectedOptions);
    }
  };

  getLabel() {
    const { options, displayRender = defaultDisplayRender as Function } = this.props;
    const names = getFilledFieldNames(this.props);
    const value = this.state.value;
    const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
    const selectedOptions: CascaderOptionType[] = arrayTreeFilter(
      options,
      (o: CascaderOptionType, level: number) => o[names.value] === unwrappedValue[level],
    );
    const label = selectedOptions.map(o => o[names.label]);
    return displayRender(label, selectedOptions);
  }

  clearSelection = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.inputValue) {
      this.setValue([]);
      this.handlePopupVisibleChange(false);
    } else {
      this.setState({ inputValue: '' });
    }
  };

  generateFilteredOptions(prefixCls: string | undefined, Locale: LocaleProperties['Cascader']) {
    const { showSearch, notFoundContent = Locale.notFoundContent } = this.props;
    const names: FilledFieldNamesType = getFilledFieldNames(this.props);
    const {
      filter = defaultFilterOption,
      render = defaultRenderFilteredOption,
      sort = defaultSortFilteredOption,
      limit = defaultLimit,
    } = showSearch as ShowSearchType;
    const { flattenOptions = [], inputValue } = this.state;
    // Limit the filter if needed
    let filtered: Array<CascaderOptionType[]>;
    if (limit > 0) {
      filtered = [];
      let matchCount = 0;
      // Perf optimization to filter items only below the limit
      flattenOptions.some(path => {
        const match = filter(this.state.inputValue, path, names);
        if (match) {
          filtered.push(path);
          matchCount += 1;
        }
        return matchCount >= limit;
      });
    } else {
      warning(
        typeof limit !== 'number',
        "'limit' of showSearch in Cascader should be positive number or false.",
      );
      filtered = flattenOptions.filter(path => filter(this.state.inputValue, path, names));
    }
    filtered.sort((a, b) => sort(a, b, inputValue, names));
    if (filtered.length > 0) {
      return filtered.map((path: CascaderOptionType[]) => {
        return {
          __IS_FILTERED_OPTION: true,
          path,
          [names.label]: render(inputValue, path, prefixCls, names),
          [names.value]: path.map((o: CascaderOptionType) => o[names.value]),
          disabled: path.some((o: CascaderOptionType) => !!o.disabled),
        } as CascaderOptionType;
      });
    }
    return [
      {
        [names.label]: notFoundContent,
        [names.value]: 'FISHD_CASCADER_NOT_FOUND',
        disabled: true,
      },
    ];
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  saveInput = (node: Input) => {
    this.input = node;
  };

  render() {
    const { props, state } = this;
    const {
      prefixCls,
      inputPrefixCls,
      children,
      placeholder,
      notFoundContent,
      size,
      disabled,
      className,
      style,
      allowClear,
      showSearch = false,
      ...otherProps
    } = props;
    const { value, inputFocused } = state;

    const sizeCls = classNames({
      [`${inputPrefixCls}-lg`]: size === 'large',
      [`${inputPrefixCls}-sm`]: size === 'small',
    });
    const clearIcon =
      (allowClear && !disabled && value.length > 0) || state.inputValue ? (
        <Icon
          type="close-circle-fill"
          className={`${prefixCls}-picker-clear`}
          onClick={this.clearSelection}
        />
      ) : null;
    const arrowCls = classNames({
      [`${prefixCls}-picker-arrow`]: true,
      [`${prefixCls}-picker-arrow-expand`]: state.popupVisible,
    });
    const pickerCls = classNames(className, `${prefixCls}-picker`, {
      [`${prefixCls}-picker-with-value`]: state.inputValue,
      [`${prefixCls}-picker-disabled`]: disabled,
      [`${prefixCls}-picker-${size}`]: !!size,
      [`${prefixCls}-picker-show-search`]: !!showSearch,
      [`${prefixCls}-picker-focused`]: inputFocused,
    });

    // Fix bug of https://github.com/facebook/react/pull/5004
    // and https://fb.me/react-unknown-prop
    const inputProps = omit(otherProps, [
      'onChange',
      'options',
      'popupPlacement',
      'transitionName',
      'displayRender',
      'onVisibleChange',
      'changeOnSelect',
      'expandTrigger',
      'popupVisible',
      'getPopupContainer',
      'loadData',
      'popupClassName',
      'filterOption',
      'renderFilteredOption',
      'sortFilteredOption',
      'notFoundContent',
      'fieldNames',
      'esc',
    ]);

    const getOptionsAndOthers = Locale => {
      const { notFoundContent = Locale.notFoundContent, placeholder = Locale.placeholder } =
        this.props;
      let options = props.options;
      if (state.inputValue) {
        options = this.generateFilteredOptions(prefixCls, Locale);
      }
      // Dropdown menu should keep previous status until it is fully closed.
      if (!state.popupVisible) {
        options = this.cachedOptions;
      } else {
        this.cachedOptions = options;
      }

      const dropdownMenuColumnStyle: { width?: number; height?: string } = {};
      const isNotFound =
        (options || []).length === 1 && options[0].value === 'FISHD_CASCADER_NOT_FOUND';
      if (isNotFound) {
        dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
      }
      // The default value of `matchInputWidth` is `true`
      const resultListMatchInputWidth =
        (showSearch as ShowSearchType).matchInputWidth === false ? false : true;
      if (resultListMatchInputWidth && state.inputValue && this.input) {
        dropdownMenuColumnStyle.width = this.input.input.offsetWidth;
      }
      return {
        options,
        dropdownMenuColumnStyle,
        notFoundContent,
        placeholder,
      };
    };

    const label = this.getLabel();
    const getInput = Locale => {
      const { placeholder = Locale.placeholder } = this.props;
      return (
        children || (
          <span style={style} className={pickerCls}>
            <span
              className={`${prefixCls}-picker-label`}
              title={typeof label === 'string' ? label : ''}
            >
              {label}
            </span>
            <Input
              {...inputProps}
              ref={this.saveInput}
              prefixCls={inputPrefixCls}
              placeholder={value && value.length > 0 ? undefined : placeholder}
              className={`${prefixCls}-input ${sizeCls}`}
              value={state.inputValue}
              disabled={disabled}
              readOnly={!showSearch}
              autoComplete="off"
              onClick={showSearch ? this.handleInputClick : undefined}
              onBlur={showSearch ? this.handleInputBlur : undefined}
              onKeyDown={this.handleKeyDown}
              onChange={showSearch ? this.handleInputChange : undefined}
            />
            {clearIcon}
            <Icon type="down-fill" className={arrowCls} />
          </span>
        )
      );
    };

    return (
      <ConfigConsumer componentName="Cascader">
        {(Locale: LocaleProperties['Cascader']) => {
          return (
            <RcCascader
              {...props}
              {...getOptionsAndOthers(Locale)}
              value={value}
              popupVisible={state.popupVisible}
              onPopupVisibleChange={this.handlePopupVisibleChange}
              onChange={this.handleChange}
            >
              {getInput(Locale)}
            </RcCascader>
          );
        }}
      </ConfigConsumer>
    );
  }
}

polyfill(Cascader);

export default Cascader;
