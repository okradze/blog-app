import React from 'react';
import { connect } from 'react-redux';
import { setTitleFilter, searchByAuthor, searchByTitle } from '../actions/filters';

export class BlogFilters extends React.Component {
    onTitleChange = (e) => {
        this.props.setTitleFilter(e.target.value);
    };
    onSortChange = (e) => {
        if(e.target.value === 'title') {
            this.props.searchByTitle();
        } else if (e.target.value === 'author') {
            this.props.searchByAuthor();
        }
    };
    render() {
        return (
            <div>
                <input type="text" placeholder="Search by" value={this.props.filters.title} onChange={this.onTitleChange} />
                <select value={this.props.filters.searchBy} onChange={this.onSortChange}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </select>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTitleFilter: (title) => dispatch(setTitleFilter(title)),
    searchByAuthor: () => dispatch(searchByAuthor()),
    searchByTitle: () => dispatch(searchByTitle())
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogFilters);