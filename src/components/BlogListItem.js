import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'intersection-observer';

export const BlogListItem = ({ title, author, id, to, createdAt, url, photoURL }) => {
	const [ visibleCaption, setVisibleCaption ] = useState(true);

	return (
		<article className="blog-item">
			<div className="blog-info">
				<img src={photoURL} className="blog-info__photo" alt={author} />
				<div className="blog-info__content">
					<p className="blog-info__author">{author}</p>
					<time dateTime={new Date(createdAt)} className="blog-info__date">
						{moment(createdAt).format('MMM Do, YYYY')}
					</time>
				</div>
			</div>

			<figure className="blog-item__thumbnail">
				{visibleCaption && <div className="blog-item__thumbnail-no" />}
				<img onLoad={() => setVisibleCaption()} src={url} alt={title} className="blog-item__thumbnail-img" />
			</figure>

			<div className="blog-item__content">
				<h2 className="blog-item__title">{title}</h2>
				{to === 'edit' && (
					<Link className="read-more" to={`${to}/${id}`}>
						Edit Blog
					</Link>
				)}
				<Link className="read-more" to={`read/${id}`}>
					Read more...
				</Link>
			</div>
		</article>
	);
};
export default BlogListItem;
