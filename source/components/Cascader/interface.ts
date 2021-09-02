import * as React from 'react';

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

type OmitKeys =
  // | 'builtinPlacements'
  'onPopupVisibleChange';
// | 'dropdownMenuColumnStyle'
// | 'expandIcon'
// | 'onKeyDown';

export interface CascaderProps extends Omit<RcCascaderProps, OmitKeys> {
  // css
  style?: React.CSSProperties;
  className?: string;

  // input
  inputPrefixCls?: string;
  showSearch?: boolean | ShowSearchType;
  allowClear?: boolean;
  placeholder?: string;

  // display
  size?: string;
  notFoundContent?: React.ReactNode;
  displayRender?: (label: string[], selectedOptions?: CascaderOptionType[]) => React.ReactNode;

  // Popup
  onVisibleChange?: (popupVisible: boolean) => void;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export interface CascaderState {
  inputFocused: boolean;
  inputValue: string;
  value: string[];
  popupVisible: boolean | undefined;
  flattenOptions: CascaderOptionType[][] | undefined;
  prevProps: CascaderProps;
}

/* RcCascader */
export interface CascaderOptionType {
  value?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Array<CascaderOptionType>;

  [key: string]: any;
}

export interface RcCascaderProps {
  prefixCls?: string;
  transitionName?: string;

  //  Values
  defaultValue?: string[];
  value?: string[];

  // Options
  options: CascaderOptionType[];

  // Field
  fieldNames?: FieldNamesType;

  // Popup
  popupVisible?: boolean;
  popupClassName?: string;
  builtinPlacements?: BuildInPlacements;
  popupPlacement?: string;
  expandTrigger?: CascaderExpandTrigger;
  onPopupVisibleChange?: (popupVisible: boolean) => unknown;
  dropdownMenuColumnStyle?: React.CSSProperties;

  // Others
  disabled?: boolean;
  changeOnSelect?: boolean;
  esc?: boolean;
  expandIcon?: React.ReactNode;

  loadData?: (selectedOptions?: CascaderOptionType[]) => void;
  children?: React.ReactElement;

  // Events
  onChange?: (value: string[], selectedOptions?: CascaderOptionType[]) => void;
  onKeyDown?: React.KeyboardEventHandler;
}

/* BuildInPlacements */
export interface AlignType {
  /**
   * move point of source node to align with point of target node.
   * Such as ['tr','cc'], align top right point of source node with center point of target node.
   * Point can be 't'(top), 'b'(bottom), 'c'(center), 'l'(left), 'r'(right) */
  points?: string[];
  /**
   * offset source node by offset[0] in x and offset[1] in y.
   * If offset contains percentage string value, it is relative to sourceNode region.
   */
  offset?: number[];
  /**
   * If adjustX field is true, will adjust source node in x direction if source node is invisible.
   * If adjustY field is true, will adjust source node in y direction if source node is invisible.
   */
  overflow?: {
    adjustX?: boolean | number;
    adjustY?: boolean | number;
  };
}

export type BuildInPlacements = Record<string, AlignType>;

/* Menus */
export type CascaderExpandTrigger = 'click' | 'hover';

export type SelectEvent = React.KeyboardEvent | React.MouseEvent;

type OnSelect = (targetOption: CascaderOptionType, menuIndex: number, e?: SelectEvent) => void;

export type SelectEventHandler = (event: SelectEvent) => void;

export type DelayOnSelect = (onSelect?: OnSelect) => void;

export type DelaySelectEventHandler = (event: React.MouseEvent) => ReturnType<DelayOnSelect>;

export interface MenuItemProps extends React.HTMLProps<HTMLLIElement> {
  onClick: SelectEventHandler;
  onMouseEnter?: DelaySelectEventHandler;
  onMouseLeave?: DelaySelectEventHandler;
  ref?: (node: HTMLLIElement) => void;
}

export interface MenusProps {
  prefixCls?: string;
  dropdownMenuColumnStyle?: React.CSSProperties;

  //   Values
  value?: string[];
  activeValue?: string[];

  // Options
  options: CascaderOptionType[];
  expandTrigger: CascaderExpandTrigger;

  // Selection
  onSelect: OnSelect;

  // Visible
  visible?: boolean;

  // Fields
  defaultFieldNames: FieldNamesType;
  fieldNames: FieldNamesType;

  // Other
  expandIcon: React.ReactNode;
}
