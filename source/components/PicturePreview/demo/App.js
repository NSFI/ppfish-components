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
