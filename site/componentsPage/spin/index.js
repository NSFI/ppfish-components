import Markdown from '../../../libs/markdown';

export default class Spin extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/spin.md`);
  }
}
