import React from 'react';
import { Link } from 'react-router-dom';
import CreateBlogForm from './CreateBlogForm';

export const CreateBlogPage = () => (
    <div>
        <Link to="/dashboard">Dashboard</Link>
        <CreateBlogForm />
    </div>
);

export default CreateBlogPage;