import React from 'react';
import BlogFilters from './BlogFilters';
import BlogList from './BlogList';

export const DashboardPage = () => (
    <div className="dashboard-page container">
        <BlogFilters />
        <BlogList />
    </div>
);

export default DashboardPage;