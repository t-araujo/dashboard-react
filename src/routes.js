import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Dashboard from './containers/DashboardPage';
import EditBatch from './containers/EditBatch';
import EditFirmware from './containers/EditFirmware';
import EditHardware from './containers/EditHardware';
import EditSoftware from './containers/EditSoftware';
import ListBatches from './containers/ListBatches';
import ListDevices from './containers/ListDevices';
import ListFirmwares from './containers/ListFirmwares';
import ListHardware from './containers/ListHardware';
import ListSoftware from './containers/ListSoftware';
import LoginPage from './containers/LoginPage';
import NewBatch from './containers/NewBatch';
import NewHardware from './containers/NewHardware';
import NotFoundPage from './containers/NotFoundPage.js';
import React from 'react';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="hardwares" component={ListHardware}/>
      <Route path="newHardware" component={NewHardware}/>
      <Route path="editHardware/:id" component={EditHardware}/>
      <Route path="batches" component={ListBatches}/>
      <Route path="newBatch" component={NewBatch}/>
      <Route path="editBatch/:id" component={EditBatch}/>
      <Route path="firmwares" component={ListFirmwares}/>
      <Route path="editFirmware/:id" component={EditFirmware}/>
      <Route path="software" component={ListSoftware}/>
      <Route path="editSoftware/:id" component={EditSoftware}/>
      <Route path="devices" component={ListDevices}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
