import Markdown from '../../../libs/markdown';

export default class Drawer extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/drawer.md`);
  }
}
