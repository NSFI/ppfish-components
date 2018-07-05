import Markdown from '../../../libs/markdown';
import './index.less';

export default class RichEditor extends Markdown {
  static defaultProps = {
    controller: false
  };

  document(locale) {
    return require(`../../docs/${locale}/richEditor.md`);
  }
}
