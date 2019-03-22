export default (state = [], action) => {
    switch (action.type) {
        case 'CREATE_BLOG':
            return [...state, action.blog];
    };
    return state;
};