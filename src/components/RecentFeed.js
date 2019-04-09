import React, { useContext } from 'react';
import SmallBlogItem from './SmallBlogItem';
import BlogsContext from '../context/blogs-context';

const RecentFeed = () => {
	const { blogs } = useContext(BlogsContext);

	return (
		<div className="recent-feed">
			<div className="recent-feed__header">
				<h3 className="recent-feed__title">Recent Posts</h3>
			</div>
			<div className="recent-feed__content">
				{blogs
					.slice(0, 5)
					.map(blog => (
						<SmallBlogItem key={blog.id} title={blog.title} createdAt={blog.createdAt} id={blog.id} />
					))}
			</div>
		</div>
	);
};

export default RecentFeed;
