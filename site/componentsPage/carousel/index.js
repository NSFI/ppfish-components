import Markdown from '../../../libs/markdown';

export default class Carousel extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/carousel.md`);
  }
}
