export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_TITLE_FILTER':
            return { title: action.title };
    }
    return state;
};