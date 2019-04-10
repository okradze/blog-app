import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const SmallBlogItem = ({ title, id, createdAt }) => (
	<Link className="recent-feed-item" to={`read/${id}`}>
		<h4 className="recent-feed-item__title">{title}</h4>
		<time className="recent-feed-item__date" dateTime={new Date(createdAt)}>
			{moment(createdAt).format('MMM Do, YYYY')}
		</time>
	</Link>
);

export default SmallBlogItem;
