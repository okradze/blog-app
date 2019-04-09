import { setTitleFilter, searchByTitle, searchByAuthor } from '../../actions/filters';

test('should setup setTitleFilter action object', () => {
	const query = 'abc';
	const action = setTitleFilter(query);
	expect(action).toEqual({
		type: 'SET_TITLE_FILTER',
		title: query,
	});
});

test('should setup searchByTitle action object', () => {
	const action = searchByTitle();
	expect(action).toEqual({
		type: 'SEARCH_BY_TITLE',
	});
});

test('should setup setTitleFilter action object', () => {
	const action = searchByAuthor();
	expect(action).toEqual({
		type: 'SEARCH_BY_AUTHOR',
	});
});
