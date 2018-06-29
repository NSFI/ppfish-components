import Markdown from '../../../libs/markdown';
import './style.less';

export default class Dropdown extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/dropdown.md`);
  }
}
