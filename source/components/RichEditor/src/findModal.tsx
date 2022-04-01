import React from "react";
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
      let match = re.test(totalText);
      if (match) {
        console.dir(totalText)
        let indices = (occurrencesIndices = totalText.getIndicesOf(
          value
        ));
        let length = (SearchedStringLength =
          value.length);

        indices.forEach(index =>
          quill.formatText(index, length, "SearchedString", true)
        );
      } else {
        occurrencesIndices = null;
        currentIndex = 0;
      }
    }
  };

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
