import Markdown from '../../../libs/markdown';

export default class TimePicker extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/timePicker.md`);
  }
}
