import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Driver from './src';
import { ESC_KEY_CODE, LEFT_KEY_CODE, RIGHT_KEY_CODE } from './src/common/constants';
import Modal from '../Modal';
import Button from '../Button';
import './style/index.less';
import ConfigConsumer from '../Config/Consumer';
import { LocaleProperties } from '../Locale';

interface GuideProps {
  allowClose?: boolean;
  className?: string;
  counter?: boolean;
  keyboardControl?: boolean;
  mask?: boolean;
  mode?: string;
  onClose?: () => void;
  steps?: any[];
  style?: React.CSSProperties;
  visible?: boolean;
  prefixCls?: string;
}

interface GuideState {
  visible: boolean;
  currentIndex: number;
}

class Guide extends Component<GuideProps, GuideState> {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    mode: PropTypes.string,
    steps: PropTypes.array.isRequired,
    visible: PropTypes.bool,
    counter: PropTypes.bool,
    mask: PropTypes.bool,
    allowClose: PropTypes.bool,
    keyboardControl: PropTypes.bool,
    onClose: PropTypes.func
  };

  static defaultProps = {
    prefixCls: 'fishd-guide',
    mode: 'normal',
    allowClose: false,
    keyboardControl: false,
    visible: false,
    counter: true,
    mask: true,
    steps: []
  };

  totalCount: number = 0;
  driver: Driver = null;

  constructor(props: GuideProps) {
    super(props);

    this.state = {
      visible: props.visible,
      currentIndex: 0
    };

    this.totalCount = props.steps.length;

    if (props.mode != 'fixed') {
      let opt = {
        counter: props.counter,
        allowClose: props.allowClose,
        keyboardControl: props.keyboardControl,
        onReset: () => {
          this.handleClose();
        }
      };

      if (!props.mask) {
        opt['opacity'] = 0;
      }

      this.driver = new Driver(opt);
    } else {
      if (props.keyboardControl) {
        window.addEventListener('keyup', this.onKeyUp.bind(this), false);
      }
    }
  }

  componentDidMount() {
    let { visible } = this.state;

    if (!visible) return;

    this.init();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    let { visible } = this.state;

    if (!visible && nextProps.visible) {
      this.setState(
        {
          visible: true
        },
        () => {
          this.init();
        }
      );
    }
  }

  init = () => {
    let { steps, mode } = this.props;

    if (!(steps && steps.length) || mode == 'fixed') return;

    setTimeout(() => {
      if (steps.length == 1) {
        this.driver.highlight(steps[0]);
      } else {
        this.driver.defineSteps(this.props.steps);
        this.driver.start();
      }
    }, 300);
  };

  onKeyUp(event) {
    if (!this.props.keyboardControl || this.props.mode != 'fixed') return;

    if (event.keyCode === ESC_KEY_CODE) {
      this.handleClose();
      return;
    }

    if (event.keyCode === RIGHT_KEY_CODE) {
      this.handleNext();
    } else if (event.keyCode === LEFT_KEY_CODE) {
      this.handlePrev();
    }
  }

  handleClose = () => {
    this.setState(
      {
        visible: false
      },
      () => {
        this.setState({
          currentIndex: 0
        });
      }
    );

    this.props.onClose && this.props.onClose();
  };

  handleNext = () => {
    let { currentIndex } = this.state,
      nextIndex = 0;

    if (currentIndex >= this.totalCount - 1) {
      nextIndex = this.totalCount - 1;
      this.handleClose();
    } else {
      nextIndex = currentIndex + 1;
    }

    this.setState({
      currentIndex: nextIndex
    });
  };

  handlePrev = () => {
    let { currentIndex } = this.state,
      nextIndex = 0;

    if (currentIndex <= 0) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex - 1;
    }

    this.setState({
      currentIndex: nextIndex
    });
  };

  renderTitle = curStep => {
    if (!curStep.title) return null;

    if (curStep.subtitle) {
      return (
        <React.Fragment>
          {curStep.title}
          <div className={`${this.props.prefixCls}-fixed-subtitle`}>{curStep.subtitle}</div>
        </React.Fragment>
      );
    } else {
      return curStep.title;
    }
  };

  render() {
    let {
      prefixCls,
      allowClose,
      mode,
      mask,
      className,
      style,
      steps,
    } = this.props,
    { visible, currentIndex } = this.state,
    rootCls = classNames(`${prefixCls}-fixed`, {
      [className]: className
    }),
    isFirstStep = currentIndex <= 0,
    isLastStep = currentIndex >= this.totalCount - 1;

    if (mode != 'fixed') {
      return null;
    }

    return (
      <ConfigConsumer componentName="Guide">
        {
          (Locale: LocaleProperties['Guide']) => {
            const {
              prevBtnText = '上一步',
              nextBtnText = '下一步',
              doneBtnText = '知道了',
              skipBtnText = '跳过',
            } = Locale;

            return (
              <Modal
                className={rootCls}
                style={{
                  ...style
                }}
                mask={mask}
                maskClosable={allowClose}
                title={this.renderTitle(steps[currentIndex])}
                visible={visible}
                width={800}
                footer={
                  <React.Fragment>
                    <div key="skip" className="skip" onClick={this.handleClose}>
                      {skipBtnText}
                    </div>
                    {isFirstStep ? null : (
                      <Button key="prev" onClick={this.handlePrev}>
                        {prevBtnText}
                      </Button>
                    )}
                    <Button key="next" type="primary" onClick={this.handleNext}>
                      {isLastStep ? doneBtnText : nextBtnText}
                      {` (${currentIndex + 1}/${steps.length})`}
                    </Button>
                  </React.Fragment>
                }
                onCancel={this.handleClose}
              >
                {steps[currentIndex].content}
              </Modal>
            )
          }
        }
      </ConfigConsumer>
    );
  }
}

export default Guide;
