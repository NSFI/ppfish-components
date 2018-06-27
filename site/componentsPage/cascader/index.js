import Markdown from '../../../libs/markdown';

export default class Cascader extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/cascader.md`);
  }
}
