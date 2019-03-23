export default (state = [], action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.blogs;
        case 'CREATE_BLOG':
            return [...state, action.blog];
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.id);
        case 'EDIT_BLOG':
            return state.map(blog => {
                if (blog.id === action.id) {
                    return {
                        ...blog,
                        ...action.updates
                    }
                } else {
                    return blog;
                }
            });
    };
    return state;
};