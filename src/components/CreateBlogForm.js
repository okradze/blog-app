import React, { useState } from 'react';
import moment from 'moment';
import Quill from './Quill';
import loader from '../images/loader.gif';

export const CreateBlogForm = props => {
    const [title, setTitle] = useState(props.title || '');
    const [body, setBody] = useState(props.body || '');
    const [createdAt] = useState(props.createdAt || moment().valueOf());
    const [error, setError] = useState('');

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const onBodyChange = (e) => {
        setBody(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (!title || !body) {
            setError('Please provide blog title and body');
        } else {
            setError('');
            props.onSubmit({
                title,
                body,
                createdAt
            });
        }
    };

    return (
        <form className="flex flex-col" onSubmit={onSubmit}>
            {error && <p>{error}</p>}
            <input type="text" className="px-4 py-2 mt-12 mb-8 rounded-sm" placeholder="Blog title" value={title} onChange={onTitleChange} />

            <Quill body={body} setBody={setBody} />
            <button className="button flex items-center self-start mt-6" disabled={props.submitDisabled}>
            
            {props.submitLoading && <img className="w-4 h-4 mr-2" src={loader} alt="loader" />} Save Blog</button>
        </form>
    )
};

export default CreateBlogForm;