import Markdown from '../../../libs/markdown';
import './style.less';

export default class Affix extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/affix.md`);
  }
}
