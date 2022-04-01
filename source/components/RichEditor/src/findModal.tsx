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
  private currentPosition = 1;

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
    console.log('search 触发')
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
      this.currentPosition = 1;
    }
    this.forceUpdate();
  }, 300);

  onChange = ev => {
    const value = ev.target.value;

    this.searchKey = value;
    this.search(value);
  };

  leftClick = () => {};

  rightClick = () => {
    // todo 如果下一个在屏幕外卖, 则跳转?
    const { getEditor } = this.props;
    const quill = getEditor();
    // 先回复上一个的样式为 true
    quill.formatText(
      this.currentIndex,
      this.searchKey.length,
      "SearchedString",
      true
    );

    // 获取下一个, todo 如果下一个不在, 那就变成第 1 个
    const nextIndex = this.indices[this.currentPosition];
    this.currentIndex = nextIndex.index;

    // 下一个的 format
    quill.formatText(nextIndex.index, this.searchKey.length, "SearchedString", {
      active: true
    });
    this.currentPosition += 1;
    this.forceUpdate();
  };

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
                      {this.currentPosition} / {this.indices.length}
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
