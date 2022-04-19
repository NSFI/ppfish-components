import React from "react";
import Tabs from "../../Tabs";
import Input from "../../Input";
import Checkbox from "../../Checkbox";
import ReactQuill from "./quill/index";
import Icon from "../../Icon";
import Button from "../../Button";
import debounce from "lodash/debounce";

const TabPane = Tabs.TabPane;

interface IProps {
  getEditor: () => ReactQuill;
  closeFindModal: () => void;
}

interface IState {
  indices: { index: number }[];
  currentPosition: number;
  searchKey: string;
  checked: boolean;
}

// 场景验证
// 1. 有搜索结果, 但是把搜索框清空, 搜索结果也应该清空
// 2. 正常的文本输入和输入框配置都会触发搜索函数
class FindModal extends React.Component<IProps, IState> {
  private currentIndex = null;
  private replaceKey: string = "";

  state = {
    indices: [],
    currentPosition: 0,
    searchKey: "",
    checked: false
  };

  onCheck = e => {
    this.setState({
      checked: e.target.checked
    });
    this.removeStyle();
    this.search();
  };

  editorOnChange = (delta, oldDelta, source) => {
    if (source == "user") {
      this.search();
    }
  };

  componentDidMount() {
    const { getEditor } = this.props;
    const quill = getEditor();
    quill && quill.on("text-change", this.editorOnChange);
  }

  componentWillUnmount() {
    this.removeStyle();
    const { getEditor } = this.props;
    const quill = getEditor();
    quill && quill.off("text-change", this.editorOnChange);
  }

  removeStyle = () => {
    // 删除全部搜索样式
    const { getEditor } = this.props;
    const quill = getEditor();
    quill && quill.formatText(0, quill.getText().length, "SearchedString", false);
  };

  search: () => void = debounce(() => {
    this.setState({
      indices: []
    });
    const { searchKey } = this.state;
    this.removeStyle();
    if (!searchKey) {
      return;
    }
    const { getEditor } = this.props;
    const quill = getEditor();
    let totalText = quill.getText();
    let re = new RegExp(searchKey, this.state.checked ? "g" : "gi");
    const length = searchKey.length;
    let match;
    let indices = [];
    while ((match = re.exec(totalText)) !== null) {
      // 目标文本在文档中的位置
      const index = match.index;
      // 高亮, 第 0 个默认选中
      quill.formatText(index, length, "SearchedString", {
        active: indices.length === 0
      });
      indices.push({ index });
    }
    if (indices.length) {
      this.currentIndex = indices[0].index;
      this.setState({
        currentPosition: 0,
        indices
      });
    }
  }, 300);

  onChange = ev => {
    const value = ev.target.value;

    this.setState({
      searchKey: value
    });
    this.search();
  };

  leftClick = () => {
    const { getEditor } = this.props;
    const { indices, searchKey } = this.state;

    const quill = getEditor();
    // 先恢复上一个的样式为 true
    quill.formatText(
      this.currentIndex,
      searchKey.length,
      "SearchedString",
      true
    );
    // 获取上一个
    const last = this.state.currentPosition - 1;
    this.setState({
      currentPosition: last
    });
    let prevIndex = this.state.indices[last];
    if (!prevIndex) {
      prevIndex = indices[indices.length - 1];
      this.setState({
        currentPosition: indices.length - 1
      });
    }
    this.currentIndex = prevIndex.index;
    // 下一个的 format
    quill.formatText(prevIndex.index, searchKey.length, "SearchedString", {
      active: true
    });
    this.checkView(prevIndex.index);
  };

  rightClick = () => {
    const { getEditor } = this.props;
    const { indices, searchKey } = this.state;
    const quill = getEditor();
    // 先恢复上一个的样式为 true
    quill.formatText(
      this.currentIndex,
      searchKey.length,
      "SearchedString",
      true
    );
    const next = this.state.currentPosition + 1;
    this.setState({
      currentPosition: next
    });
    // 获取下一个, 如果下一个不在, 那就变成第 1 个
    let nextIndex = indices[next];
    if (!nextIndex) {
      nextIndex = indices[0];
      this.setState({
        currentPosition: 0
      });
    }
    this.currentIndex = nextIndex.index;

    // 下一个的 format
    quill.formatText(nextIndex.index, searchKey.length, "SearchedString", {
      active: true
    });
    this.checkView(nextIndex.index);
  };

  checkView = index => {
    // 检查选中的目标是否在窗口中, 如果不在则需要滚动
    const { getEditor } = this.props;
    const { searchKey } = this.state;
    const quill = getEditor();
    const scrollingContainer = quill.scrollingContainer;
    let bounds = quill.getBounds(index + searchKey.length, 1);
    if (
      bounds.top < scrollingContainer.scrollTop ||
      bounds.top >
        scrollingContainer.scrollTop + scrollingContainer.offsetHeight
    ) {
      scrollingContainer.scrollTop =
        bounds.top - scrollingContainer.offsetHeight / 3;
    }
  };

  replaceOnChange = ev => {
    this.replaceKey = ev.target.value;
  };

  replaceAll = () => {
    if (!this.replaceKey) return;
    const { indices, searchKey } = this.state;
    if (!indices.length) return;

    let oldStringLen = searchKey.length;
    let newString = this.replaceKey;

    const { getEditor } = this.props;
    const quill = getEditor();
    let length = indices.length;
    // 遍历 indices 尾部替换
    while (length--) {
      // 先删除再添加
      quill.deleteText(indices[length].index, oldStringLen);
      quill.insertText(indices[length].index, newString);
    }
    // 结束后重新搜索
    this.search();
  };

  replace = () => {
    if (!this.replaceKey) return;
    const { indices, searchKey } = this.state;
    if (!indices.length) return;
    const { getEditor } = this.props;
    const quill = getEditor();
    // 删除, 添加
    quill.deleteText(this.currentIndex, searchKey.length);
    quill.insertText(this.currentIndex, this.replaceKey);
    this.search();
  };

  renderSearch = () => {
    let { currentPosition, indices, searchKey, checked } = this.state;

    return (
      <>
        <div className={"find-input-box"}>
          <label>查找</label>
          <Input
            onChange={this.onChange}
            value={searchKey}
            suffix={
              indices.length ? (
                <span className={"search-range"}>
                  <Icon onClick={this.leftClick} type="left" />
                  {currentPosition + 1} / {indices.length}
                  <Icon onClick={this.rightClick} type="right" />
                </span>
              ) : null
            }
          />
        </div>
        <Checkbox checked={checked} onChange={this.onCheck}>
          区分大小写
        </Checkbox>
      </>
    );
  };

  render() {
    return (
      <div className={"find-modal"}>
        <Icon type="hints-alone-error" onClick={this.props.closeFindModal} />
        <Tabs defaultActiveKey="1" size={"small"}>
          <TabPane tab="查找" key="1">
            {this.renderSearch()}
          </TabPane>
          <TabPane tab="替换" key="2">
            {this.renderSearch()}
            <div className={"find-input-box replace-input"}>
              <label>替换为</label>
              <Input onChange={this.replaceOnChange} />
            </div>
            <div className={"replace-buttons"}>
              <Button size={"small"} onClick={this.replaceAll}>
                全部替换
              </Button>
              <Button size={"small"} type={"primary"} onClick={this.replace}>
                替换
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default FindModal;
