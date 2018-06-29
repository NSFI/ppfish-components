import React from 'react';
import Layout from './layout';
import './home.less';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <div className="m-home-page">
          <h1>Fish Design</h1>
          <p>近塞上之人，有善术者，马无故亡而入胡。人皆吊之，其父曰：“此何遽不为福乎？”居数月，其马将胡骏马而归。</p>
        </div>
      </Layout>
    );
  }
}
