import { TooltipPlacement } from '../../Tooltip/index'

export interface RichEditorState {
  lastValue: string;
  value: string;
  loading: boolean;
  showLinkModal: boolean;
  showVideoModal: boolean;
  showImageModal: boolean;
  toolbarCtner: any;
  curRange: any;
  curVideoType: string;
  defaultInputLink: string;
  linkModalTitle: string;
  formatPainterActive: boolean;
  showAttachmentModal?: boolean;
}

export interface RichEditorProps {
  className?: string;
  customEmoji?: any[];
  customLink?: object;
  customInsertValue?: object;
  defaultValue?: string;
  placeholder?: string;
  prefixCls?: string;
  imageDrop?: boolean;
  fileDrop?: boolean;
  loading?: boolean;
  resizable?: boolean;
  supportFontTag?: boolean;
  pastePlainText?: boolean;
  style?: object;
  toolbar?: any[];
  value?: string;
  insertImageTip?: string | Element;
  insertAttachmentTip?: string | Element;
  insertVideoTip?: string | Element;
  insertLinkTip?: string | Element;
  popoverPlacement?: TooltipPlacement;
  tooltipPlacement?: TooltipPlacement;
  videoTagAttrs?: object;
  customDropImage?: Function;
  customDropFile?: Function;
  customInsertAttachment?: Function;
  customInsertImage?: Function;
  customInsertVideo?: Function;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  onChange?: Function;
  onClickToolbarBtn?: Function;
  onSelectionChange?: Function;
  onFocus?: Function;
  onBlur?: Function;
  onKeyPress?: Function;
  onKeyDown?: Function;
  onKeyUp?: Function;
}

export interface ModuleHtmlType {
  iconPrefix?: string,
  handleInsertEmoji?: Function,
  handleFormatBackground?: Function,
  handleFormatColor?: Function,
  handleInsertValue?: Function,
  prefixCls?: string,
  customLink?: object,
  customInsertValue?: object,
  popoverPlacement?: TooltipPlacement,
  tooltipPlacement?: TooltipPlacement,
  getPopupContainer?: (triggerNode: Element) => HTMLElement,
}

export interface CustomToolbarProps extends ModuleHtmlType {
  className?: string;
  iconPrefix?: string;
  prefixCls?: string;
  style?: object;
  toolbar?: any[];
  customEmoji?: any[];
  customLink?: object;
  formatPainterActive?: boolean;
  customInsertValue?: object;
  handleInsertEmoji?: (
    event: React.MouseEvent
  ) => void;
  handleFormatBackground?: (
    event: React.MouseEvent
  ) => void;
  handleFormatColor?: (
    event: React.MouseEvent
  ) => void;
  handleFormatSize?: Function;
  handleInsertValue?: (
    event: React.MouseEvent
  ) => void;
  getCurrentSize?: Function;
  saveSelectionFormat?: Function;
  unsaveSelectionFormat?: Function;
}

export interface EmojiInferface {
  id: number;
  className: string;
  imgName: string;
  title: string;
  url?: string;
}

export interface CustomToolbarState {
  curSize: null | string;
  sizePopoverVisible: boolean;
  curIVSearchValue: string;
}
