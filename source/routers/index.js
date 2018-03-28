import React from 'react';
import { Router, Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
import App from '../components/App';
import AnimationImageLoader from '../components/AnimationImageLoader/demo/App';
import Avatar from '../components/Avatar/demo/App';
import Collapse from '../components/Collapse/demo/App';
import ImageLoader from '../components/ImageLoader/demo/App';
import Loading from '../components/Loading/demo/App';
import NumberCounter from '../components/NumberCounter/demo/App';
import SearchInput from '../components/SearchInput/demo/App';
import StickVerticalMenu from '../components/StickVerticalMenu/demo/App';
import Suggest from '../components/Suggest/demo/App';
import TextOverflow from '../components/TextOverflow/demo/App';
import TreeSelect from '../components/TreeSelect/demo/App';
import UIKJGF from '../components/UI/demo/App';

// import NumberCounter from '../components/NumberCounter/demo/App';

class RouteMap extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={AnimationImageLoader} />
          <Route path='/**/AnimationImageLoader/' component={AnimationImageLoader} />
          <Route path='/**/Avatar/' component={Avatar} />
          <Route path='/**/Collapse/' component={Collapse} />
          <Route path='/**/ImageLoader/' component={ImageLoader} />
          <Route path='/**/Loading/' component={Loading} />
          <Route path='/**/NumberCounter/' component={NumberCounter} />
          <Route path='/**/SearchInput/' component={SearchInput} />
          <Route path='/**/StickVerticalMenu/' component={StickVerticalMenu} />
          <Route path='/**/Suggest/' component={Suggest} />
          <Route path='/**/TextOverflow/' component={TextOverflow} />
          <Route path='/**/TreeSelect/' component={TreeSelect} />
          <Route path='/**/UI/' component={UIKJGF} />
        </Route>
      </Router>
    )
  }
}
export default RouteMap;
