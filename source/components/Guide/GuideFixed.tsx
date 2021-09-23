import * as React from 'react';
import classNames from 'classnames';
import Modal from '../Modal';
import Button from '../Button';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { GuideProps } from './Guide';
import { ESC_KEY_CODE, LEFT_KEY_CODE, RIGHT_KEY_CODE } from './src/common/constants';

const GuideFixed = (props: GuideProps) => {
  const totalCountRef = React.useRef<number>(props.steps.length);
  const totalCount = totalCountRef.current;
  const [visible, setVisible] = React.useState<boolean>(props.visible);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const handleClose = () => {
    Promise.resolve()
      .then(() => {
        setVisible(false);
      })
      .then(() => {
        setCurrentIndex(0);
      });

    props.onClose?.();
  };

  const handleNext = () => {
    if (currentIndex >= totalCount - 1) {
      handleClose();
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    let nextIndex;

    if (currentIndex <= 0) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex - 1;
    }

    setCurrentIndex(nextIndex);
  };

  const onKeyUp = event => {
    if (!props.keyboardControl || !visible) {
      return;
    }

    if (event.keyCode === ESC_KEY_CODE) {
      handleClose();
      return;
    }

    if (event.keyCode === RIGHT_KEY_CODE) {
      handleNext();
    } else if (event.keyCode === LEFT_KEY_CODE) {
      handlePrev();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keyup', onKeyUp, false);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyUp]);

  useUpdateEffect(() => {
    if (!visible && props.visible) {
      setVisible(true);
    }
  }, [props]);

  const renderTitle = curStep => {
    if (!curStep.title) {
      return null;
    }

    if (curStep.subtitle) {
      return (
        <React.Fragment>
          {curStep.title}
          <div className={`${props.prefixCls}-fixed-subtitle`}>{curStep.subtitle}</div>
        </React.Fragment>
      );
    } else {
      return curStep.title;
    }
  };

  const {
    prefixCls,
    allowClose,
    mask,
    className,
    style,
    steps,
    skipBtnText,
    prevBtnText,
    nextBtnText,
    doneBtnText,
  } = props;
  const rootCls = classNames(`${prefixCls}-fixed`, {
    [className]: className,
  });
  const isFirstStep = currentIndex <= 0;
  const isLastStep = currentIndex >= totalCount - 1;

  return (
    <Modal
      className={rootCls}
      style={{
        ...style,
      }}
      mask={mask}
      maskClosable={allowClose}
      title={renderTitle(steps[currentIndex])}
      visible={visible}
      width={800}
      footer={
        <React.Fragment>
          <div key="skip" className={`${prefixCls}-skip-btn skip`} onClick={handleClose}>
            {skipBtnText}
          </div>
          {isFirstStep ? null : (
            <Button key="prev" className={`${prefixCls}-prev-btn`} onClick={handlePrev}>
              {prevBtnText}
            </Button>
          )}
          <Button
            key="next"
            className={isLastStep ? `${prefixCls}-done-btn` : `${prefixCls}-next-btn`}
            type="primary"
            onClick={handleNext}
          >
            {isLastStep ? doneBtnText : nextBtnText}
            {` (${currentIndex + 1}/${steps.length})`}
          </Button>
        </React.Fragment>
      }
      onCancel={handleClose}
    >
      {steps[currentIndex].content}
    </Modal>
  );
};

export default GuideFixed;
