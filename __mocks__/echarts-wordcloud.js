// https://jestjs.io/docs/en/manual-mocks.html
// 那个wordcloud在测试中并没有测试用例，只是引入了这个库，
// 这里把它mock掉，是因为jsdom的canvas没有实现，会报错
module.exports = 'foo';
