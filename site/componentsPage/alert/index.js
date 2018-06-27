import Markdown from '../../../libs/markdown';

export default class Alert extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/alert.md`);
  }
}
