import Markdown from '../../../libs/markdown';

export default class AudioPlayer extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/audioPlayer.md`);
  }
}
