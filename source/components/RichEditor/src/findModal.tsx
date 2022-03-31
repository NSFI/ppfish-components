import React from "react";
import Tabs from "../../Tabs";
import Input from "../../Input";
import Checkbox from "../../Checkbox";

const TabPane = Tabs.TabPane;
const FindModal = () => {
  const onCheck = (e)=>{
    console.log('value', e.target.checked);
  };

  const onChange = ()=>{

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
