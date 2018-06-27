import Markdown from '../../../libs/markdown';

export default class Divider extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/divider.md`);
  }
}
