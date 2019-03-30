export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BLOGS':
            return [...state, ...action.blogs];
        default:
            return state;
    }
};