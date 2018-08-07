import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import {employeeReducers} from '../../employee/reducers';
import {authenticationReducers} from '../../authentication/reducers';
import {getApolloClient} from '../../graphql/helpers/apolloClientHelper';

const client = getApolloClient();

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    filter,
    employee: combineReducers({
        ...employeeReducers
    }),
    authentication: combineReducers({
        ...authenticationReducers
    }),
    routing
});

export default rootReducer;
