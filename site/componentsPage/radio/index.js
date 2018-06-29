import Markdown from '../../../libs/markdown';

export default class Radio extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/radio.md`);
  }
}
