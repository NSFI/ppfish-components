import Markdown from '../../../libs/markdown';

export default class Progress extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/progress.md`);
  }
}
