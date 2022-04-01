import React, {useEffect} from "react";
import Tabs from "../../Tabs";
import Input from "../../Input";
import Checkbox from "../../Checkbox";

const TabPane = Tabs.TabPane;

let occurrencesIndices = [];
let currentIndex = 0;
let SearchedStringLength = 0;

const FindModal = (props) => {
  const {getEditor} = props;

  const onCheck = (e)=>{
    console.log('value', e.target.checked);
  };

  const onChange = (ev)=>{
    console.log(ev.target.value);
    const quill  = getEditor();
    const value = ev.target.value;
    if(value){
      let totalText = quill.getText();
      let re = new RegExp(value, "gi");
      const length = value.length;
      let match;
      while ((match = re.exec(totalText)) !== null) {
        // 目标文本在文档中的位置
        const index = match.index;

        // 匹配到目标文本之后，我们可以对该文本做高亮或替换的处理

        // 高亮
       quill.formatText(index, length, 'background', '#f2d123');
        console.log(index)

        // 替换
        // this.quill.deleteText(index, length);
        // this.quill.insertText(index, 'DevUI', 'link', 'https://devui.design/');
      }
    }
  };

  useEffect(()=>{},[])

  return (
    <div className={"find-modal"}>
      <Tabs defaultActiveKey="1" size={"small"}>
        <TabPane tab="查找" key="1">
          <div className={"find-input-box"}>
            <label>查找</label>
            <Input onChange={onChange}/>
          </div>
          <Checkbox onChange={onCheck}>区分大小写</Checkbox>
        </TabPane>
        <TabPane tab="替换" key="2">
          Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FindModal;
