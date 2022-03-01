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
  fullScreen: boolean;
}

export interface QuillComponentProps {
  id?: string,
  className?: string,
  theme?: string,
  style?: object,
  readOnly?: boolean,
  value?: string | {opts: any[]},
  defaultValue?: string | {opts: any[]},
  placeholder?: string,
  tabIndex?:number,
  bounds?: string|React.ReactElement<any>|object,
  scrollingContainer?: React.ReactElement<any>,
  onChange?: Function,
  onSelectionChange?: Function,
  onFocus?: Function,
  onBlur?: Function,
  onKeyPress?: Function,
  onKeyDown?: Function,
  onKeyUp?: Function,
  modules?: {
    toolbar?: any[],
  }
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
  imageResize?: boolean;
  style?: object;
  toolbar?: any[];
  value?: string;
  insertImageTip?: boolean | string | Element;
  insertImageModalVisible?: boolean;
  insertAttachmentTip?: string | Element;
  insertAttachmentModalVisible?: boolean;
  insertVideoTip?: boolean | string | Element;
  insertLinkTip?: string | Element;
  popoverPlacement?: TooltipPlacement;
  tooltipPlacement?: TooltipPlacement;
  videoTagAttrs?: object;
  customDropImage?: Function;
  customDropFile?: Function;
  customInsertAttachment?: Function;
  customInsertImage?: Function;
  customInsertVideo?: Function;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  onChange?: Function;
  onClickToolbarBtn?: Function;
  onSelectionChange?: Function;
  onFocus?: Function;
  onBlur?: Function;
  onKeyPress?: Function;
  onKeyDown?: Function;
  onKeyUp?: Function;
  attachmentIconMap ?: Record<string, string>
  historyConfig ?: Record<string, any>
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
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement,
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
  fullScreen?: boolean;
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
  handleFormatLineHeight?: Function;
  handleInsertValue?: (
    event: React.MouseEvent
  ) => void;
  getCurrentSize?: Function;
  getCurrentLineHeight?: Function;
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
  curLineHeight:  null | string,
  lineHeightPopoverVisible: boolean,
  curIVSearchValue: string;
}
