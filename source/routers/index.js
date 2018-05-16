import React from 'react';
import {Router, Route, IndexRoute, browserHistory, IndexRedirect} from 'react-router';
import App from '../components/App';
import AnimationImageLoader from '../components/AnimationImageLoader/demo/App';
import Avatar from '../components/Avatar/demo/App';
import Collapse from '../components/Collapse/demo/App';
import CustomTable from '../components/CustomTable/demo/App';
import Drawer from '../components/Drawer/demo/App';
import EChart from '../components/EChart/demo/App';
import ImageLoader from '../components/ImageLoader/demo/App';
import Loading from '../components/Loading/demo/App';
import NumberCounter from '../components/NumberCounter/demo/App';
import ReactAmap from '../components/ReactAmap/demo/App';
import SearchInput from '../components/SearchInput/demo/App';
import StickVerticalMenu from '../components/StickVerticalMenu/demo/App';
import Suggest from '../components/Suggest/demo/App';
import TableSorter from '../components/TableSorter/demo/App';
import TextOverflow from '../components/TextOverflow/demo/App';
import TimePicker from '../components/TimePicker/demo/App';
import TreeSelect from '../components/TreeSelect/demo/App';
import UIKJGF from '../components/UI/demo/App';
import PicturePreview from '../components/PicturePreview/demo/App';
import DayTimeSelect from '../components/DayTimeSelect/demo/App';

class RouteMap extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={AnimationImageLoader}/>
          <Route path="/**/AnimationImageLoader/" component={AnimationImageLoader}/>
          <Route path="/**/Avatar/" component={Avatar}/>
          <Route path="/**/Collapse/" component={Collapse}/>
          <Route path="/**/ImageLoader/" component={ImageLoader}/>
          <Route path="/**/Drawer/" component={Drawer}/>
          <Route path="/**/EChart/" component={EChart}/>
          <Route path="/**/Loading/" component={Loading}/>
          <Route path="/**/NumberCounter/" component={NumberCounter}/>
          <Route path="/**/SearchInput/" component={SearchInput}/>
          <Route path="/**/StickVerticalMenu/" component={StickVerticalMenu}/>
          <Route path="/**/Suggest/" component={Suggest}/>
          <Route path="/**/TextOverflow/" component={TextOverflow}/>
          <Route path="/**/TimePicker/" component={TimePicker}/>
          <Route path="/**/TreeSelect/" component={TreeSelect}/>
          <Route path="/**/TableSorter/" component={TableSorter}/>
          <Route path="/**/CustomTable/" component={CustomTable}/>
          <Route path="/**/PicturePreview/" component={PicturePreview} />
          <Route path="/**/DayTimeSelect/" component={DayTimeSelect} />
          <Route path="/**/ReactAmap/" component={ReactAmap} />
          <Route path="/**/UI/" component={UIKJGF}/>
        </Route>
      </Router>
    );
  }
}

export default RouteMap;
