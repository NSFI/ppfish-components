import Markdown from '../../../libs/markdown';

export default class Avat extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/avatar.md`);
  }
}
