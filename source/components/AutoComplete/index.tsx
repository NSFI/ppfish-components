import * as React from 'react';
import { Option, OptGroup } from './src/index.js';
import Select, { AbstractSelectProps, SelectValue, OptionProps, OptGroupProps } from './Select';
import classNames from 'classnames';
import Input from '../Input';
import InputElement from './InputElement';
import './style/index.less';

export interface DataSourceItemObject {
  value: string;
  text: string;
}
export type DataSourceItemType =
  | string
  | DataSourceItemObject
  | React.ReactElement<OptionProps>
  | React.ReactElement<OptGroupProps>;

export interface AutoCompleteInputProps {
  onChange?: React.FormEventHandler<any>;
  value: any;
}

export type ValidInputElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | React.ReactElement<AutoCompleteInputProps>;

export interface AutoCompleteProps extends AbstractSelectProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  dataSource?: DataSourceItemType[];
  autoFocus?: boolean;
  backfill?: boolean;
  highlightSelected?: boolean;
  optionLabelProp?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  onChange?: (value: SelectValue) => void;
  onSelect?: (value: SelectValue, option: Record<string, any>) => any;
  children?:
    | ValidInputElement
    | React.ReactElement<OptionProps>
    | Array<React.ReactElement<OptionProps>>;
}

function isSelectOptionOrSelectOptGroup(child: any): boolean {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

export default class AutoComplete extends React.Component<AutoCompleteProps, {}> {
  static Option = Option;
  static OptGroup = OptGroup;

  static defaultProps = {
    prefixCls: 'fishd-autocomplete-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
    filterOption: false,
    highlightSelected: true,
  };

  private select: any;

  getInputElement = () => {
    const { children } = this.props;
    const element =
      children && React.isValidElement(children) && children.type !== Option ? (
        React.Children.only(this.props.children)
      ) : (
        <Input />
      );
    const elementProps = { ...element.props };
    // https://github.com/ant-design/ant-design/pull/7742
    delete elementProps.children;
    return <InputElement {...elementProps}>{element}</InputElement>;
  };

  focus() {
    this.select.focus();
  }

  blur() {
    this.select.blur();
  }

  saveSelect = (node: any) => {
    this.select = node;
  };

  render() {
    const {
      size,
      className = '',
      notFoundContent,
      prefixCls,
      optionLabelProp,
      dataSource,
      children,
      highlightSelected,
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: true,
      [`${prefixCls}-auto-complete`]: true,
    });

    let options;
    const childArray = React.Children.toArray(children);
    if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
      options = children;
    } else {
      options = dataSource
        ? dataSource.map(item => {
            if (React.isValidElement(item)) {
              return item;
            }
            switch (typeof item) {
              case 'string':
                return <Option key={item}>{item}</Option>;
              case 'object':
                return (
                  <Option key={(item as DataSourceItemObject).value}>
                    {(item as DataSourceItemObject).text}
                  </Option>
                );
              default:
                throw new Error(
                  'AutoComplete[dataSource] only supports type `string[] | Object[]`.',
                );
            }
          })
        : [];
    }

    return (
      <Select
        {...this.props}
        className={cls}
        dropdownClassName={highlightSelected ? null : `${prefixCls}-nohighlight`}
        mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE}
        optionLabelProp={optionLabelProp}
        getInputElement={this.getInputElement}
        notFoundContent={notFoundContent}
        ref={this.saveSelect}
      >
        {options}
      </Select>
    );
  }
}
