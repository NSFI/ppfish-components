import {Quill} from '../quill';
const Inline = Quill.import('blots/inline');

class SearchedStringBlot extends Inline {
  static blotName: string;
  static className: string;
  static tagName: string;
  domNode: HTMLElement;

}

SearchedStringBlot.blotName = 'SearchedString';
SearchedStringBlot.className = 'ql-searched-string';
SearchedStringBlot.tagName = 'div';

export default SearchedStringBlot;
