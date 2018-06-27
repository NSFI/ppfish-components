import Markdown from '../../../libs/markdown';

export default class Transfer extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/transfer.md`);
  }
}
