import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'intersection-observer';
import MediaQuery from 'react-responsive';
import BlogListItem from './BlogListItem';
import db from '../firebase/firebase';
import BlogFilters from './BlogFilters';
import loader from '../images/loader.gif';
import RecentFeed from './RecentFeed';
import BlogsContext from '../context/blogs-context';

let startDoc = null;

const getBlogs = docs => {
	const blogs = [];
	docs.forEach(doc => {
		blogs.push({
			id: doc.id,
			...doc.data(),
		});
	});
	startDoc = docs[docs.length - 1];
	return blogs;
};

const firstFetchBlogs = async () => {
	const data = await db.collection('blogs').orderBy('createdAt', 'desc').limit(6).get();
	return getBlogs(data.docs);
};

const fetchBlogs = async () => {
	const data = await db.collection('blogs').orderBy('createdAt', 'desc').startAfter(startDoc).limit(6).get();
	return getBlogs(data.docs);
};

export const ReadBlogList = () => {
	const [ blogs, setBlogs ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ fetching, setFetching ] = useState(false);

	const scrollElement = React.useRef();

	const paginateBlogs = () => {
		setFetching(true);
		fetchBlogs()
			.then(newBlogs => {
				const data = JSON.parse(sessionStorage.getItem('readBlogs'));
				setBlogs([ ...data, ...newBlogs ]);
				sessionStorage.setItem('readBlogs', JSON.stringify([ ...data, ...newBlogs ]));
				setFetching(false);
			})
			.catch(() => {
				setFetching(false);
			});
	};

	useEffect(() => {
		let didCancel = false;
		firstFetchBlogs().then(newBlogs => {
			if (!didCancel) {
				setBlogs(newBlogs);
				sessionStorage.setItem('readBlogs', JSON.stringify(newBlogs));
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

	return (
		<div className="container read-blog-list">
			<BlogFilters />

			{loading && <img className="center small-loader" src={loader} alt="Loader" />}

			{!loading && (
				<BlogsContext.Provider value={{ blogs }}>
					<div className="read-blog-list__content">
						<div className="read-blog-list__blogs">
							{blogs.map(blog => <BlogListItem to="read" key={blog.id} {...blog} />)}
							{fetching && <img src={loader} className="small-loader" alt="Loader" />}
							<div style={{ minHeight: '1px', minWidth: '1px' }} ref={scrollElement} />
						</div>
						<MediaQuery minDeviceWidth={1200}>
							<RecentFeed />
						</MediaQuery>
					</div>
				</BlogsContext.Provider>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	filters: state.filters,
});

export default connect(mapStateToProps)(ReadBlogList);
