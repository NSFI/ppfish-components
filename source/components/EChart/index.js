import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as echarts from 'echarts';
import _ from 'lodash';
import theme from './theme-prophet';
import './map-china2';

/**
 * props暴露了如下参数：
 * @param {String} className  设置 chart 类名
 * @param {Object} style      设置样式
 * @param {Object} option     图表参数
 * @param {Object} events     图表事件
 */
export default class EChart extends Component {
  static propTypes = {
    option: PropTypes.object,
    events: PropTypes.object,
  }

  componentDidMount() {
    this.chart = echarts.init(this.node, theme);
    this.props.option && this.chart.setOption(this.props.option);
    this.bindEvents();
    this.bindToWindowResize();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.option && nextProps.option != this.props.option) {
      this.chart.setOption(nextProps.option);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillUnmount() {
    this.chart.dispose();
    this.unbindToWindowResize();
  }

  bindEvents() {
    let events = this.props.events || {};
    for (let [event, handler] of Object.entries(events)){
      this.chart.on(event, params => {
        handler && handler(params, this.chart);
      });
    }
  }

  handleWindowResize = _.debounce(() => {
    this.chart && this.chart.resize();
  }, 100);

  bindToWindowResize() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  unbindToWindowResize() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  getInstance() {
    return this.chart;
  }

  render() {
    let className = 'm-chart';
    let domProps = _.pick(this.props, ['className', 'style']);
    if(domProps.className) {
      className += ' '+domProps.className;
    }
    domProps.className = className;
    return (
      <div ref={node => this.node = node} {...domProps} />
    );
  }
}
