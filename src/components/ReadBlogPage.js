import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Parse from 'html-react-parser';
import db from '../firebase/firebase';
import NotFoundPage from './NotFoundPage';
import loader from '../images/loader.gif';
import Header from './Header';

const fetchBlog = async id => {
	const data = await db.collection('blogs').doc(id).get();
	return {
		id: data.id,
		...data.data(),
	};
};

export const ReadBlogPage = props => {
	const [ blog, setBlog ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ visibleCaption, setVisibleCaption ] = useState(true);

	useEffect(() => {
		fetchBlog(props.match.params.id).then(newBlog => {
			setBlog(newBlog);
			setLoading(false);
		});
	}, []);

	return (
		<React.Fragment>
			<Header />
			{loading ? (
				<img className="center small-loader" src={loader} alt="Loader" />
			) : (
				<React.Fragment>
					{blog ? (
						<div className="page">
							<article className="article">
								<h1 className="article__title">{blog.title}</h1>
								<div className="blog-info">
									<img src={blog.photoURL} className="blog-info__photo" alt={blog.author} />
									<div className="blog-info__content">
										<p className="blog-info__author">{blog.author}</p>
										<time dateTime={new Date(blog.createdAt)} className="blog-info__date">
											{moment(blog.createdAt).format('MMM Do, YYYY')}
										</time>
									</div>
								</div>
								<div className="article__thumbnail">
									<img
										onLoad={() => {
											setVisibleCaption(false);
										}}
										src={blog.url}
										className="article__thumbnail-image"
										alt={blog.title}
									/>
									{visibleCaption && <img className="small-loader" src={loader} alt="Loader" />}
								</div>
								<div className="article__content">{Parse(blog.body)}</div>
							</article>
						</div>
					) : (
						<NotFoundPage />
					)}
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default ReadBlogPage;
