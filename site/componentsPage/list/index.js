import Markdown from '../../../libs/markdown';

export default class List extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/list.md`);
  }
}
