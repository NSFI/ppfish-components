import * as React from 'react';
import RcSelect, { Option, OptGroup } from './src/index.js';
import classNames from 'classnames';
import warning from 'warning';
import ConfigConsumer from '../Config/Consumer';
import { LocaleProperties } from '../Locale';

export interface AbstractSelectProps {
  prefixCls?: string;
  className?: string;
  size?: 'default' | 'large' | 'small';
  notFoundContent?: React.ReactNode | null;
  transitionName?: string;
  choiceTransitionName?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  style?: React.CSSProperties;
  tabIndex?: number;
  placeholder?: string | React.ReactNode;
  defaultActiveFirstOption?: boolean;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownMenuStyle?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  onSearch?: (value: string) => any;
  filterOption?: boolean | ((inputValue: string, option: React.ReactElement<OptionProps>) => any);
  id?: string;
}

export interface LabeledValue {
  key: string;
  label: React.ReactNode;
}

export type SelectValue = string | string[] | number | number[] | LabeledValue | LabeledValue[];

export interface SelectProps extends AbstractSelectProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  mode?: 'default' | 'multiple' | 'tags' | 'combobox' | string;
  optionLabelProp?: string;
  firstActiveValue?: string | string[];
  onChange?: (
    value: SelectValue,
    option: React.ReactElement<any> | React.ReactElement<any>[],
  ) => void;
  onSelect?: (value: SelectValue, option: React.ReactElement<any>) => any;
  onDeselect?: (value: SelectValue) => any;
  onBlur?: () => any;
  onFocus?: () => any;
  onPopupScroll?: () => any;
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLInputElement>) => any;
  onMouseLeave?: (e: React.MouseEvent<HTMLInputElement>) => any;
  maxTagCount?: number;
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: SelectValue[]) => React.ReactNode);
  optionFilterProp?: string;
  labelInValue?: boolean;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  tokenSeparators?: string[];
  getInputElement?: () => React.ReactElement<any>;
  autoFocus?: boolean;
  children?: React.ReactNode,
}

export interface OptionProps {
  disabled?: boolean;
  value?: string | number;
  title?: string;
  children?: React.ReactNode;
}

export interface OptGroupProps {
  label?: React.ReactNode;
}

export interface SelectLocale {
  notFoundContent?: string;
}

// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };

const InternalSelect: React.ForwardRefRenderFunction<unknown, SelectProps> = (props, ref) => {
  React.useEffect(() => {
    warning(
      props.mode !== 'combobox',
      'The combobox mode of Select is deprecated, ' +
        'it will be removed in next major version, ' +
        'please use AutoComplete instead',
    );
  }, []);

  const getNotFoundContent = (locale: SelectLocale) => {
    const { notFoundContent } = props;
    if (isCombobox()) {
      // AutoComplete don't have notFoundContent defaultly
      return notFoundContent === undefined ? null : notFoundContent;
    }
    return notFoundContent === undefined ? locale.notFoundContent : notFoundContent;
  };

  const isCombobox = () => {
    const { mode } = props;
    return mode === 'combobox' || mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;
  };

  const renderSelect = (locale: SelectLocale) => {
    const { prefixCls, className = '', size, mode, ...restProps } = props;
    const cls = classNames(
      {
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
      },
      className,
    );

    let { optionLabelProp } = props;
    if (isCombobox()) {
      // children 带 dom 结构时，无法填入输入框
      optionLabelProp = optionLabelProp || 'value';
    }

    const modeConfig = {
      multiple: mode === 'multiple',
      tags: mode === 'tags',
      combobox: isCombobox(),
    };

    return (
      <RcSelect
        {...restProps}
        {...modeConfig}
        prefixCls={prefixCls}
        className={cls}
        optionLabelProp={optionLabelProp || 'children'}
        notFoundContent={getNotFoundContent(locale)}
        ref={ref}
      />
    );
  };

  return (
    <ConfigConsumer componentName="AutoComplete">
      {(Locale: LocaleProperties['AutoComplete']) => {
        return renderSelect({
          notFoundContent: Locale.notFoundContent as string,
        });
      }}
    </ConfigConsumer>
  );
};

const SelectRef = React.forwardRef(InternalSelect);

type InternalSelectType = typeof SelectRef;

export interface SelectInterface extends InternalSelectType {
  SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
  Option: typeof Option;
  OptGroup: typeof OptGroup;
}

const Select: SelectInterface = SelectRef as SelectInterface;

Select.displayName = 'Select';

Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
Select.Option = Option;
Select.OptGroup = OptGroup;

Select.defaultProps = {
  prefixCls: 'fishd-autocomplete-select',
  showSearch: false,
  transitionName: 'slide-up',
  choiceTransitionName: 'zoom',
};

export default Select;
