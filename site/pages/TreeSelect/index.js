import Markdown from '../../../libs/markdown';

export default class TreeSelect extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/loading.md`);
  }
}
