import Markdown from '../../../libs/markdown';

export default class Slider extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/slider.md`);
  }
}
