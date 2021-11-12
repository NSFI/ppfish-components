import * as React from 'react';
import Upload from './Upload';
import { UploadProps } from './interface';

// export type DraggerProps = UploadProps & { width?: number, height?: number };
export type DraggerProps = UploadProps;

const Dragger: React.FC<DraggerProps> = props => {
  return <Upload {...props} type="drag" />;
};

export default Dragger;
