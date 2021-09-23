import * as React from 'react';
import Driver from './src/index';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { GuideProps } from './Guide';

const GuideNormal = (props: GuideProps) => {
  const [visible, setVisible] = React.useState<boolean>(props.visible);

  const handleCloseRef = React.useRef<() => void>();
  handleCloseRef.current = () => {
    setVisible(false);

    props.onClose?.();
  };

  const driver: Driver = React.useMemo(() => {
    let opt = {
      counter: props.counter,
      allowClose: props.allowClose,
      keyboardControl: props.keyboardControl,
      prevBtnText: props.prevBtnText,
      nextBtnText: props.nextBtnText,
      skipBtnText: props.skipBtnText,
      doneBtnText: props.doneBtnText,
      onReset: () => {
        const handleClose = handleCloseRef.current;
        handleClose?.();
      },
    };

    if (!props.mask) {
      opt['opacity'] = 0;
    }

    return new Driver(opt);
  }, []);

  const init = () => {
    let { steps } = props;

    if (!(steps && steps.length)) {
      return;
    }

    setTimeout(() => {
      if (steps.length == 1) {
        driver.highlight(steps[0]);
      } else {
        driver.defineSteps(props.steps);
        driver.start();
      }
    }, 300);
  };

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    init();
  }, []);

  /*
    重构前，visible 字段没有被设计成受控属性
    外部想要重新打开 Guide 组件，是通过重新 setState visible 为 true，
    Guide 组件内部 componentWillReceiveProps 判断组件内部 visible 为 false
    且 nextProps.visible 为 true 时，进行重新初始化

    这里存在隐患，Guide 组件内部 visible 变为 false 时，
    因为 visible 不受控，外部 visible 还是 true，
    此时除 visible 外其他的 props 改变，
    componentWillReceiveProps 内也会执行重新初始化的逻辑，弹出 Guide 组件
    重构成 hooks 之后，暂时和重构前保持一致的逻辑
  */
  useUpdateEffect(() => {
    if (!visible && props.visible) {
      setVisible(true);
      init();
    }
  }, [props]);

  return null;
};

export default GuideNormal;
