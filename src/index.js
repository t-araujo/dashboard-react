/* eslint-disable import/default */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import store from './store/';
import reducers from './reducers';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('./favicon.ico');
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Router history={browserHistory} >
                    {routes}
                </Router>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('app')
);
