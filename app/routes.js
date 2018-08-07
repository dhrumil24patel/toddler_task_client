import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FilterableTable from './src/containers/FilterableTable';
import About from './src/components/About';

export default (
	<Switch>
		<Route exact path="/" component={FilterableTable} />
		<Route path="/about" component={About} />
	</Switch>
);
