import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'intersection-observer';
import { fetchBlogs, firstFetchBlogs } from '../services/fetch';
import BlogListItem from './BlogListItem';
import loader from '../images/loader.gif';
import selectBlogs from '../selectors/blogs';

export const BlogList = ({ uid, filters }) => {
	const [ blogs, setBlogs ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ fetching, setFetching ] = useState(false);

	const scrollElement = React.useRef();

	const paginateBlogs = () => {
		setFetching(true);
		fetchBlogs(uid)
			.then(newBlogs => {
				const data = JSON.parse(sessionStorage.getItem('blogs'));
				setBlogs([ ...data, ...newBlogs ]);
				sessionStorage.setItem('blogs', JSON.stringify([ ...data, ...newBlogs ]));
				setFetching(false);
			})
			.catch(() => {
				setFetching(false);
			});
	};

	useEffect(() => {
		let didCancel = false;
		firstFetchBlogs(uid).then(newBlogs => {
			if (!didCancel) {
				setBlogs(newBlogs);
				sessionStorage.setItem('blogs', JSON.stringify(newBlogs));
				setLoading(false);

				const io = new IntersectionObserver(entries => {
					const ratio = entries[0].intersectionRatio;
					if (ratio > 0) {
						setFetching(true);
						paginateBlogs();
					}
				});
				io.observe(scrollElement.current);
			}
		});
		return () => {
			didCancel = true;
		};
	}, []);

	const filteredBlogs = selectBlogs(blogs, filters);

	return (
		<React.Fragment>
			{loading ? (
				<img className="center small-loader" src={loader} alt="Loader" />
			) : (
				<div className="blog-list">
					{filteredBlogs.map(blog => <BlogListItem to="edit" key={blog.id} {...blog} />)}
					{fetching && <img className="small-loader" src={loader} alt="Loader" />}
					<div style={{ minHeight: '1px', minWidth: '1px' }} ref={scrollElement} />
				</div>
			)}
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	uid: state.auth.uid,
	filters: state.filters,
});

export default connect(mapStateToProps)(BlogList);
