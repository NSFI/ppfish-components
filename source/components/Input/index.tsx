import Input from './Input';
import Group from './Group';
import Search from './Search';
import TextArea from './TextArea';
import Counter from './Counter';
import './style/index.less';

export { InputProps } from './Input';
export { GroupProps } from './Group';
export { SearchProps } from './Search';
export { TextAreaProps } from './TextArea';
export { CounterProps } from './Counter';

Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Counter = Counter;
export default Input;
