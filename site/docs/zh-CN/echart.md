# Echart 图表 【交互: 无 | 视觉: 徐剑杰 |开发: 王晓玲】

可视化图表组件。

## 何时使用

当需要可视化图表展示时。

## 基本使用

:::demo 通过`option`传入图表配置项。
```js
  
  render() {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ]
        }
      ]
    };
    
    return (
      <Echart
        className="my-echarts"
        option={option}
        style={{width:500,height:500}}
      />
    );
  }
```
:::

## 图表参数

:::demo 通过`option`传入图表配置项，`opts`传入图表初始化参数。
```js
  
  render() {
  const option = {
    title : {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
        ],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
      }
    ]
    };
    
    return (
      <Echart
        className="my-echarts"
        option={option}
        style={{width:500,height:500}}
        opts={{renderer:'svg'}} // 使用svg渲染
      />
    );
  }
```
:::

## 图表事件

:::demo 通过events传入图表事件。
```js

  renderBrushed = (params, myChart) => {
    var brushed = [];
    var brushComponent = params.batch[0];

    for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
        var rawIndices = brushComponent.selected[sIdx].dataIndex;
        brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
    }

    myChart.setOption({
        title: {
            backgroundColor: '#333',
            text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
            bottom: 0,
            right: 0,
            width: 100,
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        }
    });
  }
  
  render() {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];
    const data3 = [];
    const data4 = [];
    for (let i = 0; i < 10; i++) {
        xAxisData.push('Class' + i);
        data1.push((Math.random() * 2).toFixed(2));
        data2.push(-Math.random().toFixed(2));
        data3.push((Math.random() * 5).toFixed(2));
        data4.push((Math.random() + 0.3).toFixed(2));
    }
    const itemStyle = {
        normal: {
        },
        emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
        }
    }; 
    const option = {
        backgroundColor: '#eee',
        legend: {
            data: ['bar', 'bar2', 'bar3', 'bar4'],
            align: 'left',
            left: 10
        },
        brush: {
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        },
        toolbox: {
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {}
            }
        },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            name: 'X Axis',
            silent: false,
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            inverse: true,
            splitArea: {show: false}
        },
        grid: {
            left: 100
        },
        visualMap: {
            type: 'continuous',
            dimension: 1,
            text: ['High', 'Low'],
            inverse: true,
            itemHeight: 200,
            calculable: true,
            min: -2,
            max: 6,
            top: 60,
            left: 10,
            inRange: {
                colorLightness: [0.4, 0.8]
            },
            outOfRange: {
                color: '#bbb'
            },
            controller: {
                inRange: {
                    color: '#2f4554'
                }
            }
        },
        series: [
            {
                name: 'bar',
                type: 'bar',
                stack: 'one',
                itemStyle: itemStyle,
                data: data1
            },
            {
                name: 'bar2',
                type: 'bar',
                stack: 'one',
                itemStyle: itemStyle,
                data: data2
            },
            {
                name: 'bar3',
                type: 'bar',
                stack: 'two',
                itemStyle: itemStyle,
                data: data3
            },
            {
                name: 'bar4',
                type: 'bar',
                stack: 'two',
                itemStyle: itemStyle,
                data: data4
            }
        ]
    };
    const events = {
      brushSelected: this.renderBrushed
    };
    return (
      <Echart
        className="echarts"
        option={option}
        events={events}
        style={{width:800,height:500}}
      />
    );
  }
```
:::

## 按需引入

:::demo
```js
  render() {
    //为了演示效果，该demo已打包为单独的页面嵌入iframe，核心代码可参考 https://github.com/NSFI/ppfish-components/blob/master/site/docs/demoPage/echartRequired.js
    return(
      <div className="browser-mockup">
        <iframe src="./demo/echartRequired.html" height={500}></iframe>
      </div>
    )
  }
```
:::

## API

> 注意：
 - Echarts配置项和API设置请参考 [Echarts文档](http://echarts.baidu.com/option.html#title)。
 - 目前支持Echarts v4.x版本。

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| className | 设置类名 | String | '' |
| style | 设置样式，默认高度为300px | Object | {height: '300px'} |
| option |  图表的配置项和数据，具体见[配置项手册](http://echarts.baidu.com/option.html#title)。 | Object | - |
| opts |  图表初始化配置项参数，具体见[说明文档](http://echarts.baidu.com/api.html#echarts.init) | Object | - |
| events |  图表事件, 具体见[说明文档](http://echarts.baidu.com/api.html#events) | Object | - |
| theme | 图表主题, 传入前请确保已经用 `registerTheme` 注册过，详情见下面说明中的`设置主题` | String | [默认主题] |
| notMerge | 是否不跟之前设置的option进行合并, 具体见[说明文档](http://echarts.baidu.com/api.html#echartsInstance.setOption) | Boolean | false |
| lazyUpdate | 在设置完option后是否不立即更新图表, 具体见[说明文档](http://echarts.baidu.com/api.html#echartsInstance.setOption) | Boolean | false |
| onChartReady | 图表准备好后的回调函数 | (obj) => Void | - | 
| loadingOption | 图表加载配置, 具体见[说明文档](http://echarts.baidu.com/api.html#echartsInstance.showLoading) | Object | - |
| showLoading | 是否显示加载中蒙层 | Boolean | false |
| echarts | 使用按需引入方式，手动导入echart模块，详情见[按需引入示例](https://github.com/NSFI/ppfish-components/blob/master/site/docs/demoPage/echartRequired.js)| Object | {} |

### 方法

| 名称 | 描述 |
| --- | --- |
| getInstance() | 获取图表实例 |

### 说明

#### 按需引入

为了解决echarts包比较大的问题，我们提供了按需引入方案，可根据业务需要自行选择。示例代码如下，完整示例请见[按需引入示例](https://github.com/NSFI/ppfish-components/blob/master/site/docs/demoPage/echartRequired.js)

```js
import React from 'react';
// 导入core library
import EchartCore from 'ppfish/source/component/Echart/core';
// 按需导入echarts模块
import echarts from 'echarts/lib/echarts'; //必须
import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/radar';

// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/heatmap';

// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/grid';
// import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/brush';

import 'echarts/lib/component/title';

// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/visualMap';

// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';

// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';

// import 'zrender/lib/vml/vml';

// API与上面的Echart相同
<EchartCore
  echarts={echarts}
  option={this.getOption()}
  notMerge={true}
  lazyUpdate={true}
  theme={"theme_name"}
  onChartReady={this.onChartReadyCallback}
  events={events}
  opts={}
/>
```

#### 设置主题

使用`theme`API之前，请确保已经通过`registerTheme`注册过。

```js
// 引入echart
import echarts from 'echarts/lib/echarts';
...
// 注册主题
echarts.registerTheme('my_theme', {
  backgroundColor: '#f4cccc'
});
...
// 传入`theme` 渲染主题
<Echart
  option={this.getOption()}
  style={{height: '300px', width: '100%'}}
  className='echarts-for-echarts'
  theme='my_theme' 
/>
```

