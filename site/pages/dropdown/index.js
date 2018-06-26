import Markdown from '../../../libs/markdown';

export default class Dropdown extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/dropdown.md`);
  }
}
