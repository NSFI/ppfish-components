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
  onSelect?: (value: SelectValue, option: Object) => any;
  children?:
    | ValidInputElement
    | React.ReactElement<OptionProps>
    | Array<React.ReactElement<OptionProps>>;
}

export interface AutoCompleteRefInterface {
  focus: () => void;
  blur: () => void;
}

function isSelectOptionOrSelectOptGroup(child: any): Boolean {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

const InternalAutoComplete: React.ForwardRefRenderFunction<
  AutoCompleteRefInterface,
  AutoCompleteProps
> = (props, ref) => {
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      select.current.focus();
    },

    blur: () => {
      select.current.blur();
    },
  }));

  const select = React.useRef<HTMLElement>();

  const getInputElement = () => {
    const { children } = props;
    const element =
      children && React.isValidElement(children) && children.type !== Option ? (
        (React.Children.only(props.children) as JSX.Element)
      ) : (
        <Input />
      );
    const elementProps = { ...element.props };
    // https://github.com/ant-design/ant-design/pull/7742
    delete elementProps.children;
    return <InputElement {...elementProps}>{element}</InputElement>;
  };

  const saveSelect = (node: any) => {
    select.current = node;
  };

  let {
    size,
    className = '',
    notFoundContent,
    prefixCls,
    optionLabelProp,
    dataSource,
    children,
    highlightSelected,
  } = props;

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
              throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
          }
        })
      : [];
  }

  return (
    <Select
      {...props}
      className={cls}
      dropdownClassName={highlightSelected ? null : `${prefixCls}-nohighlight`}
      mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE}
      optionLabelProp={optionLabelProp}
      getInputElement={getInputElement}
      notFoundContent={notFoundContent}
      ref={saveSelect}
    >
      {options}
    </Select>
  );
};

const AutoCompleteRef = React.forwardRef(InternalAutoComplete);

type AutoCompleteRefType = typeof AutoCompleteRef;

export interface AutoCompleteInterface extends AutoCompleteRefType {
  Option: typeof Option;
  OptGroup: typeof OptGroup;
}

const AutoComplete = AutoCompleteRef as AutoCompleteInterface;

AutoComplete.defaultProps = {
  prefixCls: 'fishd-autocomplete-select',
  transitionName: 'slide-up',
  optionLabelProp: 'children',
  choiceTransitionName: 'zoom',
  showSearch: false,
  filterOption: false,
  highlightSelected: true,
};

AutoComplete.Option = Option;
AutoComplete.OptGroup = OptGroup;

export default AutoComplete;
