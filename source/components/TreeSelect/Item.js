// 树项目class对象
// Pane和Item示例
// |------------|
// |    Item    |
// |  |------|  |
// |  | Pane |  |
// |  |------|  |
// |  | Item |  |
// |  | Item |  |
// |  | Item |  |
// |  |------|  |
// |            |
// |------------|
class Item {
  constructor(children, pane, key, text) {
    this.children = children; // Pane
    this.pane = pane; // Pane
    this.selected = false;
    this.indeterminate = false;
    this.key = key;
    this.text = text;
    this.current = false;
  }

  // 设置属于该Item的Pane
  setChildren(children) {
    this.children = children;
  }

  // 设置当前项勾选状态
  // // 全不选
  // selected = false;
  // indeterminate = false;
  // // 部分选中
  // selected = false;
  // indeterminate = true;
  // // 全选
  // selected = true;
  // indeterminate = false;
  setSelected(value, indeterminate) {
    this.selected = value;
    this.indeterminate = indeterminate;
  }

  // 设置当前项高亮
  setCurrent(value) {
    this.current = value;
  }

  // 往前遍历设置面板显示状态
  setPanelBackVisible() {
    this.pane.setVisible(true);
    if ( this.pane.parent ) {
      this.pane.parent.setPanelBackVisible();
    }
  }

  // 往后遍历全选其子树
  setForwardSelected(value) {
    const pane = this.children;
    if ( !pane ) {
      return;
    }
    for ( let i = 0; i < pane.items.length; i++ ) {
      const item = pane.items[i];
      item.setSelected(value, false);
      item.setForwardSelected(value);
    }
  }
}

export default Item;
