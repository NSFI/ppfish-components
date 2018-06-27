import Markdown from '../../../libs/markdown';

export default class Card extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/card.md`);
  }
}
