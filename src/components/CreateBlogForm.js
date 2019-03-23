import React from 'react';
import moment from 'moment';

export class CreateBlogForm extends React.Component {
    state = {
        title: '',
        body: ''
    };
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
            this.props.onSubmit({
                title: this.state.title,
                body: this.state.body,
                author: 'Mirian Okradze',
                createdAt: moment().valueOf()
            });
        }
    };
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="Blog title" value={this.state.title} onChange={this.onTitleChange} />
                <textarea placeholder="Blog body" value={this.state.body} onChange={this.onBodyChange}></textarea>
                <button>Create Blog</button>
            </form>
        );
    }
};

export default CreateBlogForm;