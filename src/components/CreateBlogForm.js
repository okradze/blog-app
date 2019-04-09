import React, { useState } from 'react';
import { connect } from 'react-redux';
import xss from 'xss';
import Quill from './Quill';
import loader from '../images/loader.gif';

export const CreateBlogForm = ({
	onSubmit,
	title,
	body,
	createdAt,
	submitDisabled,
	submitLoading,
	isEdit,
	removeDisabled,
	removeLoading,
	onRemove,
	auth,
}) => {
	const [ blogTitle, setTitle ] = useState(title || '');
	const [ blogBody, setBody ] = useState(body || '');
	const [ blogCreatedAt ] = useState(createdAt || new Date().getTime());
	const [ file, setFile ] = useState(null);
	const [ error, setError ] = useState('');

	const onTitleChange = e => {
		setTitle(e.target.value);
	};
	const onBodyChange = value => {
		setBody(value);
	};
	const onSave = e => {
		e.preventDefault();
		if (!blogTitle || !blogBody) {
			setError('Please provide blog title and body');
		} else {
			setError('');
			onSubmit(
				{
					title: xss(blogTitle),
					body: xss(blogBody),
					createdAt: blogCreatedAt,
					author: xss(auth.displayName),
					photoURL: xss(auth.photoURL),
					file,
				},
				auth.uid,
			);
		}
	};

	const onFileChange = e => {
		if (e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	return (
		<form className="create-form" onSubmit={onSave}>
			{error && (
				<div className="alert create-form__alert" role="alert">
					<p>{error}</p>
				</div>
			)}
			<input
				type="text"
				className="input create-form__input"
				placeholder="Blog title"
				value={blogTitle}
				onChange={onTitleChange}
			/>

			<input type="file" className="input" onChange={onFileChange} />

			<Quill body={blogBody} setBody={onBodyChange} />
			<button onClick={onSave} type="button" className="button create-form__button" disabled={submitDisabled}>
				{submitLoading && <img className="w-4 h-4 mr-2" src={loader} alt="loader" />} Save Blog
			</button>
			{isEdit && (
				<button type="button" className="button button--grey" onClick={onRemove} disabled={removeDisabled}>
					{removeLoading && <img className="center small-loader" src={loader} alt="loader" />} Remove
				</button>
			)}
		</form>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(CreateBlogForm);
