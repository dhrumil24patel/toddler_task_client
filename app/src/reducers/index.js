import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import {employeeReducers} from '../../employee/reducers';

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
    routing
});

export default rootReducer;
