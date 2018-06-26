import Markdown from '../../../libs/markdown';

export default class DayTimeSelect extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/loading.md`);
  }
}
