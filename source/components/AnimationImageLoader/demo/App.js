import React, {Component} from 'react';
import './App.less';
import AnimationImageLoader from '../index';
import defaultImage from '../POI@2x.jpg';

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
          src={defaultImage}
          zoom={0.5}
        />
      </div>
    );
  }
}

export default App;
