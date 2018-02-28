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
  },
  useFrontCookie: true
};
