import {plainComponents} from '../../../../site/componentsPage';

let demo_component = 'Form';

let demoName = demo_component.substr(0, 1).toLowerCase() + demo_component.substr(1);
const menuItem = plainComponents.find(item => item.key === demoName);

if(false && menuItem){
  const demoTest = require('../../../../tools/tests/demoTest').default;
  demoTest(demoName);
}else{
  xit('skip',()=>{});
}
