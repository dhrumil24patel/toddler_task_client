import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';
import {getApolloClient} from '../../graphql/helpers/apolloClientHelper';

export const history = createHistory();
const middleware = routerMiddleware(history);
const client = getApolloClient();

export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(middleware, client.middleware()),
    );
}
