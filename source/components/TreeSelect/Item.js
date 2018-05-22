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
  constructor(children, pane, key, id, text, leaf) {
    this.children = children; // Pane
    this.pane = pane; // Pane
    this.selected = false;
    this.indeterminate = false;
    this.loading = false;
    this.key = key;
    this.id = id;
    this.text = text;
    this.leaf = leaf;
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
  setSelected(selected, indeterminate) {
    this.selected = selected;
    this.indeterminate = indeterminate;
  }

  // 设置当前项高亮
  setCurrent(value) {
    this.current = value;
  }

  // 设置当前项加载状态
  setLoading(value) {
    this.loading = value;
  }

  // 往前遍历设置面板显示状态
  setPanelBackVisible() {
    this.pane.setVisible(true);
    if ( this.pane.parent ) {
      this.pane.parent.setPanelBackVisible();
    }
  }

  // 往后遍历全选其子树
  setForwardSelected(selected) {
    const pane = this.children;
    if ( !pane ) {
      return;
    }
    for ( let i = 0; i < pane.items.length; i++ ) {
      const item = pane.items[i];
      item.setSelected(selected, false);
      item.setForwardSelected(selected);
    }
  }
}

export default Item;
