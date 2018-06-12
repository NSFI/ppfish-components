# PicturePreview 图片查看器

### 描述

当用户需要预览一个或一组图片时，可以点击图片进行预览、查看

### API

|参数|说明|类型|默认值|
|:-|:-|:-|:-|
|visible|是否打开图片查看器|bool|false|
|source|需要查看的图片数组，格式为[{url:"xxxx",size: "width*height"}]|array|[{url:'', size: "200*200"}]|
|activeIndex|默认打开的图片索引|number|0|
|controller|是否显示图片控制面板|bool|false|
|onClose|关闭图片查看器的回调|func|() => {}|

### 代码演示

```js
import React, {Component} from 'react';
import PicturePreview from '../index';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

import './App.less';

const dataSource = [
  {
    "url": "../../../assets/image/material/382_680.png",
    "size": "382*680"
  },
  {
    "url": "../../../assets/image/material/410_412.png",
    "size": "410*412"
  },
  {
    "url": "../../../assets/image/material/895_642.png",
    "size": "895*642"
  },
  {
    "url": "../../../assets/image/material/960_600.png",
    "size": "960*600"
  },
  {
    "url": "../../../assets/image/material/680_320.png",
    "size": "680*320"
  }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      picturePreviewVisible: false,
      activePictureIndex: 0,
    };
  }

  /**
   * 打开图片预览
   */
  handleClickPicture(index) {
    this.setState({
      picturePreviewVisible: true,
      activePictureIndex: index
    });
  }

  /**
   * 关闭图片预览
   */
  handlePreviewClose = () => {
    this.setState({
      picturePreviewVisible: false
    });
  }

  render() {
    const { picturePreviewVisible, activePictureIndex } = this.state;
    return (
      <DocumentLayout>
        <div>
          <div className="materials-pictures">
            <div className="label">点击图片预览</div>
            <div className="content">
              {
                dataSource.map((each, index)=>
                  <div key={each.size} className="picture" onClick={this.handleClickPicture.bind(this, index)}>
                    <img src={each.url} alt={each.url} width="60px" height="60px" />
                    <div>{each.size}</div>
                  </div>
                )
              }
            </div>
          </div>
          <PicturePreview
            visible={picturePreviewVisible}
            activeIndex={activePictureIndex}
            source={dataSource}
            onClose={this.handlePreviewClose}
            dots={false}
          />
        </div>
      </DocumentLayout>
    );
  }
}
export default App;
```


