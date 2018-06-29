import Markdown from '../../../libs/markdown';

export default class Echart extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/echart.md`);
  }
}
