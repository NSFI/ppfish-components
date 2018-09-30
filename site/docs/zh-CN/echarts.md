# Echart 图表 【视觉: 徐剑杰 |开发: 王晓玲】
可视化图表组件。

## 何时使用
当需要可视化图表展示时。

## 基本使用

:::demo 通过option传入图表配置项。
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
        className="echarts"
        option={option}
        style={{width:500,height:500}}
      />
    );
  }
```
:::

## 图表参数

:::demo 通过option传入图表配置项。
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
        className="echarts"
        option={option}
        style={{width:500,height:500}}
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

## API
注：仅提供基本的框架封装，Echarts配置项和API设置请参考 [Echarts文档](http://echarts.baidu.com/option.html#title)。
目前的Echarts支持v4.x版本。

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| className | 设置 chart 类名 | String | '' |
| style | 设置样式 | Object | - |
| option |  图表参数 | Object | - |
| events |  图表事件 | Object | - |
