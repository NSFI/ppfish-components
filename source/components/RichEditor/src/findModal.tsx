import React from "react";
import Tabs from "../../Tabs";
import Input from "../../Input";
import Checkbox from "../../Checkbox";
import ReactQuill, { Quill } from "./quill/index";
import Icon from "../../Icon";

const TabPane = Tabs.TabPane;

interface IProps {
  getEditor: () => ReactQuill;
}

let occurrencesIndices = [];
let currentIndex = 0;
let SearchedStringLength = 0;

// 正常的文本输入和输入框配置都会触发搜索函数

// 场景验证
// 有搜索结果, 但是把搜索框清空, 搜索结果也应该清空
class FindModal extends React.Component<IProps> {
  private flags = "gi"; // gi
  private searchKey: string = "";
  private indices = [];

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

  search = (key: string) => {
    this.indices = [];
    if (!key) {
      this.removeStyle();
      return;
    }
    const { getEditor } = this.props;
    const quill = getEditor();
    let totalText = quill.getText();
    let re = new RegExp(key, this.flags);
    const length = key.length;
    let match;
    while ((match = re.exec(totalText)) !== null) {
      // 目标文本在文档中的位置
      const index = match.index;

      // 匹配到目标文本之后，我们可以对该文本做高亮或替换的处理

      // 高亮
      quill.formatText(index, length, "SearchedString", true);
      this.indices.push({ index });
      // 替换
      // this.quill.deleteText(index, length);
      // this.quill.insertText(index, 'DevUI', 'link', 'https://devui.design/');
    }
    this.forceUpdate();
  };

  onChange = ev => {
    const value = ev.target.value;

    this.searchKey = value;
    this.search(value);
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
                  <span className={"search-range"}>
                    <Icon type="left" />
                    0/ {this.indices.length}
                    <Icon type="right" />
                  </span>
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
