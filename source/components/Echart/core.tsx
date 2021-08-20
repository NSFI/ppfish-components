import * as React from 'react';
import classNames from 'classnames';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import defaultTheme from './default-theme';

interface EventMap {
  [key: string]: (...args: any[]) => any;
}

export interface EchartCoreRef {
  getInstance: () => any;
  echarts_react: any;
}

type Option = { [key: string]: any };
export interface EchartCoreProps {
  prefixCls?: string;
  option?: Option;
  opts?: Option;
  events?: EventMap;
  className?: string;
  style?: React.CSSProperties;
  theme?: string;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  onChartReady?: () => void;
  loadingOption?: Option;
  showLoading?: boolean;
  echarts?: any;
}

const InternalEchartCore: React.ForwardRefRenderFunction<EchartCoreRef, EchartCoreProps> = (
  props,
  ref,
) => {
  const echartCoreRef = React.useRef<any>();

  React.useImperativeHandle(ref, () => ({
    getInstance: () => {
      return echartCoreRef.current;
    },
    echarts_react: echartCoreRef.current,
  }));

  const {
    prefixCls,
    className,
    style,
    theme,
    option,
    opts,
    events,
    notMerge,
    lazyUpdate,
    onChartReady,
    loadingOption,
    showLoading,
    echarts,
  } = props;
  return (
    <ReactEchartsCore
      ref={e => (echartCoreRef.current = e)}
      echarts={echarts}
      className={classNames(prefixCls, className)}
      style={style}
      option={option}
      opts={opts}
      onEvents={events}
      theme={theme}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
      onChartReady={onChartReady}
      loadingOption={loadingOption}
      showLoading={showLoading}
    />
  );
};

const EchartCore = React.forwardRef<EchartCoreRef, EchartCoreProps>(InternalEchartCore);

EchartCore.displayName = 'EchartCore';

EchartCore.defaultProps = {
  prefixCls: 'fishd-chart',
  theme: defaultTheme,
  echarts: {},
  notMerge: false,
  lazyUpdate: false,
  style: { height: '300px' },
  className: '',
  onChartReady: () => {},
  showLoading: false,
  loadingOption: null,
  opts: {},
};

export default EchartCore;
