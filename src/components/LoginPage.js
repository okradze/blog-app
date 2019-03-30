import React from 'react';
import ReadBlogList from '../components/ReadBlogList';
import Header from '../components/Header';

export const LoginPage = () => (
    <div>
        <Header />
        <div className="container mx-auto">
            <ReadBlogList />
        </div>
    </div>
);

export default LoginPage;