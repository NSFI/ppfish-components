import React from 'react';
import PropTypes from 'prop-types';
import GuideFixed from './GuideFixed';
import GuideNormal from './GuideNormal';
import ConfigConsumer from '../Config/Consumer';
import { LocaleProperties } from '../Locale';

export interface GuideProps {
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
  doneBtnText?: string;
  prevBtnText?: string;
  nextBtnText?: string;
  skipBtnText?: string;
}

const Guide = (props: GuideProps) => {
  return (
    <ConfigConsumer componentName="Guide">
      {(Locale: LocaleProperties['Guide']) => {
        const btnTextProps = {
          prevBtnText: props.prevBtnText || Locale.prevBtnText,
          nextBtnText: props.nextBtnText || Locale.nextBtnText,
          doneBtnText: props.doneBtnText || Locale.doneBtnText,
          skipBtnText: props.skipBtnText || Locale.skipBtnText,
        };
        const childrenProps = {
          ...props,
          ...btnTextProps,
        };
        const { mode } = props;
        if (mode === 'fixed') {
          return <GuideFixed {...childrenProps} />;
        } else {
          return <GuideNormal {...childrenProps} />;
        }
      }}
    </ConfigConsumer>
  );
};

Guide.propTypes = {
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
  onClose: PropTypes.func,
  doneBtnText: PropTypes.string,
  prevBtnText: PropTypes.string,
  nextBtnText: PropTypes.string,
  skipBtnText: PropTypes.string,
};

Guide.defaultProps = {
  prefixCls: 'fishd-guide',
  mode: 'normal',
  allowClose: false,
  keyboardControl: false,
  visible: false,
  counter: true,
  mask: true,
  steps: [],
};

export default Guide;
