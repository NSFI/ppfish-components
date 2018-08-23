import { getPlainComponentList } from "../../../../site/utils/index.js";
const plainComponentList = getPlainComponentList();

let demo_component = 'pagination';

let demoName = demo_component.substr(0, 1).toLowerCase() + demo_component.substr(1);
const menuItem = plainComponentList.find(item => item.key === demoName);

if(menuItem){
  const demoTest = require('../../../tests/demoTest').default;
  demoTest(demoName);
}else{
  xit('skip',()=>{});
}
