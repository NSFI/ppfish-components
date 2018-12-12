import './style/index.less';
import ColorPicker from './ColorPicker';
import Panel from './Panel';
import QuickPanel from './QuickPanel';

// 单独使用Panel不能使用History
ColorPicker.Panel = Panel;
// 在弹出层中使用QuickPanel不能使用自定义颜色
ColorPicker.QuickPanel = QuickPanel;
export default ColorPicker;
