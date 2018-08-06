import React from 'react';
import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import { configureStore, history } from './src/store/configureStore';
import Root from './src/containers/Root';

const store = configureStore();
window.store = store;

render(
    <Provider store={store}>
        <Root store={store} history={history} />
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./src/containers/Root', () => {
        const newConfigureStore = require('./src/store/configureStore');
        const newStore = newConfigureStore.configureStore();
        const newHistory = newConfigureStore.history;
        const NewRoot = require('./src/containers/Root').default;
        render(
            <Provider store={newStore}>
                <NewRoot store={newStore} history={newHistory} />
            </Provider>,
            document.getElementById('root')
        );
    });
}
