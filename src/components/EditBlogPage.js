import React from 'react';
import { connect } from 'react-redux';
import CreateBlogForm from './CreateBlogForm';
import { startRemoveBlog, startEditBlog } from '../actions/blogs';

export class EditBlogPage extends React.Component {
    onRemove = () => {
        this.props.startRemoveBlog(this.props.blog.id);
        this.props.history.push('/');
    };
    onSubmit = (updates) => {
        this.props.startEditBlog(this.props.blog.id, updates);
        this.props.history.push('/');
    };
    render(){
        return (
            <div>
                <CreateBlogForm onSubmit={this.onSubmit} {...this.props.blog} />
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startRemoveBlog: (id) => dispatch(startRemoveBlog(id)),
    startEditBlog: (id, updates) => dispatch(startEditBlog(id, updates))
});

const mapStateToProps = (state, props) => ({
    blog: state.blogs.find(blog => blog.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBlogPage);