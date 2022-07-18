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
  type?: UploadType;
  name?: string;
  defaultFileList?: Array<UploadFile>;
  fileList?: Array<UploadFile>;
  action?: string | ((file: UploadFile) => PromiseLike<any>);
  directory?: boolean;
  data?: Record<string, any> | ((file: UploadFile) => any);
  headers?: HttpRequestHeader;
  showUploadList?: boolean | ShowUploadListInterface;
  multiple?: boolean;
  accept?: string | string[];
  beforeUpload?: (file: RcFile, FileList: RcFile[]) => boolean | PromiseLike<any>;
  onChange?: (info: UploadChangeParam) => void;
  listType?: UploadListType;
  className?: string;
  onPreview?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void | boolean;
  onDeleteAll?: () => void;
  supportServerRender?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  prefixCls?: string;
  customRequest?: (option: any) => void;
  withCredentials?: boolean;
  locale?: UploadLocale;
  maxFileCount?: number;
  showDeleteAll?: boolean;
  tip?: string;
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
  progressAttr?: Record<string, any>;
  prefixCls?: string;
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  locale: UploadLocale;
  maxFileCount?: number;
  showDeleteAll?: boolean;
}
