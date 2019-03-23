import React from 'react';
import { Link } from 'react-router-dom';

export const BlogListItem = ({ title, body, author, id }) => (
        <Link to={`/edit/${id}`}>
            <h2>{title}</h2>
            <p>{body}</p>
            <p>{author}</p>
        </Link>
);

export default BlogListItem;