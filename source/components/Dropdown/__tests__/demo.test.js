import {plainComponents} from '../../../../site/componentsPage';

let demo_component = 'dropdown';

let demoName = demo_component.substr(0, 1).toLowerCase() + demo_component.substr(1);
const menuItem = plainComponents.find(item => item.key === demoName);

if(menuItem){
  const demoTest = require('../../../tests/demoTest').default;
  demoTest(demoName);
}else{
  xit('skip',()=>{});
}
