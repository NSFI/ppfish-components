// 树面板class对象
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
class Pane {
  constructor(parent, items) {
    this.parent = parent; // Item
    this.items = items; // [Item]
    this.visible = false;
    this.cache = {};
  }

  // 设置Pane所包含的项目
  setItems(items) {
    this.items = items;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  // 设置默认显示的pane
  setDefaultVisible(key) {
    const item = this.getItemByKey(key);
    if (item) {
      item.setPanelBackVisible();
    // 没有匹配到key，显示第一级
    } else {
      this.setVisible(true);
    }
  }

  getItemByKey(key) {
    const cacheItem = this.cache[key];
    if ( cacheItem ) {
      // componentLog(`从cache中匹配到key：${key}`, cacheItem);
      return cacheItem;
    }
    for ( let i = 0; i < this.items.length; i++ ) {
      const item = this.items[i];
      if ( item.key == key ) {
        // componentLog(`匹配到key：${key}`, item);
        this.cache[key] = item;
        return item;
      }
      if ( item.children ) {
        const result = item.children.getItemByKey(key);
        if ( result ) {
          return result;
        }
      }
    }
    return null;
  }

  // 单选Item，recursive为true时往后遍历全选其子树，往前遍历设置父树勾选状态
  setItemSelected(key, value, recursive) {
    const item = this.getItemByKey(key);
    if ( item ) {
      item.setSelected(value, false);
      if ( recursive ) {
        item.setForwardSelected(value);
      }
      if ( recursive && item.pane ) {
        item.pane.setItemBackSelected();
      }
    }
  }

  // 全选Item
  setAllItemSelected(checked, recursive) {
    const items = this.items;
    if ( !items ) {
      return;
    }
    items.forEach(it => {
      this.setItemSelected(it.key, checked, recursive);
    });
  }

  /**
   * @method 往前遍历设置父树勾选状态，检查当前层级节点是否全部选中/全不选/部分选中，修改上一级勾选状态
   * @param indeterminate {Boolean} 是否跳过计算当前层级节点的选中状态
   */
  setItemBackSelected(indeterminate) {
    const parent = this.parent;
    if ( !parent ) {
      return;
    }
    const countLen = (items, key) => {
      return items.reduce((sum, item) => {
        return (item[key] ? 1 : 0) + sum;
      }, 0);
    };
    //  😭这里有bug，逻辑已废弃，供瞻仰
    const totalLen = this.items.reduce((sum, item) => {
      return (item.selected ? 1 : 0) + sum;
    }, 0);
    // 不传indeterminate时，执行计算
    if ( typeof indeterminate == 'undefined') {
      const selectedLen = countLen(this.items, 'selected');
      const indeterminateLen = countLen(this.items, 'indeterminate');
      // 全选
      if ( selectedLen == this.items.length ) {
        parent.setSelected(true, false);
        // 遍历父树检查
        parent.pane.setItemBackSelected();
      // 全不选
      } else if ( indeterminateLen == 0 && selectedLen == 0 ) {
        parent.setSelected(false, false);
        // 遍历父树全不选
        parent.pane.setItemBackSelected();
      // 部分选中
      } else {
        parent.setSelected(false, true);
        // 遍历父树部分选中
        parent.pane.setItemBackSelected(true);
      }
    // 跳过计算，直接循环遍历部分选中
    } else {
      parent.setSelected(false, true);
      parent.pane.setItemBackSelected(true);
    }
  }

  // 设置Item选中状态，设置子树显示状态
  setItemCurrent(key) {
    if ( !key ) {
      return;
    }
    const item = this.getItemByKey(key);
    if ( item ) {
      // 设置Item选中状态
      item.pane.items.forEach(it => it.setCurrent(false));
      item.setCurrent(true);
      // 设置子树显示状态
      item.pane.setForwardVisible(false);
      if ( item.children ) {
        item.children.setVisible(true);
      }
    }
  }

  // 往后遍历设置显示状态
  setForwardVisible(visible) {
    const items = this.items;
    if ( items ) {
      for ( let i = 0; i < items.length; i++ ) {
        const item = items[i];
        if ( item.children ) {
          item.children.setVisible(visible);
          item.children.setForwardVisible(visible);
        }
      }
    }
  }

  // 获取当前选中的值
  getSelected(byDepth = true) {
    // true-深度优先遍历
    if ( byDepth ) {
      return this.getSelectedByDepth();
    // false-广度优先遍历
    } else {
      return this.getSelectedByBreadth();
    }
  }

  // 深度优先遍历递归获取当前选中的值
  getSelectedByDepth(returned = []) {
    for ( let i = 0; i < this.items.length; i++ ) {
      const item = this.items[i];
      // 全选
      if ( item.selected ) {
        // componentLog(`找到勾选项目：${item.selected}`, item.key);
        returned.push(item);
      // 部分选中
      } else if ( item.indeterminate ) {
        if ( item.children ) {
          item.children.getSelectedByDepth(returned);
        }
      // 全不选
      } else {
        // do nothing
      }
    }
    return returned;
  }

  // 广度优先遍历递归获取当前选中的值
  getSelectedByBreadth() {
    // 广度优先遍历
    const loop = (loopItem, nextLoopItem = []) => {
      let returned = [];
      for ( let i = 0; i < loopItem.length; i++ ) {
        const item = loopItem[i];
        if ( item.selected ) {
          // componentLog(`找到勾选项目：${item.selected}`, item.key);
          returned.push(item);
        }
        if ( item.children ) {
          nextLoopItem = nextLoopItem.concat(item.children.items);
        }
      }
      if ( nextLoopItem.length ) {
        const nextReturned = loop(nextLoopItem);
        returned = returned.concat(nextReturned);
      }
      return returned;
    };
    return loop(this.items);
  }
}
export default Pane;
