import React from 'react';
import BlogFilters from './BlogFilters';
import BlogList from './BlogList';
import {Link} from 'react-router-dom';

export const DashboardPage = () => (
    <div>
        <Link to="/create">Create</Link>
        <BlogFilters />
        <BlogList />
    </div>
);

export default DashboardPage;