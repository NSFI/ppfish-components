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
          <h1>NPP Design</h1>
        </div>
      </Layout>
    );
  }
}
