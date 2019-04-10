import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NotFoundPage from './NotFoundPage';
import CreateBlogForm from './CreateBlogForm';
import { startRemoveBlog, startEditBlog } from '../actions/blogs';
import loader from '../images/loader.gif';
import db from '../firebase/firebase';

const fetchBlog = async (uid, id) => {
	const data = await db.collection('users').doc(uid).collection('blogs').doc(id).get();
	return {
		id: data.id,
		...data.data(),
	};
};

export const EditBlogPage = ({ uid, match, history }) => {
	const [ removeLoading, setRemoveLoading ] = useState(false);
	const [ submitLoading, setSubmitLoading ] = useState(false);
	const [ submitDisabled, setSubmitDisabled ] = useState(false);
	const [ removeDisabled, setRemoveDisabled ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ blog, setBlog ] = useState(null);

	useEffect(() => {
		let didCancel = false;
		fetchBlog(uid, match.params.id).then(newBlog => {
			if (!didCancel) {
				setBlog(newBlog);
				setLoading(false);
			}
		});
		return () => {
			didCancel = true;
		};
	}, []);

	const onRemove = () => {
		setRemoveLoading(true);
		setRemoveDisabled(true);
		setSubmitDisabled(true);

		startRemoveBlog(uid, blog.id).then(() => {
			history.push('/dashboard');
		});
	};
	const onSubmit = updates => {
		setSubmitDisabled(true);
		setSubmitLoading(true);
		setRemoveDisabled(true);

		startEditBlog(uid, blog.id, updates).then(() => {
			history.push('/dashboard');
		});
	};

	return loading ? (
		<img className="center small-loader" src={loader} alt="Loader" />
	) : (
		<React.Fragment>
			{blog ? (
				<div className="container mb-auto">
					<CreateBlogForm
						submitLoading={submitLoading}
						submitDisabled={submitDisabled}
						{...blog}
						onSubmit={onSubmit}
						isEdit={true}
						removeLoading={removeLoading}
						removeDisabled={removeDisabled}
						onRemove={onRemove}
					/>
				</div>
			) : (
				<NotFoundPage />
			)}
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	uid: state.auth.uid,
});

export default connect(mapStateToProps)(EditBlogPage);
