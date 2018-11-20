import * as echarts from 'echarts';

const themeName = 'prophet';
const theme = {
    "color": [
        "#4d6aff",
        "#26bd71",
        "#ffaf0f",
        "#f8355c",
        "#7231f5"
    ],
    "backgroundColor": "#ffffff",
    "textStyle": {},
    "title": {
        "textStyle": {
            "color": "#333333"
        },
        "subtextStyle": {
            "color": "#aaaaaa"
        }
    },
    "line": {
        "itemStyle": {
            "normal": {
                "borderWidth": "3"
            }
        },
        "lineStyle": {
            "normal": {
                "width": "3"
            }
        },
        "symbolSize": "7",
        "symbol": "emptyCircle",
        "smooth": false
    },
    "radar": {
        "itemStyle": {
            "normal": {
                "borderWidth": "3"
            }
        },
        "lineStyle": {
            "normal": {
                "width": "3"
            }
        },
        "symbolSize": "7",
        "symbol": "emptyCircle",
        "smooth": false
    },
    "bar": {
        "itemStyle": {
            "normal": {
                "barBorderWidth": "0",
                "barBorderColor": "#cccccc"
            },
            "emphasis": {
                "barBorderWidth": "0",
                "barBorderColor": "#cccccc"
            }
        }
    },
    "pie": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            }
        }
    },
    "scatter": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            }
        }
    },
    "boxplot": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            }
        }
    },
    "parallel": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            }
        }
    },
    "sankey": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            }
        }
    },
    "funnel": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            }
        }
    },
    "gauge": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            }
        }
    },
    "candlestick": {
        "itemStyle": {
            "normal": {
                "color": "#e01f54",
                "color0": "#001852",
                "borderColor": "#f5e8c8",
                "borderColor0": "#b8d2c7",
                "borderWidth": 1
            }
        }
    },
    "graph": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#cccccc"
            }
        },
        "lineStyle": {
            "normal": {
                "width": 1,
                "color": "#aaaaaa"
            }
        },
        "symbolSize": "7",
        "symbol": "emptyCircle",
        "smooth": false,
        "color": [
            "#4d6aff",
            "#26bd71",
            "#ffaf0f",
            "#f8355c",
            "#7231f5"
        ],
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#eeeeee"
                }
            }
        }
    },
    "map": {
        "itemStyle": {
            "normal": {
                "areaColor": "#eeeeee",
                "borderColor": "#444444",
                "borderWidth": 0.5
            },
            "emphasis": {
                "areaColor": "rgba(255,215,0,0.8)",
                "borderColor": "#444444",
                "borderWidth": 1
            }
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#000000"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "rgb(100,0,0)"
                }
            }
        }
    },
    "geo": {
        "itemStyle": {
            "normal": {
                "areaColor": "#eeeeee",
                "borderColor": "#444444",
                "borderWidth": 0.5
            },
            "emphasis": {
                "areaColor": "rgba(255,215,0,0.8)",
                "borderColor": "#444444",
                "borderWidth": 1
            }
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#000000"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "rgb(100,0,0)"
                }
            }
        }
    },
    "categoryAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#f0f3f7"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#f0f3f7"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#666666"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    "#f0f3f7"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        }
    },
    "valueAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#f0f3f7"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#f0f3f7"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#666666"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    "#f0f3f7"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        }
    },
    "logAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#f0f3f7"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#f0f3f7"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#666666"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    "#f0f3f7"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        }
    },
    "timeAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#f0f3f7"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#f0f3f7"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#666666"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    "#f0f3f7"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        }
    },
    "toolbox": {
        "iconStyle": {
            "normal": {
                "borderColor": "#999999"
            },
            "emphasis": {
                "borderColor": "#666666"
            }
        }
    },
    "legend": {
        "textStyle": {
            "color": "#666666"
        }
    },
    "tooltip": {
        "axisPointer": {
            "lineStyle": {
                "color": "#cccccc",
                "width": 1
            },
            "crossStyle": {
                "color": "#cccccc",
                "width": 1
            }
        }
    },
    "timeline": {
        "lineStyle": {
            "color": "#293c55",
            "width": 1
        },
        "itemStyle": {
            "normal": {
                "color": "#293c55",
                "borderWidth": 1
            },
            "emphasis": {
                "color": "#a9334c"
            }
        },
        "controlStyle": {
            "normal": {
                "color": "#293c55",
                "borderColor": "#293c55",
                "borderWidth": 0.5
            },
            "emphasis": {
                "color": "#293c55",
                "borderColor": "#293c55",
                "borderWidth": 0.5
            }
        },
        "checkpointStyle": {
            "color": "#e43c59",
            "borderColor": "rgba(194,53,49,0.5)"
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#293c55"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#293c55"
                }
            }
        }
    },
    "visualMap": {
        "color": [
            "#fb4e0d",
            "#ffbc00"
        ]
    },
    "dataZoom": {
        "backgroundColor": "rgba(47,69,84,0)",
        "dataBackgroundColor": "rgba(47,69,84,0.3)",
        "fillerColor": "rgba(167,183,204,0.4)",
        "handleColor": "#a7b7cc",
        "handleSize": "100%",
        "textStyle": {
            "color": "#333333"
        }
    },
    "markPoint": {
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#eeeeee"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#eeeeee"
                }
            }
        }
    }
};

echarts.registerTheme(themeName, theme);

export default themeName;
