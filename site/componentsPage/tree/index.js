import Markdown from '../../../libs/markdown';

export default class Tree extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/tree.md`);
  }
}
