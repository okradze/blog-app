import db from '../firebase/firebase';

export const fetchBlogs = (blogs) => ({
    type: 'FETCH_BLOGS',
    blogs
});

export const startFetchBlogs = () => {
    return (dispatch) => {
        return db.collection('blogs').get().then((snapshot) => {
            const blogs = [];
            snapshot.docs.forEach(doc => {
                blogs.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            dispatch(fetchBlogs(blogs.sort((a, b) => b.createdAt - a.createdAt)));
        });
    };
};