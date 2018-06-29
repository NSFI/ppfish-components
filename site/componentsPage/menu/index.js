import Markdown from '../../../libs/markdown';

export default class Menu extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/menu.md`);
  }
}
