import React, { useState, useEffect } from 'react';
import db from '../firebase/firebase';
import NotFoundPage from './NotFoundPage';
import moment from 'moment';
import Loader from './Loader';
import Header from './Header';
import Parse from 'html-react-parser';
const DOMPurify = require('dompurify')(window);

const fetchBlog = async (id) => {
    const data = await db.collection('blogs').doc(id).get();
    return {
        id: data.id,
        ...data.data()
    };
}

export const ReadBlogPage = (props) => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlog(props.match.params.id).then(blog => {
            setBlog(blog);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                    <>
                        {blog ? (
                            <div className="container mx-auto mt-24 py-8 px-8 rounded bg-grey-lightest">
                                <h1 className="text-grey-darkest text-center tracking-wide">{blog.title}</h1>
                                <div className="flex justify-between">
                                    <div className="flex items-center">
                                        <img className="rounded-full w-auto h-10 cursor-pointer mr-4" src={blog.photoURL} alt="author" />
                                        <p className="text-grey-darker">{blog.author}</p>
                                    </div>
                                    <p className="text-grey-darker">{moment(blog.createdAt).format('MMM Do, YYYY')}</p>
                                </div>
                                <div className="mt-12 px-10">
                                    <div className="text-grey-darkest text-lg leading-normal">{Parse(DOMPurify.sanitize(blog.body))}</div>
                                </div>
                            </div>
                        ) : (
                                <NotFoundPage />
                            )}
                    </>
                )}
        </div>
    )
}

export default ReadBlogPage;