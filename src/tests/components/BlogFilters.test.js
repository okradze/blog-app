import React from 'react';
import { shallow } from 'enzyme';
import { BlogFilters } from '../../components/BlogFilters';

let setTitleFilter, searchByTitle, searchByAuthor, filters, wrapper;

beforeEach(() => {
	setTitleFilter = jest.fn();
	searchByTitle = jest.fn();
	searchByAuthor = jest.fn();
	filters = {
		title: '',
		searchBy: 'title',
	};
	wrapper = shallow(
		<BlogFilters
			setTitleFilter={setTitleFilter}
			searchByTitle={searchByTitle}
			searchByAuthor={searchByAuthor}
			filters={filters}
		/>,
	);
});

test('should render BlogFilters correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should call setTitleFilter on input change', () => {
	const value = 'abc';
	wrapper.find('input').simulate('change', { target: { value } });
	expect(setTitleFilter).toHaveBeenCalledWith(value);
});

test('should call onSortChange when setting value to author', () => {
	const value = 'author';
	wrapper.find('select').simulate('change', { target: { value } });
	expect(searchByAuthor).toHaveBeenCalledWith();
});

test('should call onSortChange when setting value to title', () => {
	const value = 'title';
	wrapper.find('select').simulate('change', { target: { value } });
	expect(searchByTitle).toHaveBeenCalledWith();
});
