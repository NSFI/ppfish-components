import { Quill } from "../quill";

// const { parchment: Parchment } = Quill.imports;
const Parchment = Quill.import('parchment')

const LineHeightClass = new Parchment.Attributor.Class('lineHeight', 'ql-lineHeight', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['1', '1.15','1.5','2.0','2.5' ,'3.0'],
});
const LineHeightStyle = new Parchment.Attributor.Style('lineHeight', 'ql-lineHeight', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['1', '1.15','1.5','2.0','2.5' ,'3.0'],
});
Quill.register({ 'formats/lineHeight': LineHeightClass }, true)
Quill.register({ 'attributors/style/lineHeight': LineHeightStyle},true)


let inline = Quill.import('blots/inline')
class lineHeight extends inline {
  static blotName: string;
  static tagName: string;

  // Resitery 调用该create方法 create对象在富文本中
  static create(value){
    const node = super.create(value);
    node.style.lineHeight = value
    node.style.display = 'inline-Block' //because p tag is an inline tag which can't contain p/div tag
    return node;
  }

  static formats(value) {
    return value.style.lineHeight;
  }
}

// blotName
lineHeight.blotName  = 'lineHeight';

// 标签类型自定义
lineHeight.tagName   = 'span';

export default lineHeight
