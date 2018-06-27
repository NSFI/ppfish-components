import Markdown from '../../../libs/markdown';

export default class Table extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/table.md`);
  }
}
