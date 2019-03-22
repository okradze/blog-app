import React from 'react';

export const BlogListItem = ({ blog }) => (
    <div>
        <h2>{blog.title}</h2>
        <p>{blog.body}</p>
        <p>{blog.author}</p>
    </div>
);

export default BlogListItem;