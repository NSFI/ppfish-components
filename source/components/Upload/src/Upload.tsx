import * as React from 'react';
import { AjaxUploaderRef, RcUploadProps } from '../interface';
import AjaxUpload from './AjaxUploader';

function empty() {}

export type RcUploadRef = {
  uploader: AjaxUploaderRef;
  abort: AjaxUploaderRef['abort'];
};

const RcUpload: React.ForwardRefRenderFunction<RcUploadRef, RcUploadProps> = (props, ref) => {
  const { supportServerRender, onReady, ...restProps } = props;
  const [Component, setComponent] = React.useState<typeof AjaxUpload>();

  React.useEffect(() => {
    setComponent(AjaxUpload);
    onReady();
  }, []);

  const uploaderRef = React.useRef<AjaxUploaderRef>();
  React.useImperativeHandle(ref, () => {
    return {
      uploader: uploaderRef.current,
      abort: uploaderRef.current?.abort,
    };
  });

  // Render
  if (supportServerRender && !Component) {
    return null;
  }

  return <AjaxUpload {...restProps} ref={uploaderRef} />;
};

const Upload = React.forwardRef(RcUpload);

Upload.defaultProps = {
  component: 'span',
  prefixCls: 'rc-upload',
  data: {},
  headers: {},
  name: 'file',
  onReady: empty,
  onStart: empty,
  onError: empty,
  onSuccess: empty,
  supportServerRender: false,
  multiple: false,
  beforeUpload: null,
  customRequest: null,
  withCredentials: false,
};

export default Upload;
