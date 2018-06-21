import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Dashboard from './containers/DashboardPage';
import EditHardware from './containers/EditHardware';
import ListBatches from './containers/ListBatches';
import ListDevices from './containers/ListDevices';
import ListFirmwares from './containers/ListFirmwares';
import ListHardware from './containers/ListHardware';
import ListSoftware from './containers/ListSoftware';
import LoginPage from './containers/LoginPage';
import NewHardware from './containers/NewHardware';
import NotFoundPage from './containers/NotFoundPage.js';
import React from 'react';

export default
<Route>
  <Route path="login" component={LoginPage}/>
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard}/>
    <Route path="dashboard" component={Dashboard}/>
    <Route path="hardwares" component={ListHardware}/>
    <Route path="newHardware" component={NewHardware}/>
    <Route path="editHardware/:id" component={EditHardware}/>
    <Route path="batches" component={ListBatches}/>
    <Route path="firmwares" component={ListFirmwares}/>
    <Route path="software" component={ListSoftware}/>
    <Route path="devices" component={ListDevices}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
</Route>
;
