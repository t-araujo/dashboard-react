/* eslint-disable import/default */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch } from 'react-router-dom';

// Middleware
import promise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('./favicon.ico');
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

injectTapEventPlugin();


const createStoreWithMiddleware = applyMiddleware(promise, ReduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Router routes={routes} history={browserHistory} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('app')
);
