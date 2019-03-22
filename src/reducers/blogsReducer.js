const blogs = [{
    title: '1',
    body: '1',
    author: Math.random().toString()
},{
    title: '2',
    body: '2',
    author: Math.random().toString()
},{
    title: '3',
    body: '3',
    author: Math.random().toString()
}]
export default (state = blogs, action) => {
    switch (action.type) {
        case 'CREATE_BLOG':
            return [...state, action.blog];
    };
    return state;
};