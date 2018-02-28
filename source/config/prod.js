// 生产环境配置
export default {
  // ajax前缀
  ajaxPrefix: '/api',
  // ajax code == '4001' 时是否跳登录页面
  isRedirectLogin: true,
  url: {
    // 首页路径
    home: '/',
    // 登录页面
    login: '/login/',
    // landing page
    landing: '/landing/',
  },
  useFrontCookie: false
};
