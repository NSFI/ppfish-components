import TimeSelect from './TimeSelect';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import DateRangePicker from './DateRangePicker';
import './styles/index.less';

TimePicker.TimeSelect = TimeSelect;
DatePicker.DateRangePicker = DateRangePicker;

export { TimeSelect, DateRangePicker };
export { default as TimePicker } from './TimePicker';
export { default as DatePicker } from './DatePicker';
