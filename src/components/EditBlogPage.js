import React from 'react';

export const EditBlogPage = (props) => (
    <div>Edit blog {props.match.params.id}</div>
);

export default EditBlogPage;