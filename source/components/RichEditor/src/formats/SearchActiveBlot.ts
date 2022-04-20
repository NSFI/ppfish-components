import {Quill} from '../quill';
const Inline = Quill.import('blots/inline');

class SearchedStringActiveBlot extends Inline {
  static blotName: string;
  static className: string;
  static tagName: string;
  domNode: HTMLElement;

}

SearchedStringActiveBlot.blotName = 'SearchedStringActive';
SearchedStringActiveBlot.className = 'ql-searched-string-active';
SearchedStringActiveBlot.tagName = 'div';

export default SearchedStringActiveBlot;
