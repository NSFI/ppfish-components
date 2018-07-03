import Markdown from '../../../libs/markdown';

export default class ColorPicker extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/colorPicker.md`);
  }
}
