import Markdown from '../../../libs/markdown';

import './style.less';

export default class Checkbox extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/checkbox.md`);
  }
}
