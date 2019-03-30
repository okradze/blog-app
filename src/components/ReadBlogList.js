import React, { useState, useEffect } from 'react';
import BlogListItem from './BlogListItem';
import { Link } from 'react-router-dom';
import db from '../firebase/firebase';
import Loader from './Loader';

const fetchBlogs = async () => {
    const data = await db.collection('blogs').get();
    const blogs = [];
    data.docs.forEach(doc => {
        blogs.push({
            id: doc.id,
            ...doc.data()
        });
    });
    return blogs.sort((a, b) => b.createdAt - a.createdAt );
}

export const ReadBlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs().then((blogs) => {
            setBlogs(blogs);
            setLoading(false);
        });
        return () => {}
    }, []);

    return (
        <div>
            {loading && <Loader />}
            {!loading && (
                <>
                    {blogs ? (
                        <div className="container mx-auto mt-24">
                            {blogs.map(blog => <BlogListItem to={'read'} key={blog.id} {...blog} />)}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center mt-32">
                            <p className="mr-6 text-lg text-grey-darkest">No Blogs? Be first to create</p>
                            <Link to='/create' className="button">Create</Link>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default ReadBlogList;