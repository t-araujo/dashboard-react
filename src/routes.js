import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import ListProducts from './containers/ListProducts';
import NewProduct from './containers/NewProduct';
import EditProduct from './containers/EditProduct';
import Dashboard from './containers/DashboardPage';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="products" component={ListProducts}/>
      <Route path="newProduct" component={NewProduct}/>
      <Route path="editProduct/:id" component={EditProduct}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
