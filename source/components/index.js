import AnimationImageLoader from './AnimationImageLoader';
import AudioPlayer from './AudioPlayer';
import BizLoading from './BizLoading';
import BizTimePicker from './BizTimePicker';
import BizTable from './BizTable';
import ColorPicker from './ColorPicker';
import Drawer from './Drawer';
import ImageLoader from './ImageLoader';
import LoadMore from './LoadMore';
import PicturePreview from './PicturePreview';
import RichEditor from './RichEditor';
import SearchInput from './SearchInput';
import StickVerticalMenu from './StickVerticalMenu';
import Tabs2 from './Tabs';
import TextOverflow from './TextOverflow';
import TreeSelect2 from './TreeSelect2';
import VideoViewer from './VideoViewer';

//<!--utils相关
import * as bom from '../utils/bom';
import * as dom from '../utils/dom';
import * as number from '../utils/number';
import {iframeC} from '../utils/iframeC';
import * as other from '../utils/other';
import * as upload from '../utils/upload';
//-->utils相关

// 通用组件从这里暴露
export {AnimationImageLoader};
export {AudioPlayer};
export {BizLoading};
export {BizTimePicker};
export {BizTable};
export {ColorPicker};
export {Drawer};
export {ImageLoader};
export {LoadMore};
export {PicturePreview};
export {RichEditor};
export {SearchInput};
export {StickVerticalMenu};
export {Tabs2};
export {TextOverflow};
export {TreeSelect2};
export {VideoViewer};

const util = {
  bom, dom, number, other, upload, iframeC
};
export {util};
