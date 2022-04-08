import {Quill} from '../quill';
const Inline = Quill.import('blots/inline');

class SearchedStringBlot extends Inline {
  static blotName: string;
  static className: string;
  static tagName: string;
  domNode: HTMLElement;


  static create(data): HTMLElement {
    let node = super.create();
    if(data && data.active){
      node.classList.add('search-active');
    }
    return node;
  }

  format(name?: any, value?: any) {
    if(name === 'SearchedString' && value === true) {
      if(this.domNode.classList.contains('search-active')){
        this.domNode.classList.remove('search-active');
      }
    }

    super.format(name, value);
  }

}

SearchedStringBlot.blotName = 'SearchedString';
SearchedStringBlot.className = 'ql-searched-string';
SearchedStringBlot.tagName = 'div';

export default SearchedStringBlot;
