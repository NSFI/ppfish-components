import Upload from './Upload';
import Dragger from './Dragger';
import './style/index.less';

export { UploadProps, UploadListProps, UploadChangeParam } from './interface';
export { DraggerProps } from './Dragger';

Upload.Dragger = Dragger;
export default Upload;
