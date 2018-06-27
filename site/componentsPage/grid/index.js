import Markdown from '../../../libs/markdown';

export default class Grid extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/grid.md`);
  }
}
