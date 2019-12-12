import Spin from './Spin';
import Container from './Container';
import TextLoading from './TextLoading';
import './style/index.less';

export { SpinProps, SpinIndicator, SpinSize, SpinState } from './Spin';
export { ContainerProps } from './Container';
export { TextLoadingProps } from './TextLoading';

Spin.Container = Container;
Spin.TextLoading = TextLoading;

export default Spin;
