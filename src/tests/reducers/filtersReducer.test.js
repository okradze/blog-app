import filtersReducer from '../../reducers/filtersReducer';

test('should setup default values', () => {
	const state = filtersReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual({
		title: '',
		searchBy: 'title',
	});
});

test('should set title filter', () => {
	const state = filtersReducer(undefined, { type: 'SET_TITLE_FILTER', title: 'abc' });
	expect(state).toEqual({
		title: 'abc',
		searchBy: 'title',
	});
});

test('should search by title', () => {
	const state = filtersReducer(undefined, { type: 'SEARCH_BY_TITLE' });
	expect(state).toEqual({
		title: '',
		searchBy: 'title',
	});
});

test('should search by author', () => {
	const state = filtersReducer(undefined, { type: 'SEARCH_BY_AUTHOR' });
	expect(state).toEqual({
		title: '',
		searchBy: 'author',
	});
});
