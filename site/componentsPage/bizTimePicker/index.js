import Markdown from '../../../libs/markdown';

export default class BizTimePicker extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/bizTimePicker.md`);
  }
}
