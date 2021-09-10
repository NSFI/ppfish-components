import React, { CSSProperties, forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
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
import useControlledState from '../../hooks/useControlledState';

import {
  CascaderOptionType,
  FilledFieldNamesType,
  CascaderProps,
  ShowSearchType,
  RcCascaderProps
} from './interface'



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
        node
      ]
  );
}

//默认filterOption
function defaultFilterOption(
  inputValue: string,
  path: CascaderOptionType[],
  names: FilledFieldNamesType
) {
  return path.some(option => (option[names.label] as string).indexOf(inputValue) > -1);
}

//默认的搜索后的option渲染方法
function defaultRenderFilteredOption(
  inputValue: string,
  path: CascaderOptionType[],
  prefixCls: string | undefined,
  names: FilledFieldNamesType
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
  names: FilledFieldNamesType
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
    value: fieldNames.value || 'value'
  };
  return names;
}

function flattenTree(
  options: CascaderOptionType[],
  props: CascaderProps,
  ancestor: CascaderOptionType[] = []
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

const getInputProps = (otherProps) => omit(otherProps, [
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
  'esc'
]);

function useInput({ value, popupVisible, handleValueChange, handlePopupVisibleChange, props, otherProps }) {
  const [inputFocused, setInputFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleInputBlur = () => {
    setInputFocused(false);
  }

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Prevent `Trigger` behaviour.
    if (inputFocused || popupVisible) {
      e.stopPropagation();
      if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === KeyCode.BACKSPACE) {
      e.stopPropagation();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  const clearSelection = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inputValue) {
      handleValueChange([]);
      handlePopupVisibleChange(false);
    } else {
      setInputValue('');
    }
  };

  function getLabel() {
    const { options, displayRender = defaultDisplayRender as Function } = props;
    const names = getFilledFieldNames(props);
    const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
    const selectedOptions: CascaderOptionType[] = arrayTreeFilter(
      options,
      (o: CascaderOptionType, level: number) => o[names.value] === unwrappedValue[level]
    );
    const label = selectedOptions.map(o => o[names.label]);
    return displayRender(label, selectedOptions);
  }

  const inputRef = React.useRef<Input>();
  const { inputPrefixCls, size, allowClear, disabled, prefixCls, className, showSearch, children, style } = props;

  const renderInput = Locale => {
    const inputProps = getInputProps(otherProps)
    const label = getLabel();
    const sizeCls = classNames({
      [`${inputPrefixCls}-lg`]: size === 'large',
      [`${inputPrefixCls}-sm`]: size === 'small'
    });
    const clearIcon =
      (allowClear && !disabled && value.length > 0) || inputValue ? (
        <Icon
          type="close-circle-fill"
          className={`${prefixCls}-picker-clear`}
          onClick={clearSelection}
        />
      ) : null;
    const arrowCls = classNames({
      [`${prefixCls}-picker-arrow`]: true,
      [`${prefixCls}-picker-arrow-expand`]: popupVisible
    });
    const pickerCls = classNames(className, `${prefixCls}-picker`, {
      [`${prefixCls}-picker-with-value`]: inputValue,
      [`${prefixCls}-picker-disabled`]: disabled,
      [`${prefixCls}-picker-${size}`]: !!size,
      [`${prefixCls}-picker-show-search`]: !!showSearch,
      [`${prefixCls}-picker-focused`]: inputFocused
    });

    let { placeholder = Locale.placeholder } = props;
    return children || (
      <span style={style} className={pickerCls}>
        <span
          className={`${prefixCls}-picker-label`}
          title={typeof label === 'string' ? label : ''}
        >
          {label}
        </span>
        <Input
          {...inputProps}
          ref={inputRef}
          prefixCls={inputPrefixCls}
          placeholder={value && value.length > 0 ? undefined : placeholder}
          className={`${prefixCls}-input ${sizeCls}`}
          value={inputValue}
          disabled={disabled}
          readOnly={!showSearch}
          autoComplete="off"
          onClick={showSearch ? handleInputClick : undefined}
          onBlur={showSearch ? handleInputBlur : undefined}
          onKeyDown={handleKeyDown}
          onChange={showSearch ? handleInputChange : undefined}
        />
        {clearIcon}
        <Icon type="down-fill" className={arrowCls} />
      </span>
    );
  }

  return {
    inputValue,
    setInputValue,
    setInputFocused,
    renderInput,
    inputRef
  }
}

interface RefCascaderProps {
  focus: () => void
  blur: () => void
}

const InternalCascader: React.ForwardRefRenderFunction<RefCascaderProps, CascaderProps> = (props, ref) => {
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

  const [flattenOptions, setFlattenOptions] = useState(props.showSearch ? flattenTree(props.options, props) : undefined);
  const [value, setValue] = useControlledState([], { value: props.value, defaultValue: props.defaultValue })
  const [popupVisible, setPopupVisible] = useControlledState(false, { value: props.popupVisible, onChange: props.onVisibleChange });

  const handlePopupVisibleChange = (popupVisible: boolean) => {
    setPopupVisible(popupVisible);
    if (!('popupVisible' in props)) {
      setInputFocused(popupVisible);
      setInputValue(popupVisible ? inputValue : '');
    }
  };

  const handleValueChange = (value: string[], selectedOptions: CascaderOptionType[] = []) => {
    setValue(value);

    const onChange = props.onChange;
    if (onChange) {
      onChange(value, selectedOptions);
    }
  };

  useEffect(() => {
    if (props.showSearch) {
      setFlattenOptions(flattenTree(props.options, props));
    }

  }, [props.options])

  const {
    inputValue,
    setInputValue,
    setInputFocused,
    renderInput,
    inputRef
  } = useInput({ value, handleValueChange, popupVisible, handlePopupVisibleChange, props, otherProps });

  function generateFilteredOptions(prefixCls: string | undefined, Locale: LocaleProperties["Cascader"]) {
    const { showSearch, notFoundContent = Locale.notFoundContent } = props;
    const names: FilledFieldNamesType = getFilledFieldNames(props);
    const {
      filter = defaultFilterOption,
      render = defaultRenderFilteredOption,
      sort = defaultSortFilteredOption,
      limit = defaultLimit
    } = showSearch as ShowSearchType;

    // Limit the filter if needed
    let filtered: Array<CascaderOptionType[]>;
    if (limit > 0) {
      filtered = [];
      let matchCount = 0;
      // Perf optimization to filter items only below the limit
      flattenOptions.some(path => {
        const match = filter(inputValue, path, names);
        if (match) {
          filtered.push(path);
          matchCount += 1;
        }
        return matchCount >= limit;
      });
    } else {
      warning(
        typeof limit !== 'number',
        "'limit' of showSearch in Cascader should be positive number or false."
      );
      filtered = flattenOptions.filter(path => filter(inputValue, path, names));
    }
    filtered.sort((a, b) => sort(a, b, inputValue, names));
    if (filtered.length > 0) {
      return filtered.map((path: CascaderOptionType[]) => {
        return {
          __IS_FILTERED_OPTION: true,
          path,
          [names.label]: render(inputValue, path, prefixCls, names),
          [names.value]: path.map((o: CascaderOptionType) => o[names.value]),
          disabled: path.some((o: CascaderOptionType) => !!o.disabled)
        } as CascaderOptionType;
      });
    }
    return [
      {
        [names.label]: notFoundContent,
        [names.value]: 'FISHD_CASCADER_NOT_FOUND',
        disabled: true
      }
    ];
  }

  const cachedOptions = useRef([]);
  const getOptionsAndOthers = (Locale: LocaleProperties["Cascader"]) => {
    let options = props.options;
    if (inputValue) {
      options = generateFilteredOptions(prefixCls, Locale);
    }
    // Dropdown menu should keep previous status until it is fully closed.
    if (!popupVisible) {
      options = cachedOptions.current;
    } else {
      cachedOptions.current = options;
    }

    const dropdownMenuColumnStyle: React.CSSProperties = {};
    const isNotFound =
      (options || []).length === 1 && options[0].value === 'FISHD_CASCADER_NOT_FOUND';
    if (isNotFound) {
      dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
    }
    // The default value of `matchInputWidth` is `true`
    const resultListMatchInputWidth =
      (showSearch as ShowSearchType).matchInputWidth === false ? false : true;

    if (resultListMatchInputWidth && inputValue && inputRef.current) {
      dropdownMenuColumnStyle.width = inputRef.current.input.offsetWidth;
    }
    return {
      options,
      dropdownMenuColumnStyle,
    };
  }

  const handleChange = (value: any, selectedOptions: CascaderOptionType[]) => {
    setInputValue('');
    if (selectedOptions[0].__IS_FILTERED_OPTION) {
      const unwrappedValue = value[0];
      const unwrappedSelectedOptions = selectedOptions[0].path;
      handleValueChange(unwrappedValue, unwrappedSelectedOptions);
      return;
    }
    handleValueChange(value, selectedOptions);
  };

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },

    blur() {
      inputRef.current.focus();
    }
  }))

  const rcCascaderProps: RcCascaderProps = omit(props, [
    'style',
    'className',
    'inputPrefixCls',
    'showSearch',
    'allowClear',
    'placeholder',
    'size',
    'notFoundContent',
    'displayRender',
    'onVisibleChange',
    'getPopupContainer'
  ])

  return (
    <ConfigConsumer componentName="Cascader">
      {
        (Locale: LocaleProperties["Cascader"]) => {
          return (<RcCascader
            {...rcCascaderProps}
            {
            ...getOptionsAndOthers(Locale)
            }
            value={value}
            popupVisible={popupVisible}
            onPopupVisibleChange={handlePopupVisibleChange}
            onChange={handleChange}
          >
            {renderInput(Locale)}
          </RcCascader>)
        }
      }
    </ConfigConsumer>
  );
}

const Cascader = forwardRef<unknown, CascaderProps>(InternalCascader);
Cascader.displayName = 'Cascader';

Cascader.defaultProps = {
  prefixCls: 'fishd-cascader' as CascaderProps['prefixCls'],
  inputPrefixCls: 'fishd-input' as CascaderProps['inputPrefixCls'],
  transitionName: 'slide-up' as CascaderProps['transitionName'],
  popupPlacement: 'bottomLeft' as CascaderProps['popupPlacement'],
  options: [] as CascaderProps['options'],
  disabled: false as CascaderProps['disabled'],
  allowClear: true as CascaderProps['allowClear'],
}

export default Cascader;
