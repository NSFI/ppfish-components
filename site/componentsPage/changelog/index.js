import Markdown from '../../../libs/markdown';

export default class Changelog extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/changelog.md`);
  }
}
