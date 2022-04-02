import React from "react";
import Tabs from "../../Tabs";
import Input from "../../Input";
import Checkbox from "../../Checkbox";
import ReactQuill from "./quill/index";
import Icon from "../../Icon";
import debounce from 'lodash/debounce';

const TabPane = Tabs.TabPane;

interface IProps {
  getEditor: () => ReactQuill;
}

// 场景验证
// 1. 有搜索结果, 但是把搜索框清空, 搜索结果也应该清空
// 2. 正常的文本输入和输入框配置都会触发搜索函数
class FindModal extends React.Component<IProps> {
  private flags = "gi"; // gi
  private searchKey: string = "";
  private indices = [];
  private currentIndex = null;
  private currentPosition = 0;

  onCheck = e => {
    this.flags = e.target.checked ? "g" : "gi";
    this.removeStyle();
    this.search(this.searchKey);
  };

  componentWillUnmount() {
    this.removeStyle();
  }

  removeStyle = () => {
    const { getEditor } = this.props;
    const quill = getEditor();
    quill.formatText(0, quill.getText().length, "SearchedString", false);
  };

  search = debounce((key: string) => {
    console.log('search 触发');
    this.indices = [];
    this.removeStyle();
    if (!key) {
      this.forceUpdate();
      return;
    }
    const { getEditor } = this.props;
    const quill = getEditor();
    let totalText = quill.getText();
    let re = new RegExp(key, this.flags);
    const length = key.length;
    let match;
    let flag = true;
    while ((match = re.exec(totalText)) !== null) {
      // 目标文本在文档中的位置
      const index = match.index;

      // 匹配到目标文本之后，我们可以对该文本做高亮或替换的处理

      // 高亮
      quill.formatText(index, length, "SearchedString", { active: flag });
      flag = false;
      this.indices.push({ index });
      // 替换
      // this.quill.deleteText(index, length);
      // this.quill.insertText(index, 'DevUI', 'link', 'https://devui.design/');
    }
    if (this.indices.length) {
      this.currentIndex = this.indices[0].index;
      this.currentPosition = 0;
    }
    this.forceUpdate();
  }, 300);

  onChange = ev => {
    const value = ev.target.value;

    this.searchKey = value;
    this.search(value);
  };

  leftClick = () => {
    const { getEditor } = this.props;
    const quill = getEditor();
    // 先恢复上一个的样式为 true
    quill.formatText(
      this.currentIndex,
      this.searchKey.length,
      "SearchedString",
      true
    );
    // 获取上一个
    this.currentPosition -= 1;
    let prevIndex = this.indices[this.currentPosition];
    if(!prevIndex){
      prevIndex = this.indices[this.indices.length-1];
      this.currentPosition = this.indices.length-1;
    }
    this.currentIndex = prevIndex.index;
    // 下一个的 format
    quill.formatText(prevIndex.index, this.searchKey.length, "SearchedString", {
      active: true,
    });
    this.checkView(prevIndex.index);
    this.forceUpdate();
  };

  rightClick = () => {
    const { getEditor } = this.props;
    const quill = getEditor();
    // 先恢复上一个的样式为 true
    quill.formatText(
      this.currentIndex,
      this.searchKey.length,
      "SearchedString",
      true
    );

    this.currentPosition += 1;
    // 获取下一个, 如果下一个不在, 那就变成第 1 个
    let nextIndex = this.indices[this.currentPosition];
    if(!nextIndex){
      nextIndex = this.indices[0];
      this.currentPosition = 0;
    }
    this.currentIndex = nextIndex.index;

    // 下一个的 format
    quill.formatText(nextIndex.index, this.searchKey.length, "SearchedString", {
      active: true,
    });
    this.checkView(nextIndex.index);
    this.forceUpdate();
  };

  checkView = (index) => {
    const { getEditor } = this.props;
    const quill = getEditor();
    const scrollingContainer = quill.scrollingContainer;
    let bounds = quill.getBounds(index + this.searchKey.length, 1);
    if (!quill.hasFocus() && (
        bounds.top < scrollingContainer.scrollTop ||
        bounds.top > scrollingContainer.scrollTop + scrollingContainer.offsetHeight
      )
    ) {
      scrollingContainer.scrollTop = bounds.top - scrollingContainer.offsetHeight / 3;
    }
  }

  render() {
    return (
      <div className={"find-modal"}>
        <Tabs defaultActiveKey="1" size={"small"}>
          <TabPane tab="查找" key="1">
            <div className={"find-input-box"}>
              <label>查找</label>
              <Input
                onChange={this.onChange}
                suffix={
                  this.indices.length ? (
                    <span className={"search-range"}>
                      <Icon onClick={this.leftClick} type="left" />
                      {this.currentPosition+1} / {this.indices.length}
                      <Icon onClick={this.rightClick} type="right" />
                    </span>
                  ) : null
                }
              />
            </div>
            <Checkbox onChange={this.onCheck}>区分大小写</Checkbox>
          </TabPane>
          <TabPane tab="替换" key="2">
            Tab 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default FindModal;
