import Markdown from '../../../libs/markdown';

export default class Tag extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/tag.md`);
  }
}
