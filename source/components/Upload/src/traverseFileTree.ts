import React from 'react';
import { RcFile } from '../interface';

interface InternalDataTransferItem extends DataTransferItem {
  isFile: boolean;
  file: (cd: (file: RcFile & { webkitRelativePath?: string }) => void) => void;
  createReader: () => any;
  fullPath: string;
  isDirectory: boolean;
  name: string;
  path: string;
}

const traverseFileTree = (
  files: DataTransferItemList,
  callback: (files: File[]) => void,
  isAccepted: (file: File) => boolean,
) => {
  const _traverseFileTree = (item: InternalDataTransferItem, path?: string) => {
    path = path || '';
    if (item.isFile) {
      item.file(file => {
        if (isAccepted(file)) {
          callback([file]);
        }
      });
    } else if (item.isDirectory) {
      const dirReader = item.createReader();

      dirReader.readEntries(entries => {
        for (const entrieItem of entries) {
          _traverseFileTree(entrieItem, `${path}${item.name}/`);
        }
      });
    }
  };
  for (const file of files) {
    // FIXME: any类型
    _traverseFileTree(file.webkitGetAsEntry() as any);
  }
};

export default traverseFileTree;
