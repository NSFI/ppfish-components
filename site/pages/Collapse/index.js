import Markdown from '../../../libs/markdown';

export default class Collapse extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/loading.md`);
  }
}
