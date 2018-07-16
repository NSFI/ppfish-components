import 'core-js';
import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Router, Route, hashHistory, Redirect, IndexRoute} from 'react-router';
import Components from './pages/components';
import Home from './pages/home';
import Spec from './pages/spec';
import Demo from './pages/demo';
import './styles/index.less';

render(<AppContainer>
  <Router history={hashHistory}>
    <Route path="/home" component={Home}/>
    <Route path="/spec" component={Spec}/>
    <Route path="/components" component={Components}>
      <IndexRoute component={Demo}/>
      <Route path=":demo" component={Demo}/>
    </Route>
    <Redirect from="*" to="/home"/>
  </Router>
</AppContainer>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./pages/components', () => {
    const Components = require('./pages/components').default;
    render(<AppContainer>
      <Router history={hashHistory}>
        <Route path="/home" component={Home}/>
        <Route path="/spec" component={Spec}/>
        <Route path="/components" component={Components}>
          <IndexRoute component={Demo}/>
          <Route path=":demo" component={Demo}/>
        </Route>
        <Redirect from="*" to="/home"/>
      </Router>
    </AppContainer>, document.getElementById('app'));
  });
}
