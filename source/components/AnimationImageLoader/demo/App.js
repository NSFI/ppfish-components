import React, {Component} from 'react';
import './App.less';
import AnimationImageLoader from '../index';
import defaultImage from './create_POI@2x.png';

class App extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * img 图片文件
   * zoom 缩放比例{0.5倍缩放，默认两倍图}
   * @returns {XML}
   */
  render() {
    return (
      <div style={{margin: 100}}>
        <AnimationImageLoader
          extraCls="u-nav-icon"
          src={defaultImage}
          zoom={0.5}
        />
      </div>
    );
  }
}

export default App;
