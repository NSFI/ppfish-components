import AnimationImageLoader from './AnimationImageLoader';
import AudioPlayer from './AudioPlayer';
import BizLoading from './BizLoading';
import BizTimePicker from './BizTimePicker';
import Button from './Button/index.tsx';
import Checkbox from './Checkbox/index.tsx';
import Col from './Col/index.tsx';
import ColorPicker from './ColorPicker';
import Drawer from './Drawer';
import Dropdown from './Dropdown/index.tsx';
import ImageLoader from './ImageLoader';
import Layout from './Layout/index.tsx';
import LoadMore from './LoadMore';
import Input from './Input/index.tsx';
import InputNumber from './Input-number/index.tsx';
import Menu from './Menu/index.tsx';
import message from './Message/index.tsx';
import Modal from './Modal/index.tsx';
import Pagination from './Pagination/index.tsx';
import Popover from './Popover/index.tsx';
import PicturePreview from './PicturePreview';
import Radio from './Radio/index.tsx';
import RichEditor from './RichEditor';
import Row from './Row/index.tsx';
import Select from './Select';
import SearchInput from './SearchInput';
import Spin from './Spin/index.tsx';
import Icon from './Icon/index.tsx';
import StickVerticalMenu from './StickVerticalMenu';
import Table from './Table/index.tsx';
import Tabs from './Tabs';
import TextOverflow from './TextOverflow';
import Tooltip from './Tooltip/index.tsx';
import TreeSelect from './TreeSelect/index.tsx';
import VideoViewer from './VideoViewer';
import Echart from './EChart';

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
export {Button};
export {Checkbox};
export {Col};
export {ColorPicker};
export {Drawer};
export {Dropdown};
export {ImageLoader};
export {Icon};
export {Layout};
export {LoadMore};
export {Input};
export {InputNumber};
export {Menu};
export {message};
export {Modal};
export {Pagination};
export {PicturePreview};
export {Radio};
export {Row};
export {Popover};
export {RichEditor};
export {Select};
export {SearchInput};
export {StickVerticalMenu};
export {Table};
export {Spin};
export {Tabs};
export {TextOverflow};
export {Tooltip};
export {TreeSelect};
export {VideoViewer};
export {Echart};

const util = {
  bom, dom, number, other, upload, iframeC
};
export {util};
