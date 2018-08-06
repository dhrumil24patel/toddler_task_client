import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FilterableTable from './src/containers/FilterableTable';
import About from './src/components/About';
import {LoginPage} from './authentication/containers/LoginPage';

export default (
	<Switch>
		<Route exact path="/" component={FilterableTable} />
		<Route path="/about" component={About} />
        <Route path="/login" component={LoginPage} />
	</Switch>
);
