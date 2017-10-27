import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import ListProducts from './containers/ListProducts';
import ListBatches from './containers/ListBatches';
import ListFirmwares from './containers/ListFirmwares';
import ListSoftware from './containers/ListSoftware';
import ListDevices from './containers/ListDevices';
import NewProduct from './containers/NewProduct';
import NewBatch from './containers/NewBatch';
import EditProduct from './containers/EditProduct';
import EditBatch from './containers/EditBatch';
import Dashboard from './containers/DashboardPage';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="hardwares" component={ListProducts}/>
      <Route path="newProduct" component={NewProduct}/>
      <Route path="editProduct/:id" component={EditProduct}/>
      <Route path="batches" component={ListBatches}/>
      <Route path="newBatch" component={NewBatch}/>
      <Route path="editBatch/:id" component={EditBatch}/>
      <Route path="firmwares" component={ListFirmwares}/>
      <Route path="software" component={ListSoftware}/>
      <Route path="devices" component={ListDevices}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
