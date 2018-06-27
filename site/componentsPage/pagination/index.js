import Markdown from '../../../libs/markdown';

export default class Pagination extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/pagination.md`);
  }
}
