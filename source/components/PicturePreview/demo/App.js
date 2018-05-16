import React, {Component} from 'react';
import PicturePreview from '../index';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

import './App.less';

const dataSource = [
  {
    "url": "http://www.taopic.com/uploads/allimg/131125/240503-1311250IT642.jpg",
    "size": "600*600"
  },
  {
    "url": "http://cdn.duitang.com/uploads/item/201506/29/20150629091228_aF2WC.jpg",
    "size": "100*100"
  },
  {
    "url": "http://imgsrc.baidu.com/imgad/pic/item/72f082025aafa40f9000f0e1a064034f79f019c3.jpg",
    "size": "60*60"
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
