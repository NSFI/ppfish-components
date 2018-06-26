import Markdown from '../../../libs/markdown';

export default class NumberCounter extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/loading.md`);
  }
}
