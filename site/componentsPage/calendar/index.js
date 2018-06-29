import Markdown from '../../../libs/markdown';

export default class Calendar extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/calendar.md`);
  }
}
