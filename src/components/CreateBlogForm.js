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

		const data = {
			title: xss(blogTitle),
			body: xss(blogBody),
			createdAt: blogCreatedAt,
			author: xss(auth.displayName),
			photoURL: xss(auth.photoURL),
			file,
		};

		if (isEdit) {
			if (!blogTitle || blogBody.length < 200) {
				setError('Please provide blog title and make sure body contains more than 200 characters');
			} else {
				setError('');
				onSubmit(data, auth.uid);
			}
		} else if (!isEdit) {
			if (!blogTitle || blogBody.length < 200 || !file) {
				setError('Please provide blog title, thumbnail and make sure body contains more than 200 characters');
			} else {
				setError('');
				onSubmit(data, auth.uid);
			}
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

			{!isEdit && (
				<input type="file" className="input file-upload" onChange={onFileChange} multiple accept="image/*" />
			)}

			<Quill body={blogBody} setBody={onBodyChange} />
			<button onClick={onSave} type="button" className="button create-form__button" disabled={submitDisabled}>
				Save Blog
			</button>
			{submitLoading && <img className="small-loader form-loader" src={loader} alt="loader" />}
			{isEdit && (
				<React.Fragment>
					<button type="button" className="button button--grey" onClick={onRemove} disabled={removeDisabled}>
						Remove
					</button>
					{removeLoading && <img className="small-loader form-loader" src={loader} alt="loader" />}
				</React.Fragment>
			)}
		</form>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(CreateBlogForm);
