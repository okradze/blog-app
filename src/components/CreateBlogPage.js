import React, { useState } from 'react';
import CreateBlogForm from './CreateBlogForm';
import { startCreateBlog } from '../actions/blogs';

export const CreateBlogPage = ({ history }) => {
	const [ submitLoading, setSubmitLoading ] = useState(false);
	const [ submitDisabled, setSubmitDisabled ] = useState(false);

	const onSubmit = (blog, uid) => {
		setSubmitLoading(true);
		setSubmitDisabled(true);
		startCreateBlog(blog, uid).then(() => {
			history.push('/dashboard');
		});
	};
	return (
		<React.Fragment>
			<div className="container mb-auto">
				<CreateBlogForm submitDisabled={submitDisabled} submitLoading={submitLoading} onSubmit={onSubmit} />
			</div>
		</React.Fragment>
	);
};

export default CreateBlogPage;
