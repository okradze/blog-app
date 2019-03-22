import React from 'react';
import { connect } from 'react-redux';
import BlogListItem from './BlogListItem';

export const BlogList = ({ blogs }) => (
    <div>
        {(
            blogs.map(blog => <BlogListItem blog={blog} />)
        )}
    </div>
);

const mapStateToProps = (state) => ({
    blogs: state.blogs
});

export default connect(mapStateToProps)(BlogList);