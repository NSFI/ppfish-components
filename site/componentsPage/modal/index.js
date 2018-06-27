import Markdown from '../../../libs/markdown';

export default class Modal extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/modal.md`);
  }
}
