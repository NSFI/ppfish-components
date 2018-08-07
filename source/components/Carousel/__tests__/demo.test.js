import { getPlainComponentList } from "../../../../site/utils/index.js";
const plainComponentList = getPlainComponentList();

let demo_component = 'Carousel';

let demoName = demo_component.substr(0, 1).toLowerCase() + demo_component.substr(1);
const menuItem = plainComponentList.find(item => item.key === demoName);

if(menuItem){
  const demoTest = require('../../../tests/demoTest');
  demoTest(demoName);
}else{
  xit('skip',()=>{});
}
