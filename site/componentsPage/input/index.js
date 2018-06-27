import Markdown from '../../../libs/markdown';

export default class Input extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/input.md`);
  }
}
