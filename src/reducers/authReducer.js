export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.userInfo;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}