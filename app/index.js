import React from 'react';
import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import { configureStore, history } from './src/store/configureStore';
import Root from './src/containers/Root';
import { ApolloProvider } from 'react-apollo';

import {getApolloClient} from './graphql/helpers/apolloClientHelper';

const store = configureStore();
window.store = store;

const client = getApolloClient();

render(
    <ApolloProvider store={store} client={client}>
        <Root store={store} history={history} />
    </ApolloProvider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./src/containers/Root', () => {
        const newConfigureStore = require('./src/store/configureStore');
        const newStore = newConfigureStore.configureStore();
        const newHistory = newConfigureStore.history;
        const NewRoot = require('./src/containers/Root').default;
        render(
            <ApolloProvider store={newStore}>
                <NewRoot store={newStore} history={newHistory} />
            </ApolloProvider>,
            document.getElementById('root')
        );
    });
}
