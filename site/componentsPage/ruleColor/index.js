import Markdown from '../../../libs/markdown';

export default class Contributing extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/ruleColor.md`);
  }
}
