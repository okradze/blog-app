export default (blogs, { title, searchBy }) => {
    return blogs.filter(blog => {

        if (searchBy === 'title') {
            const titleMatch = blog.title.toLowerCase().includes(title.toLowerCase());

            return titleMatch;
        } else if (searchBy === 'author') {
            const authorMatch = blog.author.toLowerCase().includes(title.toLowerCase());
            
            return authorMatch;
        }
    });
};