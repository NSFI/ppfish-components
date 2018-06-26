import Markdown from '../../../libs/markdown';

export default class TextOverFlow extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/loading.md`);
  }
}
