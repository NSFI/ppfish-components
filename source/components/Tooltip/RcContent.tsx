import React from 'react';
import PropTypes from 'prop-types';
import useUpdateEffect from '../../hooks/useUpdateEffect';

export interface RcContentProps {
  prefixCls?: string;
  overlay?: (() => React.ReactNode) | React.ReactNode;
  id?: string;
  // rc-trigger 未导出 Trigger 类型
  trigger: any;
}

const RcContent = (props: RcContentProps) => {
  useUpdateEffect(() => {
    const { trigger } = props;
    if (trigger) {
      trigger.forcePopupAlign();
    }
  });

  const { overlay, prefixCls, id } = props;
  return (
    <div className={`${prefixCls}-inner`} id={id}>
      {typeof overlay === 'function' ? overlay() : overlay}
    </div>
  );
};

RcContent.propTypes = {
  prefixCls: PropTypes.string,
  overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  id: PropTypes.string,
  trigger: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
};

export default RcContent;
