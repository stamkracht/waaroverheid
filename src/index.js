import React from 'react';

import { render } from 'react-dom';
import 'react-dates/initialize';
import 'es6-symbol/implement';
import 'url-search-params-polyfill';
import 'iterators-polyfill';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import store, { history } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

const target = document.querySelector('#root');

const Root = ({ store }) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

render(<Root store={store} />, target);

registerServiceWorker();
