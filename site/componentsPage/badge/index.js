import Markdown from '../../../libs/markdown';

export default class Badge extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/badge.md`);
  }
}
