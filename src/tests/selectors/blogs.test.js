import selectBlogs from '../../selectors/blogs';
import blogs from '../fixtures/blogs';

test('should filter by title', () => {
	const filters = {
		title: 'rent',
		searchBy: 'title',
	};
	const result = selectBlogs(blogs, filters);
	expect(result).toEqual([ blogs[1] ]);
});

test('should filter by author', () => {
	const filters = {
		title: 'gio',
		searchBy: 'author',
	};
	const result = selectBlogs(blogs, filters);
	expect(result).toEqual([ blogs[0] ]);
});
