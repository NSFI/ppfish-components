import Markdown from '../../../libs/markdown';

export default class Timeline extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/timeline.md`);
  }
}
