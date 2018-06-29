import Markdown from '../../../libs/markdown';
import './index.less';

export default class PicturePreview extends Markdown {
  static defaultProps = {
    source: [
      {
        "url": require('../../assets/382_680.png'),
        "size": "382*680"
      },
      {
        "url": require('../../assets/410_412.png'),
        "size": "410*412"
      },
      {
        "url": require('../../assets/895_642.png'),
        "size": "895*642"
      },
      {
        "url": require('../../assets/960_600.png'),
        "size": "960*600"
      },
      {
        "url": require('../../assets/680_320.png'),
        "size": "680*320"
      }
    ],
    activeIndex: 0,
    onClose: () => {},
    dots: false,
    controller: false
  };

  document(locale) {
    return require(`../../docs/${locale}/picturePreview.md`);
  }
}
