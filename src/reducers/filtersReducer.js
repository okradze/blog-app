export default (state = { title: '', searchBy: 'title' }, action) => {
    switch (action.type) {
        case 'SET_TITLE_FILTER':
            return {...state, title: action.title};
        case 'SEARCH_BY_TITLE':
            return {...state, searchBy: 'title'}
        case 'SEARCH_BY_AUTHOR':
            return {...state, searchBy: 'author'}
    }
    return state;
};