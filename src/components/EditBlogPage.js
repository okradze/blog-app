import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NotFoundPage from './NotFoundPage';
import CreateBlogForm from './CreateBlogForm';
import { startRemoveBlog, startEditBlog } from '../actions/blogs';
import Loader from './Loader';
import loader from '../images/loader.gif';

export const EditBlogPage = props => {
    const [removeLoading, setRemoveLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [removeDisabled, setRemoveDisabled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [props.blog])

    const onRemove = () => {
        setRemoveLoading(true);
        setRemoveDisabled(true);
        setSubmitDisabled(true);

        props.startRemoveBlog(props.blog.id).then(() => {
            props.history.push('/dashboard');
        });
    };
    const onSubmit = (updates) => {
        setSubmitDisabled(true);
        setSubmitLoading(true);
        setRemoveDisabled(true);

        props.startEditBlog(props.blog.id, updates).then(() => {
            props.history.push('/dashboard');
        });
    };

    return loading ? (
        <Loader />
    ) : (
            <>
                {props.blog ? (
                    <div className="container mx-auto mt-16">
                        <CreateBlogForm submitLoading={submitLoading} submitDisabled={submitDisabled} {...props.blog} onSubmit={onSubmit}
                        />
                        <button
                            className="button mt-4 bg-grey hover:bg-grey-dark flex items-center"
                            onClick={onRemove} disabled={removeDisabled}>
                            {removeLoading && <img className="h-4 w-4 mr-2" src={loader} alt="loader" />} Remove</button>
                    </div>
                ) : (
                        <NotFoundPage />
                    )}
            </>
        )
}

const mapStateToProps = (state, props) => ({
    blog: state.blogs.find(blog => blog.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    startRemoveBlog: (id) => dispatch(startRemoveBlog(id)),
    startEditBlog: (id, updates) => dispatch(startEditBlog(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBlogPage);