import * as React from 'react';

export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export interface HttpRequestHeader {
  [key: string]: string;
}

export interface RcFile extends File {
  uid: string;
  // lastModifiedDate?: Date;
  lastModifiedDate: Date;
}

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  isNotImage?: boolean;
  originFileObj?: File;
  response?: any;
  error?: any;
  linkProps?: any;
  type: string;
}

export interface UploadChangeParam {
  file: UploadFile;
  fileList: Array<UploadFile>;
  event?: { percent: number };
}

export interface ShowUploadListInterface {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
}

export interface UploadLocale {
  uploading?: string;
  removeFile?: string;
  uploadError?: string;
  previewFile?: string;
}

export type UploadType = 'drag' | 'select';
export type UploadListType = 'text' | 'picture' | 'picture-card';

export interface UploadProps {
  // Styles
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;

  // Values
  defaultFileList?: Array<UploadFile>;
  fileList?: Array<UploadFile>;

  // Input Attribute
  multiple?: boolean;
  directory?: boolean;
  accept?: string | string[];

  // Config
  type?: UploadType;
  showUploadList?: boolean | ShowUploadListInterface;
  listType?: UploadListType;
  supportServerRender?: boolean;
  disabled?: boolean;
  locale?: UploadLocale;
  maxFileCount?: number;
  showDeleteAll?: boolean;
  tip?: string;

  // Request Options
  name?: string;
  data?: AjaxUploaderInterface['data'];
  action?: AjaxUploaderInterface['action'];
  headers?: HttpRequestHeader;
  withCredentials?: boolean;
  customRequest?: AjaxUploaderInterface['customRequest'];

  // Events
  beforeUpload?: AjaxUploaderInterface['beforeUpload'];
  onChange?: (info: UploadChangeParam) => void;
  onPreview?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void | boolean;
  onDeleteAll?: () => void;
}

export interface UploadState {
  fileList: UploadFile[];
  dragState: string;
  action: string | ((file: UploadFile) => PromiseLike<any>);
}

export interface UploadListProps {
  listType?: UploadListType;
  onPreview?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void | boolean;
  onDeleteAll?: () => void;
  items?: Array<UploadFile>;
  progressAttr?: Object;
  prefixCls?: string;
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  locale: UploadLocale;
  maxFileCount?: number;
  showDeleteAll?: boolean;
}

// export interface RcFile extends File {
//   uid: string;
// }

export interface UploadProgressEvent extends ProgressEvent {
  percent: number;
}

export type OnProgress = (event: UploadProgressEvent, file: RcFile) => void;

export interface UploadRequestOption<T = any> {
  onProgress?: (event: UploadProgressEvent, file: RcFile) => void;
  onError?: (error: UploadRequestError, ret: Record<string, unknown>, file: RcFile) => void;
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void;
  data?: Record<string, unknown>;
  filename?: string;
  file: RcFile;
  withCredentials?: boolean;
  action: string;
  headers?: Record<string, string>;
}

export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';

export interface UploadRequestError extends Error {
  status?: number;
  method?: UploadRequestMethod;
  url?: string;
}

export interface RcUploadProps extends AjaxUploaderInterface {
  // multipart: boolean;
  onReady?: () => void;
  supportServerRender?: boolean;
}

export interface AjaxUploaderInterface {
  // Style
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;

  // Input Attributes
  multiple?: boolean;
  directory?: boolean;
  accept?: string | string[];

  // Others
  // component?: React.JSXElementConstructor<any>;
  component?: React.ElementType;
  disabled?: boolean;
  children?: React.ReactNode;

  // Request Options
  name?: string;
  data?: Record<string, unknown> | ((file: string | RcFile | Blob) => Record<string, unknown>);
  action?: string | ((file: RcFile) => string | PromiseLike<string>);
  headers?: UploadRequestOption['headers'];
  withCredentials?: boolean;
  customRequest?: (option: UploadRequestOption) => void;

  // Events
  beforeUpload?: (file: RcFile, FileList: RcFile[]) => boolean | Promise<RcFile>;
  onStart?: (file: RcFile) => void;
  onError?: UploadRequestOption['onError'];
  onSuccess?: (response: Record<string, unknown>, file: RcFile, xhr: XMLHttpRequest) => void;
  onProgress?: (event: UploadProgressEvent, file: RcFile) => void;
}

export type AjaxUploaderRef = {
  fileInput: HTMLInputElement;
  abort: (file?: any) => void;
};
