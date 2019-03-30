import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NotFoundPage from './NotFoundPage'
import CreateBlogForm from './CreateBlogForm';
import { startRemoveBlog, startEditBlog } from '../actions/blogs';
import loader from '../images/loader.gif';
import db from '../firebase/firebase';

const fetchBlog = async (id) => {
    const data = await db.collection('blogs').doc(id).get();
    return {
        id: data.id,
        ...data.data()
    };
}

export const EditBlogPage = props => {
    const [removeLoading, setRemoveLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [removeDisabled, setRemoveDisabled] = useState(false);
    const [blog, setBlog] = useState(false);

    useEffect(() => {
        fetchBlog(props.match.params.id).then((blog) => {
            setBlog(blog);
        })
    }, [])

    const onRemove = () => {
        setRemoveLoading(true);
        setRemoveDisabled(true);
        setSubmitDisabled(true);

        props.startRemoveBlog(blog.id).then(() => {
            props.history.push('/dashboard');
        });
    };
    const onSubmit = (updates) => {
        setSubmitDisabled(true);
        setSubmitLoading(true);
        setRemoveDisabled(true);

        props.startEditBlog(blog.id, updates).then(() => {
            props.history.push('/dashboard');
        });
    };
    return blog ? (
        <div className="container mx-auto mt-16">
            <CreateBlogForm submitLoading={submitLoading} submitDisabled={submitDisabled} {...blog} onSubmit={onSubmit}
            />
            <button
                className="button mt-4 bg-grey hover:bg-grey-dark flex items-center"
                onClick={onRemove} disabled={removeDisabled}>
                {removeLoading && <img className="h-4 w-4 mr-2" src={loader} alt="loader" />} Remove</button>
        </div>
    ) : (
        <NotFoundPage />
    )
}

const mapDispatchToProps = (dispatch) => ({
    startRemoveBlog: (id) => dispatch(startRemoveBlog(id)),
    startEditBlog: (id, updates) => dispatch(startEditBlog(id, updates))
});

export default connect(undefined, mapDispatchToProps)(EditBlogPage);