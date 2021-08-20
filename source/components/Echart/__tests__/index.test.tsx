import React from 'react';
import { mount } from 'enzyme';
import Echart from '../index';

describe('Echart', () => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center',
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold',
            },
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' },
        ],
      },
    ],
  };

  it('should give correct ref', () => {
    let ref = null;
    const wrapper = mount(
      <Echart
        className="my-echarts"
        ref={e => {
          ref = e;
        }}
        option={option}
        style={{ width: 500, height: 500 }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(ref).toHaveProperty('getInstance');
    expect(ref).toHaveProperty('echarts_react');
    expect(ref.getInstance()).toEqual(ref.echarts_react);
  });
});
