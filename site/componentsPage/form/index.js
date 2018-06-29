import Markdown from '../../../libs/markdown';

export default class Form extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/form.md`);
  }
}
