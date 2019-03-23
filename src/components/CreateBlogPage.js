import React from 'react';
import { connect } from 'react-redux';
import CreateBlogForm from './CreateBlogForm';
import { startCreateBlog } from '../actions/blogs';

export class CreateBlogPage extends React.Component {
    onSubmit = (blog) => {
        this.props.startCreateBlog(blog);
        this.props.history.push('/dashboard');
    };
    render() {
        return (
            <div>
                <CreateBlogForm onSubmit={this.onSubmit} />
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startCreateBlog: (blog) => dispatch(startCreateBlog(blog))
});

export default connect(undefined, mapDispatchToProps)(CreateBlogPage);