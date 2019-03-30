import React from 'react';
import BlogFilters from './BlogFilters';
import BlogList from './BlogList';

export const DashboardPage = () => (
    <div className="flex-1">
        <div className="container mx-auto mt-24">
            <BlogFilters />
            <BlogList />
        </div>
    </div>
);

export default DashboardPage;