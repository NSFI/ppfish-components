import * as React from 'react';
import classNames from 'classnames';
import ReactEcharts from 'echarts-for-react';
import defaultTheme from './default-theme';
import { EchartCoreProps } from './core';

type EchartProps = Omit<EchartCoreProps, 'echarts'>;

export interface EchartRef {
  getInstance: () => any;
  echarts_react: any;
}

const InernalEchart: React.ForwardRefRenderFunction<EchartRef, EchartProps> = (props, ref) => {
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
  } = props;

  const echartRef = React.useRef<any>();

   React.useImperativeHandle(ref, () => ({
    getInstance: () => {
      return echartRef.current;
    },
    echarts_react: echartRef.current
  }));

  return (
    <ReactEcharts
      ref={e => {echartRef.current = e}}
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

const Echart = React.forwardRef<EchartRef, EchartProps>(InernalEchart);

Echart.defaultProps = {
  prefixCls: 'fishd-chart',
  theme: defaultTheme,
  notMerge: false,
  lazyUpdate: false,
  style: { height: '300px' },
  className: '',
  onChartReady: () => {},
  showLoading: false,
  loadingOption: null,
  opts: {},
};

Echart.displayName = 'Echart';

export default Echart;
