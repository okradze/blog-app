import React from 'react';
import { connect } from 'react-redux';
import BlogListItem from './BlogListItem';
import selectBlogs from '../selectors/blogs';

export const BlogList = ({ blogs }) => (
    <div>
        {(
            blogs.map(blog => <BlogListItem key={blog.id} blog={blog} />)
        )}
    </div>
);

const mapStateToProps = (state) => ({
    blogs: selectBlogs(state.blogs, state.filters)
});

export default connect(mapStateToProps)(BlogList);