import Markdown from '../../../libs/markdown';

export default class StickVerticalMenu extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/loading.md`);
  }
}
