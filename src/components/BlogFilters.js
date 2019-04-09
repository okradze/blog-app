import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setTitleFilter, searchByAuthor, searchByTitle } from '../actions/filters';

export const BlogFilters = ({ setTitleFilter, searchByTitle, searchByAuthor, filters }) => {
	const onTitleChange = e => {
		setTitleFilter(e.target.value);
	};

	const onSortChange = e => {
		if (e.target.value === 'title') {
			searchByTitle();
		} else if (e.target.value === 'author') {
			searchByAuthor();
		}
	};

	useEffect(() => () => setTitleFilter(''), []);

	return (
		<div className="filters">
			<input
				type="text"
				className="input filters__input"
				placeholder="Search..."
				value={filters.title}
				onChange={onTitleChange}
			/>
			<select className="input" value={filters.searchBy} onChange={onSortChange}>
				<option value="title">Title</option>
				<option value="author">Author</option>
			</select>
		</div>
	);
};

const mapStateToProps = state => ({
	filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
	setTitleFilter: title => dispatch(setTitleFilter(title)),
	searchByAuthor: () => dispatch(searchByAuthor()),
	searchByTitle: () => dispatch(searchByTitle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogFilters);
