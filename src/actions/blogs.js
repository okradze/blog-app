import db from '../firebase/firebase';

export const removeBlog = (id) => ({
    type: 'REMOVE_BLOG',
    id
});

export const startRemoveBlog = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/blogs/${id}`).remove().then(() => {
            dispatch(removeBlog(id));
        });
    };
};

export const editBlog = (id, updates) => ({
    type: 'EDIT_BLOG',
    id,
    updates
});

export const startEditBlog = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/blogs/${id}`).update(updates).then(() => {
            dispatch(editBlog(id, updates));
        });
    };
};

export const createBlog = (blog) => ({
    type: 'CREATE_BLOG',
    blog
});

export const startCreateBlog = (blogData = {}) => {
    return (dispatch, getState) => {
        const {
            title = '',
            body = '',
            createdAt = 0,
            author = 'Anonymous'
        } = blogData;
        const blog = { title, body, createdAt, author };
        const uid = getState().auth.uid;

        return db.ref(`users/${uid}/blogs`).push(blog).then((ref) => {
            dispatch(createBlog({
                id: ref.key,
                ...blog
            }));
        });
    };
};

export const setBlogs = (blogs) => ({
    type: 'SET_BLOGS',
    blogs
});

export const startSetBlogs = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/blogs`).once('value').then((snapshot) => {
            const blogs = [];
            snapshot.forEach(childSnapshot => {
                blogs.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setBlogs(blogs));
        });
    };
};