import Markdown from '../../../libs/markdown';

export default class Layout extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/layout.md`);
  }
}
