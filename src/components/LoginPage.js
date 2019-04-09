import React from 'react';
import ReadBlogList from '../components/ReadBlogList';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const LoginPage = () => (
    <React.Fragment>
        <Header />
        <ReadBlogList />
        <Footer />
    </React.Fragment>
);

export default LoginPage;