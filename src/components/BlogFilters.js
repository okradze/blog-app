import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setTitleFilter, searchByAuthor, searchByTitle } from '../actions/filters';

export const BlogFilters = (props) => {
    const onTitleChange = (e) => {
        props.setTitleFilter(e.target.value);
    };

    const onSortChange = (e) => {
        if(e.target.value === 'title') {
            props.searchByTitle();
        } else if (e.target.value === 'author') {
            props.searchByAuthor();
        }
    };

    useEffect(() => {
        return () => {
            props.setTitleFilter('');
        }
    }, [])

    return (
        <div className="flex items-center">
            <input type="text" className="py-2 px-4 mr-4 rounded-sm" placeholder="Search by" value={props.filters.title} onChange={onTitleChange} />
            <select className="py-2 px-4 rounded-sm" value={props.filters.searchBy} onChange={onSortChange}>
                <option value="title">Title</option>
                <option value="author">Author</option>
            </select>
        </div>
    );
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTitleFilter: (title) => dispatch(setTitleFilter(title)),
    searchByAuthor: () => dispatch(searchByAuthor()),
    searchByTitle: () => dispatch(searchByTitle())
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogFilters);