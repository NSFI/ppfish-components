import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import defaultTheme from './default-theme';
import EchartCore, { EchartCoreProps } from './core';
type EchartProps = Omit<EchartCoreProps, 'echarts'>;

export default class Echart extends Component<EchartProps> {
  static propTypes = {
    prefixCls: PropTypes.string,
    option: PropTypes.object,
    opts: PropTypes.object,
    events: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    theme: PropTypes.string,
    notMerge: PropTypes.bool,
    lazyUpdate: PropTypes.bool,
    onChartReady: PropTypes.func,
    loadingOption: PropTypes.object,
    showLoading: PropTypes.bool
  };

  static defaultProps = {
    prefixCls: 'fishd-chart',
    theme: defaultTheme,
    notMerge: false,
    lazyUpdate: false,
    style: { height: '300px' },
    className: '',
    onChartReady: () => { },
    showLoading: false,
    loadingOption: null,
    onEvents: {},
    opts: {}
  };

  constructor(props: EchartProps) {
    super(props);
    this.echarts_react = null;
  }

  echarts_react: any;

  getInstance() {
    // @ts-ignore
    return this.echarts_react.getEchartsInstance();
  }

  componentDidMount() {
    const echartInstance = this.echarts_react.getEchartsInstance();
    echartInstance.clear();

    setTimeout(() => {
      echartInstance.setOption(this.props.option);
    }, 100);
  }

  render() {
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
      showLoading
    } = this.props;
    return (
      <ReactEcharts
        ref={e => (this.echarts_react = e)}
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
  }
}
