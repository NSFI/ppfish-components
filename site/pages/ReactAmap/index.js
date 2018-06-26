import Markdown from '../../../libs/markdown';

export default class ReactAmap extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/loading.md`);
  }
}
