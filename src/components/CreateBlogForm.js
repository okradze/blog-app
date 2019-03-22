import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { createBlog } from '../actions/blogs';

export class CreateBlogForm extends React.Component {
    state = {};
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }));
    };
    onBodyChange = (e) => {
        const body = e.target.value;
        this.setState(() => ({ body }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.title || !this.state.body){
            this.setState(() => ({ error: 'Please provide blog title and body' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.createBlog({
                title: this.state.title,
                body: this.state.body,
                createdAt: moment().valueOf()
            });
        }
    };
    render() {
        return (
            <form>
                <input type="text" placeholder="Blog title" onChange={this.onTitleChange} />
                <textarea placeholder="Blog body" onChange={this.onBodyChange}></textarea>
                <button onClick={this.onSubmit}>Create Blog</button>
            </form>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    createBlog: (blog) => dispatch(createBlog(blog))
});

export default connect(undefined, mapDispatchToProps)(CreateBlogForm);