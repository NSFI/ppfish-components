import Markdown from '../../../libs/markdown';

export default class Tooltip extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/tooltip.md`);
  }
}
