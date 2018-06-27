import Markdown from '../../../libs/markdown';

export default class Switch extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/switch.md`);
  }
}
