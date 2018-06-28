import Markdown from '../../../libs/markdown';

export default class CustomTable extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/customTable.md`);
  }
}
