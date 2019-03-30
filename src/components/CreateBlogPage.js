import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreateBlogForm from './CreateBlogForm';
import { startCreateBlog } from '../actions/blogs';

export const CreateBlogPage = props => {
    const [submitLoading, setSubmitLoading] =  useState(false);
    const [submitDisabled, setSubmitDisabled] =  useState(false);

    const onSubmit = (blog) => {
        setSubmitLoading(true);
        setSubmitDisabled(true);
        props.startCreateBlog(blog).then(() => {
            props.history.push('/dashboard');
        });
    };
    return (
        <div className="flex-1 z-0">
            <div className="container mx-auto mt-16">
                <CreateBlogForm submitDisabled={submitDisabled} submitLoading={submitLoading}onSubmit={onSubmit} />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startCreateBlog: (blog) => dispatch(startCreateBlog(blog))
});

export default connect(undefined, mapDispatchToProps)(CreateBlogPage);