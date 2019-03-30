import db from '../firebase/firebase';

export const removeBlog = (id) => ({
    type: 'REMOVE_BLOG',
    id
});

export const startRemoveBlog = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.collection('users').doc(uid).collection('blogs').doc(id).delete().then(() => {
            return db.collection('blogs').doc(id).delete().then(() => {
                dispatch(removeBlog(id));
            })
        })
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
        return db.collection('users').doc(uid).collection('blogs').doc(id).update(updates).then(() => {
            return db.collection('blogs').doc(id).update(updates).then(() => {
                dispatch(editBlog(id, updates));
            })
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
            author = getState().auth.displayName,
            photoURL = getState().auth.photoURL
        } = blogData;
        const blog = { title, body, createdAt, author, photoURL };
        const uid = getState().auth.uid;

        return db.collection('users').doc(uid).collection('blogs').add(blog).then(snapshot => {
            return db.collection('blogs').doc(snapshot.id).set(blog).then(() => { 
                dispatch(createBlog({
                    id: snapshot.id,
                    ...blog
                }));
            });
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

        return db.collection('users').doc(uid).collection('blogs').get().then(snapshot => {
            const blogs = [];
            snapshot.docs.forEach(doc => {
                blogs.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            dispatch(setBlogs(blogs));
        });
    };
};