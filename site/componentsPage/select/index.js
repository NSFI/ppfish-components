import Markdown from '../../../libs/markdown';

export default class Select extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/select.md`);
  }
}
