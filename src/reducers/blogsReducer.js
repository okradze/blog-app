export default (state = [], action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.blogs;
        case 'CREATE_BLOG':
            return [...state, action.blog];
    };
    return state;
};