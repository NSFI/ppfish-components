import Markdown from '../../../libs/markdown';

import './style.scss';

export default class AnimationImageLoader extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/animationImageLoader.md`);
  }
}
