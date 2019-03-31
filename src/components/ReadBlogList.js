import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BlogListItem from './BlogListItem';
import selectBlogs from '../selectors/blogs';
import db from '../firebase/firebase';
import Loader from './Loader';
import BlogFilters from './BlogFilters';
import loader from '../images/loader.gif';

let startDoc = null;

const getBlogs = (docs) => {
    const blogs = [];
    docs.forEach(doc => {
        blogs.push({
            id: doc.id,
            ...doc.data()
        });
    });
    startDoc = docs[docs.length - 1];
    return blogs;
}

const firstFetchBlogs = async () => {
    const data = await db.collection('blogs').orderBy('createdAt', 'desc').limit(5).get();
    return getBlogs(data.docs);
};

const fetchBlogs = async () => {
    const data = await db.collection('blogs').orderBy('createdAt', 'desc').startAfter(startDoc).limit(5).get();
    return getBlogs(data.docs);
}

export const ReadBlogList = ({ filters }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [smallLoading, setSmallLoading] = useState(false);
    const [noMore, setNoMore] = useState(false);

    useEffect(() => {
        firstFetchBlogs().then(blogs => {
            setBlogs(blogs);
            setLoading(false);
        });
        return () => {}
    }, []);

    const paginateBlogs = () => {
        setSmallLoading(true);
        fetchBlogs().then(newBlogs => {
            setBlogs([...blogs, ...newBlogs]);
            setSmallLoading(false);
        }).catch(() => {
            setSmallLoading(false);
            setNoMore(true);
        })
    };

    const filteredBlogs = selectBlogs(blogs, filters);

    return (
        <div onScroll={(e) => {
            if (e.target.scrollHeight -  e.target.scrollTop <= (e.target.clientHeight)){
                paginateBlogs();
            }
        }} className="container mx-auto mt-24 py-6 overflow-y-auto">
            {loading && <Loader />}
                <BlogFilters/>
            {!loading && (
                <>
                    {filteredBlogs.length > 0 ? (
                            <div className="mt-8">
                                {filteredBlogs.map(blog => <BlogListItem to={'read'} key={blog.id} {...blog} />)}
                            </div>
                    ) : (
                        <div className="flex items-center justify-center mt-32">
                            <p className="text-xl text-grey-darkest">No Blogs</p>
                        </div>
                    )}
                    {(smallLoading && <div className="flex items-center justify-center"><img className="w-12 h-12" src={loader} /></div>) || (noMore && <p className="text-grey-darkest text-center text-xl">No more blogs :(</p>)}
                </>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps)(ReadBlogList);