import Markdown from '../../../libs/markdown';

export default class Notification extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/notification.md`);
  }
}
