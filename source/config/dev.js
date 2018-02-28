// 本地开发环境配置
export default {
  // ajax前缀
  ajaxPrefix: '/api',
  // 开发环境调用ajax需要使用code
  code: 'dc',
  // ajax code == '4001' 时是否跳登录页面，本地调试用到
  isRedirectLogin: true,
  url: {
    // 首页路径
    home: '/',
    // 登录页面
    login: '/login/',
    // landing page
    landing: '/landing/',
    // 客群列表页面
    customerList: '/customer/list/',
    // 洞察报告
    insightReport: '/insight/createByTag/report',
    // nos上传服务器地址
    nosUpload: 'https://nos.netease.com/',
    // 数据导入csv模板文件
    customerCsvTemplate: 'http://ysf.nosdn.127.net/prophet.upload.template?download=%E7%94%A8%E6%88%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.csv',
    // poi洞察报告
    poiInsightReport: '/insight/createByPOI/report',
    // 已有客群洞察报告
    originalInsightReport: '/insight/createByOriginal/report',
    // 位置上报洞察报告
    positionInsightReport: '/insight/createByPosition/report',

    // kibana洞察报告iframe url
    kibanaUrl: 'dc.cubexyz.com'
  },
  useFrontCookie: true
};
