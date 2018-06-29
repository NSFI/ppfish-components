import Markdown from '../../../libs/markdown';

export default class Loading extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/bizLoading.md`);
  }
}
