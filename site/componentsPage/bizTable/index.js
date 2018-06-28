import Markdown from '../../../libs/markdown';

export default class BizTable extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/bizTable.md`);
  }
}
