import InternalRadio from './Radio';
import Group from './Group';
import Button from './RadioButton';
import './style/index.less';
import { RadioProps } from './interface';

//todo
export * from './interface';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group;
  Button: typeof Button;
}

const Radio = InternalRadio as CompoundedComponent;

Radio.Button = Button;
Radio.Group = Group;

export { Button, Group };
export default Radio;
