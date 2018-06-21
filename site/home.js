import React from 'react';
import Layout from './layout';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <div>首页</div>
      </Layout>
    );
  }
}
