import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import defaultTheme from './default-theme';

interface EventMap {
  [key: string]: (...args: any[]) => any;
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

export default class EchartCore extends Component<EchartCoreProps, any> {
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
    showLoading: PropTypes.bool,
    echarts: PropTypes.object
  };

  static defaultProps = {
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
    onEvents: {},
    opts: {}
  };

  constructor(props) {
    super(props);
    this.echarts_react = null;
  }

  echarts_react: any;

  getInstance() {
    // @ts-ignore
    return this.echarts_react.getEchartsInstance();
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
      showLoading,
      echarts
    } = this.props;
    return (
      <ReactEchartsCore
        ref={e => (this.echarts_react = e)}
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
  }
}
