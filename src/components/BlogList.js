import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogListItem from './BlogListItem';
import selectBlogs from '../selectors/blogs';

export const BlogList = ({ blogs }) => (
    <div className="mt-8 pb-12 overflow-y-auto">
        {blogs.length > 0 ? (
            blogs.map(blog => <BlogListItem to={'edit'} key={blog.id} {...blog} />)
        ) : (
            <div className="flex items-center justify-center mt-8">
                <p className="text-xl text-grey-darkest">No Blogs</p>
            </div>
        )}
    </div>
);

const mapStateToProps = (state) => ({
    blogs: selectBlogs(state.blogs, state.filters)
});

export default connect(mapStateToProps)(BlogList);