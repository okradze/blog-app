import blogs from '../../tests/fixtures/blogs';

export const firstFetchBlogs = async () => {
	return [ blogs[0] ];
};

export const fetchBlogs = async () => {
	await blogs;
	return blogs;
};
