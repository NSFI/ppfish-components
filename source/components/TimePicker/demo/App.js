import React, {Component} from 'react';
import './App.less';
import TimePicker from '../TimePicker';

//快速选择时间选项
const quickTimeOption = [
  { text: '昨天', value: 1 },
  { text: '过去7天', value: 7 },
  { text: '过去30天', value: 30 },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //当前时间
      currentTime: {
        text: '过去7天',
        value: 7,
      },
    };
  }

  //选择时间
  handleTimeChange(time) {
    this.setState({
      currentTime: {
        text: time.text,
        value: time.value
      }
    });
  }

  render() {
    const { currentTime } = this.state;
    /**
     * quickOption - 快速选择选项 格式[{ text: '昨天', value: 1 }]
     * dateFormat - 展示的日期格式 默认："YYYY/MM/DD"
     * allowClear - 是否显示清除按钮 默认false
     * disabledDate - 不可选的时间
     * active - 控制浮层是否展开
     * defaultTime - 默认显示时间 { text: '昨天', value: 1 }
     * onChange - 时间变化回调函数
     */
    return (
      <div className="time-picker" style={{float:"left"}}>
        <TimePicker
          quickTimeOption={quickTimeOption}
          dateFormat="YYYY/MM/DD"
          allowClear={false}
          defaultTime={currentTime}
          onChange={this.handleTimeChange.bind(this)}
        />
      </div>
    );
  }
}

export default App;
