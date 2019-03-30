import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const BlogListItem = ({ title, author, id, to, createdAt }) => (
    <Link className="flex justify-between items-center bg-grey-lightest py-4 px-6 rounded-sm mb-6 hover:bg-grey-light" to={`/${to}/${id}`}>
        <div>
            <h2 className="mb-6 break-words text-grey-darkest">{title}</h2>
            <p className="text-grey-darker">by {author}</p>
        </div>
        <p className="text-teal-light">{moment(createdAt).format('MMM Do, YYYY')}</p>
    </Link>
);

export default BlogListItem;