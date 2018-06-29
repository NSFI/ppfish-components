import Markdown from '../../../libs/markdown';

export default class Resource extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/resource.md`);
  }
}
