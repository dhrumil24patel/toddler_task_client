import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import {employeeReducers} from '../../employee/reducers';
import {authenticationReducers} from '../../authentication/reducers';
import {dashboardReducers} from '../../dashboard/reducers';
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
    dashboard: combineReducers({
        ...dashboardReducers
    }),
    routing
});

export default rootReducer;
