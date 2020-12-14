import * as React from 'react';
import PropTypes from 'prop-types';
import RcSelect, { Option, OptGroup } from './src/index';
import classNames from 'classnames';
import warning from 'warning';

export type SelectItemValue = { label: string | React.ReactNode, title: string, name: string }
export type SelectValue = string | string[] | SelectItemValue | SelectItemValue[]

export interface AbstractSelectProps {
  prefixCls?: string;
  className?: string;
  allowClear?: boolean;
  disabled?: boolean;
  filterOption?: boolean | ((inputValue: string, option: React.ReactElement<OptionProps>) => any);
  size?: 'default' | 'large' | 'small';
  notFoundContent?: string;
  transitionName?: string;
  choiceTransitionName?: string;
  showSearch?: boolean;
  showArrow?: boolean;
  style?: React.CSSProperties;
  tabIndex?: number;
  placeholder?: string;
  defaultActiveFirstOption?: boolean;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownMenuStyle?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  onSearch?: (value: string) => any;
  id?: string;
}

export interface LabeledValue {
  key: string;
  label: React.ReactNode;
}

export interface SelectProps extends AbstractSelectProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  mode?: 'default' | 'multiple' | 'tags' | 'combobox' | string;
  optionLabelProp?: string;
  firstActiveValue?: SelectValue | SelectValue[];
  onChange?: (value: SelectValue, option: React.ReactElement<any> | React.ReactElement<any>[]) => void;
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
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  tokenSeparators?: string[];
  getInputElement?: () => React.ReactElement<any>;
  autoFocus?: boolean;
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

const SelectPropTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['default', 'large', 'small']),
  notFoundContent: PropTypes.any,
  showSearch: PropTypes.bool,
  optionLabelProp: PropTypes.string,
  transitionName: PropTypes.string,
  choiceTransitionName: PropTypes.string,
  id: PropTypes.string,
};

// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };

export default class Select extends React.Component<SelectProps, {}> {
  static Option = Option;
  static OptGroup = OptGroup;

  static SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

  static defaultProps = {
    prefixCls: 'fishd-autocomplete-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  };

  static propTypes = SelectPropTypes;

  private rcSelect: any;

  constructor(props: SelectProps) {
    super(props);

    warning(
      props.mode !== 'combobox',
      'The combobox mode of Select is deprecated, ' +
      'it will be removed in next major version, ' +
      'please use AutoComplete instead',
    );
  }

  focus() {
    this.rcSelect.focus();
  }

  blur() {
    this.rcSelect.blur();
  }

  saveSelect = (node: any) => {
    this.rcSelect = node;
  }

  getNotFoundContent(locale: SelectLocale) {
    const { notFoundContent } = this.props;
    if (this.isCombobox()) {
      // AutoComplete don't have notFoundContent defaultly
      return notFoundContent === undefined ? null : notFoundContent;
    }
    return notFoundContent === undefined ? locale.notFoundContent : notFoundContent;
  }

  isCombobox() {
    const { mode } = this.props;
    return mode === 'combobox' || mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;
  }

  renderSelect = (locale: SelectLocale) => {
    const {
      prefixCls,
      className = '',
      size,
      mode,
      ...restProps
    } = this.props;
    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    }, className);

    let { optionLabelProp } = this.props;
    if (this.isCombobox()) {
      // children 带 dom 结构时，无法填入输入框
      optionLabelProp = optionLabelProp || 'value';
    }

    const modeConfig = {
      multiple: mode === 'multiple',
      tags: mode === 'tags',
      combobox: this.isCombobox(),
    };

    return (
      <RcSelect
        {...restProps}
        {...modeConfig}
        prefixCls={prefixCls}
        className={cls}
        optionLabelProp={optionLabelProp || 'children'}
        notFoundContent={this.getNotFoundContent(locale)}
        ref={this.saveSelect}
      />
    );
  }

  render() {
    return (
      this.renderSelect({
        notFoundContent: '无匹配结果',
      })
    );
  }
}
