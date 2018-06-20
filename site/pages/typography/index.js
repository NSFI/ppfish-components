import Markdown from '../../../libs/markdown';

import './style.less';

export default class Typography extends Markdown {
  documentShouldTransform() {
    return false;
  }

  document(locale) {
    return require(`../../docs/${locale}/typography.md`);
  }
}
