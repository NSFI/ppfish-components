import Radio from './Radio';
import Group from './Group';
import Button from './RadioButton';
import './style/index.less';

export * from './interface';

Radio.Button = Button;
Radio.Group = Group;
export { Button, Group };
export default Radio;
