import Markdown from '../../../libs/markdown';

export default class Upload extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/videoViewer.md`);
  }
}
