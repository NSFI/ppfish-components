import Markdown from '../../../libs/markdown';

export default class AnimationImageLoader extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/animationImageLoader.md`);
  }
}
