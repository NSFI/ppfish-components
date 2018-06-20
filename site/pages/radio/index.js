import Markdown from '../../../libs/markdown';

import './style.less';

export default class Radio extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/radio.md`);
  }
}
