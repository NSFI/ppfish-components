import Markdown from '../../../libs/markdown';

export default class BackTop extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/backTop.md`);
  }
}
