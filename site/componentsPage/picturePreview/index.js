import Markdown from '../../../libs/markdown';

export default class PicturePreview extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/picturePreview.md`);
  }
}
