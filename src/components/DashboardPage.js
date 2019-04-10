import React from 'react';
import 'babel-polyfill';
import BlogFilters from './BlogFilters';
import BlogList from './BlogList';

const DashboardPage = () => (
	<div className="dashboard-page container">
		<BlogFilters />
		<BlogList />
	</div>
);

export default DashboardPage;
