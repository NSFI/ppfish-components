import Markdown from '../../../libs/markdown';

export default class DatePicker extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/datePicker.md`);
  }
}
